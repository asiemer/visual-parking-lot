const FORWARD = 'FORWARD';
const REVERSE = 'REVERSE';
const NORTH = 'NORTH';
const SOUTH = 'SOUTH';
const EAST = 'EAST';
const WEST = 'WEST';
const RIGHT = 'RIGHT';
const LEFT = 'LEFT';
const MOVE_VALUE = 100;
const COLLISSION_SCAN_VALUE = 200;
const CAR_HEIGHT = 100;
const CAR_WIDTH = 200;

function reverse(car) {
    let direction = getDirection(car);
    moveIt(car, direction, REVERSE);
}

function forward(car) {
    let direction = getDirection(car);
    moveIt(car, direction, FORWARD);
}

function turnRight(car) {
    let direction = getDirection(car);
    turnIt(car, direction, RIGHT);
}

function turnLeft(car) {
    let direction = getDirection(car);
    turnIt(car, direction, LEFT);
}

function turnIt(car, direction, cmd) {
    switch(direction) {
        case NORTH:
            if(cmd == RIGHT) {
                car.classList.toggle("north");
                car.classList.add("east");
            }
            else if (cmd == LEFT) {
                car.classList.toggle("north");
                car.classList.add("west");
            }
            break;
        case SOUTH:
            if(cmd == RIGHT) {
                car.classList.toggle("south");
                car.classList.add("west");
            }
            else if (cmd == LEFT) {
                car.classList.toggle("south");
                car.classList.add("east");
            }
            break;
        case EAST:
            if(cmd == RIGHT) {
                car.classList.toggle("east");
                car.classList.add("south");
            }
            else if (cmd == LEFT) {
                car.classList.toggle("east");
                car.classList.add("north");
            }
            break;
        case WEST:
            if(cmd == RIGHT) {
                car.classList.toggle("west");
                car.classList.add("north");
            }
            else if (cmd == LEFT) {
                car.classList.toggle("west");
                car.classList.add("south");
            }
            break;
    }
}

function moveIt(car, direction, cmd){
    switch(direction) {
        case NORTH:
            var top = car.style.top.replace('px','');
            var left = car.style.left.replace('px','');
            if(cmd == FORWARD) {
                car.style.top = (parseInt(top) - MOVE_VALUE)+'px';
            }
            else if (cmd == REVERSE) {
                car.style.top = (parseInt(top) + MOVE_VALUE)+'px';
            }
            break;

        case SOUTH:
            var top = car.style.top.replace('px','');
            var left = car.style.left.replace('px','');
            if(cmd == FORWARD) {
                car.style.top = (parseInt(top) + MOVE_VALUE)+'px';
            }
            else if (cmd == REVERSE) {
                car.style.top = (parseInt(top) - MOVE_VALUE)+'px';
            }
            break;

        case EAST:
            var top = car.style.top.replace('px','');
            var left = car.style.left.replace('px','');
            if(cmd == FORWARD) {
                car.style.left = (parseInt(left) + MOVE_VALUE)+'px';
            }
            else if (cmd == REVERSE) {
                car.style.left = (parseInt(left) - MOVE_VALUE)+'px';
            }
            break;

        case WEST:
            var top = car.style.top.replace('px','');
            var left = car.style.left.replace('px','');

            if(cmd == FORWARD) {
                car.style.left = (parseInt(left) - MOVE_VALUE)+'px';
            }
            else if (cmd == REVERSE) {
                car.style.left = (parseInt(left) + MOVE_VALUE)+'px';
            }
            break;
    }
}

function getDirection(car) {
    var classes = car.className;
    var direction = "";
    if(classes.indexOf('north')>0) {direction = NORTH;}
    else if(classes.indexOf('south')>0) {direction = SOUTH;}
    else if(classes.indexOf('east')>0) {direction = EAST;}
    else if(classes.indexOf('west')>0) {direction = WEST;}
    return direction;
}

function checkCollisionStatus(car) {
    let scanRect = getScanRect(car);

    console.dir(scanRect);

    let cars = document.querySelectorAll(".car");

    cars.forEach(function(c) {
        var rect = c.getBoundingClientRect();
        console.dir(rect);

        //check left bounardy
        if(scanRect.left < rect.left && scanRect.right > rect.left) {
            //check top boundary
            if(scanRect.top <= rect.top && scanRect.bottom > rect.top) {
                alert('alarm');
            }
            
        }
    });
}

function getScanRect(car) {
    let direction = getDirection(car);
    let scanRect = {top:0, bottom:0, left:0, right:0};
    
    switch (direction) {
        case NORTH:
            let left = parseInt(car.style.left.replace('px'));
            let right = parseInt(car.style.left.replace('px')) + CAR_WIDTH;
            let top = parseInt(car.style.top.replace('px')) - COLLISSION_SCAN_VALUE;
            let bottom = parseInt(car.style.top.replace('px'));
            scanRect.top = top;
            scanRect.bottom = bottom;
            scanRect.left = left;
            scanRect.right = right;
            break;

        case SOUTH: 
            let left = parseInt(car.style.left.replace('px'));
            let right = parseInt(car.style.left.replace('px')) + CAR_WIDTH;
            let top = parseInt(car.style.top.replace('px')) + CAR_HEIGHT;
            let bottom = top + CAR_HEIGHT + COLLISSION_SCAN_VALUE;
            scanRect.top = top;
            scanRect.bottom = bottom;
            scanRect.left = left;
            scanRect.right = right;
            break;

        case WEST:
            let left = parseInt(car.style.left.replace('px')) - COLLISSION_SCAN_VALUE;
            let right = parseInt(car.style.left.replace('px'));
            let top = parseInt(car.style.top.replace('px'));
            let bottom = top + CAR_HEIGHT;
            scanRect.top = top;
            scanRect.bottom = bottom;
            scanRect.left = left;
            scanRect.right = right;
            break;

        case EAST:
            let left = parseInt(car.style.left.replace('px')) + CAR_WIDTH;
            let right = left + COLLISSION_SCAN_VALUE;
            let top = parseInt(car.style.top.replace('px'));
            let bottom = top + CAR_HEIGHT;
            scanRect.top = top;
            scanRect.bottom = bottom;
            scanRect.left = left;
            scanRect.right = right;
            break;
    }

    return scanRect;
}