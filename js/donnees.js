
// fonction filtre par genre //
function filtrerGenre(livre,genre) {
    return livre.filter(livre=> livre.genre ===genre);
}

// fonction tri par note //
function trierParNote(livres) {
    return [...livres].sort((a, b) => a.noteMoyenne - b.noteMoyenne);
}