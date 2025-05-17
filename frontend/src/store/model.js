import { create } from "zustand";
import axios from 'axios';

export const useModelStore = create((set) => ({
    models: [],
    selectedModelId: null,
    setModels: (models) => set({models}),
    fetchModels: async () => {
        const res = await axios.get("https://model-viewer-backend.onrender.com/api/models");
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
    removeModel: (modelId) => {
        set((state) => ({
            models: state.models.filter(model => model._id !== modelId),
            selectedModelId: state.selectedModelId === modelId ? null : state.selectedModelId,
          }));
    },
    useGrid: true,
    toggleUseGrid: () => {
        set((state) => ({
            useGrid: !state.useGrid
        }))
    },
    useAnimation: true,
    toggleUseAnimation: () => {
        set((state) => ({
            useAnimation: !state.useAnimation
        }))
    },
    animationArray: [],
    setAnimationArray: (animationArray) => set({animationArray}),
    selectedAnimation: null,
    setSelectedAnimation: (name) => set({selectedAnimation: name}),
}))