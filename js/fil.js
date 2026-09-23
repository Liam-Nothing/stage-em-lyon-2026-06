

////FONCTION CONSTRUIRE FIL ///

//import { chargerUtilisateurs, chargerAvis } from "./donnees.js";

async function construireFil() {

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

    // 6. Transformer chaque avis en événement
    const evenements = avisAmies.map(a => ({
        type: "avis",
        idAmie: a.idUtilisateur,
        idLivre: a.idLivre,
        date: a.datePublicationCommentaire,
        commentaire: a.commentaire
    }));

    return evenements;
}



