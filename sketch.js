var tower_I, tower, door, door_i, climber, climber_i, ghost, ghostImage, invisible_block, door_Group ,climber_Group,invisible_Group;
var gamestate = PLAY;
var PLAY = 1 ;
var END = 0 ;

function preload() {
    door_i = loadImage('door.png');
    tower_I = loadImage('tower.png');
    climber_i = loadImage('climber.png');
    ghostImage = loadImage('ghost-standing.png');
}

function setup() {
    createCanvas(600, 600);
    tower = createSprite(300, 300);
    tower.addImage(tower_I);
    tower.velocityY = 3;
    
    ghost = createSprite(200, 200, 50, 50);
    ghost.scale = 0.4;
    ghost.addImage(ghostImage);

    door_Group = new Group();
    climber_Group = new Group();
    invisible_Group = new Group();
}

function draw() {
    background(0);
    if (gamestate === PLAY) {
        if (tower.y > 400) {
            tower.y = 300;
        }
        spawnDoors();
        if (keyDown(LEFT)) {
            ghost.x = ghost.x - 3;
        }
        if (keyDown(RIGHT)) {
            ghost.x = ghost.x + 3;
        }
        if (keyDown("space")) {
            ghost.velocityY = -1;
        }
        ghost.velocityY = ghost.velocityY + 0.4
        if (climber_Group.isTouching(ghost)) {
            ghost.velocityY = 0;
        }
        if (invisible_Group.isTouching(ghost) || ghost.y > 600) {
            gamestate = END;
            ghost.destroy();
        }
    } else if (gamestate === END) {
        text("gameover", 300, 300);
        text.size(30);
    }
    drawSprites();
}

function spawnDoors() {
    if (frameCount % 120 == 0) {
        door = createSprite(200, -50);
        door.addImage(door_i);
        door.velocityY = 1;
        door.x = Math.floor(random(122, 400));
        door.lifeTime = 80;
        door_Group.add(door);
        climber = createSprite(200, 10);
        climber.addImage(climber_i);
        climber_Group.add(climber);
        climber.velocityY = 1;
        climber.lifeTime = 80;
        climber.x = Math.floor(random(122, 100));
        ghost.depth = door.depth;
        ghost.depth = ghost.depth + 1;
        invisible_block = createSprite(200, 15);
        invisible_block.width = climber.width;
        invisible_block.height = 2;
        invisible_block.x = door.x;
        invisible_block.velocityY = 1;
        invisible_Group.add(invisible_block);
    }
}