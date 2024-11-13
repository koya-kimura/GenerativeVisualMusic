class TextureManager {
    constructor(bpm) {
        this.beatCounter = new BeatCounter(bpm);
        this.sceneIndex = 0;
        this.scenes = [];

        this.scenes[0] = new CircleMotion();
    }

    update(tex) {
        this.beatCounter.update();

        const colorPalette = colorPalettes[floor(this.beatCounter.phaseCount / 4) % colorPalettes.length].colors;
        const truncateColorPalette = truncateArray(colorPalette, this.beatCounter.getBeatInfo().phaseCount % 4 + 1);

        this.scenes[this.sceneIndex].update(this.beatCounter.getBeatInfo(), truncateColorPalette);
        this.scenes[this.sceneIndex].display(tex);
    }

    splitTex(tex) {
        const vertSplitCount = floor(pow(newnoise(this.beatCounter.phaseCount, 46), 5) * 5) + 1;
        const horizSplitCount = floor(pow(newnoise(this.beatCounter.phaseCount, 71), 5) * 5) + 1;
        splitTexture(tex, vertSplitCount, horizSplitCount);
    }

    rotateTex(tex){
        const angle = (pow(fract(map(max(14, this.beatCounter.interpolatedCount%16), 14, 16, 0, 1)), 2) + this.beatCounter.phaseCount) * PI / 2;
        rotateTexture(tex, angle);
    }

    displayTex(tex){
        image(tex, 0, 0, width, height);
    }
}

function splitTexture(tex,vertSplitCount, horizSplitCount) {
    const srcTex = tex.get();

    const segH = tex.height / vertSplitCount;
    const segW = tex.width / horizSplitCount;

    const srcX = tex.width / 2 - segW / 2;
    const srcY = tex.height / 2 - segH / 2;

    for (let i = 0; i < vertSplitCount; i++) {
        const destY = i * segH;

        for (let j = 0; j < horizSplitCount; j++) {
            const destX = j * segW;

            tex.image(srcTex,
                destX, destY, segW, segH,
                srcX, srcY, segW, segH
            );
        }
    }
}

function rotateTexture(tex, angle) {
    const srcTex = tex.get();

    tex.push();
    tex.imageMode(CENTER);
    tex.translate(tex.width / 2, tex.height / 2);
    tex.rotate(angle);

    for(let x = -width; x <= width; x += width){
        for (let y = -height; y <= height; y += height) {
            tex.image(srcTex, x, y);
        }
    }

    plusIcon(tex);
    tex.pop();
}

function plusIcon(tex){
    tex.push();
    tex.stroke(255);
    tex.strokeWeight(2);
    tex.line(-20, 0, 20, 0);
    tex.line(0, -20, 0, 20);
    tex.pop();
}