const BPM = 100;
const beatCounter = new BeatCounter(BPM);

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    rectMode(CENTER);
}

function draw() {
    // 拍の更新
    beatCounter.update();

    const n = 20;
    const canvasSize = max(width, height);
    const colorPalette = colorPalettes[floor(noise(beatCounter.phaseCount)*colorPalettes.length)].colors;

    background(0);

    push();
    translate(width/2, height/2);
    rotate((beatCounter.phaseCount + Easing.easeInOutSine(fract(max(14, beatCounter.interpolatedCount % 16)/2))) * PI / 2);
    scale(2);

    for (let ix = 0; ix < canvasSize; ix += canvasSize / n) {
        for (let iy = 0; iy < canvasSize; iy += canvasSize / n) {
            for(let sign of [[-1, -1],[1, -1],[-1, 1],[1, 1]]) {
                const x = ix * sign[0];
                const y = iy * sign[1];

                const w = Easing.easeInOutSine(noise(x, y, beatCounter.interpolatedCount * 0.5)) * 100;
                const h = Easing.easeInOutSine(noise(x, y, beatCounter.interpolatedCount * 0.5 + 987498017)) * 100;

                const c = colorPalette[floor(noise(1, y, beatCounter.barCount) * colorPalette.length)];
                const radius = max(w, h) * floor(noise(beatCounter.barCount) * 4) / 4;

                push();
                translate(x, y);
                rotate(beatCounter.interpolatedCount * 0.5);
                if(beatCounter.phaseCount < 8) {
                    noStrokeFill(c);
                } else {
                    noFillStroke(c);
                }
                rect(0, 0, w, h, radius);
                pop();
            }
        }
    }
    pop();
}