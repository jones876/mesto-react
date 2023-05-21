import React from "react";
function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_image ${
        props.card.link ? "popup_opened" : ""
      }`}
    >
      <div className="popup__full-image">
        <img
          className="popup__img"
          src={props.card ? props.card.link : ""}
          alt={props.card.name}
        />
        <h3 className="popup__img-title">{props.card.name}</h3>
        <button
          className="popup__close-btn popup__close-img"
          type="button"
          aria-label="ClosePopup"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}
export default ImagePopup;
