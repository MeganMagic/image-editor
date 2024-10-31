export type ShapeType = "RECTANGLE" | "ELLIPSE";

export interface Shape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  color: string;
}
export type ShapeDraft = Omit<Shape, "id">;
