import Konva from "konva";
import React from "react";
import { useState } from "react";
import { Layer, Line, Stage, Text } from "react-konva";

type Tool = "pen" | "eraser";

interface Line {
  tool: Tool;
  points: number[];
  color?: string;
  width?: number;
}

const DrawingLayer = () => {
  const [tool, setTool] = useState<Tool>("pen");
  const [lines, setLines] = useState<Line[]>([]);
  const isDrawing = React.useRef(false);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    console.log("mouse down");
    isDrawing.current = true;

    const stage = e.target.getStage();
    if (!stage) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    console.log("mouse move");
    if (!isDrawing.current) {
      return;
    }

    const stage = e.target.getStage();
    if (!stage) return;
    const point = stage.getPointerPosition();
    if (!point) return;

    const lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onClick={() => console.log("click")}
      >
        <Layer>
          <Text text="drawing" />
          {lines.map((line, i) => (
            <Line
              key={`line-${i}`}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value as Tool);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
    </div>
  );
};

export default DrawingLayer;
