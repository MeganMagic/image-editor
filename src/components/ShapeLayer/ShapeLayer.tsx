import { Layer } from "react-konva";
import { useShapeStore } from "./ShapeStore";
import Shape from "./Shape";

const ShapeLayer = () => {
  const { shapes } = useShapeStore();

  return (
    <Layer>
      {shapes.map((shape) => (
        <Shape key={shape.id} {...shape} />
      ))}
    </Layer>
  );
};

export default ShapeLayer;
