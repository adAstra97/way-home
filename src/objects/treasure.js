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

   createDiamonds() {
      this.diamonds = this.scene.physics.add.staticGroup();
      this.treasureObjects.forEach(object => {
         if (object.name === 'diamond') {
            let diamondEl = this.diamonds.create(object.x + 10, object.y + 110, 'diamond').setScale(1.5).setSize(16, 16).setOffset(0, 0);

            diamondEl.anims.play('shine-diamond');
         }
      });

      return this.diamonds;
   }

   createAnimations(scene) {
      scene.anims.create({
         key: 'shine-coin',
         frames: scene.anims.generateFrameNumbers('coin', { start: 0, end: 6 }),
         frameRate: 10,
         repeat: -1,
      });

      scene.anims.create({
         key: 'shine-diamond',
         frames: scene.anims.generateFrameNumbers('diamond', { start: 0, end: 4 }),
         frameRate: 10,
         repeat: -1,
      });
   }

   collectCoins(player, coin) {
      this.sound.play('sound-coin', {
         volume: 0.1,
      });
      coin.disableBody(true, true);
      this.scoreScene.updateScore(10);
   }

   collectDiamonds(player, diamond) {
      this.sound.play('sound-diamond', {
         volume: 0.1,
      });
      diamond.disableBody(true, true);
      this.scoreScene.updateScore(100);
   }
}