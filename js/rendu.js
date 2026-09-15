
/// FONCTION CREER UNE CARD LIVRE INDEX.HTML////

// function creeCardLivre(livre) {
//     const card = document.createElement("div");
//     card.className("div-couverture-colomn-index");
    
//     const couvertureLivre = document.createElement("img");
//     couvertureLivre.className("couverture card-fiche");
//     couvertureLivre.src = livre.couvertureLivre;
    
//     const titreLivre = document.createElement("p");
//     titreLivre.textContent = livre.titre
    
//     card.appendChild(couvertureLivre);
//     card.appendChild(titreLivre);

//     return card;
// }

// const carte = creeCardLivre(LIVRES_DEMO);
// console.log(carte);



/// CREER creerCarteLivre(livre) ///////

////JE CREE D'ABORD LA GRILLE FLEX WRAP ////
let grilleLivre = document.createElement("div");
grilleLivre.className = "grille-flex-wrap";

console.log(grilleLivre);

/// CARTE LIVRE INDEX



let carteLivre = document.createElement("div");
carteLivre.className = "div-couverture-colomn-index";
grilleLivre.appendChild(carteLivre)


let lienLivre = document.createElement("a");
carteLivre.appendChild(lienLivre);
console.log(carteLivre);

let couvertureLivre = document.createElement("img");
lienLivre.appendChild(couvertureLivre);



let titreLivre = document.createElement("h5");
carteLivre.appendChild(titreLivre)
console.log(carteLivre);




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
            let carteLivre = document.createElement("div");
            carteLivre.className = "div-couverture-colomn-index";
            grilleLivre.appendChild(carteLivre)


            let lienLivre = document.createElement("a");
            carteLivre.appendChild(lienLivre);
            console.log(carteLivre);

            let couvertureLivre = document.createElement("img");
            lienLivre.appendChild(couvertureLivre);



            let titreLivre = document.createElement("h5");
            carteLivre.appendChild(titreLivre)
            console.log(carteLivre);
          
            
        });

    })
    .catch(error => console.error('Error:', error))

