//questions "este array es el principal que tiene todas las preguntas y sus detalles(opciones y respuestas)"
//funcion de orden superior = temporizador
//Agrego storage y json para guardarme los nombre y mail de los partipantes para visualizar su puntaje en el ranking

const questions = [
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
    question: "¿Qué piloto ganó el primer campeonato de Fórmula 1 en la historia?",
    options: ["Fangio", "Ascari", "Farina"],
    answer: "Farina",
  },
  {
    question: "¿Cuántos Grandes Premios ha ganado Sebastian Vettel en su carrera?",
    options: ["48", "53", "56"],
    answer: "53",
  },
  {
    question: "¿En qué equipo debutó Fernando Alonso en la Fórmula 1?",
    options: ["Minardi", "Ferrari", "McLaren"],
    answer: "Minardi",
  },
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let playerName = "";
let playerEmail = "";
let playerEdad = ""

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
      if (!playerName || !playerEmail || !playerEdad) {
        alert("Por favor, ingresa tu nombre,edad y correo electrónico antes de comenzar el cuestionario");
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
    const question = questions[currentQuestionIndex];
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
        if (userAnswer === question.answer) {
          correctAnswers++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
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

function temporizador(func, delay) {
  setTimeout(func, delay);
}

function showResults() {
  const main = document.getElementById("main");
  main.innerHTML = "";

  const resultMessage = document.createElement("div");
  resultMessage.classList.add("alert-message");

  if (correctAnswers >= 8) {
    resultMessage.textContent = "¡Felicidades! Eres un experto en Fórmula 1";

    const resultadoImagen = document.getElementById("resultadoImagen");
    resultadoImagen.style.display = "block";
  } else if (correctAnswers >= 5) {
    resultMessage.textContent = "Mmm, conoces algo de Fórmula 1";
  } else {
    resultMessage.textContent = "Patético, no sabes de Fórmula 1";
  }
  const scoreMessage = document.createElement("div");
  scoreMessage.classList.add("alert-result");
  scoreMessage.innerHTML = `Respuestas correctas: <span class="result-correct">${correctAnswers}</span>/10`;

  main.appendChild(resultMessage);
  main.appendChild(scoreMessage);

  temporizador(showRanking, 3000);
}

function showRanking() {
  const main = document.getElementById("main");
  main.innerHTML = "";

  let rankingData = JSON.parse(localStorage.getItem("rankingData")) || [];

  rankingData.push({ playerName,playerEdad, playerEmail, score: correctAnswers });

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
}

showQuestion();
