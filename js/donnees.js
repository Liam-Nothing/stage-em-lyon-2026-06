
// fonction filtre par genre //
function filtrerGenre(livre,genre) {
    return livre.filter(livre=> livre.genre ===genre);
}


// fonction tri par note //
function trierParNote(livres) {
    return [...livres].sort((a, b) => a.noteMoyenne - b.noteMoyenne);
}


// fonction charger JSON //
async function chargerDonnees(chemin) {
    try {
        const reponse = await fetch(chemin);

        if (!reponse.ok) {
            throw new Error(`Statut ${reponse.status} en tentant de charger "${chemin}"`);
        }

        return await reponse.json();
    } catch (erreur) {
        console.error(`Chargement impossible pour "${chemin}" :`, erreur.message);
        return [];
    }
}


// fonction charger livres //
async function chargerLivres() {
    return chargerDonnees("../data/livres.json");
}

async function chargerUtilisateurs() {
    return chargerDonnees("../data/utilisateurs.json");
}

async function chargerAvis() {
    return chargerDonnees("..//data/avis.json");
}
