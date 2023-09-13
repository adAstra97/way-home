import ParallaxHelper from "../parallax-helper";
import FinishScene from "./finish-scene";

export default class MenuScene extends Phaser.Scene {
   constructor() {
      super('MenuScene');
   }

   create() {
      const { width, height } = this.scale;
      const totalWidth = width * 2.5;

      this.sound.pauseOnBlur = false;

      this.bgSound = this.sound.add('scene1-audio');

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

      this.add.image(0, 0, 'sky')
      .setScrollFactor(0)
      .setOrigin(0, 0)
      .setScale(1.2);

      ParallaxHelper.createParallaxBg(this, totalWidth, 180, 'cloud', 0.1);
      ParallaxHelper.createParallaxBg(this, totalWidth, 300, 'mountain', 0.4);
      ParallaxHelper.createParallaxBg(this, totalWidth, 385, 'pine1', 0.8);
      ParallaxHelper.createParallaxBg(this, totalWidth, 505, 'pine2', 1);

      const title = this.add.image(width * .5, height * .3, 'title').setOrigin(0.5);

      this.hoverSprite = this.add.sprite(100, 100, 'player')
      .setScale(2)
      .setVisible(false);

      if (!this.anims.exists('look')) {
         this.anims.create({
            key: 'look',
            frames: this.anims.generateFrameNumbers('player', { frames: [200,201,202,203,208,209,210,211] }),
            frameRate: 10,
         });
      }

      this.soundMenuChange = this.sound.add('sound-menu-change');

      //PLAY BTN
      this.playButton = this.add.text(width * .5, height * .6, 'PLAY', {
         font: '24px Public Pixel',
         fill: '#ffffff'
      }).setOrigin(0.5);

      this.playButton.setInteractive({
         useHandCursor: true,
      });
      this.playButton.on('pointerdown', () => {
         if (!this.playButton.active) return;

         this.scene.stop('MenuScene');
         this.sound.play('sound-btn', {
            volume: 0.1,
         });
         this.scene.start('Level1', {'musicBg': this.bgSound});
      });
      this.playButton.on('pointerover', () => {
         this.playButton.setFill('#FFBA7E');
         this.hoverSprite.setVisible(true);
         this.hoverSprite.play('look');
         this.sound.play('sound-menu-change', {
            volume: 0.1,
         });

         this.hoverSprite.x = this.playButton.x - this.playButton.width;
         this.hoverSprite.y = this.playButton.y - this.playButton.height;
      });
      this.playButton.on('pointerout', () => {
         this.playButton.setFill('#ffffff');
         this.hoverSprite.setVisible(false);
      });

      //SCORES BTN
      this.scoresButton = this.add.text(this.playButton.x, this.playButton.y + this.playButton.displayHeight + 40, 'SCORE', {
         font: '20px Public Pixel',
         fill: '#ffffff'
      }).setOrigin(0.5);

      this.scoresButton.setInteractive({
         useHandCursor: true,
      });
      this.scoresButton.on('pointerdown', () => {
         if (!this.scoresButton.active) return;

         this.sound.play('sound-btn', {
            volume: 0.1,
         });

         this.disableButtons();

         const finishScene = new FinishScene(this);
         finishScene.showDataFromFirebase();
      });
      this.scoresButton.on('pointerover', () => {
         this.scoresButton.setFill('#FFBA7E');
         this.hoverSprite.setVisible(true);
         this.hoverSprite.play('look');
         this.soundMenuChange.play({
            volume: 0.1,
         });

         this.hoverSprite.x = this.scoresButton.x - this.scoresButton.width;
         this.hoverSprite.y = this.scoresButton.y - this.scoresButton.height;
      });
      this.scoresButton.on('pointerout', () => {
         this.scoresButton.setFill('#ffffff');
         this.hoverSprite.setVisible(false);
      });
   }

   disableButtons() {
      this.playButton.setActive(false)
      .setInteractive(false)
      .setAlpha(0.5);

      this.scoresButton.setActive(false)
      .setInteractive(false)
      .setAlpha(0.5);
   }

   enableButtons() {
      this.playButton.setActive(true)
      .setInteractive(true)
      .setAlpha(1);

      this.scoresButton.setActive(true)
      .setInteractive(true)
      .setAlpha(1);
   }
}