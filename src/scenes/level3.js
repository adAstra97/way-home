import DefaultLevel from "./default";
import ParallaxHelper from "../parallax-helper";
import Enemy from '../enemy';

export default class Level2 extends DefaultLevel {
   constructor() {
      super('Level3', 'map3');
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
      .setTint('0x464646');

      this.createStars();
      ParallaxHelper.createParallaxBg(this, totalWidth, 280, 'mountain', 0.4, '0x898989');
      ParallaxHelper.createParallaxBg(this, totalWidth, 330, 'pine1', 0.8, '0x788B79');
      ParallaxHelper.createParallaxBg(this, totalWidth, 400, 'pine2', 1, '0x788B79');

      this.cameras.main.setBounds(0,0, width * 2.5, height);

      super.create();

      this.bgSound = this.sound.add('scene3-audio');

      if (!this.sound.locked) {
         // already unlocked so play
         this.bgSound.play({
            loop: true,
            volume: 0.07,
         });
      } else {
         // wait for 'unlocked' to fire and then play
         this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
            this.bgSound.play({
               loop: true,
               volume: 0.07,
            });
         });
      }

      this.platforms.setTint('0x777A77');
      this.decoration.setTint('0x777A77');

      //add enemies
      this.enemy = new Enemy(this, this.mapFromTilemap, this.scoreScene);
      this.snails = this.enemy.createSnails();
      this.boars = this.enemy.createBoars();

      this.physics.add.collider(this.platforms, this.snails);
      this.physics.add.collider(this.platforms, this.boars);
      this.physics.add.overlap(this.player.cat, this.snails, this.enemy.checkAgainstEnemies, null, this);
      this.physics.add.overlap(this.player.cat, this.boars, this.enemy.checkAgainstEnemies, null, this);

      this.diamonds = this.treasure.createDiamonds();
      this.physics.add.collider(this.diamonds, this.platforms);
      this.physics.add.overlap(this.player.cat, this.diamonds, this.treasure.collectDiamonds, null, this);
   }

   update() {
      super.update();
   }

   createStars() {
      this.stars = [];

      let getStarPoints = () =>{
         const color = 0xffffff;
         return {
            x: Math.floor(Math.random() * this.scale.width),
            y: Math.floor(Math.random() * this.scale.height * .5),
            radius: Math.floor(Math.random() * 2.5),
            color,
         }
      }

      for (let i = 0; i < 300; i++) {
         const {x, y, radius, color} = getStarPoints();
         const star = this.add.circle(x, y, radius, color)
         star.setScrollFactor(Math.random() * .1);
         this.stars.push(star)
      }
   }
}