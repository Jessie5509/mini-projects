import React, { useState } from "react";
import fruits from "../db";

export const Card = () => {
  const [turn, setTurn] = useState(false)

  return (
    <>
      <section className="flex flex-wrap w-64 h-64 content-between justify-between">
        {fruits.map((f) => {
          return (
            <div
              className="flex items-center justify-center border rounded w-20 h-20 cursor-pointer"
              key={f.id}
            >
              <img className="max-w-[70%]" src={`${f.icon}`}></img>
            </div>
          );
        })}
      </section>
    </>
  );
};
export default Card;
