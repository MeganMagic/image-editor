import Konva from "konva";

const toolTypes = ["pen" as const, "eraser" as const];

export type ToolType = (typeof toolTypes)[number];
export const isToolType = (target: unknown): target is ToolType => {
  return toolTypes.includes(target as ToolType);
};

export interface Tool {
  type: ToolType;
  color: string;
  width: number;
}

export interface Line {
  tool: Tool;
  points: number[];
  color?: string;
  width?: number;
}

export type DrawingEventHandler = (
  e: Konva.KonvaEventObject<MouseEvent>
) => void;
