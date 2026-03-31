import { ImageResponse } from "next/og";

const IMAGE_BASE = "https://img.mbdev.to";

async function getHomeImages() {
  const res = await fetch(`${IMAGE_BASE}/api/list/home`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const keys = (await res.json()) as string[];
  return keys.filter((key) => key !== "home/").map((key) => `${IMAGE_BASE}/${key}`);
}

export async function GET() {
  const images = await getHomeImages();
  const randomImage = images[Math.floor(Math.random() * images.length)] ?? `${IMAGE_BASE}/home/F1010015.JPG`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={randomImage}
          alt=""
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            padding: "0 40px",
          }}
        >
          <h1
            style={{
              fontSize: 72,
              lineHeight: 1.2,
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            Digital Scrapbook of Analog Pictures
          </h1>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
