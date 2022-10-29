import React, { useRef } from 'react';
import axios from 'axios';

/**
 * Création de Posts
 */
const PostCreate = (props) => {

    const post = useRef();
    const picture = useRef();
    const form = useRef();

    const handleSubmit = async (e) => {

        e.preventDefault();

        let data = new FormData();

        data.append('image', picture.current.files[0]);
        data.append('post', post.current.value);
        data.append('userId', 93)

        for (let item of data)
            console.log(item);

        await axios.post(`${process.env.REACT_APP_URL_API}api/post`, data,
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

        props.fetchData();

        // picture.current.files[0] = "";
        // post.current.value = "";

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
                        accept='image/jpg, image/jpeg, image/png'
                        // onChange={(e) => setImage(e.target.files[0], e.target.files[0].name)}
                        ref={picture} /><br />
                </div>
                <button className='btn-primary' type='submit'>Envoyer</button>
            </form>
        </div>
    )
}

export default PostCreate;
