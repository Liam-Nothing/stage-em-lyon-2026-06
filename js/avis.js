
//// FONCTION VALIDER AVIS (pour le formulaire)////
const LONGUEUR_MIN = 10;
const LONGUEUR_MAX = 100;

function refus(message) {
    return { valide: false, message };
}

function validerAvis(texte, note) {
    let contenu = "";
    if (typeof texte === "string") {
        contenu = texte.trim();
    }

    const taille = contenu.length;

    if (taille === 0) {
        return refus("Saisie vide : parlez de votre lecture");
    }

    if (taille < LONGUEUR_MIN) {
        return refus("Saisie trop courte : elle doit contenir au moins " + LONGUEUR_MIN + " caractères");
    }

    if (taille > LONGUEUR_MAX) {
        return refus("Saisie trop longue : elle ne doit pas dépasser " + LONGUEUR_MAX + " caractères");
    }

    return { valide: true, message: "Saisie correcte" };
}



//// FONCTION LIRE AVIS : fusionne data/avis.json et le localStorage ////
async function lireAvis(idLivre) {
    let avisJson = [];
    try {
        const reponse = await fetch("../data/avis.json");
        avisJson = await reponse.json();
    } catch (erreur) {
        console.warn("../data/avis.json illisible :", erreur.message);
    }

    let avisLocaux = [];
    try {
        avisLocaux = JSON.parse(localStorage.getItem("avis")) || [];
    } catch (erreur) {
        console.warn("Clé 'avis' illisible :", erreur.message);
    }

    return avisJson.concat(avisLocaux).filter(a => a.idLivre === idLivre);
}


//// FONCTION AFFICHER AVIS ////
async function afficherAvis(idLivre) {
    const conteneur = document.querySelector(".liste-avis");
    conteneur.innerHTML = "";

    const avis = await lireAvis(idLivre);

    for (const a of avis) {
        const p = document.createElement("p");

        // On construit le texte petit à petit pour gérer les infos manquantes
        let texte = a.pseudo + " : " + a.commentaire;

        if (a.note) {
            texte += " (note : " + a.note + "/5)";
        }
        if (a.dateFinLecture) {
            texte += " — lu le " + a.dateFinLecture;
        }

        p.textContent = texte;
        conteneur.appendChild(p);
    }
}

const MOIS_FR_LISTE = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"
];

function dateActuelleEnFrancais() {
    const aujourdHui = new Date();
    const jour = aujourdHui.getDate();
    const mois = MOIS_FR_LISTE[aujourdHui.getMonth()];
    const annee = aujourdHui.getFullYear();
    return `${jour} ${mois} ${annee}`;
}

//// FONCTION ENREGISTRER AVIS ////
function enregistrerAvis(idLivre, commentaire, note) {
    let avis = [];
    try {
        avis = JSON.parse(localStorage.getItem("avis")) || [];
    } catch (erreur) {
        console.warn("Clé 'avis' illisible :", erreur.message);
    }

    avis.push({
        pseudo: "moi",
        idLivre: idLivre,
        commentaire: commentaire,
        note: Number(note),
        datePublicationCommentaire: dateActuelleEnFrancais(),
        photoProfil: "images/avatar-defaut.png" // adapte le chemin à ton vrai avatar par défaut
    });

    localStorage.setItem("avis", JSON.stringify(avis));
}


