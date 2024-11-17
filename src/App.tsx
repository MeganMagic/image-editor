import Editor from "./components/Editor";
import { useShapeStore } from "./components/ShapeLayer/ShapeStore";

function App() {
  const { addShape } = useShapeStore();

  const addTestShape = () => {
    addShape({
      type: "RECTANGLE",
      color: "#ff0000",
      x: 450,
      y: 450,
      width: 100,
      height: 100,
      rotate: 0,
    });
  };

  return (
    <div className="editor w-[800px] h-[600px] bg-gray-200">
      <Editor mode={"none"} />
      <button onClick={addTestShape}>도형 추가</button>
    </div>
  );
}

export default App;
