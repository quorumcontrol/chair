import 'babylonjs-loaders'
import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import {
  Scene,
  ArcRotateCamera,
  Vector3,
  Color3,
  HemisphericLight,
  PointLight,
  Mesh,
  MeshBuilder,
  DirectionalLight,
  GlowLayer,
  Animation
} from '@babylonjs/core'
import createEngine from './engineCreator'
import { addChair } from './chair'
import showWorldAxis from './axis'
import createLight from './light'
import createSpotlight from './spotLight'
import qiDAOLogo from './qiDaoLogo'

class App {
  constructor() {
    const { engine, canvas } = createEngine()
    var scene = new Scene(engine)
    scene.clearColor = Color3.Black()
    // showWorldAxis(100, scene)
    var gl = new GlowLayer('glow', scene)

    var camera: ArcRotateCamera = new ArcRotateCamera(
      'Camera',
      Math.PI / 2,
      Math.PI / 2,
      2,
      Vector3.Zero(),
      scene
    )
    camera.position = new Vector3(1, 3.5, 6)
    camera.attachControl(canvas, true)
    // camera.position = new Vector3(0,3,3)

    createLight(new Vector3(1, 3, 2), scene)
    createLight(new Vector3(-1, 1, -2), scene)
    createLight(new Vector3(1, -1, 2), scene)
    createLight(new Vector3(-1, 1, -2), scene)

    // var directionalLight = new DirectionalLight("DirectionalLight", new Vector3(0, -1, 1), scene);
    // // directionalLight.diffuse = new Color3(1, 1, );
    // // directionalLight.specular = new Color3(0, 1, 0);

    const light1: HemisphericLight = new HemisphericLight(
      'light1',
      new Vector3(0, -1, 1),
      scene
    )

    addChair(scene).then((chair) => {
      // camera.useFramingBehavior = true
      camera.setTarget(chair.getChildMeshes()[1])
      camera.beta = 0.5
      camera.radius = 4
      camera.useAutoRotationBehavior = true
      // camera.zoomOnFactor = 2
      // camera.zoomOn(chair.getChildMeshes())

      const upholsteryMesh = chair
        .getChildMeshes()
        .find((mesh) => mesh.name === 'Upholstery_Mesh')

      const decalMaterial = qiDAOLogo(scene)
      const location = new Vector3(0.016257147042792963, 0.8948969311723505, -0.3952781182062408)
      const normal = new Vector3(-0.6308170302018776, 0.5130841740305409, 0.582077748042889)
      var decalSize = new Vector3(0.25, 0.25, 0.25)

      /**************************CREATE DECAL*************************************************/
      var decal = MeshBuilder.CreateDecal('decal', upholsteryMesh, {
        position: location,
        normal: normal,
        size: decalSize
      })
      decal.material = decalMaterial
      decal.parent = upholsteryMesh
    })

    // hide/show the Inspector
    window.addEventListener('keydown', (ev) => {
      // Shift+Ctrl+Alt+I
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
        if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide()
        } else {
          scene.debugLayer.show()
        }
      }
    })

    // run the main render loop
    engine.runRenderLoop(() => {
      scene.render()
    })
  }
}
new App()
