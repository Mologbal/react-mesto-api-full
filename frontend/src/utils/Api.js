export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    //шаблон, чтоб не писать много кода 
    _serverAnswer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Допущена ошибка: ${res.status}`)
    }

    //получаем изначальные карточки из сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        }).then(
            res => this._serverAnswer(res)
        )
    }

    //получаем карточку созданную через функцию попапа
    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem("token")}`
        },
            body: JSON.stringify({name: data.name, link: data.link})
        }).then(res => this._serverAnswer(res))
    }

    //удаляем карточку
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        }).then(res => this._serverAnswer(res))
    }

    //лайкнуть
    setLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        }).then(res => this._serverAnswer(res))
    }

    //убрать лайк
    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        }).then(res => this._serverAnswer(res))
    }

    //инфа о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},}).then(
            res => this._serverAnswer(res)
        )
    }

    //инфа о пользователе через функцию редактирования попапа профиля
    editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem("token")}`
        },
            body: JSON.stringify({name: data.name, about: data.about})
        }).then(res => this._serverAnswer(res))
    }

    //инфа о аватаре пользователя через попап аватара
    editAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {...this._headers, Authorization: `Bearer ${localStorage.getItem("token")}`
        },
            body: JSON.stringify({avatar: data.avatar})
        }).then(res => this._serverAnswer(res))
    }
}

export const apiConfig = new Api({
    baseUrl: 'http://localhost:3002',
    headers: {
        Accept: "application/json",
        'Content-Type': 'application/json'
    }
});