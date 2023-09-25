import React from 'react';
import './AboutProject.css';

function AboutProject() {
    return (
        <section id='project' className='project' aria-label='О проекте'>
            <div className='project__title-container'>
                <h2 className='project__title'>О проекте</h2>
            </div>
            <div className='project__description'>
                <ul className='project__description-list'>
                    <li className='project__list-title'>Дипломный проект включал 5 этапов</li>
                    <li className='project__list-description'>
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </li>
                </ul>

                <ul className='project__description-list'>
                    <li className='project__list-title'>На выполнение диплома ушло 5 недель</li>
                    <li className='project__list-description'>
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </li>
                </ul>
            </div>

            <div className='project__stages'>
                <ul className='project__stage'>
                    <li className='project__stage-time project__stage-time_green'>1 неделя</li>
                    <li className='project__stage-name'>Back-end</li>
                </ul>
                <ul className='project__stage'>
                    <li className='project__stage-time project__stage-time_grey'>4 недели</li>
                    <li className='project__stage-name'>Front-end</li>
                </ul>
            </div>
        </section>
    );
};

export default AboutProject;