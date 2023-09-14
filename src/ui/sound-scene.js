export default class SoundScene extends Phaser.Scene {
   constructor() {
      super('SoundScene');
   }

   create(data) {
      this.soundButton = this.add.sprite(this.scale.width - 25, 25, 'switch-sound').setInteractive({
         useHandCursor: true,
      });

      if (this.sound.mute) {
         this.soundButton.setFrame(0);
      } else {
         this.soundButton.setFrame(1);
      }

      this.soundButton.on('pointerdown', this.toggleSound, this);

   }

   toggleSound() {
      if (this.sound.mute) {
         this.sound.setMute(false);
         this.soundButton.setFrame(1);
      } else {
         this.sound.setMute(true);
         this.soundButton.setFrame(0);
      }
   }
}