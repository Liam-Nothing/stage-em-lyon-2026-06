

function creerCarteLivre(grilleLivre, livre) {
  let carteLivre = document.createElement("div");
  carteLivre.className = "div-couverture-colomn-index";
  grilleLivre.appendChild(carteLivre);

  let lienLivre = document.createElement("a");
  lienLivre.href = `../fiche-livre/livre.html?id=${livre.id}`;
  carteLivre.appendChild(lienLivre);

  let couvertureLivre = document.createElement("img");
  couvertureLivre.src = livre.couvertureLivre;
  couvertureLivre.alt = livre.titre;
  lienLivre.appendChild(couvertureLivre);

  /*const maNote = notes[livre.id];
  if (maNote !== undefined) {
    let badgeNote = document.createElement("img");
    badgeNote.className = "badge-ma-note";
    badgeNote.src = "../assets/badge.svg";
    badgeNote.alt = "Livre noté";
    badgeNote.title = `Ma note : ${maNote}/5`;
    lienLivre.appendChild(badgeNote);
  }*/

  let titreLivre = document.createElement("h5");
  titreLivre.textContent = livre.titre;
  carteLivre.appendChild(titreLivre);

  let auteurLivre = document.createElement("p");
  auteurLivre.textContent = livre.auteur;
  carteLivre.appendChild(auteurLivre);

  return carteLivre;
}