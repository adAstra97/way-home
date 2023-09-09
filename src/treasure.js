export default class Treasure {
   constructor(scene, tilemap, scoreScene) {
      this.scene = scene;
      this.scoreScene = scoreScene;
      this.treasureObjects = tilemap.getObjectLayer('Gems')['objects'];

      if (!scene.anims.exists('shine-coin')) {
         this.createAnimations(scene);
      }

   }

   createCoins() {
      this.coins = this.scene.physics.add.staticGroup();
      this.treasureObjects.forEach(object => {
         if (object.name === 'gold') {
            let coinEl = this.coins.create(object.x + 10, object.y + 105, 'coin').setScale(0.6);

            coinEl.anims.play('shine-coin');
         }
      });

      return this.coins;
   }

   createAnimations(scene) {
      scene.anims.create({
         key: 'shine-coin',
         frames: scene.anims.generateFrameNumbers('coin', { start: 0, end: 6 }),
         frameRate: 10,
         repeat: -1,
      });
   }

   collectCoins(player, coin) {
      coin.disableBody(true, true);
      this.scoreScene.updateScore(10);
   }
}