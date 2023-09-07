import Phaser from 'phaser';
import PreloadHelper from '../preload-helper';
import Player from '../player';


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
      this.map = map;

   }

   preload() {
      PreloadHelper.preload(this);
   }

   create() {
      //add cart
      const map = this.make.tilemap({key: this.map, tileHeight: 16, tileWidth: 16});

      //add tilesets
      const tileset = map.addTilesetImage('tiles-all', 'tiles');

      //add layer with platforms
      this.platforms = map.createLayer('Platforms', tileset, 0, 120).setTint(0x929B8A);

      this.platforms.setCollisionByExclusion(-1, true);

      this.physics.world.setBounds(0, 0, map.widthInPixels, this.scale.height);// мб 2 пар?

      // add player
      const spawnPoint = map.findObject("Spawn", obj => obj.name === "Spawn Point");
      this.player = new Player(this, spawnPoint.x, spawnPoint.y);
      this.cameras.main.startFollow(this.player.cat, true);
      this.cameras.main.zoom = 1.5
      // this.cameras.main.setZoom(1.5, 1.5);

      this.physics.add.collider(this.player.cat, this.platforms);

      //add decoration layer
      const decoration = map.createLayer('Decoration', tileset, 0, 120);


   }

   update(time, delta) {
      this.player.update(time, delta);
   }
}