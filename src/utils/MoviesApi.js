import {URL_BFM} from './constants';

const optionsApi = {
    baseUrl: URL_BFM,
    headers: {
        'Content-Type': 'application/json',
    },
};

class MoviesApi {
    constructor(optionsApi) {
        this._baseUrl = optionsApi.baseUrl;
        this._headers = optionsApi.headers;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }

    getMovies(){
        return  fetch(`${this._baseUrl}/beatfilm-movies`, {
            headers: this.headers,
        })
            .then((res) => this._checkResponse(res));
    }
    }

    const moviesApi = new MoviesApi(optionsApi);

    export default moviesApi;