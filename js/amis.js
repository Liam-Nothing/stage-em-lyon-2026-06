

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


////FONCTION MESSAGE ERREUR////
/*function afficherPasDamies() {
  document.querySelector("main").innerHTML = `
    <p>Ton fil est vide pour l'instant.</p>
    <p>Ajoute des amis pour voir leurs notes et avis apparaître ici.</p>
    <a href="../profil/profil.html">Ajouter une amie</a>
  `;
}

function afficherPasActivite() {
  document.querySelector("main").innerHTML = `
    <p>Rien de nouveau pour le moment.</p>
    <p>Tes amis n'ont pas encore partagé de note ou d'avis.</p>
  `;
}

function afficherFilVide(amis, evenements) {
  if (evenements.length > 0) {
    return;
  }

  if (amis.length === 0) {
    afficherPasDamies();
  } else {
    afficherPasActivite();
  }
}*/


////FONCTION TRIER PAR DATE/////
/*function getFilAffiche(evenements, idUtilisateurCourant) {
  const evenementsSansUtilisateurCourant = evenements.filter(
    (evenement) => evenement.userId !== idUtilisateurCourant
  );

  const evenementsTries = evenementsSansUtilisateurCourant.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const evenementsLimites = evenementsTries.slice(0, 30);

  return evenementsLimites;
}*/
