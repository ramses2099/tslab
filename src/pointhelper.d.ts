import { Point } from "pixi.js";
export declare class PointHelper {
    static clone(p: Point): Point;
    static add(p1: Point, p2: Point): void;
    static add(p1: Point, p2: Point, out: Point): Point;
    static sub(p1: Point, p2: Point): void;
    static sub(p1: Point, p2: Point, out: Point): Point;
    static mult(p1: Point, n: number): void;
    static mult(p1: Point, n: number, out: Point): Point;
    static div(p1: Point, n: number): void;
    static div(p1: Point, n: number, out: Point): Point;
    static dot(p1: Point, p2: Point): number;
    static cross(p1: Point, p2: Point): number;
    static mag(p1: Point): number;
    static normalize(p1: Point): void;
    static limit(p1: Point, max: number): void;
    static pointToString(p: Point): string;
}
//# sourceMappingURL=pointhelper.d.ts.map