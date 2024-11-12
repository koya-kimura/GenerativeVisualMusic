let beatCounter;
const colorPalettes = [
    ["red", "white"],
    ["green", "orange"],
    ["blue", "black"],
    ["purple", "pink"],
];

function setup() {
    createCanvas(windowWidth, windowHeight);
    beatCounter = new BeatCounter(100);
}

function draw() {
    beatCounter.update();

    const a = pow(fract(beatCounter.interpolatedCount),2);
    const invertCount = beatCounter.count % 4;
    const measureCount = floor(beatCounter.count / 4) % 4;
    const cp = colorPalettes[measureCount];

    const noiseNum1 = noise(measureCount, frameCount / 100, 1);
    const noiseNum2 = noise(measureCount, frameCount / 100, 2);

    push();
    translate(0, frameCount*2%height);
    if (invertCount == 2) {
        background(cp[0]);
        fill(cp[1]);
        noStroke();
        circle(noiseNum1 * width*0.5 + width * 0.25, noiseNum2 * height*0.5 + height * 0.25, 300*a);
    } else {
        background(cp[1]);
        fill(cp[0]);
        noStroke();
        circle(noiseNum1 * width*0.5 + width * 0.25, noiseNum2 * height*0.5 + height * 0.25, 300*a);
    }
    pop();
}
