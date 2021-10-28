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

class App {
  constructor() {
    const { engine, canvas } = createEngine()
    var scene = new Scene(engine)
    scene.clearColor = Color3.Black()
    // showWorldAxis(100, scene)
    var gl = new GlowLayer("glow", scene);

    var camera: ArcRotateCamera = new ArcRotateCamera(
      'Camera',
      Math.PI / 2,
      Math.PI / 2,
      2,
      Vector3.Zero(),
      scene
    )
    camera.position = new Vector3(1, 3.5, -6)
    camera.attachControl(canvas, true)

    createLight(new Vector3(5, 10, 2), scene)
    createLight(new Vector3(-10, 10, -4), scene)
    createLight(new Vector3(10, -10, 4), scene)
    createLight(new Vector3(-10, 10, -4), scene)

    // var directionalLight = new DirectionalLight("DirectionalLight", new Vector3(0, -1, 1), scene);
    // // directionalLight.diffuse = new Color3(1, 1, );
    // // directionalLight.specular = new Color3(0, 1, 0);

    const light1: HemisphericLight = new HemisphericLight(
      'light1',
      new Vector3(0, -1, 1),
      scene
    )

    light1.intensity = 0.6

    // const box: Mesh = MeshBuilder.CreateBox(
    //   'box',
    //   {
    //     size: 2,
    //     width: 2,
    //     height: 2
    //   },
    //   scene
    // )
    // box.position = lightPosition

    addChair(scene).then((chair) => {
      camera.useFramingBehavior = true
      camera.setTarget(chair.getChildMeshes()[0])
      camera.zoomOnFactor = 2
      camera.zoomOn(chair.getChildMeshes())

      const frameRate = 10

      const zRotate = new Animation("zRotate", "rotation.y", frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);

      const keyFrames = []; 
  
      keyFrames.push({
          frame: 0,
          value: 0
      });
  
      keyFrames.push({
          frame: frameRate * 300,
          value: 180
      });
  
      keyFrames.push({
          frame: 600 * frameRate,
          value: 0
      });
  
      zRotate.setKeys(keyFrames);
  
      chair.animations.push(zRotate);
  
      scene.beginAnimation(chair, 0, 600 * frameRate, true);

      // createSpotlight(new Vector3(5, 10, 2), chair.position, scene)
    })
    // scene.debugLayer.show()

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
