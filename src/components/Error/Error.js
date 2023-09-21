import  './Error.css';

function Error({errorMessage}) {

    return (
        <section className="error" aria-label="Ошибка">
            <span className="error__text">{errorMessage}</span>
        </section>
    )
};

export default Error;