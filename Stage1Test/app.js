let docs = [];

// There is the function to get data.
async function getData() {
  return await fetch("https://api.plos.org/search?q=title:DNA")
    .then((response) => response.json())
    .then((json) => {
      docs = json.response.docs;
    });
}

async function get() {
  await getData();
  console.log(docs);
}

get();

//Exercise 1
//filterData();
//filterDataByArticleType("Research Article");

//Exercise 2
//printAuthor();
//printAuthorByScore(6.3);

//Exercise 3
//updateArticleType();

//Exercise 4
//printArticleTypes();

//Exercise 5
//printJournals();
//noRepeatPrintJournals();

//Exercise 6
//removeProperty();
//removeSelectedProperty("journal");

//Exercise 7
//printRange();

//Exercise 8
//convertToArray();

//Exercise 9
// oddModifiedDocs().then((result) => {
//   sortDocs(result, "score");
// });

//----------------- Functions -----------------//

//Exercise 1
async function filterData() {
  await getData();
  let filteredDocs = docs.filter(
    (doc) => doc.article_type !== "Research Article"
  );
  console.log(filteredDocs);
}

//Exercise 1 extra point
async function filterDataByArticleType(type) {
  await getData();
  let filteredDocs = docs.filter((doc) => doc.article_type !== type);
  console.log(filteredDocs);
}

//Exercise 2
async function printAuthor() {
  await getData();
  let authors = docs
    .filter((doc) => doc.score > 6.0)
    .map((doc) => doc.author_display);
  console.log(authors);
}

//Exercise 2 extra point
async function printAuthorByScore(score) {
  await getData();
  let authors = docs
    .filter((doc) => doc.score > score)
    .map((doc) => doc.author_display);
  console.log(authors);
}

//Exercise 3
async function updateArticleType() {
  await getData();
  let article = docs.find((doc) => doc.id === "10.1371/journal.pgen.1006605");
  article.article_type = "Newspaper";
  console.log(article);
}

//Exercise 4
async function printArticleTypes() {
  await getData();
  let types = docs.map((doc) => doc.article_type);
  let uniqueTypes = [...new Set(types)];
  console.log(uniqueTypes);
}

//Exercise 5
async function printJournals() {
  await getData();
  let journals = docs.map((doc) => doc.journal);
  console.log(journals.join("\n"));
}

//Exercise 5 extra point
async function noRepeatPrintJournals() {
  await getData();
  let journals = docs.map((doc) => doc.journal);
  let uniqueJournals = [...new Set(journals)];
  console.log(uniqueJournals.join("\n"));
}

//Exercise 6
async function removeProperty() {
  await getData();
  let newDocs = docs.map(({ score, ...rest }) => {
    return rest;
  });
  console.log(newDocs);
}

//Exercise 6 extra point
async function removeSelectedProperty(property) {
  await getData();
  let newDocs = docs.map(({ [property]: removedProperty, ...rest }) => {
    return rest;
  });
  console.log(newDocs);
}

//Exercise 7
async function printRange() {
  await getData();
  let start = docs.findIndex(
    (doc) => doc.id === "10.1371/journal.pone.0047101"
  );
  let end = docs.findIndex((doc) => doc.id === "10.1371/journal.pgen.1000047");
  let filteredDocs = docs.slice(start, end + 1);
  console.log(filteredDocs);
}

//Exercise 8
async function convertToArray() {
  await getData();
  let aditionalArray = [
    {
      id: "10.1371/journal.pone.0177149",
      journal: "Wall Street",
      eissn: "1932-6203",
      publication_date: "2017-05-03T00:00:00Z",
      article_type: "Newspaper",
      author_display: [
        "Irina Bruck",
        "Nalini Dhingra",
        "Matthew P. Martinez",
        "Daniel L. Kaplan",
      ],
      abstract: [
        "\nDpb11 is required for the initiation of DNA replication in budding yeast. We found that Dpb11 binds tightly to single-stranded DNA (ssDNA) or branched DNA structures, while its human homolog, TopBP1, binds tightly to branched-DNA structures. We also found that Dpb11 binds stably to CDK-phosphorylated RPA, the eukaryotic ssDNA binding protein, in the presence of branched DNA. A Dpb11 mutant specifically defective for DNA binding did not exhibit tight binding to RPA in the presence of DNA, suggesting that Dpb11-interaction with DNA may promote the recruitment of RPA to melted DNA. We then characterized a mutant of Dpb11 that is specifically defective in DNA binding in budding yeast cells. Expression of dpb11-m1,2,3,5,ΔC results in a substantial decrease in RPA recruitment to origins, suggesting that Dpb11 interaction with DNA may be required for RPA recruitment to origins. Expression of dpb11-m1,2,3,5,ΔC also results in diminished GINS interaction with Mcm2-7 during S phase, while Cdc45 interaction with Mcm2-7 is like wild-type. The reduced GINS interaction with Mcm2-7 may be an indirect consequence of diminished origin melting. We propose that the tight interaction between Dpb11, CDK-phosphorylated RPA, and branched-DNA may be required for the essential function of stabilizing melted origin DNA in vivo. We also propose an alternative model, wherein Dpb11-DNA interaction is required for some other function in DNA replication initiation, such as helicase activation.\n",
      ],
      title_display:
        "Dpb11 may function with RPA and DNA to initiate DNA replication",
      score: 7.018296,
    },
    {
      id: "10.1371/journal.pgen.1006699",
      journal: "Wall Street",
      eissn: "1553-7404",
      publication_date: "2017-02-10T00:00:00Z",
      article_type: "Newspaper",
      author_display: [
        "Concetta Cuozzo",
        "Antonio Porcellini",
        "Tiziana Angrisano",
        "Annalisa Morano",
        "Bongyong Lee",
        "Alba Di Pardo",
        "Samantha Messina",
        "Rodolfo Iuliano",
        "Alfredo Fusco",
        "Maria R. Santillo",
        "Mark T. Muller",
        "Lorenzo Chiariotti",
        "Max E. Gottesman",
        "Enrico V. Avvedimento",
      ],
      abstract: [""],
      title_display:
        "Correction: DNA Damage, Homology-Directed Repair, and DNA Methylation",
      score: 7.018296,
    },
  ];
  let newArray = docs.concat(aditionalArray);
  console.log(newArray);
}

//Exercise 9
async function oddModifiedDocs() {
  await getData();
  let oddDocs = docs.filter((doc, i) => i % 2 !== 0);
  let formatedDocs = oddDocs.map(function (doc) {
    return {
      title: doc.journal + " " + doc.title_display,
      score: doc.score,
      article_type: doc.article_type,
      authors: doc.author_display.join(" - "),
      id: doc.id,
    };
  });
  return formatedDocs;
}

function sortDocs(array, property) {
  let sortedDocs = array.sort((a, b) => b[property] - a[property]);
  console.log(sortedDocs);
}
