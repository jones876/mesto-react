
import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo().then((data) => {
      setUserName(data.name);
      setUserAvatar(data.avatar);
      setUserDescription(data.about);
    });
  });
  React.useEffect(() => {
    api.getInitialCards().then((item) => {
      setCards(item);
    });
  }, []);

  return (
    <main>
      <section className="profile">
        <button
          className="profile__edit-avatar-btn"
          type="button"
          aria-label="EditAvatar"
          onClick={props.onEditAvatar}
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
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button
          className="profile__add-btn"
          type="button"
          aria-label="AddCard"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              card={card}
              id={card._id}
              name={card.name}
              link={card.link}
              likes={card.likes.length}
              onCardClick={props.onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
