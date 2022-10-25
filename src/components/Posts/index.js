import React, { useState, Fragment, useEffect } from 'react';
import img from "../../assets/image-attractive.jpg";
import profile from "../../assets/un-jeune-homme.png"

const Posts = ({ data }) => {

    console.log(data)
    const [post, setPost] = useState(data);


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
                                {item.createdAt}
                            </div>
                        </div>
                    </div>

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
        </Fragment>
    )
}

export default Posts