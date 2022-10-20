import React from 'react';
import img from "../assets/image-attractive.jpg";
import profile from "../assets/un-jeune-homme.png"

import "../style/posts.css"

const Posts = () => {

    return (
        <div className='posts__container'>
            <div className='posts__profil'>
                <div>
                    <div className='posts__avatar'>
                        <img src={profile} alt="avatar" />
                    </div>
                    <div className='posts__mail'>
                        toto@orange.fr
                    </div>
                </div>
                <div>
                    Posté le 10/10/2022
                </div>
            </div>

            <div className='posts__img'>
                <img src={img} alt="élephant volant" />
            </div>
            <div className='posts__post'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt ducimus reprehenderit voluptates perspiciatis distinctio, optio explicabo eveniet perferendis beatae, aperiam maiores nihil placeat tempora pariatur! Quasi officia odit reprehenderit dolorem.
            </div>
        </div>
    )
}

export default Posts