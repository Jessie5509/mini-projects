import { React, useEffect, useState, useRef } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import fruits from "../db";
import confetti from "canvas-confetti";

export const Tablero = () => {
  const [tablero, setTablero] = useState(fruits);
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [intento, setIntento] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const timeout = useRef(null);
  
  //Shuffle fruits
  useEffect(() => {
    const shuffledFruits = [...fruits].sort(() => Math.random() - 0.5);
    setTablero(shuffledFruits);
  }, []);
  
  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);
  
  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === 6) {
      setShowModal(true);
      confetti();
    }
  };

  // Check if both the fruits have same name. If they do, mark them inactive
  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (tablero[first].name === tablero[second].name) {
      setClearedCards((prev) => ({ ...prev, [tablero[first].name]: true }));
      setOpenCards([]);
      return;
    }
    // Flip cards after a 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const toggleCard = (index) => {
    // Have a maximum of 2 items in array at once.
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      // increase the moves once we opened a pair
      setIntento((intento) => intento + 1);
      disable();
    } else {
      // If two cards are already open, we cancel timeout set for flipping cards back
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };


  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (tablero) => {
    return Boolean(clearedCards[tablero.name]);
  };

  const updateBoard = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setIntento(0);
    setShouldDisableAllCards(false);
    const shuffledFruits = [...fruits].sort(() => Math.random() - 0.5);
    setTablero(shuffledFruits);
  };

  return (
    <>
      <main className="font-main relative">
        <h1 className="flex justify-center mb-16 text-3xl text-[#4d85ff]">
          Memory Fruit Game
        </h1>
        <section className="flex justify-center">
          <article className="flex flex-wrap w-[22rem] h-64 content-between justify-between">
            {tablero.map((f, index) => {
              return (
                <Card
                  key={f.id}
                  index={index}
                  fruit={f}
                  isDisabled={shouldDisableAllCards}
                  isInactive={checkIsInactive(f)}
                  isFlipped={checkIsFlipped(index)}
                  onClick={toggleCard}
                />
              );
            })}
          </article>
        </section>
      </main>
      <article>
        <Modal show={showModal} updateBoard={updateBoard} />
      </article>
      <footer className="flex justify-center">
        <span className="font-main text-xl mt-16">Movements: {intento}</span>
      </footer>
    </>
  );
};

export default Tablero;
