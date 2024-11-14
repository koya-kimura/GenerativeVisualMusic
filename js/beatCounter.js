class BeatCounter {
  constructor(bpm) {
    this.bpm = bpm; // BPM
    this.lastBeatTime = 0; // 最後に拍を検出した時間
    this.beatInterval = (60 / this.bpm) * 1000; // 拍の間隔（ミリ秒）
    this.interpolatedCount = 0; // 線形補間された拍カウント
    this.count = 0; // 拍カウント
    this.barCount = 0; // 小節カウント（4拍ごとに1増加）
    this.phaseCount = 0; // フェーズカウント（16拍ごとに1増加）
  }

  update() {
    // 現在の時間を取得
    let currentTime = millis();

    // 線形補間値の計算
    this.interpolatedCount =
      this.count + (currentTime - this.lastBeatTime) / this.beatInterval;

    // 拍の更新
    if (currentTime - this.lastBeatTime >= this.beatInterval) {
      this.count++;
      this.lastBeatTime = currentTime;

      // 4拍ごとに小節カウントを更新
      if (this.count % 4 === 0) {
        this.barCount++;
      }

      // 16拍ごとにフェーズカウントを更新
      if (this.count % 16 === 0) {
        this.phaseCount++;
      }
    }
  }
}