import React from 'react';
import './FilterCheckbox.css';
import checkboxOnPath from '../../images/smalltumb.svg';
import checkboxOffPath from '../../images/smalltumboff.svg';


function FilterCheckbox(props) {

    return (
        <div className='filter-checkbox'>
            <div className='filter-checkbox__container'>
                <img src={(props.isShortMovie === true ? checkboxOnPath : checkboxOffPath)} alt="Искать короткометражки" className='button filter-checkbox__pic'
                    onClick={props.onClick} />
                <label className='filter-checkbox__text'>Короткометражки</label>
            </div>
        </div>
    );
};

export default FilterCheckbox;