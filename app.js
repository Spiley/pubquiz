let teams = JSON.parse(localStorage.getItem('teams')) || [];
let currentQuestionIndex = 0;

// Fetch questions from the HTML file
const questions = [];
document.querySelectorAll('#questionsData .question').forEach(questionElement => {
  const question = {
    question: questionElement.getAttribute('data-question'),
    answers: questionElement.getAttribute('data-answers').split(', '),
    correctAnswer: questionElement.getAttribute('data-correct')
  };
  questions.push(question);
});

// Function to display the current question
function displayQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById('questionText').textContent = question.question;

  // Display answer options
  const answerOptions = document.getElementById('answerOptions');
  answerOptions.innerHTML = ''; // Clear previous answers
  question.answers.forEach(answer => {
    const answerElement = document.createElement('p'); // Use <p> or <span> instead of <button>
    answerElement.textContent = answer;
    answerElement.onclick = () => checkAnswer(answer);
    answerOptions.appendChild(answerElement);
  });

  // Add the "Show Correct Answer" button
  const showCorrectButton = document.getElementById('showCorrectAnswer');
  if (!showCorrectButton) {
    const newButton = document.createElement('button');
    newButton.id = 'showCorrectAnswer';
    newButton.textContent = 'Show Correct Answer';
    newButton.onclick = showCorrectAnswer;
    answerOptions.appendChild(newButton); // Add below the answer options
  }

  // Hide the "Next Question" button initially
//   const nextButton = document.getElementById('nextButton');
//   nextButton.style.display = 'none';
}

// Function to check if the selected answer is correct
function checkAnswer(selectedAnswer) {
  const question = questions[currentQuestionIndex];
  const correctAnswer = question.correctAnswer;

  // Disable all answer options after one is clicked
  const answers = document.querySelectorAll('#answerOptions p');
  answers.forEach(answer => answer.style.pointerEvents = 'none'); // Disable clicking after selection

  // Show the "Show Correct Answer" button after the user has clicked an answer
  document.getElementById('showCorrectAnswer').style.display = 'inline-block';
}

function showCorrectAnswer() {
  const question = questions[currentQuestionIndex];
  const correctAnswer = question.correctAnswer;

  // Highlight the correct answer by adding a 'correct' class
  const answers = document.querySelectorAll('#answerOptions p');
  answers.forEach(answer => {
    if (answer.textContent === correctAnswer) {
      answer.classList.add('correct'); // Add the 'correct' class
    } else {
      answer.classList.add('incorrect'); // Optionally, highlight incorrect answers too
    }
  });

  // Show the "Next Question" button after showing the correct answer
//   document.getElementById('nextButton').style.display = 'inline-block';
}


// Function to move to the next question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    finishQuiz();
  }
}

// Function to add points to the current team
function addPointsToTeam() {
  const teamIndex = currentQuestionIndex % teams.length; // Cycle through teams
  teams[teamIndex].points += 1;  // Add 1 point to the corresponding team
  localStorage.setItem('teams', JSON.stringify(teams)); // Save updated points
  displayPoints();
}

// Function to display the points of all teams
function displayPoints() {
    const teamPointsList = document.getElementById('teamPointsList');
    teamPointsList.innerHTML = ''; // Clear existing rows
    teams.forEach((team, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${team.name}</td>
        <td>${team.points}</td>
        <td>
          <button onclick="addPointsToSpecificTeam(${index})">+1 Point</button>
          <button onclick="subtractPointsFromSpecificTeam(${index})">-1 Point</button>
        </td>
      `;
      teamPointsList.appendChild(row);
    });
}

// Function to add points to a specific team by clicking their button
function addPointsToSpecificTeam(teamIndex) {
  teams[teamIndex].points += 1; // Add 1 point to the selected team
  localStorage.setItem('teams', JSON.stringify(teams)); // Save updated points
  displayPoints();
}

// Function to finish the quiz and show the results
function finishQuiz() {
    window.location.href = 'ronde2.html';
}

// Function to subtract 1 point from a specific team by clicking their button
function subtractPointsFromSpecificTeam(teamIndex) {
    if (teams[teamIndex].points > 0) {  // Ensure points don't go below 0
      teams[teamIndex].points -= 1; // Subtract 1 point from the selected team
      localStorage.setItem('teams', JSON.stringify(teams)); // Save updated points
      displayPoints();
    }
}

// Start the quiz
displayQuestion();
displayPoints();
