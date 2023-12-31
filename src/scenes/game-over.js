export default class GameOverScene extends Phaser.Scene {
   constructor() {
      super('GameOverScene');
   }

   create() {

      this.scene.stop('ScoreScene');
      this.scene.stop('SoundScene');

      this.angryCat = this.add.sprite(390, 140, 'player').setScale(2);

      this.angryCat.play('game-over');

      this.add.text(400, 250, 'GAME OVER', {
         fontFamily: 'Public Pixel',
         fontSize: 40,
         }).setOrigin(0.5);

      const reloadButton = this.add.text(400, 310, 'Press ENTER to go to the menu', {
         font: '18px Public Pixel',
         fill: '#ffffff',
      }).setOrigin(0.5);

      reloadButton.setInteractive({
         useHandCursor: true,
      });
      reloadButton.on('pointerdown', () => {
         this.sound.play('sound-btn', {
            volume: 0.1,
         });
         this.scene.start('MenuScene');
      });

      this.input.keyboard.on('keydown-ENTER', () => {
         this.sound.play('sound-btn', {
            volume: 0.1,
         });
         this.scene.start('MenuScene');
      });
   }
}
