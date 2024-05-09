import { React } from "react";

export const Modal = ({ show, updateBoard }) => {
  const handleClick = () => {
    updateBoard();
  };

  return (
    <>
      {show && (
        <dialog
          open={show}
          className="flex flex-col justify-center rounded-lg items-center w-80 h-80 top-1/3 font-main"
        >
          <h2 className="mb-9">You complete it!!</h2>
          <button onClick={handleClick}>Reset game</button>
        </dialog>
      )}
    </>
  );
};

export default Modal;
