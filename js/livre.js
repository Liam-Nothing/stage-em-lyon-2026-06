

async function initLivre() {
  // Étape 1 : lire l'id dans l'URL
  let parametres = new URLSearchParams(window.location.search);
  let id = parametres.get("id");
  console.log("id lu dans l'URL :", id);






  const inputsEtoiles = document.querySelectorAll('input[name="note"]');

  inputsEtoiles.forEach(input => {
    input.addEventListener('change', () => {
      const note = parseFloat(input.value);
      enregistrerNote(id, note);
    });
  });




  // Étape 2 : gérer le cas "id absent"
  if (id === null) {
    afficherErreur();
    return;
  }

  // Étape 3 : charger les livres depuis le JSON
  let livres = await chargerLivres();

  // Étape 4 : chercher le livre correspondant à l'id
  let livre = trouverLivre(livres, id);

  // Étape 5 : gérer le cas "id inconnu" (ou tableau vide si le JSON n'a pas pu être chargé)
  if (livre === undefined) {
    afficherErreur();
    return;
  }

  // Étape 6 : afficher le livre trouvé
  remplirFicheLivre(livre);
}

// Cherche un livre par son id dans le tableau de livres
function trouverLivre(livres, id) {
  return livres.find(livre => livre.id === id);
}

// Affiche le message d'erreur avec un lien de retour
function afficherErreur() {
  document.querySelector(".div-row.container.fil-activite").innerHTML = `
    <p>Livre introuvable.</p>
    <a href="../library/library.html">Retour à la bibliothèque</a>
  `;
}

// Remplit la page avec les infos du livre trouvé
function remplirFicheLivre(livre) {
  document.querySelector(".titre-livre").textContent = livre.titre;
  document.querySelector(".summury").textContent = livre.resume;

  document.querySelector(".valeur-auteur").textContent = livre.auteur;
  document.querySelector(".valeur-date").textContent = livre.dateDePublication;
  document.querySelector(".valeur-genre").textContent = livre.genre;
  document.querySelector(".valeur-pages").textContent = livre.nombreDePage;
  document.querySelector(".valeur-serie").textContent = livre.serie === "oui" ? "Oui" : "Non";

  document.querySelector(".couvertureImg").src = livre.couvertureLivre;
  document.querySelector(".couvertureImg").alt = livre.titre;

  document.querySelector(".valeur-note").textContent = livre.noteMoyenne;
}

// Lancement
initLivre();



