import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LandingPage from "@/components/landing";
import LandingUser from "@/components/landing-user";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return <LandingPage />;

  return <LandingUser />;
}
