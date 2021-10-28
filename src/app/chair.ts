import {
  Scene,
  SceneLoader,
  Mesh,
  Vector3,
  ArcRotateCamera,
  StandardMaterial,
  Texture,
  TransformNode,
  AbstractMesh,
  Color3,
  MeshBuilder
} from '@babylonjs/core'
import qiDAOLogo from './qiDaoLogo';

function hippoGriffeTexture(scene:Scene) {
  var myMaterial = new StandardMaterial("hippogriffeTexture", scene);

  myMaterial.diffuseTexture = new Texture("/assets/HippoGriffe_D [Gold and Dark Wood].png", scene);
  myMaterial.specularTexture = new Texture("/assets/HippoGriffe_S [Gold and Dark Wood].png", scene);
  myMaterial.bumpTexture = new Texture("/assets/HippoGriffe_N [Gold and Dark Wood].png", scene, false, true);
  myMaterial.specularPower = 10
  // myMaterial.emissiveColor = new Color3(88,88,88)
  // myMaterial.emissiveTexture = new Texture("/assets/HippoGriffe_G [Gold and Dark Wood].png", scene);
  // myMaterial.ambientTexture = new Texture("/assets/HippoGriffe_G [Gold and Dark Wood].png", scene);
  return myMaterial
}

function upholsteryTexture(scene:Scene) {
  var myMaterial = new StandardMaterial("upholsteryTexture", scene);

  myMaterial.diffuseTexture = new Texture("/assets/Upholstery_D [Gold and Dark Wood].png", scene);
  myMaterial.specularTexture = new Texture("/assets/Upholstery_S [Gold and Dark Wood].png", scene);
  myMaterial.bumpTexture = new Texture("/assets/Upholstery_N [Gold and Dark Wood].png", scene, false, true);
  // myMaterial.emissiveColor = new Color3(88,88,88)
  // myMaterial.emissiveTexture = new Texture("/assets/Upholstery_G [Gold and Dark Wood].png", scene);
  // myMaterial.ambientTexture = new Texture("/assets/Upholstery_G [Gold and Dark Wood].png", scene);
  return myMaterial
}

function baseTexture(scene:Scene) {
  var myMaterial = new StandardMaterial("baseTexture", scene);

  myMaterial.diffuseTexture = new Texture("/assets/Base_D [Gold and Dark Wood].png", scene);
  myMaterial.specularTexture = new Texture("/assets/Base_S [Gold and Dark Wood].png", scene);
  myMaterial.bumpTexture = new Texture("/assets/Base_N [Gold and Dark Wood].png", scene, false, true);
  // myMaterial.emissiveColor = new Color3(88,88,88)
  // myMaterial.emissiveTexture = new Texture("/assets/Base_G [Gold and Dark Wood].png", scene);
  // myMaterial.ambientTexture = new Texture("/assets/Base_G [Gold and Dark Wood].png", scene);
  return myMaterial
}

export async function addChair(scene: Scene) {
  const results = await SceneLoader.ImportMeshAsync(
    '',
    '/assets/',
    'HippoGriffe Chair Fixed.obj',
    scene
  )
  console.log('results: ', results)
  
  const chair = new TransformNode('chair', scene)

  results.meshes.forEach((mesh) => {
    mesh.parent = chair
    switch(mesh.name) {
      case 'HippoGriffe_Mesh.002':
        mesh.material = hippoGriffeTexture(scene)
        return
      case 'Upholstery_Mesh':
        mesh.material = upholsteryTexture(scene)
        return
      case 'Base_Mesh.001':
        mesh.material = baseTexture(scene)
        return
    }
  })

  return chair
}
