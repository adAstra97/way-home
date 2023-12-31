import ParallaxHelper from "../helpers/parallax-helper";
import FinishScene from "./finish-scene";

export default class MenuScene extends Phaser.Scene {
   constructor() {
      super('MenuScene');
   }

   create() {
      const { width, height } = this.scale;
      const totalWidth = width * 2.5;

      this.sound.pauseOnBlur = false;
      this.soundMenuChange = this.sound.add('sound-menu-change');

      this.scene.launch('SoundScene', {soundChange: this.soundMenuChange});
      this.scene.launch('FullscreenScene');

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
      .setScale(1.2)
      .setTint('0xFFF2F2');

      //infinity parallax
      this.cloud = this.add.tileSprite(0, 50, totalWidth, height, 'cloud').setOrigin(0, 0).setTint('0xFFF2F2');
      this.mountain = this.add.tileSprite(0, 185, totalWidth, height, 'mountain').setOrigin(0, 0).setTint('0xFFF2F2');
      this.pine1 = this.add.tileSprite(0, 250, totalWidth, height, 'pine1').setOrigin(0, 0).setTint('0xFFF2F2');
      this.pine2 = this.add.tileSprite(0, 305, totalWidth, height, 'pine2').setOrigin(0, 0).setTint('0xFFF2F2');

      this.cameras.main.setBounds(0, 0, 1600, 600);
      this.cameras.main.setScroll(0);

      this.scene.launch(null, { background: this.background });

      //title
      this.title = this.add.image(width * .5, height * .3, 'title').setOrigin(0.5);

      this.titleCat = this.add.sprite(235, 95, 'player')
      .setScale(2.2);

      if (!this.anims.exists('step')) {
         this.anims.create({
            key: 'step',
            frames: this.anims.generateFrameNumbers('player', { start: 384, end: 391 }),
            frameRate: 10,
            repeat: -1,
         });
      }

      this.titleCat.play('step');

      //cat for buttons
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
         this.sound.play('sound-btn', {
            volume: 0.1,
         });

         setTimeout(() => {
            this.showRules();
         }, 1000);
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

   update(time, delta) {
      this.cloud.tilePositionX += 0.01 * delta;
      this.mountain.tilePositionX += 0.02 * delta;
      this.pine1.tilePositionX += 0.04 * delta;
      this.pine2.tilePositionX += 0.05 * delta;
   }

   showRules() {
      this.title.setVisible(false);
      this.titleCat.setVisible(false);
      this.hoverSprite.setVisible(false);
      this.playButton.setVisible(false);
      this.scoresButton.setVisible(false);

      const rectangle = this.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.7 } })
      .fillRoundedRect(96, 20, 600, 470, 15);

      this.textFinish = this.add.text(this.scale.width / 2.5, this.scale.height / 3.5, `
            Help the kitten get home!

         People may say that cats have 9
         lives, but this is not true.
         If you die, you have to start
         over!

                     Controls:
      `, {
         fill: '#ffffff',
         font: '16px Public Pixel',
         lineSpacing: 10,
      }).setOrigin(0.5);

      this.controls = this.add.image(this.scale.width / 1.85, this.scale.height / 2, 'controls').setOrigin(0.5, 0.5);



      const isStartGame = this.add.text(400, this.scale.height - 50, 'Press ENTER to start', {
         font: '18px Public Pixel',
         fill: '#ffffff',
      }).setOrigin(0.5);

      isStartGame.setInteractive({
         useHandCursor: true,
      });
      isStartGame.on('pointerdown', () => {
         this.sound.play('sound-btn', {
            volume: 0.1,
         });
         this.scene.stop('MenuScene');
         this.scene.start('Level1', {'musicBg': this.bgSound});
      });

      this.input.keyboard.on('keydown-ENTER', () => {
         this.sound.play('sound-btn', {
            volume: 0.1,
         });
         this.scene.stop('MenuScene');
         this.scene.start('Level1', {'musicBg': this.bgSound});
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