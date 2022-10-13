import { Player, handlePlayerMovement } from './player.js';
import { Position, Velocity } from './entity.js';


const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");


let halfWidth = canvas.width / 2;
let halfHeight = canvas.height / 2;




/* const findDiv = (key) => {
    let className = `.key${key}`; 
    return document.querySelector(className);
  };
  
  document.addEventListener('keydown', (e) => {
    let div = findDiv(e.key);
    if(div) div.classList.add('light');
  });
  
  document.addEventListener('keyup', (e) => {
    document.querySelectorAll('.item').forEach(d => d.classList.remove('light'));
  });

 */


let walls = [];

class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.deltaTime = 0;
    }

}

class Wall {
    constructor(positionX, positionY, width, height) {
        this.position = new Position(positionX, positionY);
        this.width = width;
        this.height = height;
        this.color = 'green';
    }
   draw() {
    context.fillStyle = 'rgb(24,112,69)';
    context.fillRect(this.position.x, this.position.y, this.height, this.width);
/*     context.stroke(); */
   }
}


class Finnish {
    constructor(positionX, positionY, radius){
        this.position = new Position(positionX, positionY);
        this.radius = radius;
        this.color = 'black';
    }

    draw() {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        context.fill();
    }
}


// _ = player start position
// ! = finnish
// # = wall
// . = pathdd

let maze = [

    "...#####################################",
  
    "_.............................#........#",
  
    "..###..##..##.###..##########.##.####..#",
  
    "#.#.....#.###.###......................#",
  
    "#.#.#.....###.#....#####.###########.#.#",
  
    "#.#.#.#######.###.....##...........#.#.#",
  
    "#.#.#..#.......#####..############.#.#.#",
  
    "#.#.####.##########..............#.#.#.#",
  
    "#...####..............##########.#.#.#.#",
  
    "##........###############...####.#...#.#",
  
    "##..####..######........##.......###.#.#",
  
    "##........###.....######...###########.#",
  
    "#############.....####..####......#....#",
  
    "#.....................#......###..#.##.#",
  
    "#.###############..#############..#.##.#",
  
    "#.###############.............##..####.#",
  
    "#.#................####.########.......#",
  
    "#.#.##.#######.##.....#........#..####.#",
  
    "#.#.#......###.#####..####.#####..#....#",
  
    "#.#.#.###.............#...........#.##.#",
  
    "#.#...##...#.#######..#.###.#######.##.#",
  
    "#.#######..#.#..####..#.#.#.##........##",
  
    "#..........#...#......#.#.#.########..##",
  
    "###..###########...####...#...........##",
  
    "!.................######################",]


// let player = new Player(30, 30, 8);

let wallWidth = 20;
let wallHeight = 20;
let player;
let finnish;

function createWalls(array) {
        
    for(let i = 0; i < array.length; i++){
                
        for (let j = 0; j < array[i].length; j++){
            // man kan skriva arra[i][j]
            // x = j * wallWidth (då behöver ni inte currentWidth grejen)
            // y = i * wallHeight
            if (array[i][j] === '#') {
                walls.push(new Wall(j * wallWidth, i * wallHeight, wallWidth, wallHeight))
            } else if(array[i][j] === '_'){ 
               player = new Player({x: j * wallWidth + 10, y: i * wallHeight + 10}, 8);
            } else if (array[i][j] === '!') {
                finnish = new Finnish(j * wallWidth + 10, i * wallHeight + 10, 8);
            }
            
        }
    }
   
}



 createWalls(maze);

for(let i = 0; i < walls.length; i++) {
    let wall = walls[i];
    wall.draw();
}



function circleCollision(circle1, circle2) {
    let dx = circle1.position.x - circle2.position.x;
    let dy = circle1.position.y - circle2.position.y;
    let distance = Math.sqrt((dx * dx) + (dy * dy));

    return distance < circle1.radius + circle2.radius;
}


//walls.push(new Wall(currentWidth.x, currentWidth.y, wallWidth, wallHeight))


//walls[0].draw();
//walls[1].draw();
let game = new Game(canvas, context);

function handleKeyDown(event) {
    if (event.repeat) return;

    if (event.key === 'w') {
        player.keys.up = true;
        
    } else if (event.key === 'a') {
        player.keys.left = true;
    } else if (event.key === 's') {
        player.keys.down = true;
    } else if (event.key === 'd') {
        player.keys.right = true;
    }
}

function handleKeyUp(event) {
    if (event.key === 'w') {
        player.keys.up = false;
    } else if (event.key === 'a') {
        player.keys.left = false;
    } else if (event.key === 's') {
        player.keys.down = false;
    } else if (event.key === 'd') {
        player.keys.right = false;
        }
}

window.addEventListener("keypress", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);


console.log(player);




let lastTick = Date.now();
function tick() {
    let currentTick = Date.now();
    let deltaTime = (currentTick - lastTick) / 1000;
    lastTick = currentTick;

     context.fillStyle = 'rgb(232, 218, 91, 20)';
     context.fillRect(0, 0, canvas.width, canvas.height);
     

     for(let i = 0; i < walls.length; i++) {
        let wall = walls[i];
        wall.draw();

    
    }

    
    handlePlayerMovement(player, walls, deltaTime);
  
   player.draw();
    finnish.draw();
    
    
if (circleCollision(player, finnish)){
    alert('DU VANN', timer)
}
    

    requestAnimationFrame(tick)
}

tick();

var timer;
var ele = document.getElementById('timer');

(function () {
    var sec = 0; 
    timer = setInterval(()=>{
        ele.innerHTML = 'Timer: ' + sec + ' sec';
        sec ++;
    }, 1000) //each 1 second
})()