import {MathUtils} from './mathutils'

export class Vec2 {
  x: number;
  y: number;

  private constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  static CreateVector(x: number = 0, y: number = 0): Vec2 {
    return new Vec2(x, y);
  }

  static Add(v1: Vec2, v2: Vec2): Vec2 {
    const x = v1.x + v2.x;
    const y = v1.y + v2.y;
    return new Vec2(x, y);
  }

  static Sub(v1: Vec2, v2: Vec2): Vec2 {
    const x = v1.x - v2.x;
    const y = v1.y - v2.y;
    return new Vec2(x, y);
  }

  static Mult(v1: Vec2, n: number): Vec2 {
    const x = v1.x * n;
    const y = v1.y * n;
    return new Vec2(x, y);
  }

  static Div(v1: Vec2, n: number): Vec2 {
    const x = v1.x / n;
    const y = v1.y / n;
    return new Vec2(x, y);
  }

  static Mag(v1: Vec2): number {
    return Math.sqrt(v1.x ** 2 + v1.y ** 2);
  }

  static Normalize(v1: Vec2): Vec2 {
    let m = Vec2.Mag(v1);
    if (m > 0) {
      return Vec2.Div(v1, m);
    }
    return v1;
  }

  static Limit(v1: Vec2, max: number): Vec2 {
    const magSq = v1.x ** 2 + v1.y ** 2;
    if (magSq > max * max) {
      const magSqrt = Math.sqrt(magSq);
      const x = (v1.x / magSqrt) * max;
      const y = (v1.y / magSqrt) * max;

      return Vec2.CreateVector(x, y);
    }
    return v1;
  }

  static RandomVec2(min: number, max: number): Vec2 {
    const x: number = MathUtils.RandomRangeInt(min, max);
    const y: number = MathUtils.RandomRangeInt(min, max);
    return Vec2.CreateVector(x, y);
  }

  static Dot(v1: Vec2, v2: Vec2): number {
    return v1.x * v2.x + v1.y * v2.y;
  }

  static Cross(v1: Vec2, v2: Vec2): number {
    return v1.x * v2.y - v1.y * v2.x;
  }
}