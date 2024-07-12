import { React } from "react";

export const Modal = ({ show, gameStatus, reset }) => {
  const handleReset = () => {
    reset();
  };

  return (
    <>
      {show && (
        <dialog
          open={show}
          className="z-10 flex flex-col justify-center rounded-lg items-center w-80 h-80 top-1/3 font-main"
        >
          <h2 className="mb-9">{gameStatus}</h2>
          <button onClick={handleReset}>Reset game</button>
        </dialog>
      )}
    </>
  );
};

export default Modal;
