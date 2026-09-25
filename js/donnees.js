
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
    try {
        const reponse = await fetch(chemin);

        // Réponse HTTP en erreur (404, 500, etc.)
        if (!reponse.ok) {
            throw new Error(`Statut ${reponse.status} en tentant de charger "${chemin}"`);
        }

        // JSON malformé : .json() lève une erreur si le parsing échoue
        try {
            return await reponse.json();
        } catch (erreurParsing) {
            throw new Error(`Le fichier "${chemin}" ne contient pas un JSON valide`);
        }

    } catch (erreur) {
        const message = `Chargement impossible pour "${chemin}" : ${erreur.message}`;
        console.error(message);
        afficherErreurChargement(message);
        return null;
    }
}

// Affiche un message visible dans la page plutôt que de la laisser blanche
function afficherErreurChargement(message) {
    const conteneur = document.getElementById("contenu") || document.body;
    const alerte = document.createElement("div");
    alerte.className = "erreur-chargement";
    alerte.setAttribute("role", "alert");
    alerte.textContent = `⚠️ ${message}`;
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

function formaterDateJJMMAAAA(dateTexte) {
    return parserDateFrancaise(dateTexte).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "UTC"
    });
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
        afficherErreur();
        return;
    }
 
    // Étape 3 : charger les avis depuis le JSON
    let aviss = await chargerAvis();
 
    // Étape 3bis (AJOUTÉ) : fusionner avec les avis enregistrés en local
    // par l'utilisateur (via la pop-up "Ajouter un avis")
    let avisLocaux = [];
    try {
        avisLocaux = JSON.parse(localStorage.getItem("avis")) || [];
    } catch (erreur) {
        console.warn("Clé 'avis' illisible :", erreur.message);
    }
    aviss = aviss.concat(avisLocaux);
 
    // Étape 4 : chercher l'avis correspondant à l'id
    let avisFiltres = avisDuLivre(aviss, idLivre);
 
    // Étape 6 : afficher l'avis trouvé
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

function remplirFicheAvis(avis, modele) {
    const fiche = modele.cloneNode(true);

    const imgAvatar = fiche.querySelector(".img-avatar");
    imgAvatar.src = `★ ${avis.note}/5`;
    imgAvatar.alt = `note ${avis.note} étoiles`;

    const img = fiche.querySelector("img");
    img.src = `★ ${avis.note}/5`;
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

function initFormulaireAvis() {
    const form = document.querySelector(".div-formulaire-avis form");
    if (!form) return;

    form.addEventListener("submit", (evenement) => {
        evenement.preventDefault();

        const champTexte = form.querySelector("#message-avis");
        const champNote = form.querySelector('input[name="note"]:checked');
        const note = champNote ? Number(champNote.value) : null;

        const resultat = validerAvis(champTexte.value, note);
        afficherErreurAvis(champTexte, resultat);

        if (resultat.valide) {
            // envoi / ajout de l'avis
            form.reset();
        }
    });
}


//// FONCTION NORMALISER LE TEXTE ////

function normaliser(texte) {
    return texte
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

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

function afficherErreurChargement(message) {
    const grilleLivre = document.querySelector(".grille-flex-wrap");
    grilleLivre.innerHTML = `<p class="erreur-chargement" role="alert">⚠️ ${message}</p>`;
}

function rafraichirBibliotheque() {
    const requete = champRecherche ? champRecherche.value : "";
    const genre = selectGenre ? selectGenre.value : "tous";
    const critere = selectTri ? selectTri.value : null;

    let resultats = chercherLivres(livres, requete);
    resultats = filtrerParGenre(resultats, genre);
    resultats = trierLivres(resultats, critere);

    if (resultats.length === 0) {
        afficherEtatVide();
    } else {
        afficherLivres(resultats);
    }
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
        afficherErreurChargement("Impossible de charger la bibliothèque. Réessaie plus tard.");
        return;
    }

    initialiserFiltres(livres);
    rafraichirBibliotheque();
}

if (champRecherche) champRecherche.addEventListener("input", rafraichirBibliotheque);
if (selectGenre) selectGenre.addEventListener("change", rafraichirBibliotheque);
if (selectTri) selectTri.addEventListener("change", rafraichirBibliotheque);