
// fonction filtre par genre //
function filtrerGenre(livre,genre) {
    return livre.filter(livre=> livre.genre ===genre);
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
  console.log("id lu dans l'URL :", idLivre);

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
  avisDuLivre(aviss, idLivre);
}




function avisDuLivre(avis, idLivre) {
    return avis.filter(unAvis => unAvis.id === idLivre);
}

/*document.querySelector(".valeur-pseudo").textContent = avis.pseudo;*/

/*function remplirFicheAvis(avis) {
    
}*/

function remplirFicheAvis(avis) {
  // On récupère le <article> modèle et on le clone pour ne pas modifier l'original
  const modele = document.querySelector(".div-avis article");
  const fiche = modele.cloneNode(true);

  // Image de la note en étoiles (ex: etoiles-4.png, etoiles-5.png...)
  const img = fiche.querySelector("img");
  img.src = `images/etoiles-${avis.note}.png`;
  img.alt = `note ${avis.note} étoiles`;

  // Pseudo de l'auteur de l'avis
  fiche.querySelector(".valeur-pseudo").textContent = avis.pseudo;

  // Commentaire (le <p> vide juste après)
  fiche.querySelectorAll("p")[1].textContent = avis.commentaire;

  // Date au format "2026-07"
  const time = fiche.querySelector("time");
  time.setAttribute("datetime", avis.date);
  time.textContent = formaterDate(avis.date);

  return fiche;
}

// Convertit "2026-07" en quelque chose de lisible, ex: "juillet 2026"
function formaterDate(dateISO) {
  const [annee, mois] = dateISO.split("-");
  const noms = ["janvier","février","mars","avril","mai","juin",
                "juillet","août","septembre","octobre","novembre","décembre"];
  return `${noms[parseInt(mois, 10) - 1]} ${annee}`;
}

// Pour afficher tous les avis d'un livre dans le conteneur .div-avis
function afficherAvisDuLivre(avis, idLivre) {
  const conteneur = document.querySelector(".div-avis");
  const avisFiltres = avisDuLivre(avis, idLivre);

  // On vide le conteneur sauf le <h3>
  conteneur.querySelectorAll("article").forEach(a => a.remove());

  avisFiltres.forEach(unAvis => {
    conteneur.appendChild(remplirFicheAvis(unAvis));
  });
}

initAvis();