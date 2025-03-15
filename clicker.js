const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 50;

document.title = "Untitled";

const clickImg = new Image();
clickImg.src = "click me.png";

const starImg = new Image();
starImg.src = "shootingstar.png";

class Button {
    constructor(y, image) {
        this.image = image;
        this.y = y;
        this.clicked = false;
    }

    draw(multiplier, degree) {
        if (degree === 1) {
            this.clicked = false;
        }
        const width = this.image.width * multiplier;
        const height = this.image.height * multiplier;
        const x = (canvas.width - width) / 2;
        ctx.drawImage(this.image, x, this.y, width, height);
    }
}

class Powerup {
    constructor(order, label) {
        this.order = order;
        this.label = label;
    }

    draw() {
        ctx.fillStyle = "black";
        ctx.font = "32px Arial";
        const x = this.order < 3 ? 1300 : 1400;
        const y = 400 + 100 * (this.order % 2 === 0 ? 1 : 0);
        ctx.fillText(this.label, x, y);
    }
}

let counter = 0;
const click = new Button(200, clickImg);
const dopamine = new Button(270, document.createElement("canvas"));

const powerups = [
    new Powerup(1, "X2"),
    new Powerup(2, "^X2^"),
    new Powerup(3, "CRIT"),
    new Powerup(4, "AUTO"),
    new Powerup(5, "STAR")
];

let doubleB = false, powerdoubleB = false, critB = false, autoB = false, starB = false;

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    click.draw(0.6, 1);
    dopamine.draw(0.6, 2);
    
    powerups.forEach(p => p.draw());
    
    requestAnimationFrame(gameLoop);
}

gameLoop();

document.addEventListener("click", (event) => {
    const x = (canvas.width - clickImg.width * 0.6) / 2;
    const y = 200;
    const width = clickImg.width * 0.6;
    const height = clickImg.height * 0.6;
    
    if (
        event.clientX >= x && event.clientX <= x + width &&
        event.clientY >= y && event.clientY <= y + height
    ) {
        counter += 1;
        console.log("clicked");
    }
});