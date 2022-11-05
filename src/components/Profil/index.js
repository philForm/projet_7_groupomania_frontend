import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "../FormElem/formElem.css";
import "../Home/posts.css";
import "./profil.css";
import { tokenService } from '../../services/service';

const Profil = () => {

    const [data, setData] = useState([])

    const avatar = useRef();

    const userId = tokenService.idCompare();

    const handleSubmit = async (e) => {
        e.preventDefault()

        let formData = new FormData();
        formData.append('image', avatar.current.files[0]);

        // Envoie l'image dans la BDD :
        await axios.put(`${process.env.REACT_APP_URL_API}api/auth/signup/${userId}`,
            formData
            ,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        )
            .then((res) => {
                if (res.status === 200) {
                    console.log(res)
                    return res
                }
            })
            .catch(err => console.error(err));


        // console.log('======result');
        // console.log(result.data.user_picture);

    };

    const fetchData = async () => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_URL_API}api/auth/${userId}`);

            setData(result.data);
        }
        catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(data);



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
