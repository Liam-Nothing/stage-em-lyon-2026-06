
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

if (document.querySelector(".div-formulaire-avis")) {
    initFormulaireAvis();
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
    grilleLivre.innerHTML = ""; // on vide la grille avant de la remplir

    livres.forEach(livre => {
        creerCarteLivre(grilleLivre, livre);

    });
}


////// FONCTON AFFICHER ETAT VIDE //////
function afficherEtatVide() {
    const grilleLivre = document.querySelector(".grille-flex-wrap");
    grilleLivre.innerHTML = `<p class="etat-vide">Aucun résultat trouvé</p>`;

    grilleLivre.querySelector(".btn-reinitialiser").addEventListener("click", () => {
        champRecherche.value = "";
        selectGenre.value = "tous";
        selectTri.selectedIndex = 0;
        rafraichirBibliotheque();
    });
}

function rafraichirBibliotheque() {
    const requete = champRecherche.value;
    const genre = selectGenre.value;
    const critere = selectTri.value;

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


function initialiserFiltres(livres) {

    // Genre
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

    // Tri
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

async function initialiser() {
    livres = await chargerLivres();
    initialiserFiltres(livres);
    rafraichirBibliotheque();
}

champRecherche.addEventListener("input", rafraichirBibliotheque);
selectGenre.addEventListener("change", rafraichirBibliotheque);
selectTri.addEventListener("change", rafraichirBibliotheque);

initialiser();