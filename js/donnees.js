
// fonction filtre par genre //
function filtrerParGenre(livres, genre) {
    if (genre === "tous") {
        return [...livres];
    }
    return livres.filter(livre => livre.genre === genre);
}


// fonction tri livre //
function trierLivres(livres, critere) {
    switch (critere) {
        case "note-desc":
            return [...livres].sort((a, b) => b.noteMoyenne - a.noteMoyenne);
        case "titre-az":
            return [...livres].sort((a, b) => a.titre.localeCompare(b.titre));
        case "annee-desc":
            return [...livres].sort((a, b) => b.dateDePublication - a.dateDePublication);
        default:
            return [...livres];
    }
}


// fonction charger JSON //
async function chargerDonnees(chemin) {
    let reponse;

    try {
        reponse = await fetch(chemin);
    } catch (erreurReseau) {
        const message = `Impossible d'accéder à "${chemin}" (${erreurReseau.message})`;
        console.error(message);
        afficherErreurChargement(message);
        return null;
    }


    // Réponse HTTP en erreur (404, 500, etc.)
    if (!reponse.ok) {
        const message = `"${chemin}" a répondu avec une erreur (statut ${reponse.status})`;
        console.error(message);
        afficherErreurChargement(message);
        return null;
    }

    // JSON malformé : .json() lève une erreur si le parsing échoue
    try {
        return await reponse.json();
    } catch (erreurParsing) {
        const message = `"${chemin}" ne contient pas un JSON valide (${erreurParsing.message})`;
        console.error(message);
        afficherErreurChargement(message);
        return null;
    }
}

// Affiche un message visible dans la page plutôt que de la laisser blanche
function afficherErreurChargement(message) {
    document.querySelectorAll(".erreur-chargement").forEach(el => el.remove());

    const grilleLivre = document.querySelector(".grille-flex-wrap");
    if (grilleLivre) {
        grilleLivre.innerHTML = `<p class="etat-vide erreur-chargement" role="alert">⚠️ ${message}</p>`;
        return;
    }

    const conteneur = document.querySelector("main") || document.body;
    const alerte = document.createElement("div");
    alerte.className = "message message--erreur erreur-chargement";
    alerte.setAttribute("role", "alert");
    alerte.innerHTML = `
        <span class="message__icone" aria-hidden="true">!</span>
        <p class="message__texte"><span class="message__prefixe">Erreur —</span> ${message}</p>
    `;
    conteneur.prepend(alerte);
}


// fonction charger livres //
async function chargerLivres() {
    return chargerDonnees("../data/livres.json");
}

// fonction charger utilisateurs
async function chargerUtilisateurs() {
    return chargerDonnees("../data/utilisateurs.json");
}

// fonction charger avis
async function chargerAvis() {
    return chargerDonnees("../data/avis.json");
}

async function chargerTousLesAvis() {
    const avisJson = (await chargerAvis()) || [];
    let avisLocaux = [];
    try {
        avisLocaux = JSON.parse(localStorage.getItem("avis")) || [];
    } catch (erreur) {
        console.warn("Clé 'avis' illisible :", erreur.message);
    }
    return avisJson.concat(avisLocaux);
}

/* TRIER AVIS DU PLUS RECENT AU PLUS ANCIEN */
const MOIS_FR = {
    janvier: "01", février: "02", mars: "03", avril: "04",
    mai: "05", juin: "06", juillet: "07", août: "08",
    septembre: "09", octobre: "10", novembre: "11", décembre: "12"
};

function parserDateFrancaise(dateTexte) {
    const [jour, moisTexte, annee] = dateTexte.split(" ");
    const mois = MOIS_FR[moisTexte.toLowerCase()];
    return new Date(`${annee}-${mois}-${jour.padStart(2, "0")}`);
}

function trierAvisParDate(avis) {
    const copie = [...avis];
    return copie.sort((a, b) =>
        parserDateFrancaise(b.datePublicationCommentaire) - parserDateFrancaise(a.datePublicationCommentaire)
    );
}


