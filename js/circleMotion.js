class CircleMotion {
    constructor(){
        this.grid = min(width, height) / 10;
        this.vx = 10;;

        this.px = [];
        this.py = [];
        for(let x = -this.grid; x < width + this.grid; x += this.grid){
            for (let y = -this.grid; y < height + this.grid; y += this.grid){
                this.px.push(x);
                this.py.push(y);
            }
        }
    }

    update(beatInfo, colorPalette){
        for(let i = 0; i < this.px.length; i++){
            this.px[i] +=this.vx;
            if(this.px[i] > width + this.grid){
                this.px[i] = -this.grid;
            }
        }
    }

    display(tex){
        for(let i = 0; i < this.px.length; i++){
            for(let j = 0; j < this.py.length; j++){
                tex.fill(255);
                tex.circle(this.px[i], this.py[j], this.grid);
            }
        }
    }
}