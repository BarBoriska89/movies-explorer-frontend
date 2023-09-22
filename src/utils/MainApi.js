import { BASE_URL } from './constants';

const optionsMainApi = {
    baseUrl: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
};

class MainApi {
    constructor(optionsMainApi) {
        this._mainBaseUrl = optionsMainApi.baseUrl;
        this._mainHeaders = optionsMainApi.headers;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }

    register(name, email, password) {
        return fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: this._mainHeaders,
            body: JSON.stringify({ name, email, password }),
        })
            .then((res) => this._checkResponse(res));
    }


    _getToken() {
        const jwt = localStorage.getItem('jwt');
        console.log(jwt);
        return {
            Authorization: `Bearer ${jwt}`,
            ...this._mainHeaders,
        };
    }


    authorize(email, password) {
        return fetch(`${BASE_URL}/signin`, {
            method: 'POST',
            headers: this._mainHeaders,
            body: JSON.stringify({ email, password }),
        })
            .then((res) => this._checkResponse(res));
    }


    getUser() {
        return fetch(`${BASE_URL}/users/me`, {
            headers: this._getToken(),
        })
            .then((res) => this._checkResponse(res));
    }

    updateUser(name, email) {
        return fetch(`${BASE_URL}/users/me`, {
            method: 'PATCH',
            headers: this._getToken(),
            body: JSON.stringify({
                name,
                email,
            }),
        })
            .then((res) => this._checkResponse(res));
    }


    addMovie(
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        id,
        nameRU,
        nameEN,
    ) {
        return fetch(`${BASE_URL}/movies`, {

            method: 'POST',
            headers: this._getToken(),
            body: JSON.stringify({
                country,
                director,
                duration,
                year,
                description,
                image: `https://api.nomoreparties.co${image.url}`,
                trailerLink,
                thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
                movieId: id,
                nameRU,
                nameEN,
            }),
        })
            .then((res) => this._checkResponse(res));
    }

    deleteMovie(movieId) {
        return fetch(`${BASE_URL}/movies/${movieId}`, {
            method: 'DELETE',
            headers: this._getToken(),
        })
            .then((res) => this._checkResponse(res));
    }


    getSavedMovies() {
        return fetch(`${BASE_URL}/movies`, {
            headers: this._getToken(),
        })
        .then((res) => this._checkResponse(res));
    }


}

const mainApi = new MainApi(optionsMainApi);

export default mainApi;