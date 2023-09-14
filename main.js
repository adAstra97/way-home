import './style.css';
import Phaser from 'phaser';
import Preloader from './src/scenes/preloader';
import MenuScene from './src/scenes/menu';
import Level1 from './src/scenes/level1';
import Level2 from './src/scenes/level2';
import Level3 from './src/scenes/level3';
import Level4 from './src/scenes/level4';
import Level5 from './src/scenes/level5';
import ScoreScene from './src/ui/score-scene';
import SoundScene from './src/ui/sound-scene';
import GameOverScene from './src/scenes/game-over';
import FinishScene from './src/scenes/finish-scene';

let config = {
   type: Phaser.AUTO,
   backgroundColor: '0x000000',
   parent: game_container,
   fps: {target: 40},
   dom: {createContainer: true},
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
   scene: [Preloader, MenuScene, Level1, Level2, Level3, Level4, Level5, ScoreScene, FinishScene, SoundScene, GameOverScene],
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