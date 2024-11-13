class ParticleTexture {
    constructor() {
        this.n = 10;
        this.particles = [];
        for (let i = 0; i < this.n * 1.1; i++) {
            for (let j = 0; j < this.n * 1.1; j++) {
                const x = i * width / this.n;
                const y = j * height / this.n;
                this.particles.push(new Particle(x, y));
            }
        }
    }

    update(beatInfo, colorPalette){
        for (let particle of this.particles) {
            particle.update(beatInfo, colorPalette);
            particle.displayMove();
        }
    }

    display(beatInfo, drawTexture){
        drawTexture.push();
        for (let particle of this.particles) {
            particle.display(drawTexture, beatInfo);
        }
        drawTexture.pop();
    }
}

class Particle {
    constructor(x, y){
        this.seed = random(100);
        this.pos = createVector(x, y);
        this.str = random(["は","にゃ","し","きょ"]);
        this.c = color(255);
    }

    update(beatInfo, colorPalette){
        this.c = colorPalette[floor(fract(newnoise(this.seed)) * colorPalette.length)];
    }

    displayMove(){
        const v = createVector(1, 0);
        this.pos.add(v);

        if(this.pos.x > width * 1.1){
            this.pos.x = 0;
        }
    }

    display(tex, beatInfo){
        tex.textFont(font);
        tex.fill(this.c);
        tex.textAlign(CENTER, CENTER);
        tex.textSize(100*map(fract(beatInfo.interpolatedCount), 0, 1, 0.5, 1));
        tex.text(this.str, this.pos.x, this.pos.y);
    }
}