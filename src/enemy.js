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
            let beeEl = this.bees.create(object.x, object.y + 105, 'bee').setSize(32, 38).setOffset(20, 15).setScale(0.9);

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
            let snailEl = this.snails.create(object.x, object.y + 105, 'snail').setSize(28, 24).setOffset(5, 8);

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

   createAnimations(scene) {
      scene.anims.create({
         key: 'fly-bee',
         frames: scene.anims.generateFrameNumbers('bee', { start: 0, end: 3 }),
         frameRate: 12,
         repeat: -1,
      });
      scene.anims.create({
         key: 'crawl-snail',
         frames: scene.anims.generateFrameNumbers('snail', { start: 0, end: 7 }),
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

      if ((player.y + player.body.height * .5 < enemy.y ) && player.body.velocity.y > 100) {
         this.createEnemyDeath(enemy.x, enemy.y)
         enemy.destroy();
         player.play('jump');
         player.body.velocity.y = -100;
         this.scoreScene.updateScore(50);
      } else {
         this.scene.gameOver = true;
         enemy.move.stop();
         this.scene.physics.world.disableBody(player.body);

         player.play('death-player');

         this.scene.tweens.add({
            targets: player,
            y: player.y - window.innerHeight,
            duration: 4000,
            repeat: 0,
         });

         this.scene.time.addEvent({
            delay: 300,
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