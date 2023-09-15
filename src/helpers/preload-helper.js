export default class PreloadHelper {
   static preload(scene) {

      //tilesets
      scene.load.image('tiles', './assets/tilesets/tiles-all.png');

      //maps
      scene.load.tilemapTiledJSON('map1', './assets/tilemaps/tilemap1.json');
      scene.load.tilemapTiledJSON('map2', './assets/tilemaps/tilemap2.json');
      scene.load.tilemapTiledJSON('map3', './assets/tilemaps/tilemap3.json');
      scene.load.tilemapTiledJSON('map4', './assets/tilemaps/tilemap4.json');
      scene.load.tilemapTiledJSON('map5', './assets/tilemaps/tilemap5.json');

      //bg
      scene.load.image('sky', './assets/images/sky.png');
      scene.load.image('cloud', './assets/images/cloud.png');
      scene.load.image('mountain', './assets/images/mountain.png');
      scene.load.image('pine1', './assets/images/pine1.png');
      scene.load.image('pine2', './assets/images/pine2.png');

      //sprites-------------------------------------------
      scene.load.spritesheet('player', './assets/images/cat.png', {
         frameWidth: 32,
         frameHeight: 32
      });
      //enemy sprites
      scene.load.spritesheet('bee', './assets/images/Enemies/bee.png', {
         frameWidth: 64,
         frameHeight: 64,
      });

      scene.load.spritesheet('snail', './assets/images/Enemies/snail.png', {
         frameWidth: 48,
         frameHeight: 32,
      });

      scene.load.spritesheet('boar', './assets/images/Enemies/boar.png', {
         frameWidth: 48,
         frameHeight: 32,
      });

      scene.load.spritesheet('eagle', './assets/images/Enemies/eagle.png', {
         frameWidth: 40,
         frameHeight: 40,
      });

      scene.load.spritesheet('enemy-death', './assets/images/Enemies/enemy-death.png', {
         frameWidth: 40,
         frameHeight: 40,
      });
      //gold sprites
      scene.load.spritesheet('coin', './assets/images/Coins/coin.png', {
         frameWidth: 16,
         frameHeight: 16,
      });

      scene.load.spritesheet('diamond', './assets/images/Coins/diamond.png', {
         frameWidth: 15,
         frameHeight: 12,
      });
      //point sprites
      scene.load.spritesheet('campfire', './assets/images/campfire.png', {
         frameWidth: 32,
         frameHeight: 32,
      });
      //sound sprite
      scene.load.spritesheet('switch-sound', './assets/images/soundOn-Off.png', {
         frameWidth: 30,
         frameHeight: 30,
      });
      //----------------------------------------------------------------

      //others
      scene.load.image('fake_object', './assets/images/transparency.png');
      scene.load.image('rain', './assets/images/rain.png');
      scene.load.image('finish', './assets/images/house.png');
      scene.load.image('title', './assets/images/title.png');
      scene.load.image('controls', './assets/images/controls.svg');

      //audio
      scene.load.audio('scene1-audio', './assets/music/game-bg.mp3');
      scene.load.audio('scene2-audio', './assets/music/rain-bg.mp3');
      scene.load.audio('scene3-audio', './assets/music/night-bg.mp3');
      scene.load.audio('scene4-audio', './assets/music/sunrise-bg.mp3');
      scene.load.audio('scene5-audio', './assets/music/finish.mp3');

      scene.load.audio('sound-coin', './assets/music/sounds/coin.mp3');
      scene.load.audio('sound-diamond', './assets/music/sounds/diamond.wav');
      scene.load.audio('sound-water', './assets/music/sounds/water.mp3');
      scene.load.audio('sound-btn', './assets/music/sounds/btn.mp3');
      scene.load.audio('sound-dead', './assets/music/sounds/dead.mp3');
      scene.load.audio('sound-jump', './assets/music/sounds/jump.wav');
      scene.load.audio('sound-kill', './assets/music/sounds/kill.mp3');
      scene.load.audio('sound-complete', './assets/music/sounds/level-complete.wav');
      scene.load.audio('sound-finish', './assets/music/sounds/win.mp3');
      scene.load.audio('sound-menu-change', './assets/music/sounds/menu-change.wav');
   }
}