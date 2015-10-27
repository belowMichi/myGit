

var images = new Array();

function preload() {

    for (var i = 0; i < preload.arguments.length; i++) {

        images[i] = new Image();

        images[i].src = preload.arguments[i]

    }

}

preload(

    "../img/254Sceptile-Mega.png",
    "../img/208Steelix-Mega.png",
    "../img/359Absol-Mega.png",
    "../img/384Rayquaza-Mega.png",
    "../img/448Lucario-Mega.png",
    "../img/719Diancie.png",
    "../img/ball.png",
    "../img/chong.jpg",
    "../img/fire-dragon.png",
    "../img/fire-dragon-Mega_X.png",
    "../img/fire-dragon-Mega_Y.png",
    "../img/fire-monkey.jpg",
    "../img/fire-monkey.png",
    "../img/fire-monkey2.png",
    "../img/fire-monkey-shadow.png",
    "../img/monsterball.png",
    "../img/monsterball-down.png",
    "../img/monsterball-up.png",
    "../img/slider.png",
    "../img/water-chenglong.png",
    "../img/xia.png"

);
