import { Color3, Scene, SpotLight, Vector3 } from '@babylonjs/core'

let index = 0

export default function createSpotlight(position: Vector3, pointAt:Vector3, scene: Scene) {
  index++
  const light = new SpotLight(`spotlight-${index}`, position, pointAt, Math.PI / 3, 2, scene);
  // light.intensity = 300
  light.diffuse = new Color3(1, 1, 1)
  // light.specular = new Color3(0, 1, 0);
  light.range = 400
  return light
}
