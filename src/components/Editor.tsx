import { useRef } from "react";
import { Stage } from "react-konva";
import { useImageUploader } from "./ImageLayer/imageStore";
import ImageLayer from "./ImageLayer/ImageLayer";
import { useShapeStore } from "./ShapeLayer/ShapeStore";
import ShapeLayer from "./ShapeLayer/ShapeLayer";
import { ShapeDraft } from "./ShapeLayer/types";
import { useDrawingStore } from "./DrawingLayer/DrawingStore";
import DrawingLayer from "./DrawingLayer/DrawingLayer";
import { isToolType } from "./DrawingLayer/types";

const Editor = () => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const { uploadImage } = useImageUploader();
  const { shapes, addShape } = useShapeStore();
  const { startDrawing, draw, endDrawing, tool, changeTool } =
    useDrawingStore();

  const addRectangle = () => {
    const shapeDraft: ShapeDraft = {
      type: "RECTANGLE",
      x: 100,
      y: 100,
      width: 100,
      height: 50,
      color: "#ff0000",
      rotate: 0,
    };
    addShape(shapeDraft);
  };

  return (
    <>
      <div className="toolbar flex gap-4">
        <label className="w-60">
          <div>load image</div>
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            onChange={uploadImage}
          />
        </label>

        <div className="shapes flex flex-col gap-2 w-60">
          <button className="border" onClick={addRectangle}>
            add rectangle
          </button>
          <button className="border">add ellipse</button>

          <div className="border p-2">
            <p className="bold">shapes information board</p>
            {JSON.stringify(shapes)}
          </div>
        </div>

        <div className="drawing">
          <span className="mr-2">tool</span>
          <select
            className="border"
            value={tool.type}
            onChange={(e) => {
              const value = e.target;
              if (!isToolType(value)) return;
              changeTool({ type: value });
            }}
          >
            <option value="pen">pen</option>
            <option value="eraser">eraser</option>
          </select>

          <br />

          <span>color</span>
          <select
            className="border"
            value={tool.color}
            onChange={(e) => changeTool({ color: e.target.value })}
          >
            <option value="#ff0000">red</option>
            <option value="#0000ff">blue</option>
            <option value="#00ff00">green</option>
          </select>

          <br />

          <span>width</span>
          <input
            className="border"
            value={tool.width}
            type="number"
            onChange={(e) => changeTool({ width: Number(e.target.value) })}
          />
        </div>
      </div>
      <Stage
        width={600}
        height={600}
        className="w-fit border border-gray-300 bg-gray-100"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
      >
        <ImageLayer />
        <ShapeLayer />
        <DrawingLayer />
      </Stage>
      {/* <DrawingLayer /> */}
    </>
  );
};

export default Editor;
