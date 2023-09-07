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

      //sprite
      scene.load.spritesheet('player', './assets/images/Cat-Sheet.png', {
         frameWidth: 32,
         frameHeight: 32
      });
   }
}