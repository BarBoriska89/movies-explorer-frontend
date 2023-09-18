import './FilterCheckbox.css';
import checkboxOnPath from '../../../images/smalltumb.svg';
import checkboxOffPath from '../../../images/smalltumboff.svg';


function FilterCheckbox(props) {

    console.log(props);
    console.log(props.isCheckedBox);
    return (
        <div className='filter-checkbox'>
            <div className='filter-checkbox__container'>
                <img src={(props.isCheckedBox === true ? checkboxOnPath : checkboxOffPath)} alt="Искать короткометражки" className='filter-checkbox__pic' onClick={props.onClick} />
                <span className='filter-checkbox__text'>Короткометражки</span>
            </div>
        </div>
    );
};

export default FilterCheckbox;