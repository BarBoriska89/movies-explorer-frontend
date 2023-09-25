import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import './Profile.css';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import InputForm from '../InputForm/InputForm';
import { RegExp_email } from '../../utils/constants';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile({ onUpdate, onSignOut, requestError, resetRequestError }) {

    const { values, handleChange, errors, isValid, setValues, setIsValid } = useFormAndValidation({});
    const [isEditProfile, setIsEditProfile] = useState(false);
    const currentUser = useContext(CurrentUserContext);

    const handleEditProfile = (evt) => {
        evt.preventDefault();
        setIsEditProfile(true);
    }

    const handleSaveChanges = (evt) => {
        evt.preventDefault();

        if (isValid === true) {
            onUpdate({
                name: values.user,
                email: values.email
            })
        }
    }

    useEffect(() => {
        setValues({
            user: currentUser.name,
            email: currentUser.email
        });
        resetRequestError();
    },
        [])

    useEffect(() => {
        if (values.user === currentUser.name && values.email === currentUser.email) {
            setIsValid(false);
        }
    }, [values]);

    return (
        <main className='main'>
            <section className='profile' aria-label='Профиль пользователя'>
                <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
                <form className='profile__form' onSubmit={handleSaveChanges}>

                    <InputForm
                        name="user"
                        id="user"
                        title="Имя"
                        type="text"
                        placeholder={currentUser.name}
                        minLength="2"
                        maxLength="30"
                        onChange={handleChange}
                        value={values.user}
                        errors={errors.user}
                        isValid={isValid}
                        isEditProfile={isEditProfile}
                    />

                    <InputForm
                        name="email"
                        id="email"
                        title="E-mail"
                        type="email"
                        pattern={RegExp_email}
                        placeholder={currentUser.email}
                        minLength="8"
                        maxLength="30"
                        onChange={handleChange}
                        value={values.email}
                        errors={errors.email}
                        isValid={isValid}
                        isEditProfile={isEditProfile}
                    />

                    <div className='profile__buttons-container'>
                        {isEditProfile ?
                            <>
                                <span className='profile__error-submit'>{requestError}</span>
                                <button type='submit' className='button profile__submit' disabled={!isValid} >Сохранить</button>
                            </>
                            :
                            <>
                                <button type='button' className='link profile__button' onClick={handleEditProfile}>Редактировать</button>
                                <button type='button' className='link profile__button profile__button-exit' onClick={onSignOut}>Выйти из аккаунта</button>
                            </>
                        }
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Profile;