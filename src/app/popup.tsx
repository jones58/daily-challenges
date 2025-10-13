"use client";

import Link from "next/link";

export default function Popup() {
  function closePopup() {
    const popup = document.getElementById("popup");
    if (popup) {
      popup.style.display = "none";
      localStorage.setItem("popupShown", "true");
      window.location.reload();
    }
  }

  return (
    <div
      role="main"
      id="popup"
      className="mb-8 max-w-xl flex flex-col items-center justify-center mx-auto"
    >
      <p className="text-lg">
        This is a website for collecting all the Wordle-adjacent daily
        challenges. After you visit each challenge, its button will
        turn green. This resets everyday. You can also add your own
        challenges at the bottom, and remove any challenges you
        don&apos;t want to play. Enjoy!
      </p>

      <div className="flex flex-col space-y-4 justify-center items-center mx-auto py-8">
        <button
          className="rounded-xl max-w-xl border-gray-300 rounded-lg
               bg-[#3a3a3c] hover:bg-neutral-800 w-50 h-10"
          onClick={closePopup}
          aria-label="Start playing daily challenges"
        >
          <p className="text-center m-auto">Play</p>
        </button>
        <Link
          href="https://github.com/jones58/daily-challenges"
          target="_blank"
        >
          <button
            className="rounded-xl max-w-xl border-gray-300 rounded-lg
               bg-[#3a3a3c] hover:bg-neutral-800 w-50 h-10"
            id="code"
            aria-label="View source code on GitHub"
          >
            <p className="text-center m-auto">View the code</p>
          </button>
        </Link>
      </div>
      <p className="py-6 text-sm max-w-md">
        N.B. This site is set in P22 Underground, a replica of the
        Transport for London Johnston font.
      </p>
    </div>
  );
}
