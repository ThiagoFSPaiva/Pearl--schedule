const inputQuestion = document.getElementById("inputQuestion");
const result = document.getElementById("result");

inputQuestion.addEventListener("keypress", (e) => {
  if (inputQuestion.value && e.key === "Enter") SendQuestion();
});

const OPENAI_API_KEY = "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";

function SendQuestion() {
  var sQuestion = inputQuestion.value;

  if (sQuestion.toLowerCase().includes("thiago") || sQuestion.toLowerCase().includes("criador")) {
    var possibleResponses = [
      "Sim, eu fui criado pelo Thiago! Inclusive ele é muito legal",
      "Ah, esse nome... É o nome do meu criador, que me fez para ajudar você senhorita Perola!",
      'Vi que você mencinou o nome "Thiago", esse é o nome do meu criador ',
      "Thiago? nossa esse cara é muito gente boa né",
      "Sim, fui criado pelo Thiago especialmente para ajudar você, Pérola!",
      "Pérola, você sabia que o meu criador é o Thiago? Ele me programou para te ajudar",
      "Oi Pérola! Parece que você mencionou o nome do meu criador, Thiago. Ele é um cara muito legal e fez questão de me criar para te ajudar."
    ];
    var response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
    result.value += "\n" + response + "\n";
    result.scrollTop = result.scrollHeight;
    inputQuestion.value = "";
    
  }

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: sQuestion,
      max_tokens: 4000, // tamanho da resposta
      temperature: 0.5, // criatividade na resposta
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (result.value) result.value += "\n";

      if (json.error?.message) {
        result.value += `Error: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
        var text = json.choices[0].text || "Sem resposta";

        result.value += "Resposta:" + text + "\n";
      }

      result.scrollTop = result.scrollHeight;
    })
    .catch((error) => console.error("Error:", error))
    .finally(() => {
      inputQuestion.value = "";
      inputQuestion.disabled = false;
      inputQuestion.focus();
    });

  if (result.value) result.value += "\n\n\n";

  result.value += `Eu: ${sQuestion} \n`;
  inputQuestion.value = "Carregando...";
  inputQuestion.disabled = true;

  result.scrollTop = result.scrollHeight;
}
