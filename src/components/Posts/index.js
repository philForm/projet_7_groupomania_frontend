import React, { useState, Fragment, useEffect, useRef } from 'react';
import axios from 'axios';
import img from "../../assets/image-attractive.jpg";
import profile from "../../assets/un-jeune-homme.png";
import { dateFormat } from '../../functions/utils';
import { tokenService } from '../../services/service'

const Posts = ({ data, fetchData }) => {

    const [displayId, setDisplayId] = useState(null);

    console.log(tokenService.idCompare());

    const form = useRef()
    const post = useRef()
    const picture = useRef()
    const contain = useRef()

    const toggle = (id) => {
        // debugger;
        // setDisplay(displayId)
        if (displayId === id) {
            setDisplayId(null);
        } else {
            setDisplayId(id);
        }
    }


    // Supprimer un post
    const postDelete = async (id) => {
        await axios.delete(`${process.env.REACT_APP_URL_API}api/post/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res)
                    return res
                }
            })
            .catch(err => console.error(err));

        fetchData();
    }

    // Modifier un post
    const postUpdate = async (id, e) => {
        e.preventDefault();

        let formData = new FormData();

        console.log(`contain.current.id : ${contain.current.id}`);
        console.log(`id : ${id}`);

        formData.append('post', post.current.value);
        formData.append('image', picture.current.files[0]);
        // const data = {
        //     post: post.current.value
        // }

        await axios.put(`${process.env.REACT_APP_URL_API}api/post/${id}`, formData
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
            .catch(err => console.error(err))

        toggle()

        fetchData();
    }

    return (
        <Fragment>
            {data.map(item => (
                <div key={item.id} className='posts__container' id={`${item.id}`} ref={contain}>
                    <div className='posts__profil'>
                        <div>
                            <div className='posts__avatar'>
                                <img src={profile} alt="avatar" />
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
                    {tokenService.idCompare() === item.user_id &&
                        <div>
                            <button
                                id={`btn-${item.id}`}
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
                                            accept='image/jpg, image/jpeg, image/png'
                                            ref={picture} /><br />
                                    </div>
                                    <button className='btn-primary' type='submit'>Envoyer</button>
                                </form>
                            </div>
                        </div>
                    }

                    <div className='posts__img'>
                        {(item.post_picture && item.post_picture !== "") && <img src={item.post_picture} alt="élephant volant" />}
                    </div>
                    <div className='posts__post'>
                        {item.post}
                    </div>

                    <div className='posts__eval'>
                        <div>
                            <i className="fa-solid fa-thumbs-up fa-lg"></i>
                        </div>
                        <div>
                            <i className="fa-solid fa-thumbs-down fa-lg"></i>
                        </div>
                    </div>
                </div>
            )
            )}
        </Fragment >
    )
}

export default Posts