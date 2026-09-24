
/// CREER creerCarteLivre(livre) ///////

////JE CREE D'ABORD LA GRILLE FLEX WRAP ////
let grilleLivre = document.querySelector(".grille-flex-wrap");


/// CARTE LIVRE INDEX
function creerCarteLivre(grilleLivre, livre) {
    let carteLivre = document.createElement("div");
    carteLivre.className = "div-couverture-colomn-index";
    grilleLivre.appendChild(carteLivre)

    let lienLivre = document.createElement("a");
    lienLivre.href = `../fiche-livre/livre.html?id=${livre.id}`;
    carteLivre.appendChild(lienLivre);

    let couvertureLivre = document.createElement("img");
    couvertureLivre.src = livre.couvertureLivre;
    couvertureLivre.alt = livre.titre;
    lienLivre.appendChild(couvertureLivre);

    let titreLivre = document.createElement("h5");
    titreLivre.textContent = livre.titre;
    carteLivre.appendChild(titreLivre);

    let auteurLivre = document.createElement("p");
    auteurLivre.textContent = livre.auteur;
    carteLivre.appendChild(auteurLivre);

    const mesNotes = lireNotes();
    if (livre.id in mesNotes) {
        let badgeNote = document.createElement("span");
        badgeNote.className = "badge-note-perso";
        badgeNote.textContent = mesNotes[livre.id];
        carteLivre.appendChild(badgeNote);
    }

    return carteLivre;
}


////JE CREE LA FONCTION QUI VA ME PERMETTRE DE CREER AUTANT DE CARD QU'IL Y A DE LIVRES ////
fetch(LIVRES_DEMO)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load JSON data');
        }
        return response.json();
    })
    .then(data => {
        // /////JE REMPLIS MES NOUVEAUX ELEMENTS AVEC LES DONNES DU JSON///////
        data.LIVRES_DEMO.forEach(element => {
            creerCarteLivre(grilleLivre, element);
        });

    })
    .catch(error => console.error('Error:', error))