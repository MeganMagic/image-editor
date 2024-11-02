import { Layer, Line, Text } from "react-konva";
import { useDrawingStore } from "./DrawingStore";

type Tool = "pen" | "eraser";

interface Line {
  tool: Tool;
  points: number[];
  color?: string;
  width?: number;
}

const DrawingLayer = () => {
  const { lines } = useDrawingStore();

  return (
    <Layer>
      <Text text="drawing" />
      {lines.map((line, i) => (
        <Line
          key={`line-${i}`}
          points={line.points}
          stroke={line.tool.color}
          strokeWidth={line.tool.width}
          tension={0.5}
          lineCap="round"
          lineJoin="round"
          globalCompositeOperation={
            line.tool.type === "eraser" ? "destination-out" : "source-over"
          }
        />
      ))}
    </Layer>
  );
};

export default DrawingLayer;
