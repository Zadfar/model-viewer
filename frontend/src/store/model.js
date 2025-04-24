import { create } from "zustand";
import axios from 'axios';

export const useModelStore = create((set) => ({
    models: [],
    selectedModelId: null,
    setModels: (models) => set({models}),
    fetchModels: async () => {
        const res = await axios.get("/api/models");
        if (res.data.success) {
            set({models: res.data.data});
        }
        else {
            throw new Error("Failed to fetch models")
        }
    },
    setSelectedModelId: (id) => {
        set({selectedModelId: id});
    },
    addModel: (newModel) => {
        set((state) => ({
          models: [newModel, ...state.models],
        }));
    },
}))