import { BASE_URL } from './constants';

const optionsMainApi = {
    baseUrl: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
};

class MainApi {
    constructor(optionsMainApi) {
        this._mainbaseUrl = optionsMainApi.baseUrl;
        this._mainheaders = optionsMainApi.headers;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }
    
    register(name, email, password) {
        return fetch(`${this._mainbaseUrl}/signup`, {
            method: 'POST',
            headers: this._mainheaders,
            body: JSON.stringify({ name, email, password }),
        })
            .then((res) => this._checkResponse(res));
    }

    
    _getToken() {
        const jwt = localStorage.getItem('jwt');
        return {
            Authorization: `Bearer ${jwt}`,
            ...this._headers,
        };
    }


    authorize(email, password) {
        return fetch(`${BASE_URL}/signin`, {
            method: 'POST',
            headers: this._mainheaders,
            body: JSON.stringify({ email, password }),
        })
            .then((res) => this._checkResponse(res));
    }



/*
register(name, email, password) {
return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({ name, email, password }),
})
    .then((res) => this._checkResponse(res));
}
/*
register(name, email, password) {
 console.log('Sending request');
 return fetch(`${this._baseUrl}/signup`, {
     method: 'POST',
     headers: this._headers,
     body: JSON.stringify({ name, email, password }),
 })
//     .then(this._checkResponse)
     .then(responseData => {
         console.log('Registration successful:', responseData);
        // return responseData; // You can return the response data if needed
     })
     .catch(error => {
         console.error('Registration failed:', error);
         throw error; // Rethrow the error to handle it further up the call stack if needed.
     });
}
*/
getUser() {
    return this._request('users/me', {
        headers: this._getToken(),
    })
        .then((res) => this._checkResponse(res));
}

updateUser(name, email) {
    return this._request('users/me', {
        method: 'PATCH',
        headers: this._getToken(),
        body: JSON.stringify({
            name,
            email,
        }),
    })
        .then((res) => this._checkResponse(res));
}








addMovie({
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
}) {
    return fetch(`${this._baseUrl}/movies`, {

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
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
        method: 'DELETE',
        headers: this._getToken(),
    })
        .then((res) => this._checkResponse(res));
}


getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
        headers: this._getToken(),
    });
}


}

const mainApi = new MainApi(optionsMainApi);

export default mainApi;