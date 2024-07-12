import React, { useEffect, useState } from "react";
import cards from "../data";
import Player from "./Player";
import Modal from "./Modal";
import confetti from "canvas-confetti";

export const Table = () => {
  const [deck, setDeck] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [crupierCards, setCrupierCards] = useState([]);
  const [crupierTurn, setCrupierTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [crupierScore, setCrupierScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);

  useEffect(() => {
    const shuffleCards = [...cards].sort(() => Math.random() - 0.5);
    setDeck(shuffleCards);
    setPlayerCards(shuffleCards.slice(2, 4));
    setCrupierCards(shuffleCards.slice(0, 2));
  }, []);

  useEffect(() => {
    const hitCrupierCard = () => {
      if (
        crupierScore <= 17 &&
        crupierCards.length + playerCards.length < deck.length
      ) {
        setCrupierCards([
          ...crupierCards,
          deck[crupierCards.length + playerCards.length],
        ]);

        const newCard = deck[crupierCards.length + playerCards.length];
        setCrupierScore((prevScore) => prevScore + newCard.value);
      } else {
        setCrupierTurn(true);
      }
    };
    if (!crupierTurn && crupierScore <= 17) {
      const timeoutId = setTimeout(hitCrupierCard, 1000);
      return () => clearTimeout(timeoutId);
    } else if (!crupierTurn && crupierScore > 17) {
      checkWinner();
    }
  }, [
    crupierTurn,
    crupierScore,
    crupierCards.length,
    playerCards.length,
    deck,
  ]);

  const hit = () => {
    if (
      playerCards.length + crupierCards.length < deck.length &&
      crupierTurn === true
    ) {
      setPlayerCards([
        ...playerCards,
        deck[playerCards.length + crupierCards.length],
      ]);
    }
  };
  const stand = () => {
    setCrupierTurn(false);
  };

  const handleScoreChange = (newScore) => {
    setPlayerScore(newScore);
    if (newScore > 21) {
      setGameStatus("¡Busted!");
      setShowModal(true);
    } else if (newScore === 21) {
      setGameStatus("¡BLACKJACK!");
      setShowModal(true);
      confetti();
    }
  };

  const handleCrupierScoreChange = (newScore) => {
    setCrupierScore(newScore);
    if (newScore > 21) {
      setGameStatus("¡You win!");
      setShowModal(true);
      confetti();
    } else if (newScore === 21 && !crupierTurn) {
      setGameStatus("¡Crupier wins with Blackjack!");
      setShowModal(true);
    } else if (newScore > 17 && crupierTurn === false) {
      checkWinner();
    }
  };

  const checkWinner = () => {
    if (crupierScore > 21 || playerScore > crupierScore) {
      setGameStatus("¡You win!");
      confetti();
    } else if (playerScore < crupierScore) {
      setGameStatus("¡Crupier wins!");
    } else {
      setGameStatus("¡It's a draw!");
    }
    setShowModal(true);
  };

  const reset = () => {
    setShowModal(false);
    setCrupierTurn(true);
    setCrupierScore(0);
    setGameStatus("");
    const shuffleCards = [...cards].sort(() => Math.random() - 0.5);
    setDeck(shuffleCards);
    setPlayerCards(shuffleCards.slice(2, 4));
    setCrupierCards(shuffleCards.slice(0, 2));
  };

  return (
    <>
      <main>
        <nav className="flex justify-center">
          <h2 className="w-full text-white text-4xl font-main text-center">
            BlackJack
          </h2>
        </nav>
        <article>
          <Modal show={showModal} gameStatus={gameStatus} reset={reset} />
        </article>
        <article className="relative h-[90dvh]">
          <Player
            playerCards={playerCards}
            crupierCards={crupierCards}
            crupierTurn={crupierTurn}
            deck={deck}
            onScoreChange={handleScoreChange}
            onCrupierScoreChange={handleCrupierScoreChange}
          />
        </article>

        <footer className="flex justify-center">
          <button className="mr-5" onClick={hit}>
            Hit
          </button>
          <button onClick={stand}>Stand</button>
        </footer>
      </main>
    </>
  );
};

export default Table;
