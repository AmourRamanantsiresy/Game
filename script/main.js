// initialisation du canvas dans js 
const canvas = document.getElementById('canvas');
//prise du contexte du canvas 
const ctx = canvas.getContext('2d');
//classe game 
const game = new Game(ctx, canvas);
//initialisation du span où vas s'afficher le score dans js
const score = document.getElementById("score");

//on appele ma methode principale de la classe Game pour demarrer le jeu 
game.main();
//mise en forme du score
setInterval(() => {
    if (game.score < 10)
        score.innerHTML = `000${game.score}`
    else if (game.score < 100)
        score.innerHTML = `00${game.score}`
    else if (game.score < 1000)
        score.innerHTML = `0${game.score}`
    else
        score.innerHTML = `0${game.score}`
}, 100)
//fonction qui redémare le jeu en cas de crache 
function restart() {
    game.restore()
}