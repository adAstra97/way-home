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

const MAX_SIZE_WIDTH_SCREEN = 1920
const MAX_SIZE_HEIGHT_SCREEN = 1080
const MIN_SIZE_WIDTH_SCREEN = 270
const MIN_SIZE_HEIGHT_SCREEN = 480
const SIZE_WIDTH_SCREEN = 540
const SIZE_HEIGHT_SCREEN = 960


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
   //    mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
   //    autoCenter: Phaser.Scale.CENTER_BOTH,
   //    width: 800,
   //    height: 503,
   // },
      scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
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

const game = new Phaser.Game(config);