import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoad }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textSubmit='Сохранить'
      textLoad='Сохранение...'
      isLoad={isLoad}
    >
      <fieldset className='form__fieldset'>
        <input
          type='text'
          className='form__input form__input_type_name'
          name='name'
          value={name || ''}
          id='username'
          placeholder='Имя'
          minLength={2}
          maxLength={40}
          required
          onChange={handleChangeName}
        />
        <span className='form__input-error username-error' />
      </fieldset>
      <fieldset className='form__fieldset'>
        <input
          type='text'
          className='form__input form__input_type_info'
          name='about'
          value={description || ''}
          id='userabout'
          placeholder='О себе'
          required
          minLength={2}
          maxLength={200}
          onChange={handleChangeDescription}
        />
        <span className='form__input-error userabout-error' />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
