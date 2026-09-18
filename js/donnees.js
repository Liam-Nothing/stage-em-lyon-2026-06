
// fonction filtre par genre //
function filtrerGenre(livre, genre) {
    return livre.filter(livre => livre.genre === genre);
}


// fonction tri par note //
function trierParNote(livres) {
    return [...livres].sort((a, b) => a.noteMoyenne - b.noteMoyenne);
}


// fonction charger JSON //
async function chargerDonnees(chemin) {
    try {
        const reponse = await fetch(chemin);

        if (!reponse.ok) {
            throw new Error(`Statut ${reponse.status} en tentant de charger "${chemin}"`);
        }

        return await reponse.json();
    } catch (erreur) {
        console.error(`Chargement impossible pour "${chemin}" :`, erreur.message);
        return [];
    }
}


// fonction charger livres //
async function chargerLivres() {
    return chargerDonnees("../data/livres.json");
}

async function chargerUtilisateurs() {
    return chargerDonnees("../data/utilisateurs.json");
}

async function chargerAvis() {
    return chargerDonnees("../data/avis.json");
}


// fonction AVIS 
async function initAvis() {
    // Étape 1 : lire l'id dans l'URL
    let parametresAvis = new URLSearchParams(window.location.search);
    let idLivre = parametresAvis.get("id");

    // Étape 2 : gérer le cas "id absent"
    if (idLivre === null) {
        afficherErreur();
        return;
    }

    // Étape 3 : charger les avis depuis le JSON
    let aviss = await chargerAvis();

    // Étape 4 : chercher l'avis correspondant à l'id
    let avisFiltres = avisDuLivre(aviss, idLivre);


    // Étape 6 : afficher l'avis trouvé
    afficherAvisDuLivre(aviss, idLivre);
}

function avisDuLivre(aviss, idLivre) {
    return aviss.filter(unAvis => unAvis.idLivre === idLivre);
}

function afficherAvisDuLivre(avis, idLivre) {
    const conteneur = document.querySelector(".div-avis");
    const modele = conteneur.querySelector("article"); 
    const avisFiltres = avisDuLivre(avis, idLivre);

    conteneur.querySelectorAll("article").forEach(a => a.remove());

    avisFiltres.forEach(unAvis => {
        conteneur.appendChild(remplirFicheAvis(unAvis, modele));
    });
}

function remplirFicheAvis(avis, modele) {
    const fiche = modele.cloneNode(true);

    const imgAvatar = fiche.querySelector(".img-avatar");
    imgAvatar.src = avis.photoProfil;
    imgAvatar.alt = `photo de profil de ${avis.pseudo}`;

    const img = fiche.querySelector("img");
    img.src = `images/etoiles-${avis.note}.png`;
    img.alt = `note ${avis.note} étoiles`;

    fiche.querySelector(".valeur-pseudo").textContent = avis.pseudo;
    fiche.querySelectorAll("p")[1].textContent = avis.commentaire;

    const time = fiche.querySelector("time");
    time.textContent = avis.datePublicationCommentaire;

    return fiche;
}

if (document.querySelector(".div-avis")) {
  initAvis();
}

//fonction pour calculer la note moyenne des avis
function calculerNoteMoyenne(avisLivre) {
    if (avisLivre.length === 0) {
        return null;
    }
    const somme = avisLivre.reduce((total, unAvis) => total + unAvis.note, 0);
    return Math.round((somme / avisLivre.length) * 10) / 10;
}


//// FONCTION NORMALISER LE TEXTE ////

function normaliser(texte) {
    return texte
    .toLowerCase()
    .normalize ('NFD')
    .replace(/[\u0300-\u036f]/g, '');
    
}

//// FONCTION CHERCHERLIVRE() /////

function chercherLivres(livres, requete) {
    const requeteNormalisee = normaliser(requete);

    return livres.filter(livre=> {
        const titreNormalise = normaliser(livre.titre);
        const auteurNormalise = normaliser(livre.auteur);

        return titreNormalise.includes(requeteNormalisee) || auteurNormalise.includes(requeteNormalisee);
    });
}


///FONCTION AFFICHERLIVRE /////

function afficherLivres(livres) {
  const grilleLivre = document.querySelector(".grille-flex-wrap");
  grilleLivre.innerHTML = ""; // on vide la grille avant de la remplir

  livres.forEach(livre => {
    creerCarteLivre(grilleLivre, livre);

  });
}

////// FONCTON AFFICHER ETAT VIDE //////

function afficherEtatVide() {
  const grilleLivre = document.querySelector(".grille-flex-wrap");
  grilleLivre.innerHTML = `<p class="etat-vide">Aucun résultat trouvé</p>`;
}


let livres = [];

const champRecherche = document.querySelector(".search-bar input");

document.addEventListener("DOMContentLoaded", async () => {
  livres = await chargerLivres();
  afficherLivres(livres);
});


champRecherche.addEventListener("input", () => {
  const requete = champRecherche.value;
  const resultats = chercherLivres(livres, requete);

  if (resultats.length === 0) {
    afficherEtatVide();
  } else {
    afficherLivres(resultats);
  }
});