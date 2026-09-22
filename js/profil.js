// --- Fiche profil ---

async function initProfil() {
  // Étape 1 : lire l'id dans l'URL
  let parametres = new URLSearchParams(window.location.search);
  let id = parametres.get("id");
  console.log("id lu dans l'URL :", id);

  // Étape 2 : gérer le cas "id absent"
  if (id === null) {
    afficherErreur();
    return;
  }

  // Étape 3 : charger les profils depuis le JSON
  let amis = await chargerUtilisateurs();

  // Étape 4 : chercher le profil correspondant à l'id
  let ami = trouverUtilisateur(amis, id);

  // Étape 5 : gérer le cas "id inconnu"
  if (ami === undefined) {
    afficherErreur();
    return;
  }

  // Étape 6 : afficher le profil trouvé
  remplirFicheProfil(ami);
}

async function chargerUtilisateurs() {
    return chargerDonnees("../data/utilisateurs.json");
}

function trouverUtilisateur(amis, id) {
  return amis.find(ami => ami.id === id);
}

function afficherErreur() {
  document.querySelector(".div-row.container.fil-activite").innerHTML = `
    <p>Profil introuvable.</p>
    <a href="../profil/profil.html">Retour à ton profil</a>
  `;
}

function afficherProfils(amis) {
    const grilleProfil = document.querySelector(".grille-flex-wrap");
    grilleProfil.innerHTML = "";
    
    amis.forEach(ami => {
        creerCarteProfil(grilleProfil, ami); 
    });
}

function creerCarteProfil(grilleProfil, ami) {
  let carteProfil = document.createElement("div");
  carteProfil.className = "div-couverture-colomn-index";
  grilleProfil.appendChild(carteProfil);

  let lienProfil = document.createElement("a");
  lienProfil.href = `../profil/profil.html?id=${ami.id}`;
  carteProfil.appendChild(lienProfil);

  /*let couvertureLivre = document.createElement("img");
  couvertureLivre.src = livre.couvertureLivre;
  couvertureLivre.alt = livre.titre;
  lienLivre.appendChild(couvertureLivre);*/

  let pseudo = document.createElement("h5");
  pseudo.textContent = ami.pseudo;
  carteProfil.appendChild(pseudo);

  let biographie = document.createElement("p");
  biographie.textContent = ami.biographie;
  carteProfil.appendChild(biographie);

  return carteProfil;
}

function remplirFicheProfil(ami) {
  document.querySelector(".pseudo").textContent = ami.pseudo;
  document.querySelector(".biographie").textContent = ami.biographie;
}

document.addEventListener("DOMContentLoaded", initProfil);