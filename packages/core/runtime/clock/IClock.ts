export interface IClock {
  now(): string; // ISO string
}

export class DeterministicClock implements IClock {
  private currentTime: string;

  constructor(initialTime: string = new Date().toISOString()) {
    this.currentTime = initialTime;
  }

  now(): string {
    return this.currentTime;
  }
}
