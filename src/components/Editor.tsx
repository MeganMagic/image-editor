import { useRef } from "react";
import { Stage } from "react-konva";
import { useImageUploader } from "./ImageLayer/imageStore";
import ImageLayer from "./ImageLayer/ImageLayer";
import { useShapeStore } from "./ShapeLayer/ShapeStore";
import ShapeLayer from "./ShapeLayer/ShapeLayer";
import { ShapeDraft } from "./ShapeLayer/types";
import DrawingLayer from "./DrawingLayer/DrawingLayer";

const Editor = () => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const { uploadImage } = useImageUploader();
  const { shapes, addShape } = useShapeStore();

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

        <button>drawing</button>
      </div>
      {/* <Stage
        width={600}
        height={600}
        className="w-fit border border-gray-300 bg-gray-100"
      >
        <ImageLayer />
        <ShapeLayer />
      </Stage> */}
      <DrawingLayer />
    </>
  );
};

export default Editor;
