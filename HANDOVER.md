# Fiche de passation

> Dernière mise à jour : 30/09/2026
> État du projet : livré / arrêté. Voir le README pour lancer l'application.


---

## 1. Bugs

### 1.1 [Messages pour valider l'avis]
- **Fichier :** `js/avis.js.`
- **Problème :**Lorsque un avis est remplie avec le formulaire, les messages d'erreurs ne s'affichent pas au bon endroit et n'appliquent le style css
- **Piste de correction :**essayer de modifier la fonction qui affiche les messages d'erreurs et de succès du formulaire 

### 1.2 [Branchement des fonctions de tri des livres par statut aux éléments html]
- **Fichier :** `profil/profil.html.`
- **Problème :**Les chiffres indiqués sur la page html ont intégrés par défaut, ils ne sont reliés à aucune fonction qui compte réelement le nombre de livre par statut 
- **Piste de correction :**construire une première fonction qui va compter le nombre de livre par statut ("lu", "en cours", "abandonné", "à lire"), ajouter une fonction qui branche l'autre sur les éléments html et va afficher les résultats 


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

### 2.3 [Fonction optionnelle : Définir et suivre ses objectifs de lecture]
- **Fichier(s) concerné(s) :** `css/tokens.css `
- **Ce que c'était :** proposer à l'utilisateur de se définir des objectifs de lectures au mois ou un nombre de pages à lire par jour ou par semaine et de pouvoir partager son avancée avec ses amis 
- **Pourquoi non fait :** manque de temps et tâches plus urgentes passées en priorité 
- **Point de départ :** construire une maquette wireframe pour avoir une idée de ce que ça peut donner 

### 2.4 [Fonction optionnelle : Supprimer un avis ]
- **Fichier(s) concerné(s) :** `js/stockage.js ; profil/profil.html `
- **Ce que c'était :** une fonctionnalité qui permet à l'utilisateur de supprimer un avis qui l'a formulé sur l'une des ses lectures à partir de son profil et de son espace "mes activités"
- **Pourquoi non fait :** manque de temps et tâches plus urgentes passées en priorité 
- **Point de départ :** une fonction a déjà été construite mais a besoin de vérification et doit être branché aux éléments html de la page profil

---

