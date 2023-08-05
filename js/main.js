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
  
function showQuestion() {
const main = document.getElementById("main");
main.innerHTML = "";
  
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
  
function showResults() {
const main = document.getElementById("main");
main.innerHTML = "";
  
const resultMessage = document.createElement("div");
resultMessage.classList.add("alert-message");
  
if (correctAnswers >= 8) {
resultMessage.textContent = "¡Felicidades! Sos crack, sabes de Formula 1";
} else if (correctAnswers >= 5) {
resultMessage.textContent = "Mmm maso maso, tenes que seguir intentando para ser bueno.";
} else {
resultMessage.textContent = "Patetico, no sabes de formula 1";
}
const scoreMessage = document.createElement("div");
scoreMessage.classList.add("alert-result");
scoreMessage.innerHTML = `Respuestas correctas: <span class="result-correct">${correctAnswers}</span>/10`;
  
main.appendChild(resultMessage);
main.appendChild(scoreMessage);
  
const restartButton = document.createElement("button");
restartButton.innerText = "Reiniciar Cuestionario";
restartButton.onclick = function () {
currentQuestionIndex = 0;
correctAnswers = 0;
showQuestion();
};
  
main.appendChild(restartButton);
}

//cuando recargo la pagina que se muestre el formulario
showQuestion();