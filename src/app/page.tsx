import CoachingShell from "@/components/coaching/CoachingShell";
import CoachingLanding from "@/components/coaching/CoachingLanding";
import { getPrograms } from "@/lib/coaching-store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const programs = await getPrograms().catch(() => null);
  return <CoachingShell><CoachingLanding programs={programs} /></CoachingShell>;
}
