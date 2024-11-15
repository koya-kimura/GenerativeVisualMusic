const BPM = 100;
const n = 20;
const beatCounter = new BeatCounter(BPM);

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    rectMode(CENTER);
}

function draw() {
    // beat
    beatCounter.update();
    background(0);

    // draw
    push();
    const grid = max(width, height) / n;
    const camvasAngle = (floor(beatCounter.interpolatedPhaseCount) + Easing.easeInOutSine(fract(max(14, beatCounter.interpolatedCount % 16) / 2))) * PI / 2;
    const camvasScale = 10;

    const colorPalette = colorPalettes[0].colors;

    translate(width / 2, height/2);
    rotate(camvasAngle);
    scale(camvasScale);

    for (let ix = 0; ix < max(width, height); ix += grid) {
        for (let iy = 0; iy < max(width, height); iy += grid) {
            for(let sign of [[-1, -1],[1, -1],[-1, 1],[1, 1]]) {
                const x = ix * sign[0];
                const y = iy * sign[1];

                const w = grid * 0.8;
                const h = grid * 0.8;
                const angle = 0;

                const radius = 0;
                const c = colorPalette[0];

                push();
                translate(x, y);
                rotate(angle);
                fill(c);
                noStroke();
                rect(0, 0, w, h, radius);
                pop();
            }
        }
    }
    pop();

    // UI
    push();
    fill(240, 240);
    textSize(30);
    Object.keys(beatCounter.getInfo()).forEach((key, index) => {
        text(key + " : " + beatCounter.getInfo()[key].toFixed(2), 30, 60 * (index + 1));
    });
    pop();
}