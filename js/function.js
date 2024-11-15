function noStrokeFill(c){
    noStroke();
    fill(c);
}

function noFillStroke(c){
    noFill();
    strokeWeight(0.5)
    stroke(c);
}

function UIDrawing(info){
    push();
    Object.keys(info).forEach((key, index) => {
        fill(30, 240);
        rect(30, 60 * (index + 0.5), 500, 35);
        fill(240, 240);
        textSize(30);
        text(key + " : " + info[key].toFixed(2), 30, 60 * (index + 1));
    });
    pop();
}