import { React, useEffect, useState } from "react";
import Card from "./Card";

export const Player = ({ cards }) => {
  const [flip, setFlip] = useState(true);

  useEffect(() => {}, []);

  return (
    <>
      <section className="flex flex-col items-center justify-around h-full">
        <article className="flex justify-center relative">
          <h4 className="flex absolute top-[-35px]">Crupier</h4>
          {cards.slice(0, 2).map((c, index) => (
            <Card key={index} card={c} flip={index === 1 && flip} />
          ))}
        </article>

        <article className="flex justify-center relative">
          <h4 className="flex absolute top-[-35px]">Me</h4>
          {cards.slice(2, 4).map((c, index) => (
            <Card key={index} card={c} />
          ))}
        </article>
      </section>
    </>
  );
};
