export default class ScoreScene extends Phaser.Scene {
   constructor() {
      super('ScoreScene');
   }

   create() {
      if (!this.registry.has('score')) {
         this.registry.set('score', 0);
      }

      this.text = this.add.text(10, 10, '0000000', {
         fontFamily: 'Public Pixel',
         fontSize: 24,
         color: '#ffffff',

      });
      this.score = this.registry.get('score');
      this.text.setText(this.score.toString().padStart(7, '0'));


   }

   updateScore(points) {
      this.score += points;
      this.registry.set('score', this.score);
      this.text.setText(this.score.toString().padStart(7, '0'));
   }
}