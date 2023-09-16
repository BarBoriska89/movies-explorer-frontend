import './More.css';

function More({ location, onClick, visibleMovies , movies}) {
    console.log(location);
    return (
        <section className='more-movies' aria-label='Еще'>
            {location === '/movies' && visibleMovies <= movies.length ?
               
                    <button className='more-movies__container more-movies__button' type='button' aria-label='Еще' onClick={onClick}>Ещё</button>
               
                :
                ''
            }

        </section>
    );
};

export default More;