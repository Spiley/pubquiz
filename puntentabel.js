// Example teams array
    let teams = JSON.parse(localStorage.getItem('teams')) || [
      { name: 'Team A', points: 0 },
      { name: 'Team B', points: 0 }
    ];

    function addPointsToSpecificTeam(index) {
      teams[index].points += 1;
      localStorage.setItem('teams', JSON.stringify(teams));
      displayPoints();
    }

    function subtractPointsFromSpecificTeam(index) {
      teams[index].points -= 1;
      localStorage.setItem('teams', JSON.stringify(teams));
      displayPoints();
    }

    // Your displayPoints function
    function displayPoints() {
      const teamPointsList = document.getElementById('teamPointsList');
      teamPointsList.innerHTML = '';
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

    // Call it initially to display the table
    displayPoints();