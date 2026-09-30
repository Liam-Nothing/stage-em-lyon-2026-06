# Fiche de passation

> Dernière mise à jour : 30/09/2026
> État du projet : livré / arrêté. Voir le README pour lancer l'application.


---

## 1. Bugs

### 1.1 [Photo de profil carte- avis trop grande]
- **Fichier :** `css/mise-en-pages.css`
- **Symptôme :**La photo de profil de l’utilisateur courant s’affiche pour un nouvel avis enregistré avec le formulaire mais elle apparaît trop grande et n’applique pas le style css des autres images des autres pages.
- **Piste de correction :**Modifier les propriétés css dans le fichier ou bien ajouter une class ou un id à l’image de la carte avis de la page livre.html
- **Lien Notion :** [URL de la fiche]

### 1.2 [Photos de profil carte-avis du avis.json]
- **Fichier :** `js/livre.js`
- **Symptôme :** Les photos de profil des autres avis importé depuis le avis.json apparaissent dans livre.html mais n’apparaissent pas sur la carte avis et ne s’affichent pas sur la page.
- **Piste de correction :** essayer de modifier la source de l'image directement dans la fonction dans livre.js ou bien ajouter une class à la variable dans livre.js.

### 1.3 [Résultats de recherches pas assez visible]
- **Fichier :** `css/mise-en-pages.css.`
- **Symptôme :** Lorsqu’une recherche est effectué, les résultats s’affichent bien mais ils s’affichent trop bas sur la page index.html (on peut penser que la fonction de recherche ne fonctionne pas) 
- **Piste de correction :**modifier ou ajouter une ou plusieurs propriété css afin de remonter les résultats plus haut sur la page 

### 1.4 [Statut du livre non figé]
- **Fichier :** `fiche-livre/livre.js.`
- **Symptôme :**Lorsqu’un statut est apposé sur le menu déroulant, celui ne se fige pas une fois que la page a été rechargé, il se remet automatiquement sur “à lire”.
- **Piste de correction :**ajouter une fonction d’enregistrement du statut du span du menu déroulant après rechargement de la page. 
---

## 2. Fonctions envisagées et non faites 

### 2.1 [Fonction du MVP : Tri des livres selon leur statut (“à lire”, “lu”, “abandonné”, “en cours”)]
- **Fichier(s) concerné(s) :** `library/library.html`, `js/library.js` (à créer)
- **Ce que c'était :**4 sections (parce que 4 statut) où sont affichés les livres qui ont ce statut stylisé sous forme d’étagère avec possibilité d’afficher seulement les livres d’un statut.
- **Pourquoi non fait :** manque de temps 
- **Point de départ :** les wireframes haute fidélité ont déjà été construits sur Figma, et certaines fonctions de tri et de filtrage dans js/donnees.js utilisées pour index.html peuvent être réutilisables et modifiables`.

### 2.2 [Fonction optionnelle : Mode sombre]
- **Fichier(s) concerné(s) :** `css/tokens.css `
- **Ce que c'était :** proposer un affichage en mode sombre
- **Pourquoi non fait :** manque de temps et tâches plus urgentes passées en priorité 
- **Point de départ :** dupliquer et ajouter les variables avec les bons contrastes de couleur au fichier css/tokens.css et ranger le choix du thème dans le localStorage 

---

