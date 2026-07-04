import { Application, Assets, Sprite, Graphics, Point, Matrix } from "pixi.js";
import { PointHelper } from "./pointhelper";

const CANVAS_SIZE = { w: 800, h: 600 } as const;

const log = <T>(msg: T): void => {
  console.log(`[DEBUG] - ${msg}`);
};

//============GLOBAL OBJECT======================================
let app: Application;

//============GLOBAL OBJECT======================================

//============ECS================================================

class HasPosition {
  constructor(public position: Point) {}
}

class HasVelocity {
  constructor(public velocity: Point) {}
}

class HasAcceleration {
  constructor(public acceleration: Point) {}
}

type Entity = {
  index: number;
  guid: string;
};

class EntityMananger {
  private nextEntityId: number;
  entityPool: Map<number, string>;
  entitiesSize: number = 100;

  constructor() {
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

type Scene = {
  position: Array<null | HasPosition>;
  velocity: Array<null | HasVelocity>;
  acceleration: Array<null | HasAcceleration>;
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
  const e01: Entity = entityManager.addEntity();

  for (let entity of entityManager.entityPool) {
    log<string>(`Index: ${entity[0]}, Guid: ${entity[1]}`);
  }

  // update function
  const update = (dt: number): void => {};

  //draw function
  const draw = (): void => {};

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
