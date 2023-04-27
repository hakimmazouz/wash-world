export const programDurationToMiliseconds = (time: string) => {
  const [minutes, seconds] = time.split(":").map(Number);

  const minutesMiliseconds = minutes * 60 * 1000;
  const secondsMiliseconds = seconds * 1000;

  return minutesMiliseconds + secondsMiliseconds;
};

export const doubleDigit = (rawTime: number) => {
  const time = rawTime.toString();
  if (time.length < 2) return `0${time}`;
  else return time;
};

export class WashingProgram {
  constructor(
    private startTimeMiliseconds: number,
    private programDurationMiliseconds: number
  ) {}

  public get timeRemaining() {
    const currentTimeMiliseconds = Date.now();
    const timeElapsed = currentTimeMiliseconds - this.startTimeMiliseconds;

    return this.programDurationMiliseconds - timeElapsed;
  }

  public get programIsDone() {
    return this.timeRemaining < 0;
  }

  public get timeReminingFormatted() {
    const minutes = Math.floor(this.timeRemaining / 1000 / 60);
    const seconds = Math.floor(this.timeRemaining / 1000) % 60;

    return `${doubleDigit(minutes)}:${doubleDigit(seconds)}`;
  }
}
