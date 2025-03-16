const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

document.title = "Untitled";

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 50;

const clickImg = new Image();
clickImg.src = "click_me.png";

const starImg = new Image();
starImg.src = "shootingstar.png";

let counter = 0;
let doubleB = false, powerdoubleB = false, critB = false, autoB = false, starB = false;
let value = 1;
let handled = false;
let starPositions = [];
let powerupsUnlocked = { STAR: false };

class Button {
    constructor(y, image) {
        this.image = image;
        this.y = y;
        this.size = { width: 150, height: 75 };
        this.x = (canvas.width - this.size.width) / 2;
        this.clicked = false;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.size.width, this.size.height);
    }

    isClicked(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.size.width &&
               mouseY >= this.y && mouseY <= this.y + this.size.height;
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

function drawStars() {
    if (!starB) return;
    starPositions.forEach((pos, i) => {
        ctx.drawImage(starImg, pos.x, pos.y, 50, 50);
        pos.x += 2; 
        if (pos.x > canvas.width) pos.x = -50; 
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    clickButton.draw();
    drawText();
    powerups.forEach(p => p.draw());
    drawStars();
    
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

    powerups.forEach(powerup => {
        if (mouseX >= powerup.x && mouseX <= powerup.x + 50 &&
            mouseY >= powerup.y && mouseY <= powerup.y + 50) {
            
            if (powerup.label === "X2" && counter > 4) {
                doubleB = true;
                value = 2;
            } else if (powerup.label === "^X2^" && counter > 20) {
                powerdoubleB = true;
            } else if (powerup.label === "CRIT" && counter > 100) {
                critB = true;
            } else if (powerup.label === "AUTO" && counter > 49) {
                autoB = true;
            } else if (powerup.label === "STAR" && counter > 9) {
                starB = true;
                if (starPositions.length === 0) {
                    for (let i = 0; i < 5; i++) {
                        starPositions.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height });
                    }
                }
            }
            console.log(`${powerup.label} Power-up Activated!`);
        }
    });
});
