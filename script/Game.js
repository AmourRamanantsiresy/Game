/*
*la classe qui sera la base du jeu
*/
class Game {
    // initialisation du constructeur 
    constructor(ctx, canvas) {
        //ctx et contexte du canvas
        this.ctx = ctx;
        this.canvas = canvas;
        //couleur des adversaires 
        this.color = "red";
        //les positions de tout les adverdaires 
        this.allPosition = [[0, -320], [0, -220], [0, -120], [0, 0]]
        //la position du joueur suivant l'axe des x
        this.playerX = 17;
        //stokage des score du joueur
        this.score = 0;
        //vitesse de mouvement des adversaires
        this.speed = 200;
        //signe du crache 
        this.stopSigne = false;
    }
    //une methode qui vas permettre au jeu de démarrer
    main() {
        //ecoute les touches et change le position du joueur en fonction 
        this.playerMovement()
        //definition de la taille du canvas
        this.canvas.width = 200;
        this.canvas.height = 400;
        //animation de tout les mouvement qu'il y a dans le canvas
        this.moveOne(0)
    }
    //dessine les adversaires en fonction de leurs positions suivant les axes x et y 
    drawE(x, y) {
        //couleur des adversaires 
        this.ctx.fillStyle = this.color;
        //dessine un réctangle de largeur 38 et de longueur 48
        this.ctx.fillRect(x + 1, y + 1, 38, 48)
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x + 1, y + 1, 38, 48)
    }
    //efface tout sur le canvas
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    //fournit aléatoirement les positions de un à trois adversaires sur une même ligne 
    makePosition() {
        let tab = [];
        for (let a = 0; a < 1 + Math.round(Math.random() * 2); a++) {
            let b = Math.round(Math.random() * 4);
            if (tab.includes(b)) {
                a--;
            } else {
                tab.push(b);
            }
        }
        return tab;
    }

    /*
        dessine un à un tout les adversaires sur une même ligne en utilisant la fontion drawE 
        qu'on a deja définit et les position fournis par la fonction makePosition
    */
    drawAllE(x, y) {
        for (let a of x) {
            this.drawE(a * 40, y)
        }
    }

    //fonction qui va prendre en charge tout les animations dans le canvas 
    //les mouvements de gauche à droite du joureur et de haut en bas des adversaires  
    moveOne(numero) {
        //prend des postions pour 4 lignes et on les stoke dans le tableau de allposition 
        for (let compt = 0; compt < 4; compt++) {
            this.allPosition[numero + compt][0] = this.makePosition();
        }
        //pour le mouvement, on utilise un set interval 
        let interval = setInterval(() => {
            //à chaque intervalle, on ajoute un point au score 
            this.score++;
            //à chaque fois que le score est divisible par 10, on augmente la vitesse de 1
            if (this.score % 10 == 0)
                this.speed -= 5
            //on efface les elements du canvas 
            this.clearAll();
            //dessigne tout les arversaires en fonction de leurs lignes et de leurs positions 
            for (let compt = 0; compt < 4; compt++) {
                //on ajoute 10 à la position y des adversaires 
                this.allPosition[numero + compt][1] += 10;
                this.drawAllE(this.allPosition[numero + compt][0], this.allPosition[numero + compt][1])
                //on verifie si une ligne à deja depasser le longueur du canvas 
                this.isFinish(numero + compt)
            }
            //dessigne le joueur
            this.drawPlayer()
            //verifie si le joueur entre en collision avec un des adversaires 
            if (this.stopCondition(0) || this.stopCondition(1) || this.stopCondition(2) || this.stopCondition(3)) {
                //renvoi que il y a eu un crash 
                this.stopSigne = true;
                //efface l'intervale 
                clearInterval(interval)
            }
        }, this.speed);
    }
    //renvoye en temps reel le score du joueur
    get scoreLive() {
        return this.score;
    }
    //verifie si une ligne d'adversaire ait dépasser la longueur du canvas 
    isFinish(numero) {
        if (this.yInTab(numero) > this.canvas.height) {
            //renvo les adversaires ayant depasser la longueur du canvas à la postion y = -50
            this.allPosition[numero][1] = -50;
            if (this.allPosition[numero][1] == -50) {
                //donne des nouvelles positions au adversaires ayant depasser la longueur du canvas 
                this.allPosition[numero][0] = this.makePosition();
            }
        }
    }
    //verivie une valeur du tableau allposition grâce à un index
    yInTab(n) {
        return this.allPosition[n][1]
    }

    //dessine le joueur
    drawPlayer() {
        this.ctx.beginPath()
        this.ctx.fillStyle = "green";
        this.ctx.arc(this.playerX + 2, 350, 16, 0, Math.PI * 2)
        this.ctx.stroke()
        this.ctx.fill()
    }

    //ecoute les clicks sur le clavier et change le positions par rapport à x du joueur
    playerMovement() {
        document.addEventListener("keydown", (event) => {
            if (event.key == "ArrowLeft" && this.playerX > 17) {
                this.playerX -= 40;
            } if (event.key == "ArrowRight" && this.playerX < 158) {
                this.playerX += 40;
            }
        })
    }
    //verifie si le joueur heurte un adversaire et retourne true si c'est le cas 
    stopCondition(n) {
        if (this.allPosition[n][1] + 48 > 334 && this.allPosition[n][1] < 366) {
            for (let a of this.allPosition[n][0]) {
                if (this.transformPos(this.playerX) == a) {
                    return true;
                }
            }
        }
    }

    //transforme la position du joueurr en 0,1,2 ou 3
    transformPos(n) {
        if (n == 17)
            return 0
        else if (n == 57)
            return 1
        else if (n == 97)
            return 2
        else if (n == 137)
            return 3
        return 4
    }
    //restore tout les position à celle d'origine en cas de crash
    restore() {
        if (this.stopSigne == true) {
            this.stopSigne = false
            this.allPosition = [[0, -320], [0, -220], [0, -120], [0, 0]]
            this.playerX = 17;
            this.score = 0;
            this.speed = 200;
            this.moveOne(0)
        }
    }
}
