import React from 'react';
import './Portfolio.css';

function Portfolio() {

    return (
        <section className='portfolio' aria-label='Портфолио'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <ul className='portfolio__list'>
                <li className='portfolio__list-item'>
                    <a href='https://github.com/BarBoriska89/how-to-learn' className='link portfolio__link' target='_blank' rel="noreferrer">
                        <p className='portfolio__link-text'>Статичный сайт</p>
                        <span className='portfolio__arrow'>↗</span>
                    </a>
                </li>
                <li className='portfolio__list-item'>
                    <a href='https://github.com/BarBoriska89/russian-travel' className='link portfolio__link' target='_blank' rel="noreferrer">
                        <p className='portfolio__link-text'>Адаптивный сайт</p>
                        <span className='portfolio__arrow'>↗</span>
                    </a>
                </li>
                <li className='portfolio__list-item'>
                    <a href='https://github.com/BarBoriska89/react-mesto-api-full-gha' className='link portfolio__link' target='_blank' rel="noreferrer">
                        <p className='portfolio__link-text'>Одностраничное приложение</p>
                        <span className='portfolio__arrow'>↗</span>
                    </a>
                </li>
            </ul>
        </section>
    );
};

export default Portfolio;