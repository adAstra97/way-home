export default class OrienatationScene extends Phaser.Scene {
   constructor() {
      super('OrientationScene');
   }

   create() {
      this.rectangle = this.add.rectangle(0, 0, this.scale.width, this.scale.height, '0x000000')
         .setOrigin(0, 0);
      this.text = this.add.text(this.scale.width * .5, this.scale.height * .5, 'Please set your\nphone to landscape', {
         font: '48px Courier',
         fill: '#00ff00',
         align: 'center',
      }).setOrigin(0.5);

      this.checkOriention(this.scale.orientation);

      this.scale.on('orientationchange', this.checkOriention, this);
   }

   checkOriention (orientation) {
      if (orientation === Phaser.Scale.PORTRAIT) {
         this.rectangle.setVisible(true);
         this.text.setVisible(true);
      }
      else if (orientation === Phaser.Scale.LANDSCAPE) {
         this.rectangle.setVisible(false);
         this.text.setVisible(false);
      }
   }
}