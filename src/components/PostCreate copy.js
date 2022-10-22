import React, { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';

const PostCreate = () => {

    const post = useRef();
    const picture = useRef();
    const form = useRef();

    let data = new FormData();



    const handleSubmit = async (e) => {
        e.preventDefault();

        data.append('post', post.current.value);
        data.append('postPicture', picture.current.files[0]);
        // data.append('postPicture', "");
        data.append('userId', 94)

        // for (let item of data)
        //     console.log(`${item[0]} : ${item[1]}`);

        for (let item of data)
            console.log(item);

        // const message = {
        //     post: post.current.value,
        //     postPicture: "",
        //     userId: 94
        // }

        await axios.post(`${process.env.REACT_APP_URL_API}api/post`, data
            ,
            {
                headers: {
                    "content-type": "multipart/form-data"
                }
            }
        )

            .then((res) => {
                if (res.status === 200) {
                    console.log(res)
                    return res
                }
            })
            .catch(err => console.log(err))

    }

    return (
        <div className='posts__container'>
            <form onSubmit={handleSubmit} ref={form}>
                <div className='posts__form'>
                    <label htmlFor="post">Message</label><br />
                    <textarea type="textarea" id='post' name='post' ref={post} /><br />
                </div>
                <div className='posts__form'>
                    <label htmlFor="picture">Image</label><br />
                    <input
                        type="file"
                        id='picture'
                        name='picture'
                        accept='.jpg, .jpeg, .png'
                        // onChange={(e) => setImage(e.target.files[0], e.target.files[0].name)}
                        ref={picture} /><br />
                </div>
                <button type='submit'>Envoyer</button>
            </form>
        </div>
    )
}

export default PostCreate;
