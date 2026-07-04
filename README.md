# tslab

Typescript lab with pixijs

# install dependencies

```
npm install pixi.js
npm install -D vite typescript
```

# setting the package.json

```
  "scripts": {
    "dev":"vite",
    "bulid":"tsc && vite build",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

# init ts

```
npx tsc --init
```

# ECS

```
//fixed size array
type Scene ={
  velocity: Array<null| component.HasVelocity>
  position: Array<null| component.HasPosition>
  moveTarget: Array<null| component.HasMoveTarget>
  sprite: Array<null| component.HasSprite>
  collisionBox: Array<null| component.HasColllisionBox>
  animation: Array<null| component.HasAnimation>
}
```

# System

```
const velocitySystem = (scene:Scene) =>{
  for(let i =0; i<maxEntityCount; i++){
    const velocity = scene.velocity[i]
    const position = scene.position[i]

    if(velocity && position){
      position.x += velocity.x
      position.y += velocity.y
    }
  }
}
```

# Entity

```
const Player ={
  index: 7
  guid: "41ee2cfc-73cc-4d97-9158-f2338d39a9e1"
}

interface EntityPool{
  AllocateEntity():{index:number, guid:string}
  FreeEntity(index:number):void
  VerifyEntity(enity:{index:number; guid:string}):boolean
}
```

# Create function

```
const spawnPlayerEntity = (scene: Scene, entityPool: EntityPool): {index:number;guid:string}=>{
  const entity = entityPool.AllocateEntity()
  
  scene.velocity[entity.index] = {x:0, y:0}
  scene.sprite[entity.index] = new Sprite(...)
  scene.position[entity.index] = {x:10, y:25}

  return entity
}
```
