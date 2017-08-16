function print(p) {
    console.log(p);
}

function ping() { print("ping");}

function randRain() {
    var rand = Math.floor((Math.random() * 500) + 1);
    return (rand === 1);
}

class Player{
    constructor() {
        this.money = 50;
        this.flowers = [];
    }

    growFlowers() {
        var x = 0;
        var rain = randRain();
        var player = this;
        this.flowers.forEach(function (flower) {
            if (flower.grown === false) {
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

    buyFlower() {
        if (this.money >= 5) {
            var flower = new Flower();
            this.flowers.push(flower);
            this.money -= 5;
            displayEvent(this);
        }
    }

    sellFlower(id) {
        if (this.flowers[id].grown) {
            this.money += parseInt(this.flowers[id].vitality / 100);
            this.flowers.splice(id, 1);
            displayEvent(this);
        }
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
            this.moisture = 0;
        }
    }
}

function displayEvent(player) {
    var x = 0;
    $("#money").html(player.money);
    $("#dispFlowers").html("");
    player.flowers.forEach(function (flower) {
        $("#dispFlowers").html($("#dispFlowers").html() + "<div class=\"flower\" id=\"div-"+x+"\"><span class=\"flower-span\">Croissance : " + flower.growth + ", Vitalit&eacute; : " + flower.vitality + ", Hydratation : " + flower.moisture + "</span><button class=\"water\" id=\"" + x + "\"\>Arroser</button><button class=\"sell\" id=\"" + x +"\">Vendre</button><div class=\"myBar\"></div></div>");
        x++;
    });
}

function displayTic(player) {
    var x = 0;
    $("#flower-span").html("");
    player.flowers.forEach(function (flower) {
        $("#div-" + x +" .flower-span").html("Croissance : " + flower.growth + ", Vitalit&eacute; : " + flower.vitality + ", Hydratation : " + flower.moisture);
        loadingBar($("#div-" + x + " .myBar"), flower);
        x++;
    });
}

function loadingBar(element, flower) {
    var width = flower.growth / 10;
    element.css("width", (width) + "%");
    switch (true) {
        case width == 100:
            element.css("background-color", "green");
            break;
        case width >= 50:
            element.css("background-color", "#ffcc00");
            break;
        default:
            element.css("background-color", "grey");
    }
}