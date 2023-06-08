import React from 'react';
import '../index.css';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);

  const [deletedCard, setDeletedCard] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isLoad, setLoad] = React.useState(false);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch(console.error);
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleConfirmDeleteClick(card) {
    setIsConfirmPopupOpen(true);
    setDeletedCard(card);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch(console.error);
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch(console.error);
    }
  }

  function handleCardDelete() {
    setLoad(true);
    const card = deletedCard;
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c));
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setLoad(false);
      });
  }
  function handleUpdateUser(data) {
    setLoad(true);
    api
      .sendUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setLoad(false);
      });
  }

  function handleUpdateAvatar(data) {
    setLoad(true);
    api
      .updateAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setLoad(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setLoad(true);
    api
      .sendNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setLoad(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={setSelectedCard}
          onCardLike={handleCardLike}
          onCardDelete={handleConfirmDeleteClick}
          cards={cards}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoad={isLoad}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoad={isLoad}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoad={isLoad}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isLoad={isLoad}
        />

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
