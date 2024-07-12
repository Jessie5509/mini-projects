import React, { useEffect, useState } from "react";
import Card from "./Card";

export const Player = ({
  playerCards,
  crupierCards,
  crupierTurn,
  onScoreChange,
  onCrupierScoreChange,
}) => {
  const [playerScore, setPlayerScore] = useState(0);
  const [crupierScore, setCrupierScore] = useState(0);

  useEffect(() => {
    const sumScores = () => {
      const playerSum = playerCards.reduce((acc, obj) => acc + obj.value, 0);
      const crupierSum = crupierCards.reduce((acc, obj) => acc + obj.value, 0);
      setPlayerScore(playerSum);
      setCrupierScore(crupierSum);
      if (onScoreChange) {
        onScoreChange(playerSum);
      }
      if (onCrupierScoreChange) {
        onCrupierScoreChange(crupierSum);
      }
    };
    sumScores();
  }, [playerCards, crupierCards, onScoreChange, onCrupierScoreChange]);

  return (
    <>
      <section className="flex flex-col items-center justify-around h-full">
        <article className="flex justify-center relative">
          {!crupierTurn ? (
            <p className="absolute left-[-50px] text-lg text-white text-center bg-black font-main rounded-full w-10 h-10 m-2 p-1">
              {crupierScore}
            </p>
          ) : null}

          <h4 className="flex absolute top-[-35px]">Crupier</h4>
          {crupierCards.map((c, index) => (
            <Card
              key={index}
              card={c}
              crupierTurn={index === 1 && crupierTurn}
            />
          ))}
        </article>

        <article className="flex justify-center relative">
          <p className="absolute left-[-50px] text-lg text-white text-center bg-black font-main rounded-full w-10 h-10 m-2 p-1">
            {playerScore}
          </p>
          <h4 className="flex absolute top-[-35px]">Me</h4>
          {playerCards.map((c, index) => (
            <Card key={index} card={c} />
          ))}
        </article>
      </section>
    </>
  );
};

export default Player;
