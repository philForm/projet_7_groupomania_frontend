import React, { createContext, useState } from "react";

export const AvatarContext = createContext();

const AvatarContextProvider = (props) => {

    const [avatar, setAvatar] = useState("BONJOUR !")

    return (
        <AvatarContext.Provider value={{ avatar }}>
            {props.children}
        </AvatarContext.Provider>
    )
};

export default AvatarContextProvider;