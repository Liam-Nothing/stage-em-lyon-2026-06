# Schéma des données

## livres.json

| Champ | Type | Obligatoire | 
|---|---|---|
| id | string | oui |
| titre | string | oui | 
| auteur | string | oui |
| dateDePublication | string | oui | 
| genre | string | oui | 
| resume | string | oui | 
| nombreDePage | number | oui | 
| couvertureLivre | string | oui |
| serie | string | non |
| noteMoyenne | number | oui |   

### Exemple dans le json
```json
{
        "id": "0003",
        "titre": "Le rouge et le noir",
        "auteur": "Stendhal",
        "dateDePublication": "1830",
        "genre": "Romance",
        "resume": "Julien Sorel est le fils d'un charpentier de Verrières, un jeune homme intelligent, cultivé (il connaît le latin et la Bible par cœur) mais d'origine modeste. \
        Fasciné par Napoléon et rêvant de gloire, il comprend que l'époque ne permet plus l'ascension par l'armée (le \"rouge\") comme du temps de l'Empire, mais par l'Église (le \"noir\"). \
        Il décide donc de dissimuler son ambition sous une façade de piété.",
        "nombreDePage": 512,
        "couvertureLivre": "https://media.hachette.fr/imgArticle/LIVREDEPOCHEJEUNESSE/2017/9782013232838-001-X.jpeg?source=web",
        "serie": "non",
        "noteMoyenne": 4.3
}
```



## utilisateur.json

| Champ | Type | Obligatoire | 
|---|---|---|
| id | string | oui |
| pseudo | string | oui | 
| biographie | string | oui |
| dateCreationCompte | string | oui | 
| statLu | number | oui | 
| statEnCours | number | oui | 
| statPileALire | number | oui | 


### Exemple dans le json
```json
{
    "id": "user-456",
    "pseudo": "Chema-mystery",
    "biographie": "Mes genres préférés sont les romans policiers, les thrillers et les polars",
    "dateCreationCompte" : "juillet 2026",
    "statLu" : 7,
    "statEnCours" : 3,
    "statPileALire" : 2
}
```

## avis-utilisateur.json

| Champ | Type | Obligatoire | 
|---|---|---|
| id | string | oui |
| note | number | oui | 
| commentaire | string | oui |
| datePublicationCommentaire | string | oui | 
| couverture | string | oui | 
| idUtilisateur | string | oui | 
| idLivre | string | oui | 


## Exemple dans le json
```json
{
    "id": "user-067-comments",
    "note" : 4,
    "commentaire" : "Très rythmé et plein de twists, c’est le genre de livre qui donne envie de lire la suite immédiatement. L’ambiance “jeu d’héritage” fonctionne super bien.",
    "datePublicationCommentaire" : "juin 2026",
    "couverture" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmAWl-92plBYEMtusXWMXc_qgh_neL3qbl9y3sgAs8Vg&s=10",
    "idUtilisateur":"lulu34",
    "idLivre":"0-045"
}
```



### Mes notes 

| Champ | Type | Obligatoire | 
|---|---|---|
| titre | string | oui |
    | maNote | string | oui | 
    | monCommentaire | string | oui |


### Exemple
```json

{
    "mesNotes":{
        "Shatter Me" : {
            "maNote": 4,
            "monCommentaire":"Je l'ai lu en 3 jours, l'intrigue est très intéressante, je recommande"
        }
    }
}