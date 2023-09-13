import ParallaxHelper from "../parallax-helper";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update, child } from 'firebase/database';

const firebaseConfig = {
   apiKey: "AIzaSyCZIs8zupqrb6SLDC4BM6ohrn1-x6ZGar0",
   authDomain: "way-home-6c84c.firebaseapp.com",
   projectId: "way-home-6c84c",
   storageBucket: "way-home-6c84c.appspot.com",
   messagingSenderId: "722711271717",
   appId: "1:722711271717:web:d671f3d4bc715554b362cc",
   measurementId: "G-H6X1CMDDLZ"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default class FinishScene extends Phaser.Scene {
   constructor(scene = null) {
      super('FinishScene');

      this.sceneRef = scene;
   }

   create() {
      const { width, height } = this.scale;
      const totalWidth = width * 2.5;

      this.sound.pauseOnBlur = false;

      this.bgSound = this.sound.add('scene1-audio');

      if (!this.sound.locked) {
         // already unlocked so play
         this.bgSound.play({
            loop: true,
            volume: 0.1,
         });
      } else {
         // wait for 'unlocked' to fire and then play
         this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
            this.bgSound.play({
               loop: true,
               volume: 0.1,
            });
         });
      }

      this.add.image(0, 0, 'sky')
      .setScrollFactor(0)
      .setOrigin(0, 0)
      .setScale(1.2)
      .setTint('0x888888');

      ParallaxHelper.createParallaxBg(this, totalWidth, 180, 'cloud', 0.1, '0x888888');
      ParallaxHelper.createParallaxBg(this, totalWidth, 300, 'mountain', 0.4, '0x888888');
      ParallaxHelper.createParallaxBg(this, totalWidth, 385, 'pine1', 0.8, '0x888888');
      ParallaxHelper.createParallaxBg(this, totalWidth, 505, 'pine2', 1, '0x888888');

      this.happyCat = this.add.sprite(390, 70, 'player').setScale(2);

      if (!this.anims.exists('finish-animation')) {
         this.anims.create({
            key: 'finish-animation',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 15 }),
            frameRate: 10,
            repeat: -1,
            yoyo: true,
         });
      }

      this.happyCat.play('finish-animation');

      this.textFinish = this.add.text(this.scale.width / 2.4, this.scale.height / 3.6, `
      Excellent!
      Thanks to you, the kitten
      was able to get home
      successfully!
      `, {
         fill: '#ffffff',
         font: '24px Public Pixel',
         lineSpacing: 10,
      }).setOrigin(0.5);

      this.getDataFromFirebase().then((data) => {
         if (data.length < 10 || data[8].score < this.registry.get('score')) {
            this.createForm();
         } else {
            const btnToMenu = this.add.text(400, 400, 'Press ENTER to go to the menu', {
               font: '18px Public Pixel',
               fill: '#ffffff',
            }).setOrigin(0.5);

            btnToMenu.setInteractive();
            btnToMenu.on('pointerdown', () => {
               this.sound.play('sound-btn', {
                  volume: 0.1,
               });
               this.bgSound.stop();
               this.scene.start('MenuScene');
            });

            this.input.keyboard.on('keydown-ENTER', () => {
               this.sound.play('sound-btn', {
                  volume: 0.1,
               });
               this.bgSound.stop();
               this.scene.start('MenuScene');
            });
         }
      });
   }

   createForm() {
      const textForForm = this.add.text(this.scale.width / 2.5, this.textFinish.y + 130, `
            Enter your name to save
         your score on the leaderboard!
      `, {
         fill: '#ffffff',
         font: '16px Public Pixel',
         lineSpacing: 10,
      }).setOrigin(0.5).setDepth(0);

      const input = this.add.dom(this.scale.width / 2, this.scale.height / 1.5).createFromHTML('<input type="text" id="playerName" maxlength="15" placeholder="Your name">').setOrigin(0.5, 0.5).setDepth(0);

      const saveButton = this.add.text(this.scale.width / 2, input.y + 60, 'Save', {
         fill: '#ffffff',
         font: '24px Public Pixel',
      }).setOrigin(0.5).setDepth(0);

      saveButton.setInteractive({
         useHandCursor: true,
      });
      saveButton.on('pointerdown', () => {
         this.sound.play('sound-btn', {
            volume: 0.1,
         });
         let inputElement = input.node.querySelector('input');
         let playerName = inputElement.value;
         const points = this.registry.get('score');
         const idPlayer = Date.now();

         if (playerName === '') return;

         inputElement.style.display = 'none';
         saveButton.setVisible(false);
         this.textFinish.setVisible(false);
         this.happyCat.setVisible(false);
         textForForm.setVisible(false);

         this.saveToFirebase(playerName, points, idPlayer);
         inputElement.value = '';
         this.showDataFromFirebase();
      });

      saveButton.on('pointerover', () => {
         saveButton.setFill('#FFBA7E');
         this.sound.play('sound-menu-change', {
            volume: 0.1,
         });
      });
      saveButton.on('pointerout', () => {
         saveButton.setFill('#FFFFFF');
      });
   }

   saveToFirebase(name, score = 10, id) {
      set(ref(database, 'leaders/' + id), {
         name,
         score,
      })
      .catch(error => console.log(error));
   }

   async getDataFromFirebase() {
      return get(ref(database, 'leaders'))
      .then(snapshot => {
         if (snapshot.exists) {
            let obj = snapshot.val();
            let result = Object.values(obj).reduce((acc, item) => {
                  acc.push(item);
               return acc;
            }, []);
               return result;
         }
      })
      .catch(error => console.log(error));
   }

   showDataFromFirebase() {
      this.getDataFromFirebase().then((data) => {
         let filteredData = data.sort((a, b) => b.score - a.score).slice(0, 9);

         if (this.sceneRef) {
            this.drawLeaderboard(this.sceneRef, filteredData);
         } else {
            this.drawLeaderboard(this, filteredData);
         }
      })
      .catch(error => console.log(error));
   }

   drawLeaderboard(scene, data) {
      const x = 128;
      let y = 90;

      const leaderboardContainer = scene.add.container();
      leaderboardContainer.visible = true;
      leaderboardContainer.setDepth(1);

      const rectangle = scene.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.7 } })
      .fillRoundedRect(96, 20, 600, 470, 15)
      .setDepth(-1);

      leaderboardContainer.add(rectangle);

      const closeLeaderboard = scene.add.text(scene.scale.width / 2, 50, 'CLOSE', {
         font: '16px Public Pixel',
         fill: '#ffffff',
      }).setOrigin(0.5);

      leaderboardContainer.add(closeLeaderboard);

      closeLeaderboard.setInteractive({
         useHandCursor: true,
      });
      closeLeaderboard.on('pointerdown', () => {
         leaderboardContainer.visible = false;
         scene.sound.play('sound-btn', {
            volume: 0.1,
         });

         if (this.sceneRef) {
            this.sceneRef.enableButtons();
         } else {
            this.bgSound.stop();
            this.scene.start('MenuScene');
         }
      });
      closeLeaderboard.on('pointerover', () => {
         closeLeaderboard.setFill('#FFBA7E');
         scene.sound.play('sound-menu-change', {
            volume: 0.1,
         });
      });
      closeLeaderboard.on('pointerout', () => {
         closeLeaderboard.setFill('#ffffff');
      });

      for (let i = 0; i < data.length; ++i) {
         const num = scene.add.text(x, y, `${i + 1}.`, {
            font: '16px Public Pixel',
            color: '#ffffff',
            backgroundColor: '#FF8041',
            padding: { left: 10, right: 10, top: 10, bottom: 10 }
         }).setOrigin(0, 0.5);

         const name = scene.add.text(num.x + num.width + 10, y, data[i].name, {
            font: '16px Public Pixel'
         }).setOrigin(0, 0.5);

         const nameWidth = 400;
         const scoreText = scene.add.text(name.x + nameWidth + 10, y, data[i].score.toString(), {
            font: '16px Public Pixel'
         }).setOrigin(0, 0.5);

         y += 45;

         leaderboardContainer.add(num);
         leaderboardContainer.add(name);
         leaderboardContainer.add(scoreText);
      }
   }
}