
// ==========================================
// KÖRPERTEILE: Pferdewissen zum Anklicken
// ==========================================

const horseParts = {
  kopf: {
    title: "① KOPF & SINNE",
    text: "Pferde haben grosse Augen, bewegliche Ohren und einen sehr empfindlichen Geruchssinn. Ihre Augen liegen seitlich am Kopf. So können sie ihre Umgebung fast rundum wahrnehmen."
  },
  mähne: {
    title: "② MÄHNE & HALS",
    text: "Die Mähne wächst am oberen Rand des Halses. Sie kann kurz, lang, dicht oder wellig sein. Der Hals hilft dem Pferd beim Ausbalancieren."
  },
  rücken: {
    title: "③ RÜCKEN",
    text: "Der Rücken verbindet Vorder- und Hinterhand. Eine gut entwickelte Rückenmuskulatur ist wichtig für Bewegung und Gleichgewicht."
  },
  beine: {
    title: "④ BEINE & GELENKE",
    text: "Pferdebeine sind auf schnelles und ausdauerndes Laufen spezialisiert. Sehnen, Bänder und Gelenke müssen dabei viel leisten."
  },
  hufe: {
    title: "⑤ HUFE",
    text: "Der Huf ist der äussere Schutz des Pferdefusses. Er wächst ständig nach und muss regelmässig kontrolliert und gepflegt werden."
  },
  schweif: {
    title: "⑥ SCHWEIF",
    text: "Der Schweif hilft dem Pferd, Fliegen und andere Insekten zu vertreiben. Er dient auch der Kommunikation und zeigt manchmal die Stimmung."
  }
};

const partButtons = document.querySelectorAll(".part-button");
const partInfo = document.getElementById("part-info");

partButtons.forEach(button => {
  button.addEventListener("click", () => {
    const part = horseParts[button.dataset.part];

    partButtons.forEach(item => item.classList.remove("selected"));
    button.classList.add("selected");

    partInfo.innerHTML = `
      <span>${part.title}</span>
      <p>${part.text}</p>
    `;
  });
});


// ==========================================
// DAS GROSSE PFERDE-QUIZ
// ==========================================

const questions = [
  {
    question: "Wie nennt man ein weibliches Pferd?",
    answers: ["Hengst", "Stute", "Wallach"],
    correct: 1,
    explanation: "Genau! Ein weibliches Pferd nennt man Stute."
  },
  {
    question: "Wie nennt man ein Pferdekind?",
    answers: ["Kalb", "Welpe", "Fohlen"],
    correct: 2,
    explanation: "Richtig! Ein junges Pferd heisst Fohlen."
  },
  {
    question: "Welche Rasse stammt aus der Schweiz?",
    answers: ["Freiberger", "Friese", "Araber"],
    correct: 0,
    explanation: "Super! Der Freiberger stammt aus dem Schweizer Jura."
  },
  {
    question: "Was gehört zur Grundnahrung eines Pferdes?",
    answers: ["Schokolade", "Heu und Gras", "Brot und Kuchen"],
    correct: 1,
    explanation: "Richtig! Raufutter wie Heu und Gras ist die Grundlage."
  },
  {
    question: "Wozu dient der Schweif?",
    answers: [
      "Zum Fliegenvertreiben",
      "Zum Klettern",
      "Zum Schwimmen"
    ],
    correct: 0,
    explanation: "Genau! Mit dem Schweif kann das Pferd Insekten vertreiben."
  },
  {
    question: "Wie nennt man ein männliches, kastriertes Pferd?",
    answers: ["Stute", "Wallach", "Fohlen"],
    correct: 1,
    explanation: "Richtig! Ein kastriertes männliches Pferd heisst Wallach."
  }
];

let questionIndex = 0;
let points = 0;
let hasAnswered = false;

const quizQuestion = document.getElementById("quiz-question");
const quizAnswers = document.getElementById("quiz-answers");
const quizFeedback = document.getElementById("quiz-feedback");
const quizNext = document.getElementById("quiz-next");
const quizCount = document.getElementById("quiz-count");
const quizProgress = document.getElementById("quiz-progress-fill");

function showQuestion() {
  const question = questions[questionIndex];

  hasAnswered = false;

  quizCount.textContent =
    `FRAGE ${questionIndex + 1} VON ${questions.length}`;

  quizProgress.style.width =
    `${(questionIndex / questions.length) * 100}%`;

  quizQuestion.textContent = question.question;
  quizAnswers.innerHTML = "";
  quizFeedback.textContent = "";
  quizNext.hidden = true;

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.className = "quiz-answer";
    button.textContent = answer;

    button.addEventListener("click", () => {
      checkAnswer(index);
    });

    quizAnswers.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  if (hasAnswered) return;

  hasAnswered = true;

  const question = questions[questionIndex];
  const buttons = quizAnswers.querySelectorAll("button");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === question.correct) {
      button.classList.add("correct");
    }

    if (index === selectedIndex && index !== question.correct) {
      button.classList.add("wrong");
    }
  });

  if (selectedIndex === question.correct) {
    points++;
    quizFeedback.textContent = "✓ " + question.explanation;
  } else {
    quizFeedback.textContent = "🐴 " + question.explanation;
  }

  quizNext.hidden = false;

  quizNext.textContent =
    questionIndex === questions.length - 1
      ? "Ergebnis anzeigen ✦"
      : "Nächste Frage →";
}

quizNext.addEventListener("click", () => {
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizCount.textContent = "DEIN ERGEBNIS";
  quizProgress.style.width = "100%";

  quizQuestion.textContent = "Dein Besuch auf dem Hof ist beendet!";
  quizAnswers.innerHTML = "";

  let message;

  if (points === 6) {
    message = "Unglaublich! Du bist ein echter Pferde-Profi! 🏆";
  } else if (points >= 4) {
    message = "Sehr gut! Du kennst dich richtig gut mit Pferden aus! 🌟";
  } else if (points >= 2) {
    message = "Gut gemacht! Du hast schon einiges gelernt! 🌿";
  } else {
    message = "Jeder Pferde-Profi hat einmal klein angefangen! 🐴";
  }

  quizFeedback.textContent =
    `${points} von ${questions.length} Punkten. ${message}`;

  quizNext.hidden = false;
  quizNext.textContent = "Quiz nochmals spielen ↻";

  quizNext.onclick = () => {
    questionIndex = 0;
    points = 0;
    quizNext.onclick = null;
    showQuestion();
  };
}

showQuestion();


// ==========================================
// KLEINES EASTER EGG
// Klicke 5-mal auf das Pferd im Logo!
// ==========================================

let logoClicks = 0;

document.querySelector(".logo").addEventListener("click", event => {
  logoClicks++;

  if (logoClicks === 5) {
    event.preventDefault();

    alert(
      "🐴 NEUES GEHEIMNIS ENTDECKT! 🐴\n\n" +
      "Du hast den geheimen Stallmeister gefunden!\n" +
      "Zur Belohnung bekommst du eine extra Portion Karotten. 🥕"
    );

    logoClicks = 0;
  }
});


// ==========================================
// KLEINE BEWEGUNG BEI DEN PFERDEKARTEN
// ==========================================

document.querySelectorAll(".horse-card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.add("horse-visited");

    setTimeout(() => {
      card.classList.remove("horse-visited");
    }, 500);
  });
});


// ==========================================
// ZURÜCK NACH OBEN
// ==========================================

document.querySelectorAll('a[href="#home"]').forEach(link => {
  link.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
