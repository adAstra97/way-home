import DefaultLevel from "./default";
import ParallaxHelper from "../parallax-helper";
import Enemy from '../enemy';

export default class Level2 extends DefaultLevel {
   constructor() {
      super('Level4', 'map4');
   }

   preload() {
      super.preload();
   }

   create() {
      const {width, height} = this.scale;
      const totalWidth = width * 2.5;

      this.bgColor = this.add.rectangle(-1, -1, width * 2.6, height, '0xF8B2A1').setOrigin(0, 0);


      ParallaxHelper.createParallaxBg(this, totalWidth, 150, 'cloud', 0.1, '0xFFF1F0');
      ParallaxHelper.createParallaxBg(this, totalWidth, 280, 'mountain', 0.4, '0xFFCEC8');
      ParallaxHelper.createParallaxBg(this, totalWidth, 330, 'pine1', 0.8, '0xFFCEC8');
      ParallaxHelper.createParallaxBg(this, totalWidth, 400, 'pine2', 1, '0xFFCEC8');


      this.cameras.main.setBounds(0,0, width * 2.5, height);

      super.create();

      this.platforms.setTint('0xFFE1DE');
      this.decoration.setTint('0xFFE1DE');

      //add enemies
      this.enemy = new Enemy(this, this.mapFromTilemap, this.scoreScene);
      this.eagles = this.enemy.createEagles();

      this.physics.add.collider(this.platforms, this.eagles);
      this.physics.add.overlap(this.player.cat, this.eagles, this.enemy.checkAgainstEnemies, null, this);

      this.diamonds = this.treasure.createDiamonds();
      this.physics.add.collider(this.diamonds, this.platforms);
      this.physics.add.overlap(this.player.cat, this.diamonds, this.treasure.collectDiamonds, null, this);
   }

   update() {
      super.update();
   }
}