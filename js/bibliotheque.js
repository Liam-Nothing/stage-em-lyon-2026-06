



let grilleLivre = document.querySelector(".grille-flex-wrap");


grilleLivre = document.querySelector(".grille-flex-wrap");


document.addEventListener("DOMContentLoaded", async () => {
  let grilleLivre = document.querySelector(".grille-flex-wrap");
  let livres = await chargerLivres();

  livres.forEach(livre => {
    creerCarteLivre(grilleLivre, livre);
  });
});

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

  let titreLivre = document.createElement("h5");
  titreLivre.textContent = livre.titre;
  carteLivre.appendChild(titreLivre);

  let auteurLivre = document.createElement("p");
  auteurLivre.textContent = livre.auteur;
  carteLivre.appendChild(auteurLivre)

  return carteLivre;
}