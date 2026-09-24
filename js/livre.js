// --- Gestion des notes en localStorage ---
function lireNotes() {
    try {
        const texte = localStorage.getItem("mesNotes");
        return JSON.parse(texte) || {};
    } catch (erreur) {
        console.warn("Contenu de 'mesNotes' illisible, réinitialisation :", erreur.message);
        return {};
    }
}

function enregistrerNote(idLivre, maNote) {
    const notes = lireNotes();
    notes[idLivre] = maNote;
    localStorage.setItem("mesNotes", JSON.stringify(notes));
}


// --- Fiche livre ---
async function initLivre() {
  // Étape 1 : lire l'id dans l'URL
  let parametres = new URLSearchParams(window.location.search);
  let id = parametres.get("id");
  console.log("id lu dans l'URL :", id);

  // Étape 2 : gérer le cas "id absent"
  if (id === null) {
    afficherErreur();
    return;
  }

  // Étape 3 : charger les livres depuis le JSON
  let livres = await chargerLivres();

  // Étape 4 : chercher le livre correspondant à l'id
  let livre = trouverLivre(livres, id);

  // Étape 5 : gérer le cas "id inconnu"
  if (livre === undefined) {
    afficherErreur();
    return;
  }

  // Étape 6 : afficher le livre trouvé, puis remplacer le squelette par le vrai contenu
  remplirFicheLivre(livre);

  // Étape 7 : brancher le composant d'étoiles sur ce livre
  initFormulaireNote(id);

  // Étape 8 : les données sont affichées, on peut retirer le squelette
  masquerSquelette("fiche-livre");
}

// Branche les étoiles : relit la note existante et enregistre au changement
function initFormulaireNote(idLivre) {
  afficherNoteExistante(idLivre);

  document.querySelectorAll('input[name="note"]').forEach((input) => {
    input.addEventListener('change', () => {
      const note = parseFloat(input.value);
      enregistrerNote(idLivre, note);
    });
  });
}

// Coche l'étoile correspondant à la note déjà enregistrée, s'il y en a une
function afficherNoteExistante(idLivre) {
  const notes = lireNotes();
  const noteExistante = notes[idLivre];

  if (noteExistante !== undefined) {
    const inputACocher = document.querySelector(
      `input[name="note"][value="${noteExistante}"]`
    );
    if (inputACocher) {
      inputACocher.checked = true;
    }
  }
}


// Cherche un livre par son id dans le tableau de livres
function trouverLivre(livres, id) {
  return livres.find(livre => livre.id === id);
}


// Affiche le message d'erreur avec un lien de retour
function afficherErreur() {
  // Le squelette ne doit pas tourner indéfiniment si le livre est introuvable
  masquerSquelette("fiche-livre");

  document.querySelector(".div-row.fil-activite").innerHTML = `
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