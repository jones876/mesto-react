import React from "react";
function Card({card, name, link, likes, onCardClick}) {
  function handleCardClick() {
    onCardClick(card);
  }
  return (
     
      <li className="elements__item">
        <img
          src={link}
          alt={name}
          className="elements__image"
          onClick={handleCardClick}
        />
        <div className="elements__description">
          <h2 className="elements__title">{name}</h2>
          <div className="elements__like-container">
            <button className="elements__like-btn" type="button"></button>
            <p className="elements__like-counter">{likes}</p>
          </div>
        </div>
        <button className="elements__del-btn" type="button"></button>
      </li>
     
  );
}
export default Card;
