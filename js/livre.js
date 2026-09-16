


let parametres = new URLSearchParams(window.location.search);
let id =parametres.get("id");
console.log("id lu dans l'URL :", id);

////fonction afficher l'erreur quand livre introuvable////

function afficherErreur() {
    document.querySelector("div-row container fil-activite").innerHTML =
    `<p>Livre introuvable</p>
    <a href="library.html">Retour à la library</a>`;

}

function trouverLivre(livres, id) {
    return livres.find(livre => livre.id ===id);
}