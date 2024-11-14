class SceneManager {
    constructor(bpm) {
        this.beatCounter = new BeatCounter(bpm);
        this.sceneIndex = 0;
        this.scenes = [];

        this.scenes[0] = new CircleMotion();
    }

    update() {
        this.beatCounter.update();

        const colorPalette = colorPalettes[floor(this.beatCounter.phaseCount / 4) % colorPalettes.length].colors;
        const truncateColorPalette = truncateArray(colorPalette, this.beatCounter.phaseCount % 4 + 1);

        this.scenes[this.sceneIndex].update(this.beatCounter, truncateColorPalette);
    }

    display(){
        this.scenes[this.sceneIndex].display();
    }
}
