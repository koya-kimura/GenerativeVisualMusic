const BPM = 120;
const n = 20;
const beatCounter = new BeatCounter(BPM);

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
}

function draw() {
    // settings
    beatCounter.update();

    const phase = beatCounter.interpolatedPhaseCount;
    const bar = beatCounter.interpolatedBarCount;
    const count = beatCounter.interpolatedCount;

    // bg
    const alpha = map(pow(noise(count, 9823)+0.2, 3), 0, 1, 255, 0);
    background(0, alpha);
    blendMode(ADD);

    // draw
    push();
    const grid = max(width, height) / n;
    const canvasAngle = (floor(phase) + Easing.easeInOutSine(fract((max(14, count % 16)-14) / 2))) * PI / 2;

    const camvasScaleMin = map(noise(floor((count%64) / 64), 312), 0, 1, 0.7, 1.2);
    const camvasScaleMax = map(noise(floor(((count+32)%64) / 64), 929), 0, 1, 7, 15);
    const camvasScale = phase < 1 ? camvasScaleMax : (phase < 2 ? map(Easing.easeInOutCubic(fract(phase)), 0, 1, camvasScaleMax, camvasScaleMin) : (phase < 3 ? camvasScaleMin : map(Easing.easeInOutCubic(fract(phase)), 0, 1, camvasScaleMin, camvasScaleMax)));
    const canvasAspect = map(pow(noise(floor(count/64) + Easing.easeInOutSine(fract((max(56, count % 64)-56) / 8)), 928), 4), 0, 1, 1, 10);

    const colorPalette = colorPalettes[floor(count/256)%colorPalettes.length].colors;

    translate(width / 2, height/2);
    rotate(canvasAngle);
    scale(camvasScale * canvasAspect, camvasScale);

    for (let x = -max(width, height); x <= max(width, height); x += grid) {
        for (let y = -max(width, height); y <= max(width, height); y += grid) {
            const speed = 30;
            const vx = phase < 1 ? floor(count / 64) * 64 * 0.75 * speed : (count - ceil(count / 64) * 16) * speed;
            const vy = 0;

            const nx = (x + vx + max(width, height)) % (max(width, height) * 2) - max(width, height);
            const ny = (y + vy + max(width, height)) % (max(width, height) * 2) - max(width, height);

            const g = grid * map(pow(noise(count/100), 4), 0, 1, 0.2, 10);
            const s = g * map(Easing.easeInSine(abs(map(fract(bar), 0, 1, -1, 1))), 0, 1, 0.1, 0.5) * map(pow(noise(x * (noise(floor(phase/4), 1237) > 0.7), y * (noise(floor(phase/4), 5917) > 0.7), 7837), 5), 0, 1, 1, 10);
            const w = s * map(pow(noise(floor(count / 16) + fract((max(14, count % 16) - 14) / 2), x * (noise(floor(phase), 863) > 0.7), y * (noise(floor(phase), 530) > 0.7)), 4), 0, 1, 1, 10);
            const h = s;
            const angle = phase < 2 ? (floor(count / 64) * 64 * 0.5) * PI / 2 : ((count - ceil(count / 64) * 32)) * PI / 2;

            const radius = round(noise(floor(count / 64) + fract((max(60, count % 64) - 60) / 4), 423)) * max(w, h) / 2;

            const ci = floor(min(map(noise(x * (noise(floor(phase), 863) > 0.2), y * (noise(floor(phase), 530) > 0.2), 784), 0, 1, 0, colorPalette.length), abs(3*(floor(count / 64) % 2) - phase)));
            const c = colorPalette[ci];

            push();
            translate(nx, ny);
            rotate(angle);
            noise(count*3 * (noise(count, 783) < 0.2), 901) < 0.5 ? noStrokeFill(c) : noFillStroke(c);
            rectMode(CENTER);
            rect(0, 0, w, h, radius);

            // textAlign(CENTER, CENTER);
            // textSize(max(w, h));
            // text("A", 0, 0);

            pop();
        }
    }
    pop();

    // noise
    push();
    for(let i = 0; i < 100; i ++){
        const x = map(noise(count/100, i, 128), 0, 1, -width, width * 2);
        const y = map(noise(count/100, i, 762), 0, 1, -height, height * 2);
        stroke(255, 10);
        line(x, 0, x, height);
        line(0, y, width, y);
    }
    pop();

    blendMode(BLEND);

    // frame
    push();
    const l = 0;
    fill(255);
    noStroke();
    rect(0, 0, width, l);
    rect(0, height - l, width, l);
    pop();

    // UI
    UIDrawing(beatCounter.getInfo());
}