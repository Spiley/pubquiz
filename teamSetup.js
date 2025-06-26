let teams = JSON.parse(localStorage.getItem('teams')) || [];

function addTeam() {
  const teamName = document.getElementById('teamName').value;
  if (teamName) {
    const newTeam = { name: teamName, points: 0 };
    teams.push(newTeam);
    localStorage.setItem('teams', JSON.stringify(teams)); // Save teams to localStorage
    document.getElementById('teamName').value = ''; // Clear input
    displayTeams();
  } else {
    alert('Please enter a team name.');
  }
}

function displayTeams() {
  const teamList = document.getElementById('teamList');
  teamList.innerHTML = '';
  teams.forEach(team => {
    const li = document.createElement('li');
    li.textContent = team.name;
    teamList.appendChild(li);
  });
}

// Reset teams and clear localStorage
function resetTeams() {
  localStorage.removeItem('teams'); // Clear teams from localStorage
  teams = []; // Reset teams array
  displayTeams(); // Refresh the team list
}

// Navigate to the quiz page
function goToQuiz() {
  window.location.href = "ronde1uitleg.html"; // Go to quiz page
}

displayTeams();
