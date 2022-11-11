import React, { useState, Fragment, useEffect, useRef } from 'react';
import axios from 'axios';
import img from "../../assets/image-attractive.jpg";
import profile from "../../assets/un-jeune-homme.png";
import { dateFormat } from '../../functions/utils';
import { tokenService } from '../../services/service';

const Posts = ({ data, fetchData }) => {


    const [displayId, setDisplayId] = useState(null);


    // Récupération de l'id du locaStorage :
    const userIdLocal = tokenService.idCompare();

    // Récupération du token dans le localStorage :
    const token = tokenService.recupToken();

    // Récupération du rôle
    const role = tokenService.recupRole()

    // console.log(token)
    // console.log(data);

    const form = useRef()
    const post = useRef()
    const picture = useRef()
    const contain = useRef()



    const toggle = (id) => {

        if (displayId === id) {
            console.log(displayId)
            setDisplayId(null);
        } else {
            console.log(displayId)
            setDisplayId(id);
        }
    }

    /**
     * Supprimer un post
     * @param {number} id : id du post :
     */
    const postDelete = async (id) => {
        await axios.delete(`${process.env.REACT_APP_URL_API}api/post/${id}`,
            {
                headers: {
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

        fetchData();
    }

    /**
     * Modifier un post
     * @param {number} id : id du post :
     */
    const postUpdate = async (id, e) => {
        e.preventDefault();

        let formData = new FormData();

        console.log(`contain.current.id : ${contain.current.id}`);
        console.log(`id : ${id}`);

        // Récupère l'id de l'utilisateur propriétaire du post :
        const user = await axios.get(`${process.env.REACT_APP_URL_API}api/post/${id}`);
        console.log('============= userId')
        console.log(user.data.userId)

        formData.append('post', post.current.value);
        formData.append('image', picture.current.files[0]);
        // formData.append('postId', id)
        formData.append('userId', user.data.userId)

        // Modification du post :
        await axios.put(`${process.env.REACT_APP_URL_API}api/post/${id}`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((res) => {
                if (res.status === 200) {
                    console.log(res)
                    return res
                }
            })
            .catch(err => console.error(err))

        toggle()

        fetchData();
    };

    const [increm, setIncrem] = useState(0);

    const [disp, setDisp] = useState(null);

    const idDisp = (id) => {
        setDisp(id)
        console.log(disp)
        return disp
    }


    const increment = (increm, id) => {
        // setDisp(id)
        // if (disp === id) {
        setIncrem(increm + 1);
    }

    const postEvaluate = async (postId, item) => {
        let like = [];
        if (item === 1) {
            console.log("évaluation positive", postId, userIdLocal)
            like = [1, postId, userIdLocal]
        }
        else {
            console.log("évaluation négative", postId, userIdLocal)
            like = [0, postId, userIdLocal];
            console.log(like)
        }

        await axios.post(`${process.env.REACT_APP_URL_API}api/post/${postId}/like`, {
            like: like[0],
            postId: like[1],
            userId: like[2]
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
    };

    // useEffect(() => {
    //     console.log(postEvaluate())
    // }, [])


    return (
        <Fragment>
            {data.map(item => (
                <div key={item.id} className='posts__container' id={`${item.id}`} data-id={`${item.id}`} ref={contain}>
                    <div className='posts__profil'>
                        <div>
                            <div className='posts__avatar'>
                                <img src={item.user_picture} alt="avatar" />
                            </div>

                            <div className='posts__mail'>
                                {item.email}
                            </div>
                        </div>
                        <div>
                            <div>
                                Posté le : {dateFormat(item.createdAt)}
                            </div>
                        </div>
                    </div>
                    {((tokenService.idCompare() === item.user_id) || role === 1) &&
                        <div>
                            <button
                                id={`btn - ${item.id}`}
                                onClick={() => toggle(item.id)}
                                className="btn-primary"
                            >Modifier</button>
                            <button
                                className="btn-primary"
                                onClick={() => postDelete(item.id)}
                            >Supprimer</button>
                        </div>
                    }
                    {
                        (displayId === item.id) &&
                        <div>
                            <div className='posts__container'>
                                <form onSubmit={(e) => postUpdate(item.id, e)} ref={form}>
                                    <div className='posts__form'>
                                        <label htmlFor="post-update">Nouveau message</label><br />
                                        <textarea
                                            type="textarea"
                                            id='post-update'
                                            name='post'
                                            ref={post}
                                            defaultValue={item.post} >
                                        </textarea> <br />
                                    </div>
                                    <div className='posts__form'>
                                        <label htmlFor="picture">Nouvelle image</label><br />
                                        <input
                                            type="file"
                                            id='picture'
                                            name='picture'
                                            accept='image/jpg, image/jpeg, image/png image/gif'
                                            ref={picture} /><br />
                                    </div>
                                    <button className='btn-primary' type='submit'>Envoyer</button>
                                </form>
                            </div>
                        </div>
                    }

                    <div className='posts__img'>
                        {(item.post_picture && item.post_picture !== "") ?
                            <img src={item.post_picture} alt="élephant volant" /> :
                            <img src='' alt='' />}
                    </div>
                    <div className='posts__post'>
                        {item.post}
                    </div>

                    <div className='posts__eval'>
                        <div className='posts__icon'>
                            <i onClick={() => postEvaluate(item.id, 1)} className="fa-solid fa-thumbs-up fa-lg"></i>
                            <span>{increm}</span>
                        </div>
                        <div className='posts__icon'>
                            <i onClick={() => postEvaluate(item.id, 0)} className="fa-solid fa-thumbs-down fa-lg"></i>
                            <span>0</span>
                        </div>
                    </div>
                </div>
            )
            )}
        </Fragment >
    )
}

export default Posts;