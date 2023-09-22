import { useEffect, useState } from 'react';
import './Profile.css';
import useFormAndValidation from '../../../hooks/useFormAndValidation';
import InputForm from '../../InputForm/InputForm';
import { useCurrentUser } from '../../../contexts/CurrentUserContext';

function Profile({ currentUser, onUpdate , onSignOut}) {

    //const { currentUser, handleUpdateProfile, } = useCurrentUser();
    const { values, handleChange, errors, isValid, setValues } = useFormAndValidation({});

    console.log(currentUser);

    const [isEditProfile, setIsEditProfile] = useState(false);
    const [isSuccessEdit, setIsSuccessEdit] = useState(true);


    const handleEditProfile = (evt) => {
        evt.preventDefault();
        setIsEditProfile(true);
    }

    const handleSaveChanges = (evt) => {
        evt.preventDefault();

        if (isValid === true) {
            setIsSuccessEdit(false);
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
        })
    }, [])


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
                                <span className='profile__error'>{errors.user || errors.email}</span>
                                <button type='submit' className='button profile__submit' disabled={!isSuccessEdit} >Сохранить</button>
                            </>
                            :
                            <>
                                <button type='button' className='link profile__button' onClick={handleEditProfile}>Редактировать</button>
                                <button type='button' className='link profile__button profile__button-exit'onClick={onSignOut}>Выйти из аккаунта</button>
                            </>
                        }
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Profile;