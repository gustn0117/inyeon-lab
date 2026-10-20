import type { ReactNode } from "react";
import { CoachingHeader, CoachingFooter } from "@/components/coaching/CoachingShell";

// Retain these exports for older shared components while using the coaching navigation everywhere.
export function RenewalHeader({ children: _children }: { children?: ReactNode }) { return <CoachingHeader />; }
export function RenewalFooter() { return <CoachingFooter />; }
