import React from 'react'

const PostMessageImg = ({ response, item }) => {

    return (
        <>
            <div className='posts__img'>
                {(item.post_picture && item.post_picture !== "") ?
                    <img src={item.post_picture} alt="élephant volant" /> :
                    (
                        response[0] !== undefined &&
                        response[0].picture !== "" &&
                        response[0].postId === item.id
                    ) &&
                    <span id={`posts-size-error_${item.id}`} className='my_red'>
                        {response[0].picture}
                    </span>
                }
                < span id={`span_${item.id}`} />

            </div>
            <div className='posts__post'>
                {item.post}
            </div>
        </>
    )
}

export default PostMessageImg;