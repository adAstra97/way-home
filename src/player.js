const speed = 200;

export default class Player {
   constructor(scene, x, y) {
      this.scene = scene;

      if (!scene.anims.exists('idle')) {
         this.createAnimations(scene);
      }

      this.cat = scene.physics.add.sprite(x, y + 95, 'player')
         .setBounce(0)
         .setCollideWorldBounds(true)
         .setScale(1.7)
         .setDepth(1);

      this.cat.body.setSize(15, 15, 0, 0).setOffset(9, 17);
      this.cursors = scene.input.keyboard.createCursorKeys();

   }

   update(time, delta) {
      if (this.scene.gameOver) {
         return;
      }

      const { cursors, cat } = this;

      if (cursors.left.isDown) {
         cat.setVelocityX(-speed);
         this.direction = 'left';

         if (cat.body.onFloor()) {
            cat.play('walk', true);
         }
      } else if (cursors.right.isDown) {
         cat.setVelocityX(speed);
         this.direction = 'right';

         if (cat.body.onFloor()) {
            cat.play('walk', true);
         }
      } else {
         // If no keys are pressed, the player keeps still
         cat.setVelocityX(0);
         // Only show the idle animation if the player is footed
         // If this is not included, the player would look idle while jumping
         if (cat.body.onFloor()) {
            cat.play('idle', true);
         }
      }

      // Player can jump while walking any direction by pressing the space bar
      // or the 'UP' arrow
      if ((cursors.space.isDown) && cat.body.onFloor()) {
         this.scene.sound.play('sound-jump', {
            volume: 0.15,
         });
         cat.setVelocityY(-speed);
         cat.play('jump', true);
      }

      if (cat.body.velocity.x > 0) {
         cat.setFlipX(false);
      } else if (cat.body.velocity.x < 0) {
         // otherwise, make them face the other side
         cat.setFlipX(true);
      }

   }

   destroy() {
      this.cat.destroy();
   }

   createAnimations(scene) {
      scene.anims.create({
         key: 'idle',
         frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 15 }),
         frameRate: 10,
         repeat: -1,
         yoyo: true,
      });
      scene.anims.create({
         key: 'walk',
         frames: scene.anims.generateFrameNumbers('player', { start: 32, end: 48 }),
         frameRate: 15,
         repeat: -1,
      });
      scene.anims.create({
         key: 'jump',
         frames: scene.anims.generateFrameNumbers('player', { frames: [152,153,154,155,160,161,162,163] }),
         frameRate: 10,
         repeat: 0,
      });
      scene.anims.create({
         key: 'look',
         frames: scene.anims.generateFrameNumbers('player', { frames: [200,201,202,203,208,209,210,211] }),
         frameRate: 10,
         repeat: -1,
         yoyo: true,
      });
      scene.anims.create({
         key: 'death-player',
         frames: scene.anims.generateFrameNumbers('player', { frames: [303, 302, 301, 300, 299, 298, 297, 295 ] }),
         frameRate: 8,
         repeat: 0,
         yoyo: false,
      });
      scene.anims.create({
         key: 'game-over',
         frames: scene.anims.generateFrameNumbers('player', { frames: [344, 345, 346, 347, 352, 353, 354, 355, 360, 361, 362, 363, 355, 354, 353, 352, 347, 346, 345, 352] }),
         frameRate: 8,
         repeat: 0,
      });
   }
}