import { useLocation } from 'react-router-dom';
import './InputForm.css';

function InputForm(props) {

    const location = useLocation();

    return (
        location.pathname === '/profile' ?
            <div className='profile__input-container'>
                <label className='profile__label'>{props.title}</label>
                <input type={props.type} value={props.value || ''} className="profile__input" placeholder={props.placeholder} name={props.name}
                    id={props.id} minLength={props.minLength} maxLength={props.maxLength} required autoComplete="off" onChange={props.onChange} disabled={!props.isEditProfile} />

            </div>
            :
            <div className="auth__form-section">
                <label className='auth__input-title'>{props.title}</label>
                <input type={props.type} value={props.value || ''} className="auth__input auth__input_type_name" placeholder={props.placeholder} name={props.name}
                    id={props.id} minLength={props.minLength} maxLength={props.maxLength} required autoComplete="off" onChange={props.onChange} />
                <span className="auth__error" id={`user-${props.id}-error`}>{props.errors}</span>
            </div>

    );

}
export default InputForm;