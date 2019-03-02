let carCount = 0;

function addCar(top, left) {
    carCount++;
    var car = document.createElement('div');
    car.id = "c" + carCount;

    car.style.top = top != undefined ? top : '0px';
    car.style.left = left != undefined ? left : '0px';
    car.className = 'car east ' + randomCarArtId();
    document.getElementsByTagName('body')[0].appendChild(car);

    return car.id;
}

function randomCarArtId() {
    let id = Math.floor(Math.random() * 7) + 1;
    return "car" + id;
}