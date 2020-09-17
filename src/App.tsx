import * as React from "react";
import "./styles.css";
import GradientPicker from "./GradientPicker/GradientPicker";

export default function App() {
  const [color, setColor] = React.useState("black");
  return (
    <div className="App">
      <h1 style={{ color: color }}>Gradient Color Picker</h1>
      <h2>picking colors along a linear gradient</h2>
      <GradientPicker
        colors={[
          "rgb(64, 40, 33)",
          "rgb(87, 58, 39)",
          "rgb(120, 76, 56)",
          "rgb(163, 114, 73)",
          "rgb(175, 127, 79)",
          "rgb(197, 145, 86)",
          "rgb(218, 175, 114)",
          "rgb(222, 177, 133)",
          "rgb(228, 192, 150)",
          "rgb(232, 193, 168)",
          "rgb(247, 215, 191)",
          "rgb(255, 226, 216)"
        ]}
        onColorChange={setColor}
      />
    </div>
  );
}
