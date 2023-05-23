import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserAvatar(data.avatar);
        setUserDescription(data.about);
      })
      .catch(console.error);
  }, []);
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((item) => {
        setCards(item);
      })
      .catch(console.error);
  }, []);

  return (
    <main>
      <section className="profile">
        <button
          className="profile__edit-avatar-btn"
          type="button"
          aria-label="EditAvatar"
          onClick={onEditAvatar}
        />
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${userAvatar})` }}
        ></div>
        <div className="profile__info-container">
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button
              className="profile__edit-btn"
              type="button"
              aria-label="EditProfile"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button
          className="profile__add-btn"
          type="button"
          aria-label="AddCard"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              name={card.name}
              link={card.link}
              likes={card.likes.length}
              onCardClick={onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
