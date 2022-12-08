import React from "react";

const Button = (props) => {

    console.log(props)

    return (
        <button
            className={'btn-primary ' + props.class}
            ref={props.innerRef}
            onClick={props.click}
            type={props.type} >{props.children}
        </button>
    )
};

export default Button;