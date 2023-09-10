import DefaultLevel from "./default";
import ParallaxHelper from "../parallax-helper";
import Enemy from '../enemy';

export default class Level2 extends DefaultLevel {
   constructor() {
      super('Level3', 'map2');
   }

   preload() {
      super.preload();
   }

   create() {
      const {width, height} = this.scale;
      const totalWidth = width * 2.5;

      this.add.image(0, 0, 'sky')
      .setScrollFactor(0)
      .setOrigin(0, 0)
      .setScale(1.2)
      .setTint('0x787080');

      ParallaxHelper.createParallaxBg(this, totalWidth, 150, 'cloud', 0.1, '0xecdccc');
      ParallaxHelper.createParallaxBg(this, totalWidth, 280, 'mountain', 0.4, '0xecdccc');
      ParallaxHelper.createParallaxBg(this, totalWidth, 330, 'pine1', 0.8, '0xBFFFA5');
      ParallaxHelper.createParallaxBg(this, totalWidth, 400, 'pine2', 1, '0xBFFFA5');

      this.cameras.main.setBounds(0,0, width * 2.5, height);

      super.create();

      this.platforms.setTint('0xADA7A7');
      this.decoration.setTint('0xC5BCBC');

      //add enemies
      this.enemy = new Enemy(this, this.mapFromTilemap, this.scoreScene);
      this.bees = this.enemy.createBees();
      this.snails = this.enemy.createSnails();

      this.physics.add.collider(this.platforms, this.bees);
      this.physics.add.collider(this.platforms, this.snails);
      this.physics.add.overlap(this.player.cat, this.bees, this.enemy.checkAgainstEnemies, null, this);
      this.physics.add.overlap(this.player.cat, this.snails, this.enemy.checkAgainstEnemies, null, this);

      this.diamonds = this.treasure.createDiamonds();
      this.physics.add.collider(this.diamonds, this.platforms);
      this.physics.add.overlap(this.player.cat, this.diamonds, this.treasure.collectDiamonds, null, this);

   }

   update() {
      super.update();
   }
}