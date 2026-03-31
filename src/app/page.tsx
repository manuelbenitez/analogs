import { HomePage } from "./_pages/HomePage";

const IMAGE_BASE = "https://img.mbdev.to";

async function getHomeImages() {
  const res = await fetch(`${IMAGE_BASE}/api/list/home`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const keys = (await res.json()) as string[];

  return keys
    .filter((key) => key !== "home/")
    .map((key) => `${IMAGE_BASE}/${key}`);
}

export default async function Home() {
  const images = await getHomeImages();

  return <HomePage images={images} />;
}
