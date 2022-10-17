const saveToken = (token) => {
    localStorage.setItem("token", token);
};

const logOut = () => {
    localStorage.removeItem("token");
};

const isLogged = () => {
    const token = localStorage.getItem("token");
    return !!token // !! transforme n'importe quelle vaiable en boolean
};

export const tokenService = {
    saveToken, logOut, isLogged
};