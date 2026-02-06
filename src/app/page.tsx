import { HydrateClient } from "~/trpc/server";
import { HomePage } from "./_pages/HomePage";

export default async function Home() {
  return (
    <HydrateClient>
      <HomePage />
    </HydrateClient>
  );
}
