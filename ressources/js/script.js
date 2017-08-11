function print(p) {
    console.log(p);
}

function ping() { print("ping");}

class Player{
    constructor() {
        this.money = 500;
        this.flowers = [];
    }

}

class Flower {
    constructor() {
        this.vitality = 1000;
        this.growth = 0;
        this.moisture = 1000;
        this.grown = false;
    }

    water(amount) {
        this.moisture += amount;
        if (this.moisture < 0) {
            this.moisture == 0;
        }
    }
}

function buyFlower(player) {
    if (player.money >= 100) {
        var flower = new Flower();
        player.flowers.push(flower);
        player.money -= 100;
        displayEvent(player);
    }
}

function displayTic(player) {
    var x = 0;
    $("#flower-span").html("");
    player.flowers.forEach(function (flower) {
        $(".flower-span").html("Croissance : " + flower.growth + ", Vitalit&eacute; : " + flower.vitality + ", Hydratation : " + flower.moisture);
        x++;
    });
}

function displayEvent(player) {
    var x = 0;
    $("#money").html(player.money);
    $("#dispFlowers").html("");
    player.flowers.forEach(function (flower) {
        $("#dispFlowers").html($("#dispFlowers").html() + "<div class=\"flower\"><span class=\"flower-span\" id=\""+ x + "\">Croissance : " + flower.growth + ", Vitalit&eacute; : " + flower.vitality + ", Hydratation : " + flower.moisture + "</span> <button class=\"water\" id=\"" + x + "\"\>Water</button><button class=\"sell\" id=\"" + x +"\">Sell</button></div>");
        x++;
    });
}

function randRain() {
    var rand = Math.floor((Math.random() * 500) + 1);
    return (rand == 1); 
}

function growFlower(player) {
    var x = 0;
    var rain = randRain();
    player.flowers.forEach(function (flower) {
        if (flower.grown == false) {
            flower.growth++;
            flower.grown = (flower.growth >= 1000);
            if (rain) {
                flower.water(600);
            }
            flower.moisture -= 2;
            if (flower.moisture < 500 || flower.moisture > 1300) {
                flower.vitality -= 5;
            }
            else if (flower.vitality < 1000 && flower.growth) {
                flower.vitality++;
            }
        }
        else {
            flower.vitality -= 2;
        }
        if (flower.vitality <= 0) {
            player.flowers.splice(x, 1);
            displayEvent(player);
        }
        x++;
    });
}