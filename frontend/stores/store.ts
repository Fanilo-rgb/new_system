import { create } from "zustand"

type selectItemType = {
  selectedItem: string | null;
  setSelectedItem: (_id: string) => void;
}

type modalType = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export const useSelectItem = create<selectItemType>() ((set, get) => ({
  selectedItem: null,
  setSelectedItem: (_id: string) => set(() => {
    const current = get().selectedItem;
    return {
      selectedItem: current === _id ? null : _id,
    }
  })
}))

export const useModalStore = create<modalType>() ((set) => ({
  showModal: false,
  setShowModal: (value) => set({ showModal: value }),
}))
