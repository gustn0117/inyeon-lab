import CoachingShell from "@/components/coaching/CoachingShell";
import ReferenceHome from "@/components/coaching/ReferenceHome";
import { getPrograms } from "@/lib/coaching-store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const programs = await getPrograms().catch(() => null);
  return <CoachingShell><ReferenceHome programs={programs}/></CoachingShell>;
}
