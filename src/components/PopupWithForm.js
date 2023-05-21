import React from "react";
function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <form
          className="form"
          name="edit-form"
          method="GET"
          action="#"
          noValidate
        >
          <h3 className="form__header">{props.title}</h3>
          {props.children}
          <button className="form__btn" type="submit" aria-label="SaveChanges">
            Сохранить
          </button>
        </form>
        <button
          className="popup__close-btn"
          type="button"
          aria-label="ClosePopup"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}
export default PopupWithForm;
