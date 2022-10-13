import { Position } from './entity.js';


const canvs = document.getElementById("canvas");
const context = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

const gradient = context.createRadialGradient(110, 90, 20, 100, 100, 100);
gradient.addColorStop(0, "pink");
gradient.addColorStop(0.9, "white");
gradient.addColorStop(0, "black"); 

export class Keys {
    constructor() {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
    }
}

export class Player {
    constructor(position, radius) {
        this.position = position;
        this.speed = 200;
        this.radius = radius;
        this.color = "teal"
        this.keys = new Keys();


    }
    draw() {
        context.beginPath();
        
        context.fillStyle = this.color;
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        context.fill();

        context.beginPath();
        context.strokeStyle="black"
        context.lineWidth = 900;
        context.arc(this.position.x, this.position.y, 500, 0, 2*Math.PI, false)
        context.stroke()
        context.closePath();

    
}

}

export function handlePlayerMovement(player, walls, deltaTime) {
    let speed = player.speed;

    if (player.keys.up && player.position.y > player.radius) {
        player.position.y -= speed * deltaTime;

        let wall = checkCollision(player, walls);
        if (wall !== null) {
            player.position.y = (wall.position.y + wall.height) + (player.radius) + 1;
        }
    }

    if (player.keys.down && player.position.y < height - player.radius) {
        player.position.y += speed * deltaTime;

        let wall = checkCollision(player, walls);
        if (wall !== null) {
            player.position.y = (wall.position.y - 1) - player.radius ;
        }
    }

    if (player.keys.left && player.position.x > player.radius) {
        player.position.x -= speed * deltaTime;

        let wall = checkCollision(player, walls);
        if (wall !== null) {
            player.position.x = (wall.position.x + wall.width + 1) + player.radius;
        }
    }

    if (player.keys.right && player.position.x < width - player.radius) {
        player.position.x += speed * deltaTime;

        let wall = checkCollision(player, walls);
        if (wall !== null) {
            player.position.x = (wall.position.x - 1) - player.radius;
        }
    }
}

function checkCollision(player, walls) {
    for (let i = 0; i < walls.length; i++) {
        let wall = walls[i];
        if (playerRectangleCollision(player, wall)) {
            return wall;
        }
    }

    return null;
}

function playerRectangleCollision(player, walls) {
    let cdx = Math.abs(player.position.x - (walls.position.x + (walls.width / 2)));
    let cdy = Math.abs(player.position.y - (walls.position.y + (walls.height / 2)));

    if (cdx > (walls.width / 2 + player.radius)) {
        return false;
    }
    if (cdy > (walls.height / 2 + player.radius)) {
        return false;
    }

    if (cdx <= walls.width / 2) {
        return true;
    }
    if (cdy <= walls.height / 2) {
        return true;
    }

    let distSquared = ((cdx - walls.width / 2) ** 2) + ((cdy - walls.height / 2) ** 2);
    return distSquared <= player.radius ** 2;
}


