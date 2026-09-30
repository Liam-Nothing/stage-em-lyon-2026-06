
/// FONCTION lireNotes ///////
function lireNotes() {
    const texte = localStorage.getItem("mesNotes");

    // Clé absente : valeur par défaut, pas besoin de parser
    if (texte === null) {
        return {};
    }

    try {
        return JSON.parse(texte);
    } catch (erreur) {
        console.warn("Contenu de 'mesNotes' illisible, réinitialisation :", erreur.message);
        localStorage.removeItem("mesNotes");
        return {};
    }
}


///FONCTION enregistrerNote //////
function enregistrerNote(idLivre, maNote) {
    const notes = lireNotes();
    notes[idLivre] = maNote;
    localStorage.setItem("mesNotes", JSON.stringify(notes));

}


///FONCTION supprimerNote ////
/*function supprimerNote(idLivre) {
    const notes = lireNotes();
    delete notes[idLivre];
    localStorage.setItem("mesNotes", JSON.stringify(notes));
}*/

/// FONCTION lireStatuts ///////
function lireStatuts() {
    const texte = localStorage.getItem("statutsLivres");

    if (texte === null) {
        return {};
    }

    try {
        return JSON.parse(texte);
    } catch (erreur) {
        console.warn("Contenu de 'statutsLivres' illisible, réinitialisation :", erreur.message);
        localStorage.removeItem("statutsLivres");
        return {};
    }
}

/// FONCTION enregistrerStatut ///////
function enregistrerStatut(idLivre, statut) {
    const statuts = lireStatuts();
    statuts[idLivre] = statut;
    localStorage.setItem("statutsLivres", JSON.stringify(statuts));
}