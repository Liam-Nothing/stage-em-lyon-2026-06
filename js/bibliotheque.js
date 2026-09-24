
/// FONCTION CREER CARTE LIVRE ///
function creerCarteLivre(grilleLivre, livre) {
  let carteLivre = document.createElement("div");
  carteLivre.className = "div-couverture-colomn-index";
  grilleLivre.appendChild(carteLivre);

  let articleLivre = document.createElement("article");
  carteLivre.appendChild(articleLivre);

  let lienLivre = document.createElement("a");
  lienLivre.href = `../fiche-livre/livre.html?id=${livre.id}`;
  articleLivre.appendChild(lienLivre);

  let couvertureLivre = document.createElement("img");
  couvertureLivre.src = livre.couvertureLivre;
  couvertureLivre.alt = livre.titre;
  lienLivre.appendChild(couvertureLivre);

  let titreLivre = document.createElement("h5");
  titreLivre.textContent = livre.titre;
  articleLivre.appendChild(titreLivre);

  let auteurLivre = document.createElement("p");
  auteurLivre.textContent = livre.auteur;
  articleLivre.appendChild(auteurLivre);

  if (livre.id in lireNotes()) {
    let badgeNote = document.createElement("img");
    badgeNote.className = "badge-ma-note";
    badgeNote.src = "../assets/badge.svg";
    badgeNote.alt = "Livre noté";
    badgeNote.title = `Ma note : ${lireNotes()[livre.id].maNote}/5`;
    articleLivre.appendChild(badgeNote);
  }

  return carteLivre;
}