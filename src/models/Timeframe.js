const FPS_CONST = {
  PAL: 40,
  NTSC: 33.33,
};
class Timeframe {
  constructor(props, type) {
    this.type = type;

    if (typeof props === "string" && props.includes(":")) {
      this.toString = () => props;
      this.setTimes();
    } else if (typeof props === "number") {
      this.hours = Math.floor(props / 3600000);
      this.minutes = Math.floor((props - this.hours * 3600000) / 60000);
      this.seconds = Math.floor(
        (props - this.hours * 3600000 - this.minutes * 60000) / 1000
      );
      this.frames = Math.floor(
        (props -
          this.hours * 3600000 -
          this.minutes * 60000 -
          this.seconds * 1000) /
          FPS_CONST[this.type] ?? 1
      );
    } else {
      console.warn("Invalid constructor");
    }
  }

  setTimes() {
    const times = this.toString().split(":");
    this.hours = parseInt(times[0]);
    this.minutes = parseInt(times[1]);
    this.seconds = parseInt(times[2]);
    this.frames = parseInt(times[3]);
  }

  toString() {
    let hours = this.hours ?? 0;
    let minutes = this.minutes ?? 0;
    let seconds = this.seconds ?? 0;
    let frames = this.frames ?? 0;
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (frames < 10) {
      frames = "0" + frames;
    }
    return hours + ":" + minutes + ":" + seconds + ":" + frames;
  }

  toMilliSeconds() {
    const seconds =
      (this.frames * FPS_CONST[this.type] ?? 1) / 1000 +
      this.hours * 3600 +
      this.minutes * 60 +
      this.seconds;
    return seconds * 1000;
  }
}

module.exports = Timeframe;
