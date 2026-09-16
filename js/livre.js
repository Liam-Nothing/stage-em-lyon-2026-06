

async function initLivre() {
    let parametres = new URLSearchParams(window.location.search);
    let id = parametres.get("id");
    
    console.log("id lu dans l'URL :", id);
    
    if (id === null) {
    afficherErreur();
    return;
  }
   let livres = await chargerLivres();

   let livre = trouverLivre(livres, id);

    if (livre === undefined) {
    afficherErreur();
    return;
  }
afficherLivre(livre);
}

function trouverLivre(livres, id) {
  return livres.find(livre => livre.id === id);
}

function afficherErreur() {
  document.querySelector(".div-row.container.fil-activite").innerHTML = `
    <p>Livre introuvable.</p>
    <a href="bibliotheque.html">Retour à la bibliothèque</a>
  `;
}


//livre.html?id=0003