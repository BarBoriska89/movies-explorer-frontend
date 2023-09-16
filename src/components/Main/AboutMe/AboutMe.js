import './AboutMe.css';

function AboutMe() {

    return (
        <section className='student' id='student' aria-label='О студенте'>
            <div className='student__title-container'>
                <h2 className='student__title'>Студент</h2>
            </div>
            <div className='student__about'>
                <div className='student__info'>
                    <div className='student__info-wrapper'>
                        <h3 className='student__subtitle'>Виталий</h3>
                        <p className='student__short-description'>
                            Фронтенд-разработчик, 30 лет
                        </p>
                        <p className='student__description'>
                            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                        </p>
                    </div>
                    <a href='https://github.com/BarBoriska89' className='student__link' target='_blank' rel="noreferrer">Github</a>
                </div>
                <div className='student_photo'></div>
            </div>
        </section>

    );
};

export default AboutMe;
