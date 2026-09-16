const LIVRES_DEMO = [

    {
        id: "0001",
        titre: "La vague",
        auteur: "Todd Strasser",
        dateDePublication: "1981",
        genre: "Thriller",
        resume: "Un professeur d'histoire, Ben Ross, donne un cours sur le nazisme et l'Allemagne hitlérienne. Ses élèves ont du mal à comprendre comment tout un peuple a pu suivre Hitler et fermer les yeux sur les atrocités commises. Pour leur faire ressentir concrètement ce mécanisme, le professeur décide de mener une expérience en classe. \
        Il instaure un mouvement qu'il appelle \"La Vague\", fondé sur trois principes : la discipline, la communauté, l'action. Les élèves doivent se tenir droits, se lever pour répondre, utiliser un salut particulier et un slogan commun. Au départ, cela ressemble à un jeu motivant : les élèves les plus faibles ou marginalisés se sentent enfin intégrés, l'ambiance de classe s'améliore, la cohésion grandit. Mais très vite, le mouvement dérape. Les élèves commencent à recruter de nouveaux membres, à exclure ceux qui refusent d'adhérer, voire à les harceler. Une hiérarchie se met en place, avec des gardes chargés de surveiller la loyauté des membres. Ce qui devait être une leçon devient un véritable engrenage totalitaire, échappant au contrôle du professeur lui-même. \
        Face à l'ampleur du phénomène, Ben Ross décide de mettre fin à l'expérience de façon spectaculaire : il réunit tous les élèves en leur faisant croire qu'ils vont rencontrer le \"leader national\" du mouvement, puis leur révèle qu'il n'y a pas de leader — leur montrant ainsi, par l'exemple, à quel point ils ont été manipulables, exactement comme le peuple allemand sous le nazisme.",
        nombreDePage: 160,
        couvertureLivre: "https://m.media-amazon.com/images/I/617SHAEjKKL._AC_UF1000,1000_QL80_.jpg",
        serie: "non",
        noteMoyenne: 4.6
    },

    {
        id: "0002",
        titre: "Inheritance Games : Inheritance Games - Tome 01",
        auteur: "Jennyfer Lynn Barness",
        dateDePublication: "03/02/2022",
        genre: "Thriller",
        resume: "Que feriez-vous si vous receviez l'héritage d'un inconnu milliardaire convoité par ses sulfureux petits-fils ? Avery Grambs, lycéenne sans histoire et sans le sou, rêve d'une bourse d'études pour entrer à l'université. Son destin bascule soudain quand Tobias Hawthorne, un célèbre milliardaire, lui lègue sa fortune. Cet argent tombe à pic, mais il y a un problème : Avery n'a jamais entendu parler de cet homme ! Pour toucher sa part d'héritage, elle doit néanmoins emménager dans la mystérieuse demeure des Hawthorne. Elle y côtoie les quatre petits-fils du défunt, tous aussi insondables que séduisants... et surtout bien décidés à l'empêcher de subtiliser leur dû !Happée par un tourbillon de manigances, d'énigmes et de trahisons, Avery va devoir se prêter à un inquiétant jeu de dupes qui pourrait bouleverser sa vie à jamais....",
        nombreDePage: 456,
        couvertureLivre: "https://static.fnac-static.com/multimedia/PE/Images/FR/NR/ee/e7/d3/13887470/1507-1/tsp20260424084149/Inheritance-Games-Tome-01.jpg",
        serie: "oui",
        noteMoyenne: 4
    },

    {
        id: "0003",
        titre: "Le rouge et le noir",
        auteur: "Stendhal",
        dateDePublication: "1830",
        genre: "Romance",
        resume: "Julien Sorel est le fils d'un charpentier de Verrières, un jeune homme intelligent, cultivé (il connaît le latin et la Bible par cœur) mais d'origine modeste. \
        Fasciné par Napoléon et rêvant de gloire, il comprend que l'époque ne permet plus l'ascension par l'armée (le \"rouge\") comme du temps de l'Empire, mais par l'Église (le \"noir\"). \
        Il décide donc de dissimuler son ambition sous une façade de piété.",
        nombreDePage: 512,
        couvertureLivre: "../assets/rouge et noir.png",
        serie: "non",
        noteMoyenne: 4.3
    },

    {
        id: "0004",
        titre: "Orgueil & Préjugé",
        auteur: "Jane Austen",
        dateDePublication: "28/01/1813",
        genre: "Romance",
        resume: "Dans l'Angleterre géorgienne, la famille Bennet doit marier ses cinq filles pour assurer leur avenir. Elizabeth Bennet, vive et indépendante d'esprit, croise la route de Mr Darcy, un riche gentleman à l'orgueil apparent. Entre préjugés, quiproquos et rebondissements sociaux, les deux personnages vont devoir dépasser leurs a priori pour se comprendre et s'aimer",
        nombreDePage: 456,
        couvertureLivre: "https://m.media-amazon.com/images/I/61qGNnn2r7L._AC_UF1000,1000_QL80_.jpg",
        serie: "non",
        noteMoyenne: 4.3
    },

    {
        id: "0005",
        titre: "Le Prince Cruel",
        auteur: "Holly Black (traduction française de Leslie Damant-Jeandel)",
        dateDePublication: "22/04/2020",
        genre: "Fantasy",
        resume: "Jude a 17 ans et vit à la Haute Cour de Domelfe dans le royaume de Terrafæ. Enlevée au monde des mortels quand elle n'était qu'une enfant et élevée avec ses sœurs parmi les puissants, elle a appris à se protéger des sortilèges et à se battre à l'épée. Pourtant, elle subit jour après jour les moqueries et les insultes, car elle n'est qu'une humaine, vouée à la mort, dans un monde où règnent les Fæs, créatures sublimes, immortelles et cruelles. Personne ne la hait plus que le Prince Cardan, le plus jeune des héritiers de la couronne, qui semble décidé à lui nuire. Jude devra pourtant tout risquer pour gagner sa place à la cour",
        nombreDePage: 544,
        couvertureLivre: "https://m.media-amazon.com/images/I/81tmwelY-XL.jpg",
        serie: "oui",
        noteMoyenne: 4
    }
];




let grilleLivre = document.querySelector(".grille-flex-wrap");


grilleLivre = document.querySelector(".grille-flex-wrap");


document.addEventListener("DOMContentLoaded", async () => {
  let grilleLivre = document.querySelector(".grille-flex-wrap");
  let livres = await chargerLivres();

  livres.forEach(livre => {
    creerCarteLivre(grilleLivre, livre);
  });
});

function creerCarteLivre(grilleLivre, livre) {
  let carteLivre = document.createElement("div");
  carteLivre.className = "div-couverture-colomn-index";
  grilleLivre.appendChild(carteLivre);

  let lienLivre = document.createElement("a");
  lienLivre.href = `livre.html?id=${livre.id}`;
  carteLivre.appendChild(lienLivre);

  let couvertureLivre = document.createElement("img");
  couvertureLivre.src = livre.couvertureLivre;
  couvertureLivre.alt = livre.titre;
  lienLivre.appendChild(couvertureLivre);

  let titreLivre = document.createElement("h5");
  titreLivre.textContent = livre.titre;
  carteLivre.appendChild(titreLivre);

  let auteurLivre = document.createElement("p");
  auteurLivre.textContent = livre.auteur;
  carteLivre.appendChild(auteurLivre)

  return carteLivre;
}