import { useState } from "react";
import "./css.css";
function Tablero() {
  const [vista, setCells] = useState(Array(9).fill(null));
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Tablero 3x3</h1>
      <div className="tablero">
        {vista.map((cell, index) => (
          <div key={index} className="celda">
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Tablero;