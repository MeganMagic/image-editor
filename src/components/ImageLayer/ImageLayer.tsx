import { Image, Layer } from "react-konva";
import { useImageStore } from "./imageStore";
import { useMemo } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../constants";

const ImageLayer = () => {
  const { dimension, canvasSource } = useImageStore();

  const imageWidth = useMemo(
    () => (dimension >= 1 ? CANVAS_WIDTH : CANVAS_HEIGHT * dimension),
    [dimension]
  );
  const imageHeight = useMemo(
    () => (dimension < 1 ? CANVAS_HEIGHT : CANVAS_WIDTH / dimension),
    [dimension]
  );
  const imageX = useMemo(
    () => (dimension >= 1 ? 0 : (CANVAS_WIDTH - imageWidth) / 2),
    [imageWidth, dimension]
  );
  const imageY = useMemo(
    () => (dimension < 1 ? 0 : (CANVAS_HEIGHT - imageHeight) / 2),
    [imageHeight, dimension]
  );

  return (
    <Layer className="image-layer">
      <Image
        image={canvasSource}
        x={imageX}
        y={imageY}
        width={imageWidth}
        height={imageHeight}
      />
    </Layer>
  );
};

export default ImageLayer;
