import { Application, Assets, Sprite, Graphics } from 'pixi.js';


const CANVAS_SIZE = { w: 800, h: 600 } as const;

const log = <T>(msg: T): void => {
  console.log(`[DEBUG] - ${msg}`);
};

// Define explicit types for your game objects if managing them globally
let app: Application;
let bunnySprite: Sprite;
let customShape: Graphics;

async function initGame(): Promise<void> {
    // 1. Instantiate the PixiJS Application
    app = new Application();

    // 2. Initialize the canvas size and configurations
    await app.init({
        width: CANVAS_SIZE.w,
        height: CANVAS_SIZE.h,
        backgroundColor: '#1a1a2e',
        antialias: true
    });

    // 3. Add the canvas element to the HTML page
    document.body.appendChild(app.canvas);

    // // 4. Asynchronously load textures
    // const texture = await Assets.load('https://pixijs.com');

    // // 5. Create and configure a Sprite
    // bunnySprite = new Sprite(texture);
    // bunnySprite.anchor.set(0.5); // Center the origin point of the sprite
    // bunnySprite.x = app.screen.width / 2;
    // bunnySprite.y = app.screen.height / 2;
    
    // Add to the main visual stage container
    // app.stage.addChild(bunnySprite);

    // 6. Draw vector graphics using the Graphics API
    customShape = new Graphics();
    customShape.fill({ color: 0xde3249 });
    customShape.rect(15, 15, 25, 25);
    customShape.fill();
    
    app.stage.addChild(customShape);

    // 7. Establish the frame update game loop (Ticker)
    app.ticker.add((ticker) => {
        // Delta time is supplied by the frame clock
        const dt = ticker.deltaTime;
        
        // Rotate the sprite continuously
        //bunnySprite.rotation += 0.02 * dt;
    });
}

// Execute the application
initGame().catch((err) => {
    console.error('Failed to boot PixiJS Application:', err);
});