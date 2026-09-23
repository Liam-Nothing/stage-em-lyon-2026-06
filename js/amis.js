

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



function afficherPasDamies() {
  document.querySelector("main").innerHTML = `
    <p>Ton fil est vide pour l'instant.</p>
    <p>Ajoute des amies pour voir leurs notes et avis apparaître ici.</p>
    <a href="../amis/ajouter.html">Ajouter une amie</a>
  `;
}

function afficherPasActivite() {
  document.querySelector("main").innerHTML = `
    <p>Rien de nouveau pour le moment.</p>
    <p>Tes amies n'ont pas encore partagé de note ou d'avis. Reviens un peu plus tard.</p>
  `;
}

function afficherFilVide(amis, evenements) {
  if (evenements.length > 0) return;
  amis.length === 0 ? afficherPasDamies() : afficherPasActivite();
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