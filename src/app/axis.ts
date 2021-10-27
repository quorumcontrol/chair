import { 
  Scene,
  DynamicTexture,
  Mesh,
  StandardMaterial,
  Vector3,
  Color3,
 } from '@babylonjs/core'

export default function showWorldAxis(size: number, scene: Scene) {
  var makeTextPlane = function (text, color, size) {
    var dynamicTexture = new DynamicTexture('DynamicTexture', 50, scene, true)
    dynamicTexture.hasAlpha = true
    dynamicTexture.drawText(
      text,
      5,
      40,
      'bold 36px Arial',
      color,
      'transparent',
      true
    )
    var plane = Mesh.CreatePlane('TextPlane', size, scene, true)
    plane.material = new StandardMaterial('TextPlaneMaterial', scene);
    (plane.material as any).backFaceCulling = false;
    (plane.material as any).specularColor = new Color3(0, 0, 0);
    (plane.material as any).diffuseTexture = dynamicTexture
    return plane
  }
  var axisX = Mesh.CreateLines(
    'axisX',
    [
      Vector3.Zero(),
      new Vector3(size, 0, 0),
      new Vector3(size * 0.95, 0.05 * size, 0),
      new Vector3(size, 0, 0),
      new Vector3(size * 0.95, -0.05 * size, 0)
    ],
    scene
  )
  axisX.color = new Color3(1, 0, 0)
  var xChar = makeTextPlane('X', 'red', size / 10)
  xChar.position = new Vector3(0.9 * size, -0.05 * size, 0)
  var axisY = Mesh.CreateLines(
    'axisY',
    [
      Vector3.Zero(),
      new Vector3(0, size, 0),
      new Vector3(-0.05 * size, size * 0.95, 0),
      new Vector3(0, size, 0),
      new Vector3(0.05 * size, size * 0.95, 0)
    ],
    scene
  )
  axisY.color = new Color3(0, 1, 0)
  var yChar = makeTextPlane('Y', 'green', size / 10)
  yChar.position = new Vector3(0, 0.9 * size, -0.05 * size)
  var axisZ = Mesh.CreateLines(
    'axisZ',
    [
      Vector3.Zero(),
      new Vector3(0, 0, size),
      new Vector3(0, -0.05 * size, size * 0.95),
      new Vector3(0, 0, size),
      new Vector3(0, 0.05 * size, size * 0.95)
    ],
    scene
  )
  axisZ.color = new Color3(0, 0, 1)
  var zChar = makeTextPlane('Z', 'blue', size / 10)
  zChar.position = new Vector3(0, 0.05 * size, 0.9 * size)
}
