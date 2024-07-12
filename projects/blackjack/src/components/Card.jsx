import React from "react";

export const Card = ({ card, crupierTurn }) => {
  return (
    <>
      <main className="w-32 h-48 m-2">
        <img
          src={crupierTurn ? `${"img/1B.svg"}` : `${card.img}`}
          alt={`${card.value} of ${card.suit}`}
        />
      </main>
    </>
  );
};

export default Card;
