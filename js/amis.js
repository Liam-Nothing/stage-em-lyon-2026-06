

//// FONCTION LISTER UTILISATRICES ////

async function listerUtilisatrices() {
    const utilisatrices = await chargerUtilisateurs();
    const idCourante = Number(localStorage.getItem("utilisatriceCourante"));
    const autresUtilisatrices = utilisatrices.filter(u => u.id !== idCourante);

    const amisJSON = localStorage.getItem("amis");
    const listeAmies = amisJSON ? JSON.parse (amisJSON) : [];

    const resultat = autresUtilisatrices.map(u => ({
        ...u,
        estAmie: listeAmies.includes(u.id)
    }));

    return resultat;
}
