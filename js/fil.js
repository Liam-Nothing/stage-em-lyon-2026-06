

////FONCTION CONSTRUIRE FIL ///


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




