import { useLocation } from 'react-router-dom';
import './InputForm.css';

function InputForm(props) {

    const location = useLocation();

    return (
        location.pathname === '/profile' ?

            <label className='profile__label'>
                <h3 className='profile__label-name'>{props.title}</h3>
                <input type={props.type} value={props.value || ''} className="profile__input" placeholder={props.placeholder} name={props.name}
                    id={props.id} minLength={props.minLength} maxLength={props.maxLength} required autoComplete="off" onChange={props.onChange} disabled={!props.isEditProfile} />
            </label>
            :
            <div className="auth__form-section">
                <h3 className='auth__input-title'>{props.title}</h3>
                <input type={props.type} value={props.value || ''} className="auth__input auth__input_type_name" placeholder={props.placeholder} name={props.name}
                    id={props.id} minLength={props.minLength} maxLength={props.maxLength} required autoComplete="off" onChange={props.onChange} />
                <span className="auth__error" id="user-name-error">{props.errors}</span>
            </div>

    );

}
export default InputForm;