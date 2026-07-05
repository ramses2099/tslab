import {
  Application,
  Assets,
  Sprite,
  Graphics,
  Point,
  Matrix,
  Circle,
} from "pixi.js";
import { PointHelper } from "./pointhelper";

const CANVAS_SIZE = { w: 800, h: 600 } as const;

const log = <T>(msg: T): void => {
  console.log(`[DEBUG] - ${msg}`);
};

//============GLOBAL OBJECT======================================
let app: Application;

//============GLOBAL OBJECT======================================

//============ECS================================================
type Entity = {
  index: number;
  guid: string;
};

type Position = {
  x: number;
  y: number;
};

type Velocity = {
  vx: number;
  vy: number;
};

type Acceleration = {
  ax: number;
  ay: number;
};

type CircleShape = {
  radius: number;
  color: string;
  strockeColor: string;
  lineWidth: number;
  graphic: Graphics;
};

type Motion = {
  isMotion: boolean;
};

type Boundary = {
  x: number;
  y: number;
  width: number;
  hieght: number;
};

type ComponentsManager = {
  entitiesSize: number;
  position: Array<Position | null>;
  velocity: Array<Velocity | null>;
  acceleration: Array<Acceleration | null>;
  circleShape: Array<CircleShape | null>;
  motion: Array<Motion | null>;
  boundary: Array<Boundary | null>;
};

const HasPosition = (x: number, y: number): Position => {
  return { x: x, y: y };
};

const HasVelocity = (vx: number = 0, vy: number = 0): Velocity => {
  return { vx: vx, vy: vy };
};

const HasAcceleration = (ax: number = 0, ay: number = 0): Acceleration => {
  return { ax: ax, ay: ay };
};

const HasCircleShape = (
  radius: number = 25,
  color: string = "#458704",
  strockeColor: string = "#fff",
  lineWidth: number = 3,
): CircleShape => {
  return {
    radius: radius,
    color: color,
    strockeColor: strockeColor,
    lineWidth: lineWidth,
    graphic: new Graphics(),
  };
};

const HasMotion = (isMotion: boolean = true): Motion => {
  return {
    isMotion: isMotion,
  };
};

const HasBoundary = (
  x: number = 0,
  y: number = 0,
  width: number = CANVAS_SIZE.w,
  hieght: number = CANVAS_SIZE.h,
): Boundary => {
  return {
    x: x,
    y: y,
    width: width,
    hieght: hieght,
  };
};

const createComponentsManager = (
  entitiesSize: number = 100,
): ComponentsManager => {
  const position = new Array<Position | null>(entitiesSize).fill(null);
  const velocity = new Array<Velocity | null>(entitiesSize).fill(null);
  const acceleration = new Array<Acceleration | null>(entitiesSize).fill(null);
  const circleShape = new Array<CircleShape | null>(entitiesSize).fill(null);
  const motion = new Array<Motion | null>(entitiesSize).fill(null);
  const boundary = new Array<Boundary | null>(entitiesSize).fill(null);
  const drawable = new Array<Drawable | null>(entitiesSize).fill(null);

  return {
    entitiesSize,
    position,
    velocity,
    acceleration,
    circleShape,
    motion,
    boundary,
    drawable,
  };
};

const debugSystem = (
  entityManager: EntityMananger,
  compManager: ComponentsManager,
): void => {
  for (let entity of entityManager.entityPool) {
    if (entity[1] !== "") {
      log<string>(`Entity: { index: ${entity[0]}, guid: ${entity[1]} }`);
      log<string>("Components");

      for (let idx = 0; idx < compManager.entitiesSize; idx++) {
        if (idx == entity[0]) {
          const pos = compManager.position[idx];
          if (pos != null) {
            log<string>(`Position: { x: ${pos.x}, y: ${pos.y} }`);
          }
          const vel = compManager.velocity[idx];
          if (vel != null) {
            log<string>(`Velocity: { x: ${vel.vx}, y: ${vel.vy} }`);
          }
          const acc = compManager.acceleration[idx];
          if (acc != null) {
            log<string>(`Acceleration: { x: ${acc.ax}, y: ${acc.ay} }`);
          }
          const cirShape = compManager.circleShape[idx];
          if (cirShape != null) {
            log<string>(
              `CircleShape: { radius: ${cirShape.radius}, color: ${cirShape.color}, strockeColor: ${cirShape.strockeColor}, 
              lineWidth: ${cirShape.lineWidth}, hasGraphics ${cirShape.graphic ? "true" : false} }`,
            );
          }
          const motion = compManager.motion[idx];
          if (motion != null) {
            log<string>(`Motion: { isMotion: ${motion.isMotion} }`);
          }
          const bound = compManager.boundary[idx];
          if (bound != null) {
            log<string>(
              `Boundary: { x: ${bound.x}, y: ${bound.y}, width: ${bound.width}, hieght: ${bound.hieght} }`,
            );
          }
        }
      }
    }
  }
};

const drawCircleShapeSystem = (
  entityManager: EntityMananger,
  compManager: ComponentsManager,
): void => {
  for (let entity of entityManager.entityPool) {
    if (entity[1] !== "") {
      let entitiesIds: number[] = compManager.circleShape.reduce<number[]>(
        (acc, value, idx) => {
          if (value != null) {
            acc.push(idx);
          }
          return acc;
        },
        [],
      );

      if (entitiesIds.length > 0) {
        for (const idx in entitiesIds) {
          const pos = compManager.position[idx];
          const shape = compManager.circleShape[idx];

          if (pos != null && shape != null) {
            shape.graphic.x = pos.x;
            shape.graphic.y = pos.y;
          }
        }
      }
    }
  }
};

const motionSystem = (
  entityManager: EntityMananger,
  compManager: ComponentsManager,
  dt: number,
): void => {
  for (let entity of entityManager.entityPool) {
    if (entity[1] !== "") {
      let entitiesIds: number[] = compManager.motion.reduce<number[]>(
        (acc, value, idx) => {
          if (value != null) {
            acc.push(idx);
          }
          return acc;
        },
        [],
      );

      if (entitiesIds.length > 0) {
        for (const idx in entitiesIds) {
          const pos = compManager.position[idx];
          const vel = compManager.velocity[idx];
          const acc = compManager.acceleration[idx];

          if (pos != null && vel != null && acc != null) {
            acc.ax += acc.ax * dt;
            acc.ay += acc.ay * dt;

            vel.vx += acc.ax;
            vel.vy += acc.ay;

            pos.x += vel.vx;
            pos.y += vel.vy;

            acc.ax += 0;
            acc.ay += 0;
          }
        }
      }
    }
  }
};

class EntityMananger {
  private nextEntityId: number;
  entityPool: Map<number, string>;
  entitiesSize: number = 0;

  constructor(entitiesSize: number = 100) {
    this.entitiesSize = entitiesSize;
    this.nextEntityId = 0;
    this.entityPool = new Map<number, string>();
    //init entityPool
    this.initEntityPool();
  }

  initEntityPool(): void {
    for (let i = 0; i < this.entitiesSize - 1; i++) {
      this.entityPool.set(i, "");
    }
  }

  private generateGUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  addEntity(): Entity {
    let idx = this.nextEntityId;
    if (idx > this.entitiesSize) {
      throw new Error("[EntityPool Error]: Maximum entity capacity reached.");
    }
    this.nextEntityId++;
    let guid = this.generateGUID();
    this.entityPool.set(idx, guid);

    return { index: idx, guid: guid };
  }
}

const spawnPlayerEntity = (
  entityManager: EntityMananger,
  compManager: ComponentsManager,
  app: Application,
): Entity => {
  const entity = entityManager.addEntity();
  compManager.position[entity.index] = HasPosition(240, 45);
  compManager.velocity[entity.index] = HasVelocity(0, 0);
  compManager.acceleration[entity.index] = HasAcceleration(0, 0.05);
  compManager.circleShape[entity.index] = HasCircleShape(15);

  const cirShape = compManager.circleShape[entity.index];
  if (cirShape != null) {
    cirShape.graphic.circle(240, 45, cirShape.radius);
    cirShape.graphic.fill(cirShape.color);
    cirShape.graphic.setStrokeStyle({
      width: cirShape.lineWidth,
      color: cirShape.strockeColor,
    });
    cirShape.graphic.stroke();

    app.stage.addChild(cirShape.graphic);
  }

  compManager.boundary[entity.index] = HasBoundary();
  compManager.motion[entity.index] = HasMotion();

  return { index: entity.index, guid: entity.guid };
};

//============ECS================================================

async function initGame(): Promise<void> {
  // 1. Instantiate the PixiJS Application
  app = new Application();

  // 2. Initialize the canvas size and configurations
  await app.init({
    width: CANVAS_SIZE.w,
    height: CANVAS_SIZE.h,
    backgroundColor: "#1a1a2e",
    antialias: true,
  });

  // 3. Add the canvas element to the HTML page
  document.body.appendChild(app.canvas);

  // all code here
  const entityManager = new EntityMananger();
  const componentsManager = createComponentsManager();

  const entityPlayer = spawnPlayerEntity(entityManager, componentsManager, app);
  const debugSys = debugSystem(entityManager, componentsManager);
  const drawCirShapSystem = drawCircleShapeSystem(
    entityManager,
    componentsManager,
  );

  // update function
  const update = (dt: number): void => {
    motionSystem(entityManager, componentsManager, dt);
  };

  //draw function
  const draw = (): void => {
    drawCircleShapeSystem(entityManager, componentsManager);
  };

  // 7. Establish the frame update game loop (Ticker)
  app.ticker.add((ticker) => {
    // Delta time is supplied by the frame clock
    const dt = ticker.deltaTime;

    // update
    update(dt);

    // draw
    draw();
  });
}

// Execute the application
initGame().catch((err) => {
  console.error("Failed to boot PixiJS Application:", err);
});
