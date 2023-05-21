import React from "react";
function Card(props) {
  function handleCardClick() {
    props.onCardClick(props.card);
  }
  return (
    <div key={props.id}>
      <li className="elements__item">
        <img
          src={props.link}
          alt={props.name}
          className="elements__image"
          onClick={handleCardClick}
        />
        <div className="elements__description">
          <h2 className="elements__title">{props.name}</h2>
          <div className="elements__like-container">
            <button className="elements__like-btn" type="button"></button>
            <p className="elements__like-counter">{props.likes}</p>
          </div>
        </div>
        <button className="elements__del-btn" type="button"></button>
      </li>
    </div>
  );
}
export default Card;
