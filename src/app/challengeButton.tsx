"use client";

import Link from "next/link";
import { useCurrentDate } from "./date";

const ChallengeButton = ({
  id,
  name,
  url,
}: {
  id: string;
  name: string;
  url: string;
}) => {
  const currentDate = useCurrentDate();

  const handleClick = (e: React.MouseEvent) => {
    localStorage.setItem(id, currentDate);
    window.location.reload();
  };

  const completedDate = localStorage.getItem(id);
  const isCompletedToday = completedDate === currentDate;

  const deleteChallenge = (id: string) => {
    const savedChallenges = localStorage.getItem("challenges");
    if (savedChallenges) {
      const challenges = JSON.parse(savedChallenges);
      const updatedChallenges = challenges.filter(
        (challenge: { id: string }) => challenge.id !== id
      );
      localStorage.setItem(
        "challenges",
        JSON.stringify(updatedChallenges)
      );
    }

    const removedDefaults = JSON.parse(
      localStorage.getItem("removedDefaults") || "[]"
    );
    if (!removedDefaults.includes(id)) {
      removedDefaults.push(id);
      localStorage.setItem(
        "removedDefaults",
        JSON.stringify(removedDefaults)
      );
    }

    localStorage.removeItem(id);
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center flex-row space-x-2">
      <Link
        key={id}
        href={url}
        target="_blank"
        rel="noreferrer"
        onClick={handleClick}
        className={`border border-gray-300 rounded-lg w-50
          transition-colors duration-200 rounded-xl
          ${
            isCompletedToday
              ? "bg-[#618b54] hover:bg-green-700"
              : "bg-[#3a3a3c] hover:bg-neutral-800"
          }`}
      >
        <p className="text-center">{name}</p>
      </Link>
      <button
        className="bg-red-800/60 hover:bg-red-900/40 rounded-xl w-10 p-0.25 flex items-center justify-center"
        onClick={() => deleteChallenge(id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M19 8v11.6a2.4 2.4 0 0 1-2.4 2.4H7.4A2.4 2.4 0 0 1 5 19.6V8m11-3V3.2c0-.66-.54-1.2-1.2-1.2H9.2C8.54 2 8 2.54 8 3.2V5m8 0H8m8 0h5M8 5H3m9 6v6m3-6v6m-6-6v6"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default ChallengeButton;
