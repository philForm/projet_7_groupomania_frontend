import React, { useState, useRef } from 'react';
import axios from 'axios';
import { tokenService } from '../../services/storage_service';

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

    // Récupération de l'id du l'utilisateur du localStorage :
    const userId = tokenService.idCompare();

    /**
     * Prévisualisation de l'image :
     */
    const handleChangeImage = e => {
        if (e.target.files[0] !== undefined) {
            setImage({
                ...image,
                file: e.target.files[0],
                filepreview: URL.createObjectURL(e.target.files[0]),
            });
        } else {
            setImage({
                ...image,
                file: picture.current.files[0],
                filepreview: null
            });
        }
    };

    /**
     * Soumission du formulaire de création de post :
     */
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
        data.append('userId', userId);

        // console.log(typeof picture.current.files[0]);

        // for (let item of data)
        //     console.log(item);

        // Envoie les données du post au backend :
        await axios.post(`${process.env.REACT_APP_URL_API}api/post`, data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    // Si l'image est trop volumineuse :
                    if (res.data.picture !== undefined) {
                        props.responseFunct(res.data.picture);
                    };
                };
            })
            .catch(err => console.error(err));

        props.fetchData();

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
                    <input
                        type="file"
                        id='post-create_picture'
                        name='picture'
                        accept='image/jpg, image/jpeg, image/png image/gif'
                        onChange={(e) => handleChangeImage(e)}
                        ref={picture}
                    /><br />
                    <label
                        htmlFor="post-create_picture"
                        className='btn-primary disp-inl-block'>
                        Ajouter un image
                    </label><br /><br />
                </div>
                {image.filepreview !== null &&
                    <div className='posts_preview'>
                        <img
                            src={image.filepreview}
                            alt="UploadImage" />
                    </div>
                }
                <button className='btn-primary' type='submit'>Publier</button>
            </form>
        </div>
    );
};

export default PostCreate;
