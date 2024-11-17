import { useEffect } from "react";
import { Stage } from "react-konva";
import ImageLayer from "./ImageLayer/ImageLayer";
import { useShapeStore } from "./ShapeLayer/ShapeStore";
import ShapeLayer from "./ShapeLayer/ShapeLayer";
import { useDrawingStore } from "./DrawingLayer/DrawingStore";
import DrawingLayer from "./DrawingLayer/DrawingLayer";
import "../index.css";

interface EditorProps {
  mode: "none" | "drawing" | "shape";
}

const Editor = ({ mode = "none" }: EditorProps) => {
  const { shapes } = useShapeStore();
  const { startDrawing, draw, endDrawing } = useDrawingStore();

  useEffect(() => {
    console.log(mode);
  }, [mode]);

  return (
    <>
      <div className="border p-2 absolute">
        <p className="bold">shapes information board</p>
        {JSON.stringify(shapes)}
      </div>

      <Stage
        width={1000}
        height={1000}
        className="w-fit border border-gray-300 bg-gray-100"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
      >
        <ImageLayer />
        <DrawingLayer />
        <ShapeLayer />
      </Stage>
    </>
  );
};

export default Editor;
