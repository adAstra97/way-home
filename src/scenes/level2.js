import DefaultLevel from "./default";
import ParallaxHelper from "../helpers/parallax-helper";
import Enemy from "../objects/enemy";


export default class Level2 extends DefaultLevel {
   constructor() {
      super('Level2', 'map2');
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
      this.bgSound = this.sound.add('scene2-audio');

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

      this.platforms.setTint('0xADA7A7');
      this.decoration.setTint('0xC5BCBC');

      //add enemies
      this.enemy = new Enemy(this, this.mapFromTilemap, this.scoreScene);
      this.snails = this.enemy.createSnails();

      this.physics.add.collider(this.platforms, this.snails);
      this.physics.add.overlap(this.player.cat, this.snails, this.enemy.checkAgainstEnemies, null, this);

      this.diamonds = this.treasure.createDiamonds();
      this.physics.add.collider(this.diamonds, this.platforms);
      this.physics.add.overlap(this.player.cat, this.diamonds, this.treasure.collectDiamonds, null, this);

      this.createRain();

   }

   update() {
      super.update();
   }

   createRain() {
      const emitter = this.add.particles(0, 0, 'rain', {
         x: {min: 0, max: this.scale.width * 2 },
         y: -5,
         lifespan: 2000,
         speedX: { min: -150, max: -200 },
         speedY: 350,
         scale: { start: 0.5, end: 0 },
         quantity: 8,
         blendMode: 'ADD'
      });

      emitter.setScrollFactor(0);
   }
}