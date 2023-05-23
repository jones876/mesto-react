import React from "react";
function PopupWithForm({ name, title, isOpen, onClose, textSubmit, children }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <form className="form" name={name}>
          <h3 className="form__header">{title}</h3>
          {children}
          <button className="form__btn" type="submit" aria-label="SaveChanges">
            {textSubmit}
          </button>
        </form>
        <button
          className="popup__close-btn"
          type="button"
          aria-label="ClosePopup"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
export default PopupWithForm;
