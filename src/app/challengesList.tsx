"use client";
import { useState, useEffect } from "react";
import defaultChallenges from "./defaultchallenges";
import ChallengeButton from "./challengeButton";
import Link from "next/link";

const resetAll = () => {
  localStorage.clear();
  window.location.reload();
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return error;
  }
};

export default function ChallengesList() {
  const [challenges, setChallenges] = useState(() => {
    const removedDefaults = JSON.parse(
      localStorage.getItem("removedDefaults") || "[]"
    );

    const filteredDefaults = defaultChallenges.filter(
      (challenge) => !removedDefaults.includes(challenge.id)
    );

    const savedChallenges = localStorage.getItem("challenges");
    return savedChallenges
      ? JSON.parse(savedChallenges)
      : filteredDefaults;
  });
  const [addClicked, setAddClicked] = useState(false);
  const [newChallengeName, setNewChallengeName] = useState("");
  const [newChallengeUrl, setNewChallengeUrl] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("challenges");
    if (saved) {
      setChallenges(JSON.parse(saved));
    }
  }, []);

  const handleAddChallenge = () => {
    if (
      newChallengeName &&
      newChallengeUrl &&
      isValidUrl(newChallengeUrl)
    ) {
      const newChallenge = {
        id: newChallengeName.toLowerCase().replace(/\s+/g, ""),
        name: newChallengeName,
        url: newChallengeUrl,
      };
      const updatedChallenges = [...challenges, newChallenge];
      localStorage.setItem(
        "challenges",
        JSON.stringify(updatedChallenges)
      );
      setNewChallengeName("");
      setNewChallengeUrl("");
      setAddClicked(false);
      window.location.reload();
    } else {
      alert("Please enter a valid challenge name and URL.");
    }
  };
  return (
    <div className="grid grid-cols-1 mx-auto gap-3">
      {challenges.map(
        (challenge: { id: string; name: string; url: string }) => (
          <ChallengeButton
            key={challenge.id}
            id={challenge.id}
            name={challenge.name}
            url={challenge.url}
          />
        )
      )}
      <button
        className="mt-6
         border border-gray-300 rounded-lg
               bg-[#3a3a3c] hover:bg-neutral-800
              transition-colors duration-200 rounded-xl
            "
        onClick={
          addClicked
            ? () => setAddClicked(false)
            : () => setAddClicked(true)
        }
        aria-label="Reset all challenges"
      >
        <p className="text-center"> + Add Your Own</p>
      </button>
      {addClicked && (
        <div className="flex flex-col items-center mt-4">
          <input
            type="text"
            placeholder="Challenge Name"
            value={newChallengeName}
            onChange={(e) => setNewChallengeName(e.target.value)}
            className="mb-2 p-2 border border-gray-300 rounded-lg w-48 bg-[#3a3a3c] text-white"
          />
          <input
            type="text"
            placeholder="Challenge URL"
            value={newChallengeUrl}
            onChange={(e) => setNewChallengeUrl(e.target.value)}
            className="mb-2 p-2 border border-gray-300 rounded-lg w-48 bg-[#3a3a3c] text-white"
          />
          <button
            onClick={handleAddChallenge}
            className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Add Challenge
          </button>
        </div>
      )}
      <button
        className=" mt-8
         border border-gray-300 rounded-lg
               bg-[#3a3a3c] hover:bg-neutral-800
              transition-colors duration-200 rounded-xl
            "
        onClick={resetAll}
        aria-label="Reset all challenges"
      >
        <p className="text-center">Reset</p>
      </button>
      <button
        className=" mt-3
         border border-gray-300 rounded-lg
               bg-[#3a3a3c] hover:bg-neutral-800
              transition-colors duration-200 rounded-xl
            "
        aria-label="Link to donate page"
      >
        <Link
          href="https://buymeacoffee.com/jackkershaw"
          target="_blank"
          rel="noreferrer"
        >
          <p className="text-center">Donate</p>
        </Link>
      </button>
    </div>
  );
}
