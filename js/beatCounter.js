class BeatCounter {
  constructor(bpm) {
    this.bpm = bpm; // BPM
    this.lastBeatTime = 0; // 最後に拍を検出した時間
    this.beatInterval = (60 / this.bpm) * 1000; // 拍の間隔（ミリ秒）
    this.interpolatedCount = 0; // 線形補間された拍カウント
    this.interpolatedBarCount = 0; // 線形補間された小節カウント
    this.interpolatedPhaseCount = 0; // 線形補間された16拍フェーズカウント
  }

  update() {
    // 現在の時間を取得
    let currentTime = millis();

    // 線形補間値の計算
    this.interpolatedCount = floor(this.interpolatedCount) + (currentTime - this.lastBeatTime) / this.beatInterval;

    // 小節カウントの線形補間（4拍ごと）
    this.interpolatedBarCount = (this.interpolatedCount / 4) % 4;

    // フェーズカウントの線形補間（16拍ごと）
    this.interpolatedPhaseCount = (this.interpolatedCount / 16) % 4;

    // 拍の更新
    if (currentTime - this.lastBeatTime >= this.beatInterval) {
      this.lastBeatTime = currentTime;
    }
  }

  getInfo() {
    return {
      // "BPM": this.bpm,
      "Interpolated Count": this.interpolatedCount,
      "Interpolated Bar Count": this.interpolatedBarCount,
      "Interpolated Phase Count": this.interpolatedPhaseCount
    };
  }
}