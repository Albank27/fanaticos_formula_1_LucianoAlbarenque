
fetch('./data/data.json')
  .then((response) => response.json())
  .then((data) => {
    const allQuestions = data;
    showQuestion(allQuestions);
  })
  .catch((error) => {
    console.error('Error al cargar el archivo JSON:', error);
  });

function selectRandomQuestions(allQuestions, count) {
  const selectedQuestions = [];
  const shuffledQuestions = [...allQuestions]; 
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * shuffledQuestions.length);
    const randomQuestion = shuffledQuestions.splice(randomIndex, 1)[0]; 
    selectedQuestions.push(randomQuestion);
  }
  return selectedQuestions;
}

const selectedQuestions = selectRandomQuestions(allQuestions, 10); 

let currentQuestionIndex = 0;
let correctAnswers = 0;
let playerName = "";
let playerEmail = "";
let playerEdad = "";

const userAnswers = [];

function showQuestion() {
  const main = document.getElementById("main");
  main.innerHTML = "";

  if (!playerName || !playerEmail || !playerEdad) {
    const playerNameInput = document.createElement("input");
    playerNameInput.type = "text";
    playerNameInput.id = "nombre";
    playerNameInput.placeholder = "Ingresa tu nombre";

    const playerEdadInput = document.createElement("input");
    playerEdadInput.type = "text";
    playerEdadInput.id = "edad";
    playerEdadInput.placeholder = "Ingresa tu edad"; 

    const playerEmailInput = document.createElement("input");
    playerEmailInput.type = "email";
    playerEmailInput.id = "email";
    playerEmailInput.placeholder = "Ingresa tu correo electrónico";

    const startButton = document.createElement("button");
    startButton.innerText = "Comenzar Cuestionario";
    startButton.onclick = function () {
      playerName = document.getElementById("nombre").value;
      playerEdad = document.getElementById("edad").value;
      playerEmail = document.getElementById("email").value;
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,4}$/; 
      if (!playerName || !playerEmail || !playerEdad || isNaN(playerEdad) || playerEdad < 4 || playerEdad > 100 || !emailPattern.test(playerEmail)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: '<p>Por favor, ingresa lo siguiente:</p><ul><li>Un nombre valido</li><li>Una edad válida (entre 4 y 100)</li><li>Un correo electrónico válido</li></ul>',
        });
      } else {
        playerNameInput.style.display = "none";
        playerEdadInput.style.display = "none";
        playerEmailInput.style.display = "none";
        startButton.style.display = "none";
        showQuestion();
      }
    };

    main.appendChild(playerNameInput);
    main.appendChild(playerEdadInput);
    main.appendChild(playerEmailInput);
    main.appendChild(startButton);
  } else {
    const question = selectedQuestions[currentQuestionIndex]; 
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<p>${question.question}</p>`;

    for (let j = 0; j < question.options.length; j++) {
      const option = question.options[j];
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "options";
      radioInput.value = option;
      questionDiv.appendChild(radioInput);
      questionDiv.appendChild(document.createTextNode(option));
      questionDiv.appendChild(document.createElement("br"));
    }

    const submitButton = document.createElement("button");
    submitButton.innerText = "Siguiente";
    submitButton.onclick = function () {
      const selectedAnswer = document.querySelector('input[name="options"]:checked');
      if (selectedAnswer) {
        const userAnswer = selectedAnswer.value;
        userAnswers[currentQuestionIndex] = userAnswer; 
        if (userAnswer === question.answer) {
          correctAnswers++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) { 
          showQuestion();
        } else {
          showResults();
        }
      }
    };

    main.appendChild(questionDiv);
    main.appendChild(submitButton);
  }
}

function showResults() {
  const main = document.getElementById("main");
  main.innerHTML = "";

  const resultMessage = document.createElement("div");
  resultMessage.classList.add("alert-message");

  if (correctAnswers >= 8) {
    resultMessage.textContent = "¡Felicidades! Eres un experto en Fórmula 1";
  } else if (correctAnswers >= 5) {
    resultMessage.textContent = "Mmm, conoces algo de Fórmula 1";
  } else {
    resultMessage.textContent = "Patético, no sabes de Fórmula 1";
  }
  const scoreMessage = document.createElement("div");
  scoreMessage.classList.add("alert-result");
  scoreMessage.innerHTML = `Respuestas correctas: <span class="result-correct">${correctAnswers}</span>/10`;

  const buttonContainer = document.createElement("div");

  const viewRankingButton = document.createElement("button");
  viewRankingButton.innerText = "Ver Ranking";
  viewRankingButton.onclick = showRanking;

  const viewAnswersButton = document.createElement("button");
  viewAnswersButton.innerText = "Ver Respuestas";
  viewAnswersButton.onclick = showAnswers;

  const restartButton = document.createElement("button");
  restartButton.innerText = "Reiniciar";
  restartButton.onclick = function () {
    location.reload(); 
  };

  buttonContainer.style.display = "flex";
  buttonContainer.style.justifyContent = "space-between";
  buttonContainer.style.marginTop = "10px";

  buttonContainer.appendChild(viewRankingButton);
  buttonContainer.appendChild(viewAnswersButton);
  buttonContainer.appendChild(restartButton);

  main.appendChild(resultMessage);
  main.appendChild(scoreMessage);
  main.appendChild(buttonContainer);
}

function showAnswers() {
  const main = document.getElementById("main");
  main.innerHTML = "";

  for (let i = 0; i < selectedQuestions.length; i++) { 
    const question = selectedQuestions[i]; 

    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<p>${question.question}</p>`;
    main.appendChild(questionDiv);

    const userAnswerDiv = document.createElement("div");
    const userAnswer = userAnswers[i];
    userAnswerDiv.textContent = `Tu respuesta: ${userAnswer ? userAnswer : "No respondida"}`;
    main.appendChild(userAnswerDiv);

    const correctAnswerDiv = document.createElement("div");
    correctAnswerDiv.textContent = `Respuesta correcta: ${question.answer}`;
    main.appendChild(correctAnswerDiv);

    main.appendChild(document.createElement("hr"));
  }

  const backButton = document.createElement("button");
  backButton.innerText = "Atrás";
  backButton.onclick = showResults;
  main.appendChild(backButton);
}

function showRanking() {
  const main = document.getElementById("main");
  main.innerHTML = "";

  let rankingData = JSON.parse(localStorage.getItem("rankingData")) || [];

  rankingData.push({ playerName, playerEdad, playerEmail, score: correctAnswers });

  rankingData.sort((a, b) => b.score - a.score);

  localStorage.setItem("rankingData", JSON.stringify(rankingData));

  const table = document.createElement("table");
  const tableHeader = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const playerNameHeader = document.createElement("th");
  playerNameHeader.textContent = "Nombre del Jugador";
  const playerEdadHeader = document.createElement("th");
  playerEdadHeader.textContent = "Edad";
  const playerEmailHeader = document.createElement("th");
  playerEmailHeader.textContent = "Correo Electrónico";
  const playerScoreHeader = document.createElement("th");
  playerScoreHeader.textContent = "Puntaje";

  headerRow.appendChild(playerNameHeader);
  headerRow.appendChild(playerEdadHeader);
  headerRow.appendChild(playerEmailHeader);
  headerRow.appendChild(playerScoreHeader);
  tableHeader.appendChild(headerRow);
  table.appendChild(tableHeader);

  const tableBody = document.createElement("tbody");

  for (let i = 0; i < rankingData.length; i++) {
    const playerData = rankingData[i];
    const row = document.createElement("tr");
    const playerNameCell = document.createElement("td");
    const playerEdadCell = document.createElement("td");
    const playerEmailCell = document.createElement("td");
    const playerScoreCell = document.createElement("td");

    playerNameCell.textContent = playerData.playerName;
    playerEdadCell.textContent = playerData.playerEdad;
    playerEmailCell.textContent = playerData.playerEmail;
    playerScoreCell.textContent = playerData.score;

    row.appendChild(playerNameCell);
    row.appendChild(playerEdadCell);
    row.appendChild(playerEmailCell);
    row.appendChild(playerScoreCell);

    tableBody.appendChild(row);
  }

  table.appendChild(tableBody);
  main.appendChild(table);

  const backButton = document.createElement("button");
  backButton.innerText = "Atrás";
  backButton.onclick = showResults;
  main.appendChild(backButton);
}

showQuestion();

  // Definición de las preguntas en un archivo data.json
const allQuestions = [
  {
    question: "¿Cuál es el piloto con más campeonatos de Fórmula 1?",
    options: ["Lewis Hamilton", "Michael Schumacher", "Juan Manuel Fangio"],
    answer: "Michael Schumacher",
  },
  {
    question: "¿Qué equipo ha ganado más campeonatos de constructores?",
    options: ["Ferrari", "Mercedes", "McLaren"],
    answer: "Ferrari",
  },
  {
    question: "¿En qué país se corre el Gran Premio de Mónaco?",
    options: ["Italia", "España", "Mónaco"],
    answer: "Mónaco",
  },
  {
    question: "¿Qué piloto es conocido como 'The Flying Finn'?",
    options: ["Kimi Räikkönen", "Valtteri Bottas", "Max Verstappen"],
    answer: "Kimi Räikkönen",
  },
  {
    question: "¿Cuántos títulos mundiales ha ganado Ayrton Senna?",
    options: ["2", "3", "4"],
    answer: "3",
  },
  {
    question: "¿Cuál es el circuito más largo del calendario de Fórmula 1?",
    options: ["Monza", "Spa-Francorchamps", "Silverstone"],
    answer: "Spa-Francorchamps",
  },
  {
    question: "¿En qué ciudad se encuentra el circuito de Yas Marina?",
    options: ["Dubai", "Abu Dhabi", "Doha"],
    answer: "Abu Dhabi",
  },
  {
    question: "¿Cuál es el país de origen del piloto de Fórmula 1 Lando Norris?",
    options: ["Reino Unido", "Estados Unidos", "Australia"],
    answer: "Reino Unido",
  },
  {
    question: "¿Cuántos equipos compiten en la Fórmula 1 en la temporada 2023?",
    options: ["8 equipos", "10 equipos", "12 equipos"],
    answer: "10 equipos",
  },
  {
    question: "¿Quién es el piloto con más pole positions en la historia de la Fórmula 1?",
    options: ["Lewis Hamilton", "Ayrton Senna", "Michael Schumacher"],
    answer: "Lewis Hamilton",
  },
  {
    question: "¿Cuál es el equipo más antiguo que todavía compite en la Fórmula 1?",
    options: ["Ferrari", "Williams", "McLaren"],
    answer: "McLaren",
  },
  {
    question: "¿En qué año se celebró el primer Campeonato Mundial de Fórmula 1?",
    options: ["1950", "1947", "1952"],
    answer: "1950",
  },
  {
    question: "¿Cuál es el país natal del piloto de Fórmula 1 Daniel Ricciardo?",
    options: ["Australia", "Canadá", "Italia"],
    answer: "Australia",
  },
  {
    question: "¿En qué circuito se celebra el Gran Premio de Italia?",
    options: ["Monza", "Imola", "Mugello"],
    answer: "Monza",
  },
  {
    question: "¿Cuál es el país de origen de la escudería Red Bull Racing?",
    options: ["Reino Unido", "Austria", "Italia"],
    answer: "Austria",
  },
  {
    question: "¿Cuántas carreras se disputan en una temporada de Fórmula 1 en promedio?",
    options: ["18", "20", "22"],
    answer: "20",
  },
  {
    question: "¿Cuál es el piloto más joven en ganar un Gran Premio de Fórmula 1?",
    options: ["Max Verstappen", "Sebastian Vettel", "Charles Leclerc"],
    answer: "Max Verstappen",
  },
  {
    question: "¿Cuántos puntos se otorgan al piloto que logra la vuelta más rápida en una carrera de Fórmula 1?",
    options: ["1 punto", "2 puntos", "3 puntos"],
    answer: "1 punto",
  },
  {
    question: "¿Cuál es el nombre del piloto considerado el 'Rey de la Lluvia' por su habilidad en condiciones de lluvia?",
    options: ["Ayrton Senna", "Sebastian Vettel", "Nigel Mansell", "Fernando Alonso"],
    answer: "Ayrton Senna",
  },
  {
    question: "¿Cuál es el equipo de Fórmula 1 asociado a la marca de automóviles Aston Martin?",
    options: ["Alpine F1 Team", "Haas F1 Team", "Aston Martin Cognizant Formula One Team", "AlphaTauri"],
    answer: "Aston Martin Cognizant Formula One Team",
  },
  {
    question: "¿Cuál es el piloto más joven en ganar una carrera de Fórmula 1?",
    options: ["Sebastian Vettel", "Max Verstappen", "Charles Leclerc", "Lando Norris"],
    answer: "Max Verstappen",
  },
  {
    question: "¿En qué país se encuentra el circuito de Spa-Francorchamps, que es famoso por su carrera de Fórmula 1?",
    options: ["Bélgica", "Francia", "Italia", "Alemania"],
    answer: "Bélgica",
  },
];