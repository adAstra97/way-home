export default class PreloadHelper {
   static preload(scene) {

      //tilesets
      scene.load.image('tiles', './assets/tilesets/tiles-all.png');

      //maps
      scene.load.tilemapTiledJSON('map1', './assets/tilemaps/tilemap1.json');

      //bg
      scene.load.image('sky', './assets/images/sky.png');
      scene.load.image('cloud', './assets/images/cloud.png');
      scene.load.image('mountain', './assets/images/mountain2.png');
      scene.load.image('pine1', './assets/images/pine1.png');
      scene.load.image('pine2', './assets/images/pine2.png');

      //sprites
      scene.load.spritesheet('player', './assets/images/Cat-Sheet.png', {
         frameWidth: 32,
         frameHeight: 32
      });

      scene.load.spritesheet('bee', './assets/images/Enemies/Bee.png', {
         frameWidth: 64,
         frameHeight: 64,
      });

      scene.load.spritesheet('enemy-death', './assets/images/Enemies/enemy-death.png', {
         frameWidth: 40,
         frameHeight: 40,
      });

      scene.load.spritesheet('coin', './assets/images/Coins/coins-all.png', {
         frameWidth: 16,
         frameHeight: 16,
      });

      scene.load.spritesheet('campfire', './assets/images/campfire.png', {
         frameWidth: 32,
         frameHeight: 32,
      });

      //others
      scene.load.image('fake_object', './assets/images/Transparency.png');
   }
}