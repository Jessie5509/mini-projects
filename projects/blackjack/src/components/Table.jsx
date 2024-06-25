import { React, useEffect, useState } from "react";
import Card from "./Card";
import cards from "../data";
import { Player } from "./Player";

export const Table = () => {
  const [deck, setDeck] = useState(cards);
  const [playerDeck, setPlayerDeck] = useState([]);

  useEffect(() => {
    const shuffleCards = [...cards].sort(() => Math.random() - 0.5);
    setDeck(shuffleCards);
    setPlayerDeck(shuffleCards.slice(0, 4));
  }, []);

  return (
    <>
      <nav className="flex justify-center">
        <h2 className="w-full text-white text-4xl font-main text-center">
          BlackJack
        </h2>
      </nav>
      <article className="h-[90dvh]">
        {playerDeck.length >= 4 ? <Player cards={playerDeck} /> : null}
      </article>

      {/* //Push a playerDeck? */}
      <footer className="flex justify-center">
        <button>Hit</button>
        <button>Stand</button>
      </footer>
    </>
  );
};

export default Table;
