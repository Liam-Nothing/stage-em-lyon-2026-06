# Livrio
Livrio est une application web de bibliothèque personnelle en ligne. L'utilisateur y recherche des livres, les ajoute à sa bibliothèque avec un statut de lecture (lu, à lire, en cours de lecture ou abandonné) et il peut lui donner une note et/ou un avis.

## Les 3 fonctions principales sont :  
**1) Rechercher un livre:**
La fonction de Recherche sera présente dans la page d’Accueil à l’image d’un bibliothèque en ligne.
Nous avons également pensé à installer une fonction de recherche dans la page de bibliothèque afin de permettre à l’utilisateur de retrouver une ancienne lecture.

**2) Ajouter un livre à sa bibliothèque:** 
La fonction d’Ajout de livre dans sa bibliothèque sera matérialisé par un bouton présent sur la fiche livre.
Il sera également possible d’attribuer un “statut” au livre en l’ajoutant à sa bibliothèque (lu, à lire, en cours).

**3) Donner une note et/ou un avis:**  
La fonction de Donner une note et/ou un avis sera possible dans le cas où le livre a été ajouté avec le statut “lu” (car nous considérons que nous pouvons donner un avis
ou une critique à partir du moment où on a lu le livre.

## Les liens Figma: 
 1) [Maquettes Figma (Stage EM Lyon 09)](https://www.figma.com/design/wFrio5qgGwLiBODek7WZPL/Stage-EM-Lyon-09?node-id=0-1&t=6QHQIbwU8OCj1kYV-1)

## Hors périmètre:  
-  Pas d'actualité de la lecture (calendrier mensuel des sorties, derniers prix littéraires).
- Pas de citation du livre dans l'espace avis.
- Pas de lien d'achat pour se procurer le livre.
- Pas de listes ni de « sélections de livres » créées par l'utilisateur.

## Arborescence
 
```
livrio/
├── README.md
├── index-accueil/    
|   └── index.html          
├── library/  
|   └── library.html
├── fiche-livre/
|   └── livre.html  
├── profil/
|   └── profil.html           
├── css/
|   ├── animations.css
|   ├── base.css
|   ├── composants.css
|   ├── mise-en-page.css
|   ├── squelette.css
|   ├── tokens.css
|   ├── composants.html
│   └── composants-social.css
├── js/
│   ├── amis.js
│   ├── avis.js
│   ├── bibliotheque.js
│   ├── donnees.js
|   ├── fil.js
|   ├── livre.js
|   ├── profil.js
|   ├── rendu.js
|   ├── squelette.js
│   └── storage.js 
├── data/
│   ├── livres.json
│   ├── utilisateurs.json
│   └── avis.json
└── assets/
```

## Bugs acceptés
 
Ces défauts sont connus et **volontairement non corrigés** dans le MVP, pour concentrer l'effort sur les trois fonctions principales.
 
- **Pas de pagination** : tous les résultats s'affichent sur une seule page, ce qui peut être long avec un catalogue étendu.
- **Données locales au navigateur** : la bibliothèque et les avis vivent dans le `localStorage`. Ils sont perdus si l'utilisateur vide les données du site.
- **Pas de compte utilisateur** : l'application ne gère qu'un seul utilisateur par navigateur.
- **Changement de statut après avis** : si un livre passe de « lu » à « à lire » ou « en cours », l'avis déjà saisi est conservé et n'est ni masqué ni supprimé.
- **Rendu mobile partiel** : l'affichage est pensé en priorité pour le bureau; certains écrans étroits peuvent présenter des défauts de mise en page.