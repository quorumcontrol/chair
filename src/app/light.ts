import { Color3, PointLight, Scene, Vector3 } from '@babylonjs/core'

let index = 0

export default function createLight(position: Vector3, scene: Scene) {
  index++
  var light = new PointLight(`pointLight-${index}`, position, scene)
  // light.intensity = 300
  light.diffuse = new Color3(1, 1, 1)
  // light.specular = new Color3(0, 1, 0);
  light.range = 400
  light.intensity = 3
  return light
}