// MENU/LISTE DEROULANTE //
function initEtagere(root) {
    const trigger = root.querySelector('.shelf__trigger');
    const label = root.querySelector('.shelf__label');
    const menu = root.querySelector('.shelf__menu');
    const items = [...menu.querySelectorAll('.shelf__item')];
    const radios = items.filter(i => i.getAttribute('role') === 'menuitemradio');

    const isOpen = () => !menu.hidden;

    function open(focusIndex = null) {
        menu.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
        if (focusIndex !== null) {
            const start = radios.findIndex(r => r.getAttribute('aria-checked') === 'true');
            items[focusIndex === 'selected' ? Math.max(start, 0) : focusIndex].focus();
        }
    }

    function close(returnFocus = false) {
        menu.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
        if (returnFocus) trigger.focus();
    }

    function choose(item) {
        if (item.dataset.action) {
            root.dispatchEvent(new CustomEvent('shelf-action', { bubbles: true, detail: item.dataset.action }));
        } else {
            radios.forEach(r => r.setAttribute('aria-checked', String(r === item)));
            label.textContent = item.textContent.trim();
            root.dispatchEvent(new CustomEvent('shelf-change', { bubbles: true, detail: item.dataset.value }));
        }
        close(true);
    }

    trigger.addEventListener('click', () => (isOpen() ? close() : open()));

    trigger.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            open(e.key === 'ArrowUp' ? items.length - 1 : 'selected');
        }
    });

    menu.addEventListener('click', e => {
        const item = e.target.closest('.shelf__item');
        if (item) choose(item);
    });

    menu.addEventListener('keydown', e => {
        const i = items.indexOf(document.activeElement);
        switch (e.key) {
            case 'ArrowDown': e.preventDefault(); items[(i + 1) % items.length].focus(); break;
            case 'ArrowUp': e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); break;
            case 'Home': e.preventDefault(); items[0].focus(); break;
            case 'End': e.preventDefault(); items[items.length - 1].focus(); break;
            case 'Enter':
            case ' ': e.preventDefault(); if (i >= 0) choose(items[i]); break;
            case 'Escape': e.preventDefault(); close(true); break;
            case 'Tab': close(); break;
        }
    });

    // Fermer au clic à l'extérieur
    document.addEventListener('click', e => {
        if (isOpen() && !root.contains(e.target)) close();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.shelf').forEach(initEtagere);
});



// ---- Pop-up ---- //
// ============================================
// POP-UP "AJOUTER UN AVIS" - Version simple
// ============================================
// Ce script fait 2 choses :
// 1. Quand on clique sur "Lu" dans le menu, on affiche la pop-up
// 2. Les boutons "Annuler" et "Publier" permettent de la refermer

// On attend que la page soit entièrement chargée avant de commencer
document.addEventListener('DOMContentLoaded', function () {

  // ---- On récupère les éléments dont on a besoin ----
  // (Il faut que ces éléments existent déjà dans ton HTML, voir plus bas)
  const overlay = document.getElementById('avis-modal-overlay');
  const boutonAnnuler = document.getElementById('avis-modal-annuler');
  const formulaire = document.getElementById('avis-modal-formulaire');

  // L'élément <div class="shelf"> qui contient tout le menu déroulant
  const etagere = document.getElementById('etagere');

  // ---- On récupère l'identifiant du livre depuis l'URL ----
  // Si ton URL ressemble à : livre.html?id=42
  // alors idLivre vaudra "42"
  // (adapte "id" si ton paramètre s'appelle autrement dans l'URL)
  const parametresURL = new URLSearchParams(window.location.search);
  // Pas de Number(...) ici : tout le reste du site (voir trouverLivre()
  // dans livre.js) traite l'id comme du texte, pas comme un nombre.
  // Il faut rester cohérent pour que les comparaisons "===" fonctionnent
  // aussi bien avec data/avis.json qu'avec le localStorage.
  const idLivre = parametresURL.get('id');

  // ---- Récupère TOUS les avis (tous livres confondus), sans filtrer ----
  // afficherAvisDuLivre() se charge lui-même de filtrer par idLivre.
  // On réutilise chargerAvis(), qui existe déjà et fonctionne pour le
  // chargement initial de la page, plutôt que de dupliquer un fetch.
  async function recupererTousLesAvis() {
    const avisJson = (await chargerAvis()) || [];

    let avisLocaux = [];
    try {
      avisLocaux = JSON.parse(localStorage.getItem("avis")) || [];
    } catch (erreur) {
      console.warn("Clé 'avis' illisible :", erreur.message);
    }

    return avisJson.concat(avisLocaux);
  }

  // ---- Fonction pour AFFICHER la pop-up ----
  function ouvrirPopup() {
    overlay.classList.add('visible');
    // On déplace le focus dans la pop-up, sinon un utilisateur au clavier
    // resterait "bloqué" sur le bouton du menu, invisible derrière l'overlay
    document.getElementById('message-avis').focus();
  }

  // ---- Fonction pour CACHER la pop-up ----
  function fermerPopup() {
    overlay.classList.remove('visible');
    // On redonne le focus au bouton du menu, pour ne pas le perdre
    etagere.querySelector('.shelf__trigger').focus();
  }

  // ---- La touche Échap ferme la pop-up, comme pour le menu déroulant ----
  document.addEventListener('keydown', function (evenement) {
    if (evenement.key === 'Escape' && overlay.classList.contains('visible')) {
      fermerPopup();
    }
  });

  // ---- Quand on choisit "Lu" dans le menu (souris OU clavier), on ouvre la pop-up ----
  // initEtagere() émet toujours "shelf-change" à la sélection, quelle que
  // soit la méthode utilisée (clic, ou Entrée/Espace au clavier) — donc
  // écouter cet évènement plutôt que "click" couvre les deux cas.
  if (etagere) {
    etagere.addEventListener('shelf-change', function (evenement) {
      if (evenement.detail === 'lu') {
        ouvrirPopup();
      }
    });
  }

  // ---- Quand on clique sur "Annuler", on ferme la pop-up ----
  boutonAnnuler.addEventListener('click', fermerPopup);

  // ---- Quand on clique en dehors de la fenêtre (sur le fond sombre) ----
  overlay.addEventListener('click', function (evenement) {
    // On vérifie qu'on a cliqué directement sur le fond, pas sur le formulaire
    if (evenement.target === overlay) {
      fermerPopup();
    }
  });

  // ---- Quand on soumet le formulaire (clic sur "Publier") ----
  formulaire.addEventListener('submit', async function (evenement) {
    // On empêche la page de se recharger (comportement par défaut d'un formulaire)
    evenement.preventDefault();

    // On récupère le commentaire saisi par l'utilisateur
    const champMessage = document.getElementById('message-avis');
    const message = champMessage.value;

    // On récupère l'étoile cochée (note-etoile est un groupe de radios)
    const noteCochee = formulaire.querySelector('input[name="note"]:checked');
    const note = noteCochee ? Number(noteCochee.value) : null;

    // ---- Validation (reprise de initFormulaireAvis, qui ne doit PLUS
    // être appelée ailleurs pour éviter d'avoir deux gestionnaires sur
    // le même formulaire) ----
    const resultat = validerAvis(message, note);
    afficherErreurAvis(champMessage, resultat);

    // Si le texte n'est pas valide (trop court, trop long, vide),
    // on arrête ici : pas d'enregistrement, la pop-up reste ouverte
    // pour que l'utilisateur corrige.
    if (!resultat.valide) {
      return;
    }

    // 1. On sauvegarde le nouvel avis dans le localStorage
    enregistrerAvis(idLivre, message, note);

    // 2. On récupère TOUS les avis (data/avis.json + localStorage, non filtrés)
    //    puis on demande à ta fonction existante de générer les vraies cartes
    const tousLesAvis = await recupererTousLesAvis();

    // ---- Logs temporaires pour déboguer, à retirer une fois que ça marche ----
    console.log('idLivre utilisé pour filtrer :', idLivre, typeof idLivre);
    console.log('Tous les avis récupérés :', tousLesAvis);
    console.log('Un exemple d\'idLivre dans les avis :', tousLesAvis[0]?.idLivre, typeof tousLesAvis[0]?.idLivre);

    afficherAvisDuLivre(tousLesAvis, idLivre);

    // 3. On vide le formulaire pour la prochaine fois
    formulaire.reset();

    fermerPopup();
  });

});