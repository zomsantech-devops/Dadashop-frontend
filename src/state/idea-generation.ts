import { create } from "zustand";

interface GenerationState {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const useGenerationStore = create<GenerationState>()((set) => ({
  isPlaying: true,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
}));
