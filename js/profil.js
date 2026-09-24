// --- Fiche profil ---

async function initProfil() {
  let parametres = new URLSearchParams(window.location.search);
  let id = parametres.get("id");

  if (id === null) {
    id = "user-456"; 
  }

  let utilisateurs = await chargerUtilisateurs();
  let avis = await chargerAvis();

  let utilisateur = trouverUtilisateur(utilisateurs, id);

  if (utilisateur === undefined) {
    afficherErreur();
    return;
  }

  remplirFicheProfil(utilisateur, avis, utilisateurs);
}

async function chargerUtilisateurs() {
  return chargerDonnees("../data/utilisateurs.json");
}

async function chargerAvis() {
  return chargerDonnees("../data/avis.json");
}

function trouverUtilisateur(utilisateurs, id) {
  return utilisateurs.find(u => u.id === id);
}

function afficherErreur() {
  document.querySelector("main").innerHTML = `
    <p>Profil introuvable.</p>
    <a href="../profil/profil.html">Retour à ton profil</a>
  `;
}

function remplirFicheProfil(utilisateur, tousLesAvis, tousLesUtilisateurs) {
  document.querySelector(".photo-profil").src = utilisateur.photoProfil;
  document.querySelector(".pseudo").textContent = `Salut ${utilisateur.pseudo}!`;
  document.querySelector(".biographie").textContent = utilisateur.biographie;

  document.querySelector(".stat-lu").textContent = utilisateur.statLu;
  document.querySelector(".stat-en-cours").textContent = utilisateur.statEnCours;
  document.querySelector(".stat-pile-a-lire").textContent = utilisateur.statPileALire;

  let avisDeCetUtilisateur = tousLesAvis.filter(a => a.idUtilisateur === utilisateur.id);
  afficherAvis(avisDeCetUtilisateur);

  afficherListesAmies(utilisateur, tousLesUtilisateurs);
}

function afficherAvis(listeAvis) {
  const conteneurAvis = document.querySelector(".liste-avis");
  conteneurAvis.innerHTML = "";

  if (listeAvis.length === 0) {
    conteneurAvis.innerHTML = "<p>Aucun avis pour le moment.</p>";
    return;
  }

  listeAvis.forEach(avis => {
    creerCarteAvis(conteneurAvis, avis);
  });
}

function creerCarteAvis(conteneur, avis) {
  let article = document.createElement("article");
  article.className = "carte-avis";
  conteneur.appendChild(article);

  let texteZone = document.createElement("div");
  article.appendChild(texteZone);

  let commentaire = document.createElement("p");
  commentaire.textContent = avis.commentaire;
  texteZone.appendChild(commentaire);

  let ligneNoteDate = document.createElement("p");
  ligneNoteDate.className = "ligne-note-date";
  texteZone.appendChild(ligneNoteDate);

  let note = document.createElement("span");
  note.className = "note";
  note.textContent = `★ ${avis.note}/5`;
  ligneNoteDate.appendChild(note);

  let date = document.createElement("span");
  date.textContent = `lu en ${avis.datePublicationCommentaire}`;
  ligneNoteDate.appendChild(date);

  let couverture = document.createElement("img");
  couverture.src = avis.couverture;
  couverture.alt = "couverture livre";
  article.appendChild(couverture);

  return article;
}

function afficherListesAmies(utilisateur, tousLesUtilisateurs) {
  const cleStockage = `amis-${utilisateur.id}`;


  let idsAmis = chargerAmisDepuisStockage(cleStockage, utilisateur.amis || []);

  function rafraichirListes() {
    let amisActuels = idsAmis
      .map(id => trouverUtilisateur(tousLesUtilisateurs, id))
      .filter(a => a !== undefined);

    let recommandes = tousLesUtilisateurs
      .filter(u => u.id !== utilisateur.id && !idsAmis.includes(u.id))
      .slice(0, 4);

    afficherCartesAmis(".liste-amies-actuelles", amisActuels, "retirer", (idAmi) => {
      idsAmis = idsAmis.filter(id => id !== idAmi);
      sauvegarderAmis(cleStockage, idsAmis);
      rafraichirListes();
    });

    afficherCartesAmis(".liste-amies-recommandees", recommandes, "ajouter", (idAmi) => {
      idsAmis.push(idAmi);
      sauvegarderAmis(cleStockage, idsAmis);
      rafraichirListes();
    });
  }

  rafraichirListes();
}

function chargerAmisDepuisStockage(cle, listeParDefaut) {
  try {
    let donneesStockees = localStorage.getItem(cle);
    if (donneesStockees === null) {
      return [...listeParDefaut];
    }
    return JSON.parse(donneesStockees);
  } catch (erreur) {
    console.error("Erreur de lecture du localStorage :", erreur);
    return [...listeParDefaut];
  }
}

function sauvegarderAmis(cle, idsAmis) {
  try {
    localStorage.setItem(cle, JSON.stringify(idsAmis));
  } catch (erreur) {
    console.error("Erreur d'écriture dans le localStorage :", erreur);
  }
}

function afficherCartesAmis(selecteur, listeUtilisateurs, typeBouton, surClicBouton) {
  const conteneur = document.querySelector(selecteur);
  conteneur.innerHTML = "";

  if (listeUtilisateurs.length === 0) {
    conteneur.innerHTML = typeBouton === "retirer"
      ? "<p>Aucune ami pour le moment.</p>"
      : "<p>Aucune recommandation pour le moment.</p>";
    return;
  }

  listeUtilisateurs.forEach(personne => {
    creerCarteProfil(conteneur, personne, typeBouton, surClicBouton);
  });
}

function creerCarteProfil(conteneur, personne, typeBouton, surClicBouton) {
  let carteProfil = document.createElement("div");
  carteProfil.className = "div-couverture-colomn-index";
  conteneur.appendChild(carteProfil);

  let lienProfil = document.createElement("a");
  lienProfil.href = `../profil/profil.html?id=${personne.id}`;
  carteProfil.appendChild(lienProfil);

  let photo = document.createElement("img");
  photo.src = personne.photoProfil;
  photo.alt = personne.pseudo;
  lienProfil.appendChild(photo);

  let pseudo = document.createElement("h5");
  pseudo.textContent = personne.pseudo;
  carteProfil.appendChild(pseudo);

  let biographie = document.createElement("p");
  biographie.textContent = personne.biographie;
  carteProfil.appendChild(biographie);

  let bouton = document.createElement("button");
  if (typeBouton === "retirer") {
    bouton.textContent = "Retirer";
    bouton.className = "bouton-retirer";
  } else {
    bouton.textContent = "Ajouter en ami";
    bouton.className = "bouton-ajouter";
  }
  bouton.addEventListener("click", () => surClicBouton(personne.id)); 
  carteProfil.appendChild(bouton);

  return carteProfil;
}  

document.addEventListener("DOMContentLoaded", initProfil);