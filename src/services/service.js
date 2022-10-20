const saveToken = (token) => {
    localStorage.setItem("token", token);
};

const logOut = () => {
    localStorage.removeItem("token");
};

const isLogged = () => {
    const data = JSON.parse(localStorage.getItem("token"));
    let token
    if (data) {
        token = data.token
    }
    return !!token // !! transforme n'importe quelle vaiable en boolean
};

export const tokenService = {
    saveToken, logOut, isLogged
};