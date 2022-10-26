import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import img from "../../assets/image-attractive.jpg";
import profile from "../../assets/un-jeune-homme.png";
import { dateFormat } from '../../functions/utils';
import { tokenService } from '../../services/service'

const Posts = ({ data, fetchData }) => {

    // const [post, setPost] = useState(data);
    // const [compare, setCompare] = useState(false);

    console.log(tokenService.idCompare());

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

    useEffect(() => {

    }, [])
    // 
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
                            <button className="btn-primary">Modifier</button>
                            <button
                                className="btn-primary"
                                onClick={() => postDelete(item.id)}
                            >Supprimer</button>
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