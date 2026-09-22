
//// FONCTION VALIDER AVIS (pour le formulaire////


const LONGUEUR_MIN = 10;
const LONGUEUR_MAX = 1000;

function refus(message) {
    return { valide: false, message };
}

function validerAvis(texte, note) {
    const contenu = typeof texte === "string" ? texte.trim() : "";
    const taille = contenu.length;

    if (taille === 0) return refus("Saisie vide : parlez de votre lecture");
    if (taille < LONGUEUR_MIN) return refus(`Saisie trop courte : elle doit contenir au moins ${LONGUEUR_MIN} caractères`);
    if (taille > LONGUEUR_MAX) return refus(`Saisie trop longue : elle ne doit pas dépasser ${LONGUEUR_MAX} caractères`);

    return { valide: true, message: "Saisie correcte" };
}




/*let avis = [{
    "avis": {
        "0002": {
            "pseudo": "Chema-mystery",
            "commentaire": "Très rythmé et plein de twists, c'est le genre de livre qui donne envie de lire la suite immédiatement. L'ambiance \"jeu d'héritage\" fonctionne super bien.",
            "datePublicationCommentaire": "juin 2026",
        }
    }
}
]*/

//JSON.stringify(avis);
//localStorage.setItem("avis", JSON.stringify(avis));
;

//// FONCTION LIRE AVIS : fusionne data/avis.json et le localStorage ////

async function lireAvis(idLivre) {
    let avisJson = [];
    try {
        const reponse = await fetch("../data/avis.json"); // "../data/avis.json" si ta page est dans un sous-dossier
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
        p.textContent = a.pseudo + " : " + a.commentaire;
        conteneur.appendChild(p);
    }
}


//// FONCTION ENREGISTRER AVIS ////

function enregistrerAvis(idLivre, commentaire) {
    let avis = [];
    try {
        avis = JSON.parse(localStorage.getItem("avis")) || [];
    } catch (erreur) {
        console.warn("Clé 'avis' illisible :", erreur.message);
    }

    avis.push({
        pseudo: "moi", // à remplacer par le pseudo de l'utilisateur courant
        idLivre: idLivre,
        commentaire: commentaire,
        datePublicationCommentaire: new Date().toISOString()
    });

    localStorage.setItem("avis", JSON.stringify(avis));
}








// LISTE DEROULANTE //
// ---- Menu déroulant d'étagère ----
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