import { useState } from "react";

export default function Player() {
  const [isOpen, isOpenSet] = useState(false);

  const [playing, playingSet] = useState(false);

  if (isOpen) {
    return (
      <div className="fixed inset-x-0 bottom-0 h-[3.75rem] w-full bg-black text-white flex items-center gap-10 px-10 py-3">
        <div className="flex items-center gap-10">
          <button>
            <span className="sr-only">Previous</span>
            <span role="img" aria-label="Previous">
              ⏪
            </span>
          </button>

          <button onClick={() => playingSet((prev) => !prev)}>
            <span className="sr-only">Play / Pause</span>
            <span role="img" aria-label="Play / Pause">
              ⏯️
            </span>
          </button>

          <button>
            <span className="sr-only">Next</span>
            <span role="img" aria-label="Next">
              ⏩
            </span>
          </button>
        </div>

        <div>
          <p>Hands - Oliver Doerell</p>
        </div>

        <div className="flex-1 h-1 bg-white rounded-full"></div>

        <button onClick={() => isOpenSet(false)} className="">
          <span className="sr-only">Close Player</span>
          <span role="img" aria-hidden="true">
            ❎
          </span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => isOpenSet(true)}
      className="fixed right-0 bottom-0 size-[3.75rem] bg-black text-white"
    >
      <span className="sr-only">Open Player</span>
      <span role="img" aria-hidden="true">
        ▶️
      </span>
    </button>
  );
}
