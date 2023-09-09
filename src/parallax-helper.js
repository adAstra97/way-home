export default class ParallaxHelper {
   static createParallaxBg(scene, totalWidth, height, texture, scrollFactor, color = `0xffffff`) {
      const w = scene.textures.get(texture).getSourceImage().width;
      const count = Math.ceil(totalWidth / w) * scrollFactor;

      let x = 0;

      for (let i = 0; i < count; ++i) {

         const m = scene.add.image(x, height, texture)
         .setOrigin(0, 1)
         .setScrollFactor(scrollFactor)
         .setTint(`${color}`)

         x += m.width;
      }
   }
}