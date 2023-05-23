class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkPromiseReturn(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
  _request(url, options) {
    return fetch(url, options).then(this._checkPromiseReturn);
  }

  getUserInfo() {
    return this._request(this._baseUrl + "/users/me", {
      headers: this._headers,
    });
  }

  sendUserInfo(data) {
    return this._request(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  updateAvatar(data) {
    return this._request(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  getInitialCards() {
    return this._request(this._baseUrl + "/cards", {
      headers: this._headers,
    });
  }

  sendNewCard(data) {
    return this._request(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.card_name,
        link: data.card_link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(this._baseUrl + `/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  addLike(cardId) {
    return this._request(this._baseUrl + `/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  deleteLike(cardId) {
    return this._request(this._baseUrl + `/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    authorization: "aec3d109-020b-4b05-b39f-ebe00913ccce",
    "Content-Type": "application/json;  character=UTF-8",
  },
});

export default api;
