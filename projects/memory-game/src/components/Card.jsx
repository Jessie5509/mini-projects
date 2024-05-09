import React from "react";

export const Card = ({
  onClick,
  fruit,
  index,
  isInactive,
  isFlipped,
  isDisabled,
}) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`card flex items-center justify-center border rounded w-20 h-20 cursor-pointer ${
          isFlipped ? "is-flipped" : ""
        } ${isInactive ? "is-inactive" : ""}`}
      >
        {isFlipped ? (
          <img className="max-w-[70%]" src={`../${fruit.icon}`} />
        ) : (
          <img className="max-w-[70%]" src="/img/grocery-store.svg" />
        )}
      </div>
    </>
  );
};
export default Card;
