# Schéma des données

## livres.json

| Champ | Type | Obligatoire | 
|---|---|---|---|
| id | string | oui |
| titre | string | oui | 
| auteur | string | oui |
| date de publication | string | oui | 
| genre | string | oui | 
| resume | string | oui | 
| nombre de page | number | oui | 
| couverture du livre | string | oui |
| serie | string | non |
| note moyenne | number | oui |   

### Exemple dans le json
{
    "id" : "livre-045",
    "titre" : "Le Crime de l'Orient-Express",
    "auteur" : "Agatha Christie",
    "date de publication" : "1 janvier 1934",
    "genre" : "Policier",
    "resume" : "Par le plus grand des hasards, Hercule Poirot se trouve dans la voiture de l’Orient-Express – ce train de luxe qui traverse l’Europe – où un crime féroce a été commis.Une des plus difficiles et des plus délicates enquêtes commence pour le fameux détective belge.Autour de ce cadavre, trop de suspects trop d’alibis.",
    "nombre de page" : 224
    "couverture du livre" : "https://encrypted-tbn0.gstatic.com/images q=tbn:ANd9GcSHnyIx5TC3r7IboaTMQ0fnt2PhhIcIbwnHgHhZnFaDOw&s=10",
    "serie" : "non",
    "note moyenne" : 4,8

}

////////////////////


## utilisateur.json

| Champ | Type | Obligatoire | 
|---|---|---|---|
| id | string | oui |
| pseudo | string | oui | 
| biographie | string | oui |
| date de creation du compte | string | oui | 
| stat livre lu | number | oui | 
| stat livre en cours | number | oui | 
| stat livre pile à lire | number | oui | 


### Exemple dans le json

{
    "id": "user-456",
    "pseudo": "Chema-mystery",
    "biographie": "Mes genres préférés sont les romans policiers, les thrillers et les polars",
    "date de creation du compte" : "juillet 2026",
    "stat livre lu" : 7,
    "stat livre en cours" : 3,
    "stat livre pile à lire" : 2,
}


////////////////

## avis-utilisateur.json

| Champ | Type | Obligatoire | 
|---|---|---|---|
| id | string | oui |
| note | number | oui | 
| commentaire | string | oui |
| date de publication du commentaire | string | oui | 
| couverture | string | oui | 


## Exemple dans le json

{
    "id": "user-456-comments",
    "note" : 4,
    "commentaire" : "Très rythmé et plein de twists, c’est le genre de livre qui donne envie de lire la suite immédiatement. L’ambiance “jeu d’héritage” fonctionne super bien.",
    "date de publication du commentaire" : "juin 2026",
    "couverture" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmAWl-92plBYEMtusXWMXc_qgh_neL3qbl9y3sgAs8Vg&s=10"
}