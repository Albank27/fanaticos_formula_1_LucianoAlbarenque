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
 options: ["48", "52", "56"],
 answer: "53"
},
{question: "¿En qué equipo debutó Fernando Alonso en la Fórmula 1?",
 options: ["Renault", "Ferrari", "McLaren"],
 answer: "Minardi"
}
];

// Funcion que voy a utilizar para generar el cuestionario
function generateQuiz() {
const main = document.getElementById("main");

    
// Con esta variable llevo la cantidad de respuestas correctas
let correctAnswers = 0;

// bucle
for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<p>${question.question}</p>`;

// botones, esto lo vi en youtube como hacerlo 
for (let j = 0; j < question.options.length; j++) {
    const option = question.options[j];
     const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = `question${i}`;
    radioInput.value = option;
    questionDiv.appendChild(radioInput);
    questionDiv.appendChild(document.createTextNode(option));
    questionDiv.appendChild(document.createElement("br"));
    }

    main.appendChild(questionDiv);
    }
    const submitButton = document.createElement("button");
    submitButton.innerText = "Conocer mi puntuación";
    submitButton.onclick = function () {
// Calcular respuestas correctas
        for (let i = 0; i < questions.length; i++) {
            const selectedAnswer = document.querySelector(`input[name="question${i}"]:checked`);
            if (selectedAnswer) {
                const userAnswer = selectedAnswer.value;
                if (userAnswer === questions[i].answer) {
                    correctAnswers++;
                }
            }
        }

//funcion y alert
let message;
if (correctAnswers >= 8) {
message = "¡Felicidades! Ganaste, sabes mucho de Fórmula 1.";
} else if (correctAnswers >= 5) {
 message = "¡Bien hecho! Sigue practicando para mejorar tus conocimientos.";
} else {
message = "No sabes mucho de Fórmula 1, pero no te preocupes, ¡sigue intentando!";
}

alert(`Respuestas correctas: ${correctAnswers}/10\n${message}`);

// Reinicia el cuestionario
main.innerHTML = "";
correctAnswers = 0;
generateQuiz();
    };

    main.appendChild(submitButton);
}

// Generar el cuestionario al cargar la página
generateQuiz();