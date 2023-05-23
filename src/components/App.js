import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }
  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={setSelectedCard}
      />
      <Footer />
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        textSubmit="Сохранить"
      >
        <fieldset className="form__fieldset">
          <input
            type="text"
            className="form__input form__input_type_name"
            name="name"
            id="username"
            placeholder="Имя"
            minLength={2}
            maxLength={40}
            required
          />
          <span className="form__input-error username-error" />
        </fieldset>
        <fieldset className="form__fieldset">
          <input
            type="text"
            className="form__input form__input_type_info"
            name="about"
            id="userabout"
            placeholder="О себе"
            required
            minLength={2}
            maxLength={200}
          />
          <span className="form__input-error userabout-error" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="add-card"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        textSubmit="Сохранить"
      >
        <fieldset className="form__fieldset">
          <input
            type="text"
            className="form__input form__input_type_name"
            name="card_name"
            id="cardname"
            placeholder="Название"
            minLength={2}
            maxLength={40}
            required
          />
          <span className="form__input-error username-error" />
        </fieldset>
        <fieldset className="form__fieldset">
          <input
            type="url"
            className="form__input form__input_type_info"
            name="card_link"
            id="cardlink"
            placeholder="Ссылка на картинку"
            required
            minLength={2}
            maxLength={200}
          />
          <span className="form__input-error userabout-error" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm name="confirm-delete" title="Вы уверены?" />
      <PopupWithForm
        name="update-avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        textSubmit="Сохранить"
      >
        <fieldset className="form__fieldset">
          <input
            type="url"
            className="form__input form__input_type_link"
            name="avatar"
            id="avatarlink"
            placeholder="Ссылка на аватар"
            required
          />
          <span className="form__input-error avatarlink-error" />
        </fieldset>
      </PopupWithForm>

      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
    </div>
  );
}

export default App;
