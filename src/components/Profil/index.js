import React, { useRef } from 'react';
import "../FormElem/formElem.css";
import "../Home/posts.css";
import "./profil.css";

const Profil = () => {

    const avatar = useRef();
    const validPassword = useRef();
    const password = useRef();

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className='App'>
            <div className="form_1">
                <h2>Ajouter une image à votre profil</h2>
                <form noValidate onSubmit={handleSubmit}>
                    <div className='disp_flex_column'>
                        <label htmlFor='profil_avatar'>Avatar</label>
                        <input className=''
                            ref={avatar}
                            id='profil_avatar'
                            type="file"
                            name='avatar'
                            placeholder="avatar"
                            aria-describedby="inputGroupPrepend"
                            required
                        />
                    </div>

                    <button
                        className='btn-primary'
                        type="submit">Ajouter ou changer l'image</button>
                </form>
            </div >
        </div>
    )
}

export default Profil;
