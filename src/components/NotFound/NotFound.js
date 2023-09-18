import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';


function NotFound() {
    const navigate = useNavigate();

    console.log(navigate);
    const handleReturnBack = () => {
        navigate(-1);
    };

    return (
        <main className='not-found'>
            <div className='not-found__container'>
                <h1 className='not-found__title'>404</h1>
                <h2 className='not-found__subtitle'>Страница не найдена</h2>
            </div>
            <button className='not-found__link' type='button' onClick={handleReturnBack}>Назад</button>
        </main>
    );
};

export default NotFound;