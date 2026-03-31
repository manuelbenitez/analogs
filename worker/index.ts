export interface Env {
  IMAGES: R2Bucket;
  ADMIN_PASSWORD: string;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

function getContentType(key: string): string {
  const ext = key.substring(key.lastIndexOf(".")).toLowerCase();
  return CONTENT_TYPES[ext] ?? "application/octet-stream";
}

async function handleListRequest(
  url: URL,
  env: Env,
): Promise<Response> {
  const parts = url.pathname.replace("/api/list", "").split("/").filter(Boolean);
  const album = parts[0];

  if (!album) {
    const listed = await env.IMAGES.list({ delimiter: "/" });
    const albums = listed.delimitedPrefixes.map((p) => p.replace(/\/$/, ""));
    return Response.json(albums, { headers: CORS_HEADERS });
  }

  // List all images in an album
  const prefix = `${album}/`;
  let cursor: string | undefined;
  const keys: string[] = [];

  do {
    const listed = await env.IMAGES.list({ prefix, cursor, limit: 1000 });
    for (const obj of listed.objects) {
      // Skip the _order.json file from listings
      if (obj.key.endsWith("_order.json")) continue;
      keys.push(obj.key);
    }
    cursor = listed.truncated ? listed.cursor : undefined;
  } while (cursor);

  // Check for custom order
  const orderObj = await env.IMAGES.get(`${album}/_order.json`);
  if (orderObj) {
    const order = (await orderObj.json()) as string[];
    const keySet = new Set(keys);
    const ordered: string[] = [];

    // Add keys in the specified order
    for (const key of order) {
      if (keySet.has(key)) {
        ordered.push(key);
        keySet.delete(key);
      }
    }

    // Append any new images not in the order file
    const remaining = [...keySet].sort();
    ordered.push(...remaining);

    return Response.json(ordered, { headers: CORS_HEADERS });
  }

  // Default: alphabetical sort
  keys.sort();
  return Response.json(keys, { headers: CORS_HEADERS });
}

async function handleOrderRequest(
  request: Request,
  url: URL,
  env: Env,
): Promise<Response> {
  // Auth check
  const auth = request.headers.get("Authorization");
  if (auth !== `Bearer ${env.ADMIN_PASSWORD}`) {
    return new Response("Unauthorized", { status: 401, headers: CORS_HEADERS });
  }

  const parts = url.pathname.replace("/api/order", "").split("/").filter(Boolean);
  const album = parts[0];

  if (!album) {
    return new Response("Album required", { status: 400, headers: CORS_HEADERS });
  }

  const order = await request.json();
  await env.IMAGES.put(`${album}/_order.json`, JSON.stringify(order), {
    httpMetadata: { contentType: "application/json" },
  });

  return Response.json({ ok: true }, { headers: CORS_HEADERS });
}

async function handleUploadRequest(
  request: Request,
  url: URL,
  env: Env,
): Promise<Response> {
  const auth = request.headers.get("Authorization");
  if (auth !== `Bearer ${env.ADMIN_PASSWORD}`) {
    return new Response("Unauthorized", { status: 401, headers: CORS_HEADERS });
  }

  const parts = url.pathname.replace("/api/upload", "").split("/").filter(Boolean);
  const album = parts[0];
  if (!album) {
    return new Response("Album required", { status: 400, headers: CORS_HEADERS });
  }

  const formData = await request.formData();
  const uploaded: string[] = [];

  for (const [, value] of formData.entries()) {
    if (!(value instanceof File)) continue;
    const key = `${album}/${value.name}`;
    await env.IMAGES.put(key, value.stream(), {
      httpMetadata: { contentType: value.type },
    });
    uploaded.push(key);
  }

  // Append new images to _order.json
  if (uploaded.length > 0) {
    const orderObj = await env.IMAGES.get(`${album}/_order.json`);
    let order: string[] = [];
    if (orderObj) {
      order = (await orderObj.json()) as string[];
    }
    order.push(...uploaded);
    await env.IMAGES.put(`${album}/_order.json`, JSON.stringify(order), {
      httpMetadata: { contentType: "application/json" },
    });
  }

  return Response.json({ uploaded }, { headers: CORS_HEADERS });
}

async function handleDeleteRequest(
  request: Request,
  url: URL,
  env: Env,
): Promise<Response> {
  const auth = request.headers.get("Authorization");
  if (auth !== `Bearer ${env.ADMIN_PASSWORD}`) {
    return new Response("Unauthorized", { status: 401, headers: CORS_HEADERS });
  }

  const key = decodeURIComponent(url.pathname.replace("/api/image/", ""));
  if (!key) {
    return new Response("Key required", { status: 400, headers: CORS_HEADERS });
  }

  await env.IMAGES.delete(key);

  // Also update _order.json if it exists
  const album = key.split("/")[0]!;
  const orderObj = await env.IMAGES.get(`${album}/_order.json`);
  if (orderObj) {
    const order = (await orderObj.json()) as string[];
    const updated = order.filter((k) => k !== key);
    await env.IMAGES.put(`${album}/_order.json`, JSON.stringify(updated), {
      httpMetadata: { contentType: "application/json" },
    });
  }

  return Response.json({ ok: true }, { headers: CORS_HEADERS });
}

async function handleImageRequest(
  url: URL,
  env: Env,
): Promise<Response> {
  const key = decodeURIComponent(url.pathname.slice(1));

  if (!key) {
    return new Response("Not Found", { status: 404 });
  }

  const object = await env.IMAGES.get(key);

  if (!object) {
    return new Response("Not Found", { status: 404 });
  }

  return new Response(object.body, {
    headers: {
      "Content-Type": getContentType(key),
      "Cache-Control": "public, max-age=31536000, immutable",
      ETag: object.etag,
      ...CORS_HEADERS,
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/upload") && request.method === "POST") {
      return handleUploadRequest(request, url, env);
    }

    if (url.pathname.startsWith("/api/order") && request.method === "PUT") {
      return handleOrderRequest(request, url, env);
    }

    if (url.pathname.startsWith("/api/image/") && request.method === "DELETE") {
      return handleDeleteRequest(request, url, env);
    }

    if (request.method !== "GET") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    if (url.pathname.startsWith("/api/list")) {
      return handleListRequest(url, env);
    }

    return handleImageRequest(url, env);
  },
};
