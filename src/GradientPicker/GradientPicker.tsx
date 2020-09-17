import * as React from "react";
import chroma from "chroma-js";
import "./GradientPicker.css";

interface GradientPickerProps {
  colors: string[]; // array of css colors
  onColorChange: (color: string) => void;
}

function isMouseEvent(event: Event): event is MouseEvent {
  return event.type.includes("mouse") || event.type === "click";
}

export default function GradientPicker(props: GradientPickerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const gradientFunc = React.useRef(chroma.scale());
  const onColorChangeRef = React.useRef(props.onColorChange);

  React.useEffect(() => {
    return () => {
      unbindEventListners();
    };
  }, []);

  React.useEffect(() => {
    onColorChangeRef.current = props.onColorChange;
    gradientFunc.current = chroma.scale(props.colors);
    containerRef.current?.style.setProperty(
      "--track-background",
      `linear-gradient(to right,  ${props.colors.join(",")})`
    );
  }, [props]);

  const onMouseDown = React.useCallback(() => {
    window.addEventListener("mousemove", handleChange);
    window.addEventListener("mouseup", unbindEventListners);
  }, []);

  const handleChange = React.useCallback((e: MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerBox = container.getBoundingClientRect();
    const x = isMouseEvent(e) ? e.pageX : e.touches[0].pageX;
    const left = x - containerBox.left + window.pageXOffset;
    const percentX = Math.max(0, Math.min(1, left / containerBox.width)) * 100;
    const color = gradientFunc.current(percentX / 100);
    container.style.setProperty("--thumb-left", `${percentX}%`);
    container.style.setProperty("--thumb-color", color);
    onColorChangeRef.current(color);
  }, []);

  const unbindEventListners = React.useCallback(() => {
    window.removeEventListener("mousemove", handleChange);
    window.removeEventListener("mouseup", unbindEventListners);
  }, []);

  return (
    <div className="gradientpicker" ref={containerRef}>
      <div
        className="gradientpicker__track"
        onClick={(e) => handleChange(e.nativeEvent)}
        onMouseDown={onMouseDown}
      />
      <div
        className="gradientpicker__thumb"
        onMouseDown={onMouseDown}
        onTouchMove={(e) => handleChange(e.nativeEvent)}
        onTouchStart={(e) => handleChange(e.nativeEvent)}
      />
    </div>
  );
}
