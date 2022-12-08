import React from 'react';

const PostLike = ({ postEval, item }) => {

    return (
        <>
            <div className='posts__eval'>
                <div className='posts__icon'>
                    <i onClick={() => postEval(item.id, 1)} className="fa-solid fa-thumbs-up fa-lg"></i>
                    <span id={"like1_" + item.id}>{item.like1}</span>
                </div>
                <div className='posts__icon'>
                    <i onClick={() => postEval(item.id, 0)} className="fa-solid fa-thumbs-down fa-lg"></i>
                    <span id={"like0_" + item.id}>{item.like0}</span>
                </div>
            </div>
            <span
                id={`error_${item.id}`}
                type="invalid"
            />
        </>
    );
};

export default PostLike;
