import React, { useState, Fragment, useEffect, useRef } from 'react';
import axios from 'axios';
import img from "../../assets/image-attractive.jpg";
import profile from "../../assets/un-jeune-homme.png";
import { dateFormat } from '../../functions/utils';
import { tokenService } from '../../services/service'

const Posts = ({ data, fetchData }) => {

    const [display, setDisplay] = useState(false);

    console.log(tokenService.idCompare());

    const form = useRef()
    const post = useRef()
    const picture = useRef()

    const toggle = () => {
        setDisplay(!display)
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

    const submitPut = async (id, e) => {
        e.preventDefault();

        // let data = new FormData();

        // data.append('post', post.current.value)
        const data = {
            post: post.current.value
        }

        await axios.put(`${process.env.REACT_APP_URL_API}api/post/${id}`, data
            // ,
            // {
            //     headers: { "Content-Type": "multipart/form-data" }
            // }
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
                <div key={item.id} className='posts__container'>
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
                        < div >
                            <button
                                onClick={toggle}
                                className="btn-primary"
                            >Modifier</button>
                            <button
                                className="btn-primary"
                                onClick={() => postDelete(item.id)}
                            >Supprimer</button>
                            {display &&
                                <div className='posts__container'>
                                    <form onSubmit={(e) => submitPut(item.id, e)} ref={form}>
                                        <div className='posts__form'>
                                            <label htmlFor="post">Nouveau message</label><br />
                                            <textarea type="textarea" id='post' name='post' ref={post} /><br />
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
                            }
                        </div>




                    }

                    <div className='posts__img'>
                        {(item.post_picture && item.post_picture !== "rien") && <img src={item.post_picture} alt="élephant volant" />}
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