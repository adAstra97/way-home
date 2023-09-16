export default class FullscreenScene extends Phaser.Scene {
   constructor() {
      super('FullscreenScene');
   }

   create() {
      const button = this.add.image(800 - 10, this.scale.height - 50, 'fullscreen', 0)
         .setOrigin(1, 0)
         .setScale(0.6)
         .setInteractive({
            useHandCursor: true,
         });

      button.on('pointerdown', () => {
         if (this.scale.isFullscreen) {
            button.setFrame(0);

            this.scale.stopFullscreen();
         } else {
            button.setFrame(1);

            this.scale.startFullscreen();
         }
      }, this);
   }
}