import DefaultLevel from "./default";
import ParallaxHelper from "../helpers/parallax-helper";
import Enemy from "../objects/enemy";

export default class Level1 extends DefaultLevel {
   constructor() {
      super('Level5', 'map5');
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
         .setTint('0xF5D6FC');

      ParallaxHelper.createParallaxBg(this, totalWidth, 150, 'cloud', 0.1, '0xDBD3FA');
      ParallaxHelper.createParallaxBg(this, totalWidth, 280, 'mountain', 0.4, '0xEBE6FF');
      ParallaxHelper.createParallaxBg(this, totalWidth, 330, 'pine1', 0.8, '0x81B679');
      ParallaxHelper.createParallaxBg(this, totalWidth, 400, 'pine2', 1, '0x81B679');

      this.cameras.main.setBounds(0,0, width * 2.5, height);

      super.create();

      this.bgSound = this.sound.add('scene5-audio');

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

      this.boars = this.enemy.createBoars();
      this.physics.add.collider(this.platforms, this.boars);
      this.physics.add.overlap(this.player.cat, this.boars, this.enemy.checkAgainstEnemies, null, this);

      this.snails = this.enemy.createSnails();
      this.physics.add.collider(this.platforms, this.snails);
      this.physics.add.overlap(this.player.cat, this.snails, this.enemy.checkAgainstEnemies, null, this);

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