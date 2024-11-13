class TextureManager {
    constructor(bpm) {
        // this.colorPalette = random(colorPalettes).colors;
        this.beatCounter = new BeatCounter(bpm);
        this.particleTexture = new TestTexture();
    }

    update(drawTexture) {
        this.beatCounter.update();

        const colorPalette = colorPalettes[floor(this.beatCounter.phaseCount / 4) % colorPalettes.length].colors;
        const cp = truncateArray(colorPalette, this.beatCounter.getBeatInfo().phaseCount % 4 + 1);
        this.particleTexture.update(this.beatCounter.getBeatInfo(), cp);
        this.particleTexture.display(this.beatCounter.getBeatInfo(), drawTexture);
    }

    splitTex(drawTexture, mainTexture) {
        const vertSplitCount = floor(newnoise(this.beatCounter.phaseCount, 46) * 3) + 1;
        const horizSplitCount = floor(newnoise(this.beatCounter.phaseCount, 71) * 3) + 1;
        splitTexture(drawTexture, mainTexture, vertSplitCount, horizSplitCount);
    }

    rotateTex(drawTexture, mainTexture){
        const angle = (pow(fract(map(max(14, this.beatCounter.interpolatedCount%16), 14, 16, 0, 1)), 2) + this.beatCounter.phaseCount) * PI / 2;
        rotateTexture(mainTexture, angle);
    }
}

function splitTexture(srcTex, destTex,vertSplitCount, horizSplitCount) {
    // サイズを取得
    const w = srcTex.width;
    const h = srcTex.height;

    // 分割時のサイズを計算
    const segH = h / vertSplitCount;
    const segW = w / horizSplitCount;

    // 中心Y座標
    const centerX = w / 2;
    const centerY = h / 2;

    // 切り取り開始位置
    const srcX = centerX - segW / 2;
    const srcY = centerY - segH / 2;

    // 各セグメントを描画
    for (let i = 0; i < vertSplitCount; i++) {
        // 配置位置
        const destY = i * segH;

        for (let j = 0; j < horizSplitCount; j++) {
            // 配置位置
            const destX = j * segW;

            // 縦に分割して配置
            destTex.image(srcTex,
                destX, destY, segW, segH,  // 配置位置とサイズ
                srcX, srcY, segW, segH    // 切り取り位置とサイズ
            );
        }
    }
}

function rotateTexture(destTex, angle) {
    const pg = destTex.get();

    destTex.push();
    destTex.imageMode(CENTER, CENTER);
    destTex.translate(destTex.width / 2, destTex.height / 2);
    destTex.rotate(angle);

    for(let x = -width; x <= width; x += width){
        for (let y = -height; y <= height; y += height) {
            destTex.image(pg, x, y);
        }
    }
    destTex.stroke(255);
    destTex.strokeWeight(2);
    destTex.line(-20, 0, 20, 0);
    destTex.line(0, -20, 0, 20);
    destTex.pop();
}