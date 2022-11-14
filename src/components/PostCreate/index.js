import React, { useState, useRef } from 'react';
import axios from 'axios';
import { tokenService } from '../../services/service';

/**
 * Création de Posts
 */
const PostCreate = (props) => {

    const [image, setImage] = useState({
        file: [],
        filepreview: null,
    });

    const post = useRef();
    const picture = useRef();
    const form = useRef();

    // Récupération de token d'authentification du localStorage :
    const token = tokenService.recupToken();
    console.log(token);

    // Récupération de l'id du l'utilisateur du localStorage :
    const userId = tokenService.idCompare();

    /**
     * Prévisualisation de l'image :
     */
    const handleChangeImage = e => {
        setImage({
            ...image,
            file: e.target.files[0],
            filepreview: URL.createObjectURL(e.target.files[0]),
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        // Supprimer la prévisualisation :
        setImage({
            ...image,
            file: picture.current.files[0],
            filepreview: null,
        });

        let data = new FormData();

        data.append('image', picture.current.files[0]);
        data.append('post', post.current.value);
        data.append('userId', userId)

        for (let item of data)
            console.log(item);

        await axios.post(`${process.env.REACT_APP_URL_API}api/post`, data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            }
        )
            .then((res) => {
                if (res.status === 200) {
                    console.log(res)
                    return res
                }
            })
            .catch(err => console.error(err));


        props.fetchData();

        // document.getElementById('picture').value = "";
        // document.getElementById('post-create').value = "";

        // Vide les champs du formulaire :
        document.forms["post-create_form"].reset();


    };


    return (
        <div className='posts__container'>
            <form onSubmit={handleSubmit} ref={form} name="post-create_form">
                <div className='posts__form'>
                    <label htmlFor="post-create">Message</label><br />
                    <textarea type="textarea" id='post-create' name='post' ref={post} /><br />
                </div>
                <div className='posts__form'>
                    <label htmlFor="picture">Image</label><br />
                    <input
                        type="file"
                        id='picture'
                        name='picture'
                        accept='image/jpg, image/jpeg, image/png image/gif'
                        // onChange={(e) => setImage(e.target.files[0], e.target.files[0].name)}
                        onChange={(e) => handleChangeImage(e)}
                        ref={picture} /><br />
                </div>
                {image.filepreview !== null &&
                    <div className='posts_preview'>
                        <img
                            src={image.filepreview}
                            alt="UploadImage" />
                    </div>
                }
                <button className='btn-primary' type='submit'>Envoyer</button>
            </form>
        </div>
    )
}

export default PostCreate;
