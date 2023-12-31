export default class Enemy {
   constructor(scene, tilemap, scoreScene) {
      this.scene = scene;
      this.scoreScene = scoreScene;
      this.enemyObjects = tilemap.getObjectLayer('Enemy')['objects'];

      if (!scene.anims.exists('fly-bee')) {
         this.createAnimations(scene);
      }

      this.checkAgainstEnemies = this.checkAgainstEnemies.bind(this);

   }

   createBees() {
      this.bees = this.scene.physics.add.group();
      this.enemyObjects.forEach(object => {
         if (object.name === "Bee") {
            let beeEl = this.bees.create(object.x, object.y + 105, 'bee').setSize(32, 32).setOffset(16, 15);

            beeEl.flipX = true;

            beeEl.move = this.scene.tweens.add({
               targets: beeEl,
               x: beeEl.x + 110,
               yoyo: true,
               repeat: -1,
               duration: 2000,
               onRepeat: () => {
                  beeEl.flipX = !beeEl.flipX;
               },
               onYoyo: () => {
                  beeEl.flipX = !beeEl.flipX;
               },
            });

            beeEl.play('fly-bee');
         }
      });

      return this.bees;
   }

   createSnails() {
      this.snails = this.scene.physics.add.group();
      this.enemyObjects.forEach(object => {
         if (object.name === "Snail") {
            let snailEl = this.snails.create(object.x, object.y + 105, 'snail').setSize(28, 24).setOffset(5, 8).setScale(1.2);

            snailEl.flipX = true;

            snailEl.move = this.scene.tweens.add({
               targets: snailEl,
               x: snailEl.x + 110,
               yoyo: true,
               repeat: -1,
               duration: 5000,
               onRepeat: () => {
                  snailEl.flipX = !snailEl.flipX;
               },
               onYoyo: () => {
                  snailEl.flipX = !snailEl.flipX;
               },
            });

            snailEl.play('crawl-snail');
         }
      });

      return this.snails;
   }

   createBoars() {
      this.boars = this.scene.physics.add.group();
      this.enemyObjects.forEach(object => {
         if (object.name === "Boar") {
            let boarEl = this.boars.create(object.x, object.y + 105, 'boar').setSize(34, 24).setOffset(5, 8).setScale(1.5);

            boarEl.flipX = true;

            boarEl.move = this.scene.tweens.add({
               targets: boarEl,
               x: boarEl.x + 130,
               yoyo: true,
               repeat: -1,
               duration: 2000,
               onRepeat: () => {
                  boarEl.flipX = !boarEl.flipX;
               },
               onYoyo: () => {
                  boarEl.flipX = !boarEl.flipX;
               },
            });

            boarEl.play('boar');
         }
      });

      return this.boars;
   }

   createEagles() {
      this.eagles = this.scene.physics.add.group();
      this.enemyObjects.forEach(object => {
         if (object.name === "Eagle") {
            let eagleEl = this.eagles.create(object.x, object.y + 105, 'eagle').setSize(30, 30).setScale(1.4);
            eagleEl.body.setAllowGravity(false);

            eagleEl.flipX = false;

            eagleEl.move = this.scene.tweens.add({
               targets: eagleEl,
               y: eagleEl.y - 120,
               yoyo: true,
               repeat: -1,
               duration: 1500,
            });

            eagleEl.play('fly-eagle');
         }
      });

      return this.eagles;
   }

   createAnimations(scene) {
      scene.anims.create({
         key: 'fly-bee',
         frames: scene.anims.generateFrameNumbers('bee', { start: 0, end: 3 }),
         frameRate: 12,
         repeat: -1,
      });
      scene.anims.create({
         key: 'fly-eagle',
         frames: scene.anims.generateFrameNumbers('eagle', { start: 0, end: 3 }),
         frameRate: 10,
         repeat: -1,
      });
      scene.anims.create({
         key: 'crawl-snail',
         frames: scene.anims.generateFrameNumbers('snail', { start: 0, end: 7 }),
         frameRate: 11,
         repeat: -1,
      });
      scene.anims.create({
         key: 'boar',
         frames: scene.anims.generateFrameNumbers('boar', { start: 0, end: 5 }),
         frameRate: 11,
         repeat: -1,
      });
      scene.anims.create({
         key: 'dead-enemy',
         frames: scene.anims.generateFrameNumbers('enemy-death', { start: 0, end: 5 }),
         frameRate: 16,
         repeat: 0,
         hideOnComplete: true
      });
   }

   createEnemyDeath(x, y) {
      const deathSprite = this.scene.add.sprite(x, y, 'enemy-death');
      deathSprite.play('dead-enemy');
   }

   checkAgainstEnemies(player, enemy) {

      if (player.y + player.body.height * .5 <= enemy.y - enemy.body.height * .5) {
         this.scene.sound.play('sound-kill', {
            volume: 0.03,
         });
         this.createEnemyDeath(enemy.x, enemy.y)
         enemy.destroy();

         player.play('jump');

         player.body.velocity.y = -100;
         this.scoreScene.updateScore(50);
      } else {
         this.scene.gameOver = true;
         enemy.move.stop();
         this.scene.sound.play('sound-dead', {
            volume: 0.15,
         })
         this.scene.physics.world.disableBody(player.body);

         player.play('death-player');

         this.scene.tweens.add({
            targets: player,
            y: player.y - window.innerHeight,
            duration: 4000,
            repeat: 0,
         });

         this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
               this.scene.cameras.main.fade(1000, 0, 0, 0, false, null);
            },
            callbackScope: this.scene,
            loop: false,
         });


         // const alphaTween = this.scene.tweens.add({
         //    targets: player,
         //    alpha: 0.35,
         //    ease: 'Linear',
         //    duration: 200,
         //    repeat: 5,
         //    yoyo: true,
         //    onStart: () => {
         //       player.setTint('0xF34C4C');
         //    }
         // });

         // this.scene.time.delayedCall(1500, () => {
         //    alphaTween.stop();
         //    player.alpha = 1;
         //    player.setTint('0xFFFFFFFF');
         // });
      }
   }
}