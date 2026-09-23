

//// FONCTION LISTER UTILISATRICES ////

async function listerUtilisatrices() {
    const utilisatrices = await chargerUtilisateurs();
    const idCourante = Number(localStorage.getItem("utilisatriceCourante"));
    const autresUtilisatrices = utilisatrices.filter(u => u.id !== idCourante);

    const amisJSON = localStorage.getItem("amis");
    const listeAmies = amisJSON ? JSON.parse (amisJSON) : [];

    const resultat = autresUtilisatrices.map(u => ({
        ...u,
        estAmie: listeAmies.includes(u.id)
    }));

    return resultat;
}
<<<<<<< HEAD


//// FONCTION AJOUTER AMIE ///
function ajouterAmie(id) {
    const amisJSON = localStorage.getItem("amis");
    const listeAmies = amisJSON ? JSON.parse (amisJSON) : [];

    if (!listeAmies.includes(id)) {
        listeAmies.push(id);
        localStorage.setItem("amis", JSON.stringify(listeAmies));
    }
}

////FONCTION RETIRER AMIE ///
function retirerAmie(id) {
    const amisJSON = localStorage.getItem("amis");
    const listeAmies = amisJSON ? JSON.parse(amisJSON) : [];
    
    const nouvelleListe = listeAmies.filter(a => a !== id);
    localStorage.setItem("amis", JSON.stringify(nouvelleListe));
}


////FONCTION CONSTRUIRE FIL ///

async function construireFil() {
    // Liste des amies (issue de js/amis.js)
    const utilisatrices = await listerUtilisatrices();
    const amies = utilisatrices.filter(u => u.estAmie);
    const idsAmies = amies.map(a => a.id);

    // Sources : JSON + localStorage
    const avisJSON = await chargerAvis();
    const avisLocalJSON = localStorage.getItem("avisLocaux");
    const avisLocaux = avisLocalJSON ? JSON.parse(avisLocalJSON) : [];

    const toutesLesEntrees = [...avisJSON, ...avisLocaux];

    const evenementsNotes = [];
    const evenementsAvis = [];

    // Passe 1 : les notes chiffrées
    for (const entree of toutesLesEntrees) {
        if (idsAmies.includes(entree.idUtilisateur) && entree.note != null) {
            evenementsNotes.push({
                type: "note",
                idAmie: entree.idUtilisateur,
                idLivre: entree.idLivre,
                date: entree.datePublicationCommentaire
            });
        }
    }

    // Passe 2 : les avis écrits
    for (const entree of toutesLesEntrees) {
        if (idsAmies.includes(entree.idUtilisateur) && entree.commentaire) {
            evenementsAvis.push({
                type: "avis",
                idAmie: entree.idUtilisateur,
                idLivre: entree.idLivre,
                date: entree.datePublicationCommentaire
            });
        }
    }

    // Fusion finale
    return [...evenementsNotes, ...evenementsAvis];
}



=======
>>>>>>> 6bf0dc9b535d5f4c2c56e7898376995462b30a8e
