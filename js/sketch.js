const BPM = 100;
let textureManager;
let mainTexture;
let font;
let UIfont;

function preload(){
    font = loadFont("../assets/font/RampartOne-Regular.ttf");
    UIfont = loadFont("../assets/font/NotoSans-VariableFont_wdth,wght.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    mainTexture = createGraphics(width, height);

    background(0);
    mainTexture.background(0);

    textureManager = new TextureManager(BPM);
}

function draw() {
    background(0);

    mainTexture.clear();
    mainTexture.background(0);

    textureManager.update(mainTexture);
    textureManager.splitTex(mainTexture);
    textureManager.rotateTex(mainTexture);
    textureManager.displayTex(mainTexture);

    UIDrawing(textureManager.beatCounter.getBeatInfo());
}

function UIDrawing(info){
    fill(240, 240);
    textSize(30);

    let i = 0;
    for (let key in info) {
        i ++;
        const a = key;
        const b = formatNumber(info[key]);
        textFont(UIfont);
        text(a + " : " + b, 30, 60 * i);
    }
}