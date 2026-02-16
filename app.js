let model;

const input = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const result = document.getElementById("result");

async function loadModel() {
  result.innerText = "Caricamento modello AI (potenziato)...";
  model = await mobilenet.load({ version: 2, alpha: 1.0 });
  result.innerText = "Modello caricato! Ora scegli una foto 👇";
  input.disabled = false;
}

loadModel();

function isDog(label) {
  return /dog|retriever|shepherd|terrier|poodle|husky|bulldog|beagle|chihuahua|collie|dachshund|doberman|rottweiler|boxer|akita|malamute/i.test(label);
}

function isCat(label) {
  return /cat|kitten|tabby|egyptian|siamese|persian|maine coon|ragdoll|bengal/i.test(label);
}

input.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const imgURL = URL.createObjectURL(file);
  preview.src = imgURL;

  await preview.decode();

  result.innerText = "Analisi immagine in corso...";

  const predictions = await model.classify(preview, 5); // top-5
  console.log("Predizioni:", predictions);

  let dogScore = 0;
  let catScore = 0;

  predictions.forEach(p => {
    const label = p.className.toLowerCase();
    if (isDog(label)) dogScore += p.probability;
    if (isCat(label)) catScore += p.probability;
  });

  let finalLabel = "❓ Non riconosciuto";
  let finalScore = 0;

  if (dogScore > catScore) {
    finalLabel = "🐶 CANE";
    finalScore = dogScore;
  } else if (catScore > dogScore) {
    finalLabel = "🐱 GATTO";
    finalScore = catScore;
  }

  result.innerText = `
Risultato finale: ${finalLabel} (${(finalScore * 100).toFixed(2)}%)

Dettaglio predizioni:
${predictions.map(p => `- ${p.className} (${(p.probability * 100).toFixed(2)}%)`).join("\n")}
`;
});