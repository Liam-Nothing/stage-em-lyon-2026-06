
function filtrerGenre(livre,genre) {
    return livre.filter(livre=> livre.genre ===genre);
}

console.log(filtrerGenre(LIVRES_DEMO,"Romance"));