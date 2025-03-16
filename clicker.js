const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 50;

document.title = "Untitled";

const clickImg = new Image();
clickImg.src = "click_me.png";

const starImg = new Image();
starImg.src = "shootingstar.png";

let counter = 0;
let doubleB = false, powerdoubleB = false, critB = false, autoB = false, starB = false;
let value = 1;

class Button {
    constructor(y, image) {
        this.image = image;
        this.y = y;
        this.width = 150;
        this.height = 75;
        this.x = (canvas.width - this.width) / 2;
        this.clicked = false;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    isClicked(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width &&
               mouseY >= this.y && mouseY <= this.y + this.height;
    }
}

class Powerup {
    constructor(order, label) {
        this.order = order;
        this.label = label;
        this.x = this.order < 3 ? 1300 : 1400;
        this.y = 400 + 100 * (this.order % 2 === 0 ? 1 : 0);
    }

    draw() {
        ctx.fillStyle = "black";
        ctx.font = "32px Arial";
        ctx.fillText(this.label, this.x, this.y);
    }
}

const clickButton = new Button(200, clickImg);
const powerups = [
    new Powerup(1, "X2"),
    new Powerup(2, "^X2^"),
    new Powerup(3, "CRIT"),
    new Powerup(4, "AUTO"),
    new Powerup(5, "STAR")
];

function drawText() {
    ctx.fillStyle = "black";
    ctx.font = "32px Arial";
    ctx.fillText(`Dopamine Points: ${Math.floor(counter)}`, 50, 50);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    clickButton.draw();
    drawText();
    powerups.forEach(p => p.draw());
    
    if (autoB) counter += 1 / 60;
    requestAnimationFrame(gameLoop);
}

gameLoop();

document.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (clickButton.isClicked(mouseX, mouseY)) {
        counter += value;
        console.log("Clicked! Counter: ", counter);
    }
});
