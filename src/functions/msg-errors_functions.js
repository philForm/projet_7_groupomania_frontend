
/**
 * Affiche un message d'erreur :
 * @param {String} id 
 * @param {String} modif 
 */
function msgErrorDisplay(id, modif) {
    document.getElementById(id).innerText = modif;
    document.getElementById(id).classList.add("my_red");
}

/**
 * Retire un message d'erreur :
 * @param {String} id 
 */
function msgErrorRemove(id) {
    document.getElementById(id).innerText = "";
    document.getElementById(id).classList.remove("my_red");

}

export { msgErrorDisplay, msgErrorRemove };