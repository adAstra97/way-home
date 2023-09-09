import DefaultLevel from "./default";
import Enemy from '../enemy';


export default class Level2 extends DefaultLevel {
   constructor() {
      super('Level2', 'map1');
   }

   preload() {
      super.preload();
   }

   create() {
      const {width, height} = this.scale;
      const totalWidth = width * 2.5;

      this.cameras.main.setBounds(0,0, width * 2.5, height);

      super.create();

      //add enemies
      this.enemy = new Enemy(this, this.mapFromTilemap, this.scoreScene);
      this.bees = this.enemy.createBees();
      this.physics.add.collider(this.platforms, this.bees);
      this.physics.add.overlap(this.player.cat, this.bees, this.enemy.checkAgainstEnemies, null, this);
   }

   update() {
      super.update();
   }
}