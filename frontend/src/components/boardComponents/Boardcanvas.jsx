import React, { useEffect, useRef, useState } from "react";

function Boardcanvas() {
  const canvasRef = useRef();

  const currentStroke = useRef(null);
  const strokes = useRef([]);
  const redostack = useRef([]);

  const [isDrawing, setisDrawing] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  const startDrawing = (e) => {
    if (e.button !== 0) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    currentStroke.current = {
      points: [{ x, y }],
    };

    setisDrawing(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    strokes.current.push(currentStroke.current);

    redostack.current = [];

    currentStroke.current = null;
    setisDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    currentStroke.current.points.push({ x, y });

    const pts = currentStroke.current.points;
    const len = pts.length;
    if (len < 2) return;

    const p1 = pts[len - 2];
    const p2 = pts[len - 1];

    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    strokes.current.forEach((strokeEle) => {
      const pts = strokeEle.points;
      if (pts.length < 2) return;

      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.strokeStyle = "black";

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);

      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }

      ctx.stroke();
    });
  };

  useEffect(() => {
    const handleKey = (e) => {
      // Undo
      if (e.ctrlKey && (e.key === "z" || e.key === "Z")) {
        const last = strokes.current.pop();
        if (last) redostack.current.push(last);
        redrawCanvas();
      }

      // Redo
      if (e.ctrlKey && (e.key === "y" || e.key === "Y")) {
        const redoStroke = redostack.current.pop();
        if (redoStroke) strokes.current.push(redoStroke);
        redrawCanvas();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <canvas
      className="block w-full h-full"
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      onMouseMove={draw}
      onMouseLeave={stopDrawing}
    ></canvas>
  );
}

export default Boardcanvas;
