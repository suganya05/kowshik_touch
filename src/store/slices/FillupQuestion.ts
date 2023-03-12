import { create } from "zustand";

interface IState {
  initialState: any[];
  storeQuestion: (data: any) => void;
  selectedUserId: string | null;
}

export const useQuestionBankStore = create<IState>()((set) => ({
  initialState: [],
  selectedUserId: null,

  storeQuestion: (data) => {
    if (!data) return;

    set((state) => ({
      initialState: [...state.initialState, data],
    }));
  },
}));
