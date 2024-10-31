import { create } from "zustand";
import { Shape, ShapeDraft } from "./types";
import { nanoid } from "nanoid";

interface ShapeState {
  shapes: Shape[];
  activeShapeId?: string;
  addShape: (shapeDraft: Omit<Shape, "id">) => void;
  moveShape: (id: string, newPosition: { x: number; y: number }) => void;
  updateShape: (id: string, newAttributes: Partial<ShapeDraft>) => void;
  activateShape: (id: string) => void;
  deactivateShape: () => void;
}

export const useShapeStore = create<ShapeState>()((set) => ({
  shapes: [],
  addShape: (shapeDraft) =>
    set((state) => {
      const shape = { ...shapeDraft, id: nanoid() };
      return { shapes: [...state.shapes, shape] };
    }),
  moveShape: (id, newPosition) =>
    set((state) => {
      const targetShapeIndex = state.shapes.findIndex(
        (shape) => shape.id === id
      );
      if (targetShapeIndex === -1) {
        console.error("shape not found");
        return state;
      }

      const newShape: Shape = {
        ...state.shapes[targetShapeIndex],
        ...newPosition,
      };

      return { shapes: state.shapes.toSpliced(targetShapeIndex, 1, newShape) };
    }),
  updateShape: (id, newAttributes) =>
    set((state) => {
      const targetShapeIndex = state.shapes.findIndex(
        (shape) => shape.id === id
      );
      if (targetShapeIndex === -1) {
        console.error("shape not found");
        return state;
      }
      const newShape: Shape = {
        ...state.shapes[targetShapeIndex],
        ...newAttributes,
      };
      return { shapes: state.shapes.toSpliced(targetShapeIndex, 1, newShape) };
    }),
  activateShape: (id) => set({ activeShapeId: id }),
  deactivateShape: () => set({ activeShapeId: undefined }),
}));
