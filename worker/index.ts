export interface Env {
  IMAGES: R2Bucket;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
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
    // List all albums (top-level prefixes)
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
      keys.push(obj.key);
    }
    cursor = listed.truncated ? listed.cursor : undefined;
  } while (cursor);

  // Sort keys so images appear in a consistent order
  keys.sort();

  return Response.json(keys, { headers: CORS_HEADERS });
}

async function handleImageRequest(
  url: URL,
  env: Env,
): Promise<Response> {
  // Strip leading slash to get the R2 key
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
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== "GET") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/list")) {
      return handleListRequest(url, env);
    }

    return handleImageRequest(url, env);
  },
};