// fonction AVIS 
async function initAvis() {
    // Étape 1 : lire l'id dans l'URL
    let parametresAvis = new URLSearchParams(window.location.search);
    let idLivre = parametresAvis.get("id");

    // Étape 2 : gérer le cas "id absent"
    if (idLivre === null) {
        afficherErreurLivre();
        return;
    }

    // Étape 3 : charger les avis depuis le JSON
    let aviss = await chargerTousLesAvis();

    // Étape 4 : afficher l'avis trouvé
    afficherAvisDuLivre(aviss, idLivre);
}

function avisDuLivre(aviss, idLivre) {
    return aviss.filter(unAvis => unAvis.idLivre === idLivre);
}


/* AVIS ETAT VIDE */
function afficherEtatVideAvis(conteneur) {
    conteneur.innerHTML = `
        <div class="etat-vide-avis">
            <p>Aucun avis pour ce livre</p>
            <p>Soyez le premier ou la première à partager votre lecture.</p>
        </div>
    `;
}

function afficherAvisDuLivre(avis, idLivre) {
    const conteneur = document.querySelector(".div-avis");
    const modele = conteneur.querySelector("article");

    const avisFiltres = avisDuLivre(avis, idLivre);
    const avisTries = trierAvisParDate(avisFiltres);

    conteneur.querySelectorAll("article").forEach(a => a.remove());

    if (avisFiltres.length === 0) {
        afficherEtatVideAvis(conteneur);
        return;
    }

    avisTries.forEach(unAvis => {
        conteneur.appendChild(remplirFicheAvis(unAvis, modele));
    });
}

function remplirEtoiles(conteneur, note) {
    conteneur.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
        const etoile = document.createElement("img");
        etoile.className = "icone-etoile";

        if (note >= i) {
            etoile.src = "../assets/etoile.svg";
            etoile.alt = "étoile pleine";
        } else if (note >= i - 0.5) {
            etoile.src = "../assets/demie-etoile.svg";
            etoile.alt = "demi étoile";
        } else {
            etoile.src = "../assets/etoile-vide.svg";
            etoile.alt = "étoile vide";
        }

        conteneur.appendChild(etoile);
    }
}

function remplirFicheAvis(avis, modele) {
    const fiche = modele.cloneNode(true);

    const imgAvatar = fiche.querySelector(".img-avatar");
    imgAvatar.src = avis.photoProfil;
    imgAvatar.alt = `photo de profil de ${avis.pseudo}`;

    const conteneurEtoiles = fiche.querySelector(".etoiles-avis");
    remplirEtoiles(conteneurEtoiles, avis.note);

    fiche.querySelector(".valeur-pseudo").textContent = avis.pseudo;
    fiche.querySelectorAll("p")[1].textContent = avis.commentaire;

    const time = fiche.querySelector("time");
    time.textContent = avis.datePublicationCommentaire;

    return fiche;
}

if (document.querySelector(".div-avis")) {
    initAvis();
}


// /* AFFICHER ERREUR *
function afficherErreurAvis(champ, resultat) {
    if (resultat.valide) {
        champ.classList.remove("champ-erreur");
    } else {
        champ.classList.add("champ-erreur");
    }

    let message = champ.parentElement.querySelector(".message");

    if (message) {
        const bonneVariante = resultat.valide
            ? message.classList.contains("message--succes")
            : message.classList.contains("message--erreur");

        if (!bonneVariante) {
            message.remove();
            message = null;
        }
    }

    let classeVariante, role, prefixeTexte;
    if (resultat.valide) {
        classeVariante = "message--succes";
        role = "status";
        prefixeTexte = "Succès —";
    } else {
        classeVariante = "message--erreur";
        role = "alert";
        prefixeTexte = "Erreur —";
    }

    if (!message) {
        message = document.createElement("div");
        message.className = "message " + classeVariante;
        message.setAttribute("role", role);

        const icone = document.createElement("span");
        icone.className = "message__icone";
        icone.setAttribute("aria-hidden", "true");

        const prefixe = document.createElement("span");
        prefixe.className = "message__prefixe";
        prefixe.textContent = prefixeTexte;

        const contenu = document.createElement("span");
        contenu.className = "message__contenu";

        const texte = document.createElement("p");
        texte.className = "message__texte";
        texte.appendChild(prefixe);
        texte.appendChild(document.createTextNode(" "));
        texte.appendChild(contenu);

        message.appendChild(icone);
        message.appendChild(texte);

        champ.after(message);
    }

    const contenu = message.querySelector(".message__contenu");
    contenu.textContent = resultat.message;
}


