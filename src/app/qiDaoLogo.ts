import { Color3, Scene, StandardMaterial, Texture } from "@babylonjs/core";

export default function qiDAOLogo(scene:Scene) {
  var decalMaterial = new StandardMaterial("qiDaoMaterial", scene);
	decalMaterial.diffuseTexture = new Texture("/assets/maicutout.png", scene);
	// decalMaterial.diffuseTexture = new Texture("/assets/maihead.png", scene);
	decalMaterial.diffuseTexture.hasAlpha = true;
  decalMaterial.specularColor = new Color3(0,0,0)
  decalMaterial.specularPower = 100
	// decalMaterial.zOffset = -2;
  return decalMaterial
}