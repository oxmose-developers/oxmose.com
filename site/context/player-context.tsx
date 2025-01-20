import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import type { File as SanityFile } from "sanity";

import { useEvent } from "../hooks/use-event";
import { useInterval } from "../hooks/use-interval";
import type { Track as SanityTrack } from "../lib/sanity";
import { urlForFile } from "../lib/sanity";

export function tracksToPlaylist(
  tracks: SanityTrack[],
  artwork?: string,
  album?: string,
  artistName?: string,
): Track[] {
  return tracks
    .filter((track) => !!track.file)
    .map((track) => ({
      title: track.name,
      artist: artistName
        ? artistName
        : track.artists.map((el) => el.name).join(", "),
      album: album,
      artwork: artwork
        ? [{ src: artwork, sizes: "512x512", type: "image/jpeg" }]
        : undefined,
      src: urlForFile(track.file as SanityFile)!,
      duration: track.length,
    }));
}

interface Track {
  title: string;
  artist: string;
  album: string | undefined;
  artwork: { src: string; sizes: string; type: string }[] | undefined;
  src: string;
  duration: string;
}

interface PlayerState {
  playlist: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  progress: number;
}

type PlayerAction =
  | {
      type: "LOAD_PLAYLIST";
      payload: Track[];
    }
  | {
      type: "PLAY";
      payload?: { currentTrackIndex?: number };
    }
  | { type: "PAUSE" }
  | { type: "NEXT_TRACK" }
  | { type: "PREVIOUS_TRACK" }
  | {
      type: "SEEK";
      payload: number;
    }
  | {
      type: "UPDATE_PROGRESS";
      payload: { currentTime: number; duration: number };
    };

const initialState: PlayerState = {
  playlist: [],
  currentTrackIndex: 0,
  isPlaying: false,
  duration: 0,
  currentTime: 0,
  progress: 0,
};

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case "LOAD_PLAYLIST":
      return { ...state, playlist: action.payload, currentTrackIndex: 0 };
    case "PLAY":
      return {
        ...state,
        isPlaying: true,
        currentTrackIndex:
          action.payload?.currentTrackIndex !== undefined
            ? action.payload.currentTrackIndex
            : state.currentTrackIndex,
      };
    case "PAUSE":
      return { ...state, isPlaying: false };
    case "NEXT_TRACK":
      return {
        ...state,
        // Looping logic
        // currentTrackIndex:
        //   (state.currentTrackIndex + 1) % state.playlist.length,
        currentTrackIndex:
          state.currentTrackIndex < state.playlist.length - 1
            ? state.currentTrackIndex + 1
            : state.currentTrackIndex,
        currentTime: 0,
        progress: 0,
        isPlaying: true,
      };
    case "PREVIOUS_TRACK":
      return {
        ...state,
        // Looping logic
        // currentTrackIndex:
        //   (state.currentTrackIndex - 1 + state.playlist.length) %
        //   state.playlist.length,
        currentTrackIndex:
          state.currentTrackIndex > 0
            ? state.currentTrackIndex - 1
            : state.currentTrackIndex,
        currentTime: 0,
        progress: 0,
        isPlaying: true,
      };
    case "SEEK":
      return {
        ...state,
        currentTime: action.payload * state.duration,
        progress: action.payload,
      };
    case "UPDATE_PROGRESS":
      return {
        ...state,
        currentTime: action.payload.currentTime,
        duration: action.payload.duration,
        progress:
          action.payload.duration > 0
            ? action.payload.currentTime / action.payload.duration
            : 0,
      };
    default:
      return state;
  }
}

interface PlayerContextType {
  state: PlayerState;
  dispatch: React.Dispatch<PlayerAction>;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const audioRef = useRef<HTMLAudioElement>(null);

  const updateProgress = useEvent(() => {
    const audio = audioRef.current;
    if (!audio) return;

    dispatch({
      type: "UPDATE_PROGRESS",
      payload: { currentTime: audio.currentTime, duration: audio.duration },
    });
  });

  useInterval(updateProgress, state.isPlaying ? 1_000 : null);

  const onEnded = useEvent(() => {
    dispatch({ type: "NEXT_TRACK" });
  });

  useEffect(() => {
    if (typeof document === "undefined") return;

    const audio = audioRef.current;
    if (!audio) return;

    const currentTrack = state.playlist[state.currentTrackIndex];
    if (currentTrack) {
      if (audio.src !== currentTrack.src) {
        audio.src = currentTrack.src;
        audio.load();
      }

      if (state.isPlaying) {
        audio.play().catch((error) => console.error("Playback failed:", error));
      } else {
        audio.pause();
      }

      // Update Media Session API
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: currentTrack.title,
          artist: currentTrack.artist,
          album: currentTrack.album,
          artwork: currentTrack.artwork,
        });

        navigator.mediaSession.setActionHandler("pause", () => {
          dispatch({ type: "PAUSE" });
        });

        navigator.mediaSession.setActionHandler("play", () => {
          dispatch({ type: "PLAY" });
        });

        navigator.mediaSession.setActionHandler("nexttrack", () => {
          dispatch({ type: "NEXT_TRACK" });
        });

        navigator.mediaSession.setActionHandler("previoustrack", () => {
          dispatch({ type: "PREVIOUS_TRACK" });
        });
      }
    }
  }, [state.currentTrackIndex, state.isPlaying, state.playlist]);

  const value = {
    state,
    dispatch,
    audioRef,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}

      <audio
        ref={audioRef}
        onDurationChange={updateProgress}
        onEnded={onEnded}
      />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}

export function usePlayerActions() {
  const { dispatch, audioRef } = usePlayer();

  return {
    loadPlaylist: (playlist: Track[]) =>
      dispatch({ type: "LOAD_PLAYLIST", payload: playlist }),
    play: (currentTrackIndex?: number) =>
      dispatch({
        type: "PLAY",
        payload:
          currentTrackIndex !== undefined ? { currentTrackIndex } : undefined,
      }),
    pause: () => dispatch({ type: "PAUSE" }),
    nextTrack: () => dispatch({ type: "NEXT_TRACK" }),
    previousTrack: () => dispatch({ type: "PREVIOUS_TRACK" }),
    seek: (progress: number) => {
      dispatch({ type: "SEEK", payload: progress });
      if (audioRef.current) {
        audioRef.current.currentTime = progress * audioRef.current.duration;
      }
    },
  };
}

export type { PlayerAction, PlayerState, Track };
