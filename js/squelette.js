function masquerSquelette(nom) {
    const squelette = document.getElementById(`squelette-${nom}`);
    const contenu = document.getElementById(`contenu-${nom}`);
 
    if (squelette) squelette.hidden = true;
    if (contenu) contenu.hidden = false;
}