const BPM = 100;
let textureManager;
let mainTexture;
let UITexture;
let font;
let UIfont;
let theShader;

function preload(){
    theShader = loadShader("../shader/main.vert", "../shader/main.frag");
    font = loadFont("../assets/font/RampartOne-Regular.ttf");
    UIfont = loadFont("../assets/font/NotoSans-VariableFont_wdth,wght.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    mainTexture = createGraphics(width, height);
    UITexture = createGraphics(width, height);

    background(0);
    mainTexture.background(0);

    textureManager = new TextureManager(BPM);
}

function draw() {
    background(0);

    // mainTexture
    mainTexture.clear();
    mainTexture.background(0);

    textureManager.update(mainTexture);
    textureManager.splitTex(mainTexture);
    textureManager.rotateTex(mainTexture);
    textureManager.displayTex(mainTexture);

    // UITexture
    UITexture.clear();
    UIDrawing(UITexture, textureManager.beatCounter.getBeatInfo());

    // shader
    shader(theShader);

    theShader.setUniform("u_time", frameCount / 100);
    theShader.setUniform("u_tex", mainTexture);
    theShader.setUniform("ui_tex", UITexture);

    rect(0, 0, width, height);
}

function UIDrawing(tex, info){
    tex.fill(240, 240);
    tex.textSize(30);

    let i = 0;
    for (let key in info) {
        i ++;
        const a = key;
        const b = formatNumber(info[key]);
        tex.textFont(UIfont);
        tex.text(a + " : " + b, 30, 60 * i);
    }
}