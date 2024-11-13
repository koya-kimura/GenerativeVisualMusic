class TestTexture {
    constructor() {
        this.cp = [];
    }

    update(beatInfo, colorPalette){
        this.cp = colorPalette;
    }

    display(beatInfo, drawTexture){
        for(let i = 0; i < 100; i ++){
            const c = this.cp[floor(fract(newnoise(i, 1064)) * this.cp.length)];
            if(noise(i, 71) < 0.5){
                drawTexture.stroke(c);
                drawTexture.noFill();
            } else {
                drawTexture.noStroke();
                drawTexture.fill(c);
            }
            drawTexture.circle((newnoise(i, 0) * width + frameCount*4) % width, newnoise(i, 1) * height, pow(noise(i, 2), 2) * 400 * map(Easing.easeInSine(oscillate(fract(beatInfo.interpolatedCount))), 0, 1, 0.5, 1));
        }
    }
}