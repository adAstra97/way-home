import Phaser from 'phaser';
import PreloadHelper from '../preload-helper';
import Player from '../player';
import Treasure from '../treasure';

export default class DefaultLevel extends Phaser.Scene {
   constructor(key, map) {
      super(key);
      this.levelKey = key;
      this.nextLevel = {
         'Level1': 'Level2',
         'Level2': 'Level3',
         'Level3': 'Level4',
         'Level4': 'Level5',
      };
      this.mapKey = map;
      this.mapFromTilemap;
      this.bgSound;
   }

   preload() {
      PreloadHelper.preload(this);
   }

   create() {
      this.gameOver = false;
      this.sound.pauseOnBlur = false;
      this.soundIsPlaying = false;

      this.scene.launch('ScoreScene');
      this.scoreScene = this.scene.get('ScoreScene');

      //add cart
      this.mapFromTilemap = this.make.tilemap({key: this.mapKey, tileHeight: 16, tileWidth: 16});

      //add tilesets
      const tileset = this.mapFromTilemap.addTilesetImage('tiles-all', 'tiles');

      //add water layer
      this.mapFromTilemap.createLayer('Others', tileset, 0, 120);

      //add layer with platforms
      this.platforms = this.mapFromTilemap.createLayer('Platforms', tileset, 0, 120).setTint(0xC1C6BF);

      this.platforms.setCollisionByExclusion(-1, true);

      this.physics.world.setBounds(0, 0, this.mapFromTilemap.widthInPixels, this.scale.height);

      //add player
      const spawnPoint = this.mapFromTilemap.findObject("Spawn", obj => obj.name === "Spawn Point");
      this.player = new Player(this, spawnPoint.x, spawnPoint.y);

      this.physics.add.collider(this.player.cat, this.platforms);

      //settings of camera
      this.cameras.main.startFollow(this.player.cat, true);
      this.cameras.main.zoom = 1.5

      //add decoration layer
      this.decoration = this.mapFromTilemap.createLayer('Decoration', tileset, 0, 120);

      //add treasure layer
      this.treasure = new Treasure(this, this.mapFromTilemap, this.scoreScene);
      this.coins = this.treasure.createCoins();
      this.physics.add.collider(this.coins, this.platforms);
      this.physics.add.overlap(this.player.cat, this.coins, this.treasure.collectCoins, null, this);

      //add water borders
      this.createWaterBorders(this.mapFromTilemap, this.player.cat);

      if (this.levelKey !== 'Level5') {
         //add campfire
         this.createCampfirePoint();
      } else {
         this.createFinishPoint();
      }
   }

   update(time, delta) {

      if (this.gameOver) {

         this.time.addEvent({
            delay: 2000,
            callback: () => {
               this.registry.set('score', 0);
               this.scene.stop(this.levelKey);
               this.shutDown();
               this.scene.start('GameOverScene');
            },
            callbackScope: this,
            loop: false,
         });

      }

      this.player.update(time, delta);
   }

   createWaterBorders(tilemap, player) {
      let fakeObjects = this.physics.add.staticGroup();
      const waterObjects = tilemap.getObjectLayer('Water')['objects'];
      waterObjects.forEach((object) => {
         let waterEl = fakeObjects.create(object.x + 150, object.y + 200, 'fake_object');
         waterEl.body.width = object.width;
         waterEl.body.height = object.height;
      });

      // water & cat
      this.physics.add.overlap(player, fakeObjects, () => {
         this.sound.play('sound-water', {
            volume: 0.15,
         });
         this.player.destroy();
         this.gameOver = true;
         this.cameras.main.fade(2000, 0, 0, 0, false, null);
      }, null, this);
   }

   createCampfirePoint() {
      const campfirePoint = this.mapFromTilemap.findObject("Campfire", obj => obj.name === "Campfire");
      this.campfire = this.physics.add.sprite(campfirePoint.x, campfirePoint.y + 110, 'campfire');

      if (!this.anims.exists('fire')) {
         this.anims.create({
            key: 'fire',
            frames: this.anims.generateFrameNumbers('campfire'),
            frameRate: 10,
            repeat: -1,
         });
      }
      this.campfire.play('fire');
      this.physics.add.collider(this.campfire, this.platforms);
      this.physics.add.overlap(this.campfire, this.player.cat, () => {
         this.shutDown();
         if (!this.soundIsPlaying) {
            this.soundIsPlaying = true;
            this.sound.play('sound-complete', {
               volume: 0.07,
            });
         }
         this.cameras.main.fade(2000, 0, 0, 0, false, function(camera, progress) {
            if (progress > .9) {
               this.scene.stop(this.levelKey);
               this.scene.start(this.nextLevel[this.levelKey]);
            }
         });
      }, null, this);
   }

   createFinishPoint() {
      const finishPoint = this.mapFromTilemap.findObject("Finish", obj => obj.name === "Finish Point");
      this.finish = this.physics.add.sprite(finishPoint.x, finishPoint.y, 'finish').setScale(1.5);
      this.physics.add.collider(this.finish, this.platforms);
      this.physics.add.overlap(this.finish, this.player.cat, () => {
         this.shutDown();
         if (!this.soundIsPlaying) {
            this.soundIsPlaying = true;
            this.sound.play('sound-finish', {
               volume: 0.1,
            });
         }
         this.time.addEvent({
            delay: 2500,
            callback: () => {
               this.cameras.main.fade(800, 0, 0, 0, false, function(camera, progress) {
                  if (progress > .9) {
                  this.scene.stop(this.levelKey);
                  this.scene.stop('ScoreScene');
                  this.scene.start('FinishScene');
                  }
               });
            },
            callbackScope: this,
            loop: false,
         });
      }, null, this);
   }

   shutDown() {
      this.bgSound.stop();
   }
}