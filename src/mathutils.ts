export class MathUtils {
  static randomInt(n: number): number {
    let min: number = 0;
    let max: number = n;

    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);

    return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
  }

  static randomRangeInt(min: number = 0, max: number): number {
    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);

    return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
  }

  static randomFromArray(arr: number[]): number {
    const idx = Math.floor(Math.random() * arr.length);
    return arr[idx] as number;
  }
}
