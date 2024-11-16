function noStrokeFill(c){
    noStroke();
    fill(c);
}

function noFillStroke(c){
    noFill();
    strokeWeight(2)
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

function keyPressed() {
    // スペースキーが押された時（キーコード32）
    if (keyCode === 32) {
        let fs = fullscreen();
        fullscreen(!fs);
        if (fs) {
            cursor();
        } else {
            noCursor();
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

const hiraganaChars = [
    // # 清音
    'あ', 'い', 'う', 'え', 'お',
    'か', 'き', 'く', 'け', 'こ',
    'さ', 'し', 'す', 'せ', 'そ',
    'た', 'ち', 'つ', 'て', 'と',
    'な', 'に', 'ぬ', 'ね', 'の',
    'は', 'ひ', 'ふ', 'へ', 'ほ',
    'ま', 'み', 'む', 'め', 'も',
    'や', 'ゆ', 'よ',
    'ら', 'り', 'る', 'れ', 'ろ',
    'わ', 'を', 'ん',
    
    // # 濁音
    'が', 'ぎ', 'ぐ', 'げ', 'ご',
    'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
    'だ', 'ぢ', 'づ', 'で', 'ど',
    'ば', 'び', 'ぶ', 'べ', 'ぼ',
    
    // # 半濁音
    'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'
]