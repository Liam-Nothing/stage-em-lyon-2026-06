
/// FONCTION lireNotes ///////

/*const mesNotes = {
    "mesNotes": {
        "0003": {
            "titre": "La Vague",
            "maNote": 4,
            "monCommentaire": "Je l'ai lu en 3 jours, l'intrigue est très intéressante, je recommande"
        },
        "0004": {
            "titre": "Orgueil et Préjugé",
            "maNote": 3,
            "monCommentaire": "L'histoire est très intéressante, je recommande"
        }
    }
};

JSON.stringify(mesNotes);

localStorage.setItem("mesNotes", JSON.stringify(mesNotes));*/


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


///// 3. LANCER L'AFFICHAGE AU CHARGEMENT //////
//afficherNoteExistante(idLivre);

///FONCTION supprimerNote ////

function supprimerNote(idLivre) {
    const notes = lireNotes();
    delete notes[idLivre];
    localStorage.setItem("mesNotes", JSON.stringify(notes));
}