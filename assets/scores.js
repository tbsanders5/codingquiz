function displayUserScores() {

    let userScores = JSON.parse(window.localStorage.getItem('user-scores')) || [];

    userScores.sort(function(a, b) {
        return b.score - a.score;
    });

    userScores.forEach(function(score) {

        let listElement = document.createElement('li');
        listElement.textContent = score.userInit + ' - ' + score.score;

        let orderedLineElement = document.getElementById('user-scores');
        orderedLineElement.appendChild(listElement);

    });
}

function clearScores() {

    window.localStorage.removeItem('user-scores');
    window.location.reload();
}

document.getElementById('clear').onclick = clearScores;

displayUserScores();