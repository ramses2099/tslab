import { Point } from "pixi.js";

export class PointHelper {
  static clone(p: Point): Point {
    return new Point(p.x, p.y);
  }

  static add(p1: Point, p2: Point): void;
  static add(p1: Point, p2: Point, out: Point): Point;
  static add(p1: Point, p2: Point, out?: Point): Point | void {
    if (out !== undefined) {
      out.x = p1.x + p2.x;
      out.y = p1.y + p2.y;
    } else {
      p1.x += p2.x;
      p1.y += p2.y;
    }
  }

  static sub(p1: Point, p2: Point): void;
  static sub(p1: Point, p2: Point, out: Point): Point;
  static sub(p1: Point, p2: Point, out?: Point): Point | void {
    if (out !== undefined) {
      out.x = p1.x - p2.x;
      out.y = p1.y - p2.y;
    } else {
      p1.x -= p2.x;
      p1.y -= p2.y;
    }
  }

  static mult(p1: Point, n: number): void;
  static mult(p1: Point, n: number, out: Point): Point;
  static mult(p1: Point, n: number, out?: Point): Point | void {
    if (out !== undefined) {
      out.x = p1.x * n;
      out.y = p1.y * n;
    } else {
      p1.x *= n;
      p1.y *= n;
    }
  }

  static div(p1: Point, n: number): void;
  static div(p1: Point, n: number, out: Point): Point;
  static div(p1: Point, n: number, out?: Point): Point | void {
    if (out !== undefined) {
      out.x = p1.x * n;
      out.y = p1.y * n;
    } else {
      p1.x /= n;
      p1.y /= n;
    }
  }

  static dot(p1: Point, p2: Point): number {
    return p1.x * p2.x + p1.y * p2.y;
  }

  static cross(p1: Point, p2: Point): number {
    return p1.x * p2.y - p1.y * p2.x;
  }

  static mag(p1: Point): number {
    return Math.sqrt(p1.x * p1.x + p1.y * p1.y);
  }

  static normalize(p1: Point): void {
    let m = this.mag(p1);
    if (m > 0) {
      this.div(p1, m);
    }
  }

  static limit(p1: Point, max: number): void {
    if (this.mag(p1) > max) {
      this.normalize(p1);
      this.mult(p1, max);
    }
  }

  static pointToString(p: Point): string {
    return ` { x: ${p.x}, y: ${p.y} }`;
  }
}
