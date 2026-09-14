
/// FONCTION CREER UNE CARD LIVRE INDEX.HTML////

function creeCardLivre(livre) {
    const card = document.createElement("div");
    card.className("div-couverture-colomn-index");
    
    const couvertureLivre = document.createElement("img");
    couvertureLivre.className("couverture card-fiche");
    couvertureLivre.src = livre.couvertureLivre;
    
    const titreLivre = document.createElement("p");
    titreLivre.textContent = livre.titre
    
    card.appendChild(couvertureLivre);
    card.appendChild(titreLivre);

    return card;
}

const carte = creeCardLivre(LIVRES_DEMO);
console.log(carte);
