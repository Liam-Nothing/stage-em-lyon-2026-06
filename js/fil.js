
/////////FONCTION CONSTRUIRE FIL ///
async function construireFil(idUtilisateurCourant) {

    // 1. Charger les utilisateurs
    const utilisateurs = await chargerUtilisateurs();

    // 2. Lire la liste des amies depuis le localStorage (robuste)
    const amisJSON = localStorage.getItem("amis");

    let idsAmiesLocalStorage = [];
    try {
        idsAmiesLocalStorage = amisJSON ? JSON.parse(amisJSON) : [];
    } catch {
        idsAmiesLocalStorage = amisJSON ? [amisJSON] : [];
    }

    // 3. Construire la liste des amies
    const idsAmies = utilisateurs
        .filter(u => idsAmiesLocalStorage.includes(u.id))
        .map(u => u.id);

    // 4. Charger les avis
    const avis = await chargerAvis();

    // 5. Garder uniquement les avis des amies
    const avisAmies = avis.filter(a => idsAmies.includes(a.idUtilisateur));

    // 6. Transformer chaque avis en événement + pseudo
    const evenements = avisAmies.map(a => {

        const utilisateur = utilisateurs.find(u => u.id === a.idUtilisateur);

        return {
            type: "avis",
            idAmie: a.idUtilisateur,
            idLivre: a.idLivre,
            date: a.datePublicationCommentaire,
            commentaire: a.commentaire,
            pseudo: utilisateur ? utilisateur.pseudo : "Inconnu"
        };
    });

    // 7. Retirer l'utilisateur courant
    const evenementsSansUtilisateurCourant = evenements.filter(
        (evenement) => evenement.idAmie !== idUtilisateurCourant
    );

    // 8. Convertir les dates françaises → Date JS
    const convertirDate = (dateFr) => {
        const mois = {
            janvier: 0, février: 1, mars: 2, avril: 3, mai: 4, juin: 5,
            juillet: 6, août: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11
        };

        const [jour, moisFr, annee] = dateFr.split(" ");
        return new Date(annee, mois[moisFr], jour);
    };

    // 9. Trier du plus récent au plus ancien
    const evenementsTries = evenementsSansUtilisateurCourant.sort(
        (a, b) => convertirDate(b.date) - convertirDate(a.date)
    );

    // 10. Limiter à 30 événements
    const evenementsLimites = evenementsTries.slice(0, 30);

    return evenementsLimites;
}



///////// AFFICHER LE FIL D'ACTUALITÉ /////////
async function afficherFil(idUtilisateurCourant) {

    // 1. Récupérer la div où mettre les cartes
    const conteneurFil = document.getElementById("fil");

    // 2. Récupérer les événements, les utilisateurs et les livres
    // (le squelette de chargement reste affiché dans #fil pendant ces fetch)
    const evenements = await construireFil(idUtilisateurCourant);
    const utilisateurs = await chargerUtilisateurs();
    const livres = await chargerLivres();

    // On ne vide le conteneur qu'une fois les données prêtes,
    // ce qui remplace le squelette par le vrai contenu (ou le message vide).
    conteneurFil.innerHTML = "";

    // 3. Si aucun événement, afficher un message
    if (evenements.length === 0) {
        const message = document.createElement("p");
        message.textContent = "Aucune activité pour le moment.";
        conteneurFil.appendChild(message);
        return;
    }

    // 4. Créer une carte pour chaque événement
    for (const evenement of evenements) {

        // Retrouver l'ami et le livre correspondants
        const ami = utilisateurs.find(u => u.id === evenement.idAmie);
        const livre = livres.find(l => l.id === evenement.idLivre);

        // ----- La carte -----
        const carte = document.createElement("div");
        carte.classList.add("carte-avis");

        // ----- Photo de profil -----
        const photoProfil = document.createElement("img");
        photoProfil.classList.add("carte-photo-profil");
        if (ami && ami.photoProfil) {
            photoProfil.src = ami.photoProfil;
        } else {
            photoProfil.src = "images/profil-defaut.png";
        }
        photoProfil.alt = "Photo de profil de " + evenement.pseudo;

        // ----- Bloc de texte à droite de la photo -----
        const contenu = document.createElement("div");
        contenu.classList.add("carte-contenu");

        const pseudo = document.createElement("p");
        pseudo.classList.add("carte-pseudo");
        pseudo.textContent = evenement.pseudo + " a posté un avis";

        const date = document.createElement("p");
        date.classList.add("carte-date");
        date.textContent = evenement.date;

        const titreLivre = document.createElement("p");
        titreLivre.classList.add("carte-titre-livre");
        if (livre) {
            titreLivre.textContent = livre.titre;
        }

        const commentaire = document.createElement("p");
        commentaire.classList.add("carte-commentaire");
        commentaire.textContent = evenement.commentaire;

        contenu.appendChild(pseudo);
        contenu.appendChild(date);
        contenu.appendChild(titreLivre);
        contenu.appendChild(commentaire);

        // ----- Assembler la carte -----
        carte.appendChild(photoProfil);
        carte.appendChild(contenu);

        // Ajouter la carte dans le fil
        conteneurFil.appendChild(carte);
    }
}

afficherFil(1);


/*async function afficherFil(idUtilisateurCourant) {

    // 1. Récupérer la div où mettre les cartes
    const conteneurFil = document.getElementById("fil");

    // 2. Vider le fil (pour éviter les doublons si on rappelle la fonction)
    conteneurFil.innerHTML = "";

    // 3. Récupérer les événements construits par ta fonction
    const evenements = await construireFil(idUtilisateurCourant);

    // 4. Si aucun événement, afficher un message
    if (evenements.length === 0) {
        const message = document.createElement("p");
        message.textContent = "Aucune activité pour le moment.";
        conteneurFil.appendChild(message);
        return;
    }

    // 5. Créer une carte pour chaque événement
    for (const evenement of evenements) {

        // La carte
        const carte = document.createElement("div");
        carte.classList.add("carte-avis");

        // Le pseudo de l'ami
        const pseudo = document.createElement("p");
        pseudo.classList.add("carte-pseudo");
        pseudo.textContent = evenement.pseudo + " a posté un avis";

        // La date
        const date = document.createElement("p");
        date.classList.add("carte-date");
        date.textContent = evenement.date;

        // Le commentaire
        const commentaire = document.createElement("p");
        commentaire.classList.add("carte-commentaire");
        commentaire.textContent = evenement.commentaire;


        // Ajouter les éléments dans la carte
        carte.appendChild(pseudo);
        carte.appendChild(date);
        carte.appendChild(commentaire);

        // Ajouter la carte dans le fil
        conteneurFil.appendChild(carte);
    }
}

// Lancer l'affichage au chargement de la page
// Remplace 1 par l'id de ton utilisateur courant
afficherFil(1);*/