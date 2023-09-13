import PreloadHelper from "../preload-helper";

export default class Preloader extends Phaser.Scene {
   constructor() {
      super('Preloader');
   }

   preload() {
      let progressBar = this.add.graphics();
      let progressBox = this.add.graphics();

      let width = this.cameras.main.width;
      let height = this.cameras.main.height;

      let percentText = this.make.text({
         x: width / 2,
         y: height / 2 - 5,
         text: '0%',
         style: {
            font: '18px Public Pixel',
            fill: '#ffffff'
         }
      });
      percentText.setOrigin(0.5, 0.5);

      progressBox.fillStyle(0x222222, 0.8);
      progressBox.fillRect(240, 270, 320, 50);

      this.load.on('progress', value => {
         percentText.setText(parseInt(value * 100) + '%');
         progressBar.clear();
         progressBar.fillStyle(0xffffff, 1);
         progressBar.fillRect(250, 280, 300 * value, 30);
      });

      this.load.on('complete', () =>{
         progressBar.destroy();
         progressBox.destroy();
         percentText.destroy();
      });

      PreloadHelper.preload(this);
   }

   create() {
      this.scene.stop('Preloader');
      this.scene.start('MenuScene');
      // this.scene.start('FinishScene');
   }
}