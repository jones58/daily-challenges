"use client";

import { useCurrentDate } from "./date";

export default function Header() {
  const currentDate = useCurrentDate();

  return (
    <div className="mx-auto text-center mt-4 space-y-3">
      <h1 className="text-3xl font-bold">Daily Challenges</h1>
      <h2 className="text-2xl">{currentDate}</h2>
    </div>
  );
}
