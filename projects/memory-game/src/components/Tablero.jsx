import React from "react";
import Card from "../components/Card";

export const Tablero = () => {

  return (
    <main className="font-main">
      <h2 className="flex justify-center mb-4">Memory Game</h2>
      <div className="flex justify-center font-main">
        <Card />
      </div>
    </main>
  );
};

export default Tablero;
