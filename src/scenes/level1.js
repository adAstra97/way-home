import DefaultLevel from "./default";
import ParallaxHelper from "../parallax-helper";

export default class Level1 extends DefaultLevel {
   constructor() {
      super('Level1', 'map1');
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
         .setScale(1.2);

      ParallaxHelper.createParallaxBg(this, totalWidth, 150, 'cloud', 0.1);
      ParallaxHelper.createParallaxBg(this, totalWidth, 280, 'mountain', 0.4);
      ParallaxHelper.createParallaxBg(this, totalWidth, 330, 'pine1', 0.8);
      ParallaxHelper.createParallaxBg(this, totalWidth, 400, 'pine2', 1);

      this.cameras.main.setBounds(0,0, width * 2.5, height);

      super.create();

   }

   update() {
      super.update();

      // const cam = this.cameras.main;
      // const speed = 3;
      // if (this.cursors.left.isDown) {
      //    cam.scrollX -= speed;
      // } else if (this.cursors.right.isDown) {
      //    cam.scrollX += speed;
      // }
   }
}