import { create } from "zustand";
import { DrawingEventHandler, Line, Tool } from "./types";

interface DrawingState {
  lines: Line[];
  tool: Tool;
  isDrawing: boolean;
  startDrawing: DrawingEventHandler;
  draw: DrawingEventHandler;
  endDrawing: () => void;
  changeTool: (tool: Partial<Tool>) => void;
}

export const useDrawingStore = create<DrawingState>()((set) => ({
  lines: [],
  tool: {
    type: "pen",
    color: "#df4b26",
    width: 5,
  },
  isDrawing: false,
  startDrawing: (e) =>
    set((state) => {
      const pointer = e.target.getStage()?.getPointerPosition();
      if (!pointer) return state;

      const newLine: Line = {
        tool: state.tool,
        points: [pointer.x, pointer.y],
      };
      return {
        isDrawing: true,
        lines: [...state.lines, newLine],
      };
    }),
  draw: (e) =>
    set((state) => {
      if (!state.isDrawing) return state;

      const pointer = e.target.getStage()?.getPointerPosition();
      if (!pointer) return state;

      const lastLine = state.lines[state.lines.length - 1];
      const updatedLine = {
        ...lastLine,
        points: [...lastLine.points, pointer.x, pointer.y],
      };
      return { lines: [...state.lines.slice(0, -1), updatedLine] };
    }),
  endDrawing: () => set(() => ({ isDrawing: false })),
  changeTool: (tool) => set((state) => ({ tool: { ...state.tool, ...tool } })),
}));

export const useDrawingController = () => {
  const { tool, changeTool } = useDrawingStore();

  const changeColor = (newColor: string) => {
    changeTool({ color: newColor });
  };

  const changeWidth = (newWidth: number) => {
    changeTool({ width: newWidth });
  };

  const toggleToolType = () => {
    changeTool({ type: tool.type === "pen" ? "eraser" : "pen" });
  };

  return {
    color: tool.color,
    width: tool.width,
    toolType: tool.type,
    changeColor,
    changeWidth,
    toggleToolType,
  };
};
