import { Ellipse, Rect, Transformer } from "react-konva";
import { Shape as IShape } from "./types";
import Konva from "konva";
import React, { useEffect, useMemo, useRef } from "react";
import { useShapeStore } from "./ShapeStore";

const MINIMAL_SIZE = 5;

const Shape = ({ id, type, x, y, width, height, color }: IShape) => {
  const shapeRef = useRef<(Konva.Rect & Konva.Ellipse) | null>(null);
  const transformerRef = useRef<Konva.Transformer | null>(null);

  const { updateShape, activateShape, activeShapeId } = useShapeStore();
  const isActive = useMemo(() => id === activeShapeId, [id, activeShapeId]);

  const handleOnClick = () => {
    console.log("shape clicked", id);
    activateShape(id);
  };

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const x = e.target.x();
    const y = e.target.y();
    updateShape(id, { x, y });
  };

  const handleTransformEnd = () => {
    if (!shapeRef.current) return;

    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    console.log(node.rotation());

    const newWidth = Math.max(MINIMAL_SIZE, node.width() * scaleX);
    const newHeight = Math.max(MINIMAL_SIZE, node.height() * scaleY);
    updateShape(id, {
      x: node.x(),
      y: node.y(),
      width: newWidth,
      height: newHeight,
      rotate: node.rotation(),
    });

    // reset scale
    node.scaleX(1);
    node.scaleY(1);
  };

  useEffect(() => {
    if (!isActive) return;
    if (!transformerRef.current || !shapeRef.current) return;

    transformerRef.current.nodes([shapeRef.current]);
    transformerRef.current.getLayer()?.batchDraw();
  }, [isActive]);

  switch (type) {
    case "RECTANGLE":
      return (
        <React.Fragment>
          <Rect
            ref={shapeRef}
            x={x}
            y={y}
            width={width}
            height={height}
            fill={isActive ? "#0000ff" : color}
            draggable={isActive}
            onClick={handleOnClick}
            onDragEnd={handleDragEnd}
            onTransformEnd={handleTransformEnd}
          />
          {isActive && <Transformer ref={transformerRef} flipEnabled={false} />}
        </React.Fragment>
      );
    case "ELLIPSE":
      return (
        <React.Fragment>
          <Ellipse
            ref={shapeRef}
            x={x}
            y={y}
            radiusX={width / 2}
            radiusY={height / 2}
            fill={isActive ? "#0000ff" : color}
            draggable={isActive}
            onClick={handleOnClick}
            onDragEnd={handleDragEnd}
            onTransformEnd={handleTransformEnd}
          />
          {isActive && <Transformer ref={transformerRef} flipEnabled={false} />}
        </React.Fragment>
      );
  }
};

export default Shape;
