export default class GameOverScene extends Phaser.Scene {
   constructor() {
      super('GameOverScene');
   }

   create() {
      this.angryCat = this.add.sprite(390, 140, 'player').setScale(2);

      this.angryCat.play('game-over');

      this.add.text(400, 250, 'GAME OVER', {
         fontFamily: 'Public Pixel',
         fontSize: 40,
         }).setOrigin(0.5);

      const reloadButton = this.add.text(400, 310, 'Press ENTER to restart', {
         font: '18px Public Pixel',
         fill: '#ffffff',
      }).setOrigin(0.5);

      reloadButton.setInteractive();
      reloadButton.on('pointerdown', () => {
         this.scene.start('Level1');
      });

      this.input.keyboard.on('keydown-ENTER', () => {
         this.scene.start('Level1');
      });
   }
}
