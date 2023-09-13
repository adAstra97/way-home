import DefaultLevel from "./default";
import ParallaxHelper from "../parallax-helper";
import Enemy from '../enemy';


export default class Level1 extends DefaultLevel {
   constructor() {
      super('Level1', 'map1');
   }

   preload() {
      super.preload();
   }

   create(data) {

      const {width, height} = this.scale;
      const totalWidth = width * 2.5;

      this.add.image(0, 0, 'sky')
         .setScrollFactor(0)
         .setOrigin(0, 0)
         .setScale(1.2);

      ParallaxHelper.createParallaxBg(this, totalWidth, 150, 'cloud', 0.1);
      ParallaxHelper.createParallaxBg(this, totalWidth, 280, 'mountain', 0.4);
      ParallaxHelper.createParallaxBg(this, totalWidth, 330, 'pine1', 0.8, '0xBFFFA5');
      ParallaxHelper.createParallaxBg(this, totalWidth, 400, 'pine2', 1, '0xBFFFA5');

      this.cameras.main.setBounds(0,0, width * 2.5, height);

      super.create();

      this.bgSound = data.musicBg;

      if (!this.sound.locked) {
         // already unlocked so play
         this.bgSound.play({
            loop: true,
            volume: 0.1,
         });
      } else {
         // wait for 'unlocked' to fire and then play
         this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
            this.bgSound.play({
               loop: true,
               volume: 0.1,
            });
         });
      }


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