
/// FONCTION lireNotes ///////
function lireNotes() {
    try {
        const texte = localStorage.getItem("mesNotes");
        return JSON.parse(texte) || {};
    } catch (erreur) {
        console.warn("Contenu de 'mesNotes' illisible, réinitialisation :", erreur.message);
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
function supprimerNote(idLivre) {
    const notes = lireNotes();
    delete notes[idLivre];
    localStorage.setItem("mesNotes", JSON.stringify(notes));
}