const BPM = 100;
let sceneManager;
let font;
let UIfont;

function preload(){
    font = loadFont("../assets/font/RampartOne-Regular.ttf");
    UIfont = loadFont("../assets/font/NotoSans-VariableFont_wdth,wght.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    sceneManager = new SceneManager(BPM);
}

function draw() {
    background(0);

    sceneManager.update();
    sceneManager.display();
}

// function UIDrawing(tex, info){
//     tex.fill(240, 240);
//     tex.textSize(30);

//     let i = 0;
//     for (let key in info) {
//         i ++;
//         const a = key;
//         const b = formatNumber(info[key]);
//         tex.textFont(UIfont);
//         tex.text(a + " : " + b, 30, 60 * i);
//     }
// }