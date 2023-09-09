import './style.css';
import Phaser from 'phaser';
import Level1 from './src/scenes/level1';
import Level2 from './src/scenes/level2';
import ScoreScene from './src/scenes/score-scene';
import GameOverScene from './src/scenes/game-over';

let config = {
   type: Phaser.AUTO,
   backgroundColor: '0x000000',
   fps: {target: 40},
   render: {
      pixelArt: true
   },
   // scale: {
      // mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
      // autoCenter: Phaser.Scale.CENTER_BOTH,
   // },
      scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      // width: 350,
      // height: 208,
      width: 800,
      height: 503,
   },
   scene: [Level1, Level2, ScoreScene, GameOverScene],
   physics: {
      default: 'arcade',
      arcade: {
         gravity: { y: 300 },
         debug: false,
         fixedStep: false,
         enableBody: true,
      },
   },
};

//    scale: {
//       mode: Phaser.Scale.FIT,
//       autoCenter: Phaser.Scale.CENTER_BOTH,
//       // width: 350,
//       width: 800,
//       height: 600,
//       // height: 208,
//    },


const game = new Phaser.Game(config);

// window.addEventListener('resize', function () {
//    game.resize(window.innerWidth, window.innerHeight);
// });
// function create() {
//    logo = this.add.image(game.config.width / 2, game.config.height / 2, 'logo');
//    window.addEventListener('resize', resizeGame);
// }

// function resizeGame() {
//    var width = window.innerWidth;
//    var height = window.innerHeight;

//    game.renderer.resize(width, height);
//    game.cameras.main.setViewport(0, 0, width, height);

//    logo.setPosition(width / 2, height / 2);
// }