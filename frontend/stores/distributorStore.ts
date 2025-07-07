import { create } from "zustand";

export type distributorType = {
  _id: string;
  numberCard: string;
  name: string;
  surname: string;
  cin?: string | null;
  phone?: string | null;
  createdAt?: string;
  address?: string | null;
  gender: string;
  upline?: distributorType;
  sponsor?: distributorType;
};

export type distributorStore = {
  distributors: distributorType[];
  extraInfo: distributorType | null;
  isLoading: boolean;
  setDistributors: (distributors: distributorType[]) => void;
  fetchDistributors: () => void;
  fetchExtraInfo: (_id: string) => void;
  createDistributor: (newDist: distributorType) => Promise<{success: boolean; message: string}>;
};

export const useDistributorStore = create<distributorStore>()((set) => ({
  distributors: [],
  extraInfo: null,
  isLoading: false,
  setDistributors: (distributors) => set({ distributors }),
  fetchDistributors: async () => {
    set({ isLoading: true });
    const res = await fetch("/api/v1/distributors");
    const json = await res.json();

    if (json.success) {
      set({ distributors: json.data });
      set({ isLoading: false });
    }
  },
  fetchExtraInfo: async (_id: string) => {
    const res = await fetch("/api/v1/distributors/" + _id);
    const json = await res.json();
    if (json.success) {
      set({ extraInfo: json.data });
    }
  },
  createDistributor: async (newDist: distributorType) => {
    if (!newDist.numberCard || !newDist.name || !newDist.surname || !newDist.gender) {
      return {success: false, message: "Please fill all fields."}
    }

    const res = await fetch("api/v1/distributors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDist)
    })
    const data = await res.json();
    set((state) => ({ distributors:[...state.distributors, data.data]}));
    return {success: true, message: data.message}
  },
}));