//// FONCTION NORMALISER LE TEXTE ////

function normaliser(texte) {
    let resultat = texte.toLowerCase();      
    resultat = resultat.normalize('NFD');     
    resultat = resultat.replace(/\p{Diacritic}/gu, ''); 
    return resultat;
}

//// FONCTION CHERCHERLIVRE() /////
function chercherLivres(livres, requete) {
    const requeteNormalisee = normaliser(requete);

    return livres.filter(livre => {
        const titreNormalise = normaliser(livre.titre);
        const auteurNormalise = normaliser(livre.auteur);

        return titreNormalise.includes(requeteNormalisee) || auteurNormalise.includes(requeteNormalisee);
    });
}


///FONCTION AFFICHERLIVRE /////
function afficherLivres(livres) {
    const grilleLivre = document.querySelector(".grille-flex-wrap");
    grilleLivre.innerHTML = "";

    if (!livres || livres.length === 0) {
        afficherEtatVide();
        return;
    }

    livres.forEach(livre => {
        creerCarteLivre(grilleLivre, livre);
    });
}


////// FONCTON AFFICHER ETAT VIDE //////
function afficherEtatVide() {
    const grilleLivre = document.querySelector(".grille-flex-wrap");
    grilleLivre.innerHTML = `
        <p class="etat-vide">Aucun résultat trouvé.</p>
    `;
}

function rafraichirBibliotheque() {
    const requete = champRecherche ? champRecherche.value : "";
    const genre = selectGenre ? selectGenre.value : "tous";
    const critere = selectTri ? selectTri.value : null;

    let resultats = chercherLivres(livres, requete);
    resultats = filtrerParGenre(resultats, genre);
    resultats = trierLivres(resultats, critere);

    afficherLivres(resultats);
}

let livres = [];

const champRecherche = document.querySelector(".search-bar input");
const selectGenre = document.getElementById("select-genre");
const selectTri = document.getElementById("select-tri");

function initialiserFiltres(livres) {

    // Genre
    if (selectGenre) {
        const optionTous = document.createElement("option");
        optionTous.value = "tous";
        optionTous.textContent = "Tous";
        selectGenre.appendChild(optionTous);

        const genresUniques = [...new Set(livres.map(livre => livre.genre))];
        genresUniques.forEach(genre => {
            const option = document.createElement("option");
            option.value = genre;
            option.textContent = genre;
            selectGenre.appendChild(option);
        });
    }

    // Tri
    if (selectTri) {
        const criteres = [
            { valeur: "note-desc", texte: "Note décroissante" },
            { valeur: "titre-az", texte: "Titre de A à Z" },
            { valeur: "annee-desc", texte: "Année décroissante" }
        ];
        criteres.forEach(critere => {
            const option = document.createElement("option");
            option.value = critere.valeur;
            option.textContent = critere.texte;
            selectTri.appendChild(option);
        });
    }
}

async function initialiser() {
    livres = await chargerLivres();

    if (livres === null) {
        return;
    }

    initialiserFiltres(livres);
    rafraichirBibliotheque();
}

if (champRecherche) champRecherche.addEventListener("input", rafraichirBibliotheque);
if (selectGenre) selectGenre.addEventListener("change", rafraichirBibliotheque);
if (selectTri) selectTri.addEventListener("change", rafraichirBibliotheque);