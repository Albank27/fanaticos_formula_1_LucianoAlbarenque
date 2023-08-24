//questions "este array es el principal que tiene todas las preguntas y sus detalles(opciones y respuestas)"
//funcion de orden superior = temporizador

const questions = [
{question: "¿Cuál es el piloto con más campeonatos de Fórmula 1?",
options: ["Lewis Hamilton", "Michael Schumacher", "Juan Manuel Fangio"],
answer: "Michael Schumacher"
        },
{question: "¿Qué equipo ha ganado más campeonatos de constructores?",
options: ["Ferrari", "Mercedes", "McLaren"],
answer: "Ferrari"
        },
{question: "¿En qué país se corre el Gran Premio de Mónaco?",
options: ["Italia", "España", "Mónaco"],
answer: "Mónaco"
        },
{question: "¿Qué piloto es conocido como 'The Flying Finn'?",
options: ["Kimi Räikkönen", "Valtteri Bottas", "Max Verstappen"],
answer: "Kimi Räikkönen"
        },
{question: "¿Cuántos títulos mundiales ha ganado Ayrton Senna?",
options: ["2", "3", "4"],
answer: "3"
        },
{question: "¿Cuál es el circuito más largo del calendario de Fórmula 1?",
options: ["Monza", "Spa-Francorchamps", "Silverstone"],
answer: "Spa-Francorchamps"
        },
{question: "¿En qué ciudad se encuentra el circuito de Yas Marina?",
options: ["Dubai", "Abu Dhabi", "Doha"],
answer: "Abu Dhabi"
        },
{question: "¿Qué piloto ganó el primer campeonato de Fórmula 1 en la historia?",
options: ["Fangio", "Ascari", "Farina"],
answer: "Farina"
        },
{ question: "¿Cuántos Grandes Premios ha ganado Sebastian Vettel en su carrera?",
options: ["48", "53", "56"],
answer: "53"
    },
{question: "¿En qué equipo debutó Fernando Alonso en la Fórmula 1?",
options: ["Minardi", "Ferrari", "McLaren"],
answer: "Minardi"
    }
  ];
  
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  let playerName = "";
  
  
  function showQuestion() {
    const main = document.getElementById("main");
    main.innerHTML = "";
  
    if (!playerName) {
      const playerNameInput = document.createElement("input");
      playerNameInput.type = "text";
      playerNameInput.id = "nombre";
      playerNameInput.placeholder = "Ingresa tu nombre";
  
      const startButton = document.createElement("button");
      startButton.innerText = "Comenzar Cuestionario";
      startButton.onclick = function () {
        playerName = document.getElementById("nombre").value;
        if (!playerName) {
          alert("Por favor, ingresa tu nombre antes de comenzar el cuestionario");
          //pongo un alert porque sino ingresan el nombre no pueden avanzar en el cuestionario
        } else {
          // Ocultar el campo de nombre y mostrar las preguntas
          playerNameInput.style.display = "none";
          startButton.style.display = "none";
          showQuestion(); // Llama a la función para mostrar las preguntas
        }
      };
  
      main.appendChild(playerNameInput);
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

    // Mostrar la imagen si se cumple la condición
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

  // Llamar a la función de orden superior para mostrar el ranking después de 3 segundos
  temporizador(showRanking, 3000);
}
  
  function showRanking() {
    const main = document.getElementById("main");
    main.innerHTML = "";
  
    // Quiero mostrar un ranking cuando termine el cuestionario 
    const table = document.createElement("table");
    const tableHeader = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const playerNameHeader = document.createElement("th");
    playerNameHeader.textContent = "Nombre del Jugador";
    const playerScoreHeader = document.createElement("th");
    playerScoreHeader.textContent = "Puntaje";
  
    headerRow.appendChild(playerNameHeader);
    headerRow.appendChild(playerScoreHeader);
    tableHeader.appendChild(headerRow);
    table.appendChild(tableHeader);
  
    const tableBody = document.createElement("tbody");
  
    // Esto es para agregar el resultado del jugador actual al ranking, lo vi en youtube pero todvia no entiendo bien como funciona
    tableBody.innerHTML = `<tr><td>${playerName}</td><td>${correctAnswers}</td></tr>`;
  
    table.appendChild(tableBody);
    main.appendChild(table);
  }
  
  // Iniciar el cuestionario al cargar la pagina
  showQuestion();