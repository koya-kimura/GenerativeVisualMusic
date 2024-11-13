const BPM = 100;
let textureManager;
let mainTexture;
let drawTexture;
let font;
let UIfont;

function preload(){
    font = loadFont("../assets/font/RampartOne-Regular.ttf");
    UIfont = loadFont("../assets/font/NotoSans-VariableFont_wdth,wght.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    mainTexture = createGraphics(width, height);
    drawTexture = createGraphics(width, height);

    background(0);
    mainTexture.background(0);
    drawTexture.background(0);

    textureManager = new TextureManager(BPM);
}

function draw() {
    background(0);

    // 毎フレームバッファをクリア
    mainTexture.clear();
    drawTexture.clear();

    mainTexture.background(0);
    drawTexture.background(0);

    textureManager.update(drawTexture);
    textureManager.splitTex(drawTexture, mainTexture);
    textureManager.rotateTex(drawTexture, mainTexture);

    image(mainTexture, 0, 0, width, height);

    fill(255);
    // text(textureManager.beatCounter.phaseCount, 10, 10);
    UIDrawing(textureManager.beatCounter.getBeatInfo());
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    // 既存のグラフィックスバッファを解放
    if (mainTexture) {
        mainTexture.remove();
    }
    if (drawTexture) {
        drawTexture.remove();
    }

    // 新しいサイズでグラフィックスバッファを作成
    mainTexture = createGraphics(width, height);
    drawTexture = createGraphics(width, height);
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