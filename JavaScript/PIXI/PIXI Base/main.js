// Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TextureCache = PIXI.utils.TextureCache,
    Rectangle = PIXI.Rectangle;

// Create a Pixi Application
let app = new Application({width: 256, height: 256});  // create a stage

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x333333;
app.renderer.autoResize = true;
app.renderer.resize(800, 550);
app.renderer.view.style.margin = "50px";

//Define variables that might be used in more 
//than one function
let internet, photoshop, apple, id, square, state;

loader.add([
      "img/grid.png",
      "img/square.png",
      "img/tileset.png",
      "img/sprites.json"
    ]).load(setup);

//This `setup` function will run when the image has loaded
function setup() {

  // 1. Access the TextureCache directly:
  let internetTexture = TextureCache["internet.png"];
  internet = new Sprite(internetTexture);
  app.stage.addChild(internet);

  // 2. Access the texture using through the loader's resources:
  photoshop = new Sprite(resources["img/sprites.json"].textures["photoshop.png"]);
  photoshop.x = 260;
  app.stage.addChild(photoshop);

  // 3. Create an optional alias called 'id' for all the texture atlas frame id textures
  id = loader.resources["img/sprites.json"].textures;
  apple = new Sprite(id["apple.png"]);
  apple.y = 260;
  app.stage.addChild(apple);

  //Create the `tileset` sprite from the texture:
  let texture = TextureCache["img/tileset.png"];

  //Create a rectangle object that defines the position and
  //size of the sub-image you want to extract from the texture
  //(`Rectangle` is an alias for `PIXI.Rectangle`):
  let rectangle = new Rectangle(32, 32, 64, 64);
  texture.frame = rectangle;

  // Create the sprite from texture:
  
  let block = new Sprite(texture);
  let grid = new Sprite(resources["img/grid.png"].texture);
  let square = new Sprite(resources["img/square.png"].texture);

  block.position.set(55,55);
  app.stage.addChild(block);

  // add the cat to the stage:
  square.position.set(150, 150);

  // square.scale.set(1,1);
  square.rotation = Math.PI / 2;
  // square.anchor.set(0.5, 0.5);
  square.pivot.set(5,5);
  //app.stage.addChild(grid);

  
  
  apple = new Sprite(id["apple.png"]);
  apple.position.set(150,10);
  app.stage.addChild(apple); 
  
  photoshop = new Sprite(resources["img/sprites.json"].textures["photoshop.png"]);
  photoshop.x = 360;
  app.stage.addChild(photoshop);

  internet = new Sprite(internetTexture);
  internet.position.set(10, 220);
  internet.vx = 0;
  internet.vy = 0;

  app.stage.addChild(internet);

  let rect = new PIXI.Graphics();
  rect.lineStyle(4, 0xFF3300, 1);
  rect.beginFill(0x66CCFF);
  rect.drawRect(0, 0, 64, 64);
  rect.endFill();
  rect.x = 300;
  rect.y = 300;
  app.stage.addChild(rect);
  

  app.ticker.add(delta => gameLoop(delta));

}

function gameLoop(delta) {
    internet.vx = 1;
    internet.vy = 1;
    
    internet.x += internet.vx;
}

console.log('hello')



