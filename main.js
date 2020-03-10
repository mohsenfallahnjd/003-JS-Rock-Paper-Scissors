const options = document.getElementsByClassName("option");
const choices = ["rock", "paper", "scissors"];
const winState = { rock: "scissors", paper: "rock", scissors: "paper" };
const battle_elem = document.getElementById("battle");
const reset_elem = document.getElementById("reset");
const score_elem = document.getElementById("score");
const aiScore_elem = document.getElementById("aiScore");

let score = 0;
let aiScore = 0;
const storage = window.localStorage;

if (storage.getItem("score")) {
  score = storage.getItem("score");
}
if (storage.getItem("aiScore")) {
  aiScore = storage.getItem("aiScore");
}

score_elem.innerHTML = score;
aiScore_elem.innerHTML = aiScore;

for (let i = 0; i < options.length; i++) {
  let option = options[i];
  option.addEventListener("click", function() {
    this.classList.add("selected");
    disableOptions();
    battle(this);
  });
}

function disableOptions() {
  const options = document.getElementsByClassName("option");

  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    if (!option.classList.contains("selected")) {
      option.classList.add("disabled");
      reset_elem.classList.remove("hide");
    }
  }
}

function battle(option) {
  const choice = option.dataset.choice;
  const aiChoice = choices[rand(2, 0)];

  displayChoice(choice, aiChoice);

  if (choice == aiChoice) {
    option.classList.add("draw");
  } else if (aiChoice == winState[choice]) {
    option.classList.add("winner");
    score++;
    storage.setItem("score", score);
    score_elem.innerHTML = score;
  } else {
    option.classList.add("loser");
    aiScore++;
    storage.setItem("aiScore", aiScore);
    aiScore_elem.innerHTML = aiScore;
  }
}

function rand(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayChoice(palyer, ai) {
  let choice_elem = document.createElement("div");
  choice_elem.classList.add("aiChoice", ai);

  battle_elem.appendChild(choice_elem);
}

reset_elem.addEventListener("click", reset);

function reset() {
  for (let i = 0; i < options.length; i++) {
    let option = options[i];

    option.classList.remove("selected");
    option.classList.remove("disabled");
    option.classList.remove("winner");
    option.classList.remove("loser");
    option.classList.remove("draw");
  }
  battle_elem.innerHTML = "<h3> AI CHOICE </h3>";
  reset_elem.classList.add("hide");
}
