// Grid Goes Here

const FREE = 0;
const OBSTACLE = 1;
const MARS_ROVER = 2;
const JUPITER_ROVER = 3;
const MOON_ROVER = 4;

let marsGrid =
  [["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""]];

for (var x = 0; x < 10; x++) {
  for (var y = 0; y < 10; y++) {
    marsGrid[y][x] = FREE;
  }
}

// ======================


// Rover Objects Go Here

let marsRover = {
  id: MARS_ROVER,
  name: "MARS ROVER",
  direction: "N",
  x: 0,
  y: 1,
  travelLog: [[0, 0]],
}

let jupiterRover = {
  id: JUPITER_ROVER,
  name: "JUPITER ROVER",
  direction: "N",
  x: 5,
  y: 0,
  travelLog: [[0, 0]],
}

let moonRover = {
  id: MOON_ROVER,
  name: "MOON ROVER",
  direction: "N",
  x: 9,
  y: 0,
  travelLog: [[0, 0]],
}

// ======================

function getRoverName(id) {
  const roverFound = [jupiterRover, moonRover, marsRover].find(rover => rover.id === id);
  return roverFound.name;
}

function turnLeft(rover) {
  switch (rover.direction) {
    case "N":
      rover.direction = "W";
      break;
    case "E":
      rover.direction = "N";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "W":
      rover.direction = "S";
      break;
  }
}

function turnRight(rover) {
  switch (rover.direction) {
    case "N":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "N";
      break;
  }
}

function moveForward(rover) {
  let nextX = 0;
  let nextY = 0;
  switch (rover.direction) {
    case "N":
      nextX = rover.x;
      nextY = rover.y - 1;
      break;
    case "E":
      nextX = rover.x + 1;
      nextY = rover.y;
      break;
    case "S":
      nextX = rover.x;
      nextY = rover.y + 1;
      break;
    case "W":
      nextX = rover.x - 1;
      nextY = rover.y;
      break;
  }
  move(rover, marsGrid, nextY, nextX);
}

function moveBackwards(rover) {
  let nextX = 0;
  let nextY = 0;
  switch (rover.direction) {
    case "N":
      nextX = rover.x;
      nextY = rover.y + 1;
      break;
    case "E":
      nextX = rover.x - 1;
      nextY = rover.y;
      break;
    case "S":
      nextX = rover.x;
      nextY = rover.y - 1;
      break;
    case "W":
      nextX = rover.x + 1;
      nextY = rover.y;
      break;
  }
  move(rover, marsGrid, nextY, nextX);
}

function move(rover, grid, nextY, nextX) {
  if (nextX < 0 || nextX > 9 || nextY < 0 || nextY > 9) {
    console.log("Can't perform this movement. Your Rover is at the limit of the map.");
  } else {
    const nextCellContent = grid[nextY][nextX];
    if ([MARS_ROVER, JUPITER_ROVER, MOON_ROVER].some(id => id === nextCellContent)) {
      console.log(`Can't perform this movement. Your Rover will run into ${getRoverName(nextCellContent)}.`);
    } else {
      if (nextCellContent === OBSTACLE) console.log("Obstacle found!");
      grid[rover.y][rover.x] = FREE;
      grid[nextY][nextX] = rover.id;
      rover.x = nextX;
      rover.y = nextY;
      rover.travelLog.push([nextY, nextX]);
    }
  }
}

function placeObstacles(grid) {
  for (var a = 0; a < 8; a++) {
    let randomX = Math.floor(Math.random() * 10);
    let randomY = Math.floor(Math.random() * 10);
    grid[randomY][randomX] = OBSTACLE;
  }
}

function placeRover(rover) {
  marsGrid[rover.y][rover.x] = rover.id;
}

function roverCommands(rover) {
  let commands = prompt(`${rover.name} Direction: [${rover.direction}], Coordinates: [${rover.x}, ${rover.y}] => Introduce your list of commands: f to move forward, b to move backwards, r to turn right and l to turn left.`);

  for (var i = 0; i < commands.length; i++) {
    if (["f","b","r","l"].every(order => commands[i] !== order)) {
      console.log("Unknown command " + commands[i]);
      continue;
    }
    if (commands[i] == "f") moveForward(rover);
    else if (commands[i] == "b") moveBackwards(rover);
    else if (commands[i] == "r") turnRight(rover);
    else if (commands[i] == "l") turnLeft(rover);
  }
  console.log(rover.name, rover.travelLog);
}

placeObstacles(marsGrid);
placeRover(marsRover);
placeRover(jupiterRover);
placeRover(moonRover);

roverCommands(marsRover);
roverCommands(jupiterRover);
roverCommands(moonRover);

console.log(marsGrid);