
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

////FONCTION TRIER PAR DATE/////
function getFilAffiche(evenements, idUtilisateurCourant) {
  const evenementsSansUtilisateurCourant = evenements.filter(
    (evenement) => evenement.userId !== idUtilisateurCourant
  );

  const evenementsTries = evenementsSansUtilisateurCourant.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const evenementsLimites = evenementsTries.slice(0, 30);

  return evenementsLimites;
}