import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import '@babylonjs/loaders/glTF'
import {
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  SceneLoader
} from '@babylonjs/core'
import createEngine from './engineCreator'
import chair from 'url:./assets/senatorChair.obj'

console.log('chair: ', chair)

class App {
  constructor() {
    const { engine, canvas } = createEngine()
    var scene = new Scene(engine)

    var camera: ArcRotateCamera = new ArcRotateCamera(
      'Camera',
      Math.PI / 2,
      Math.PI / 2,
      2,
      Vector3.Zero(),
      scene
    )
    camera.attachControl(canvas, true)
    const light1: HemisphericLight = new HemisphericLight(
      'light1',
      new Vector3(1, 1, 0),
      scene
    )
    const box: Mesh = MeshBuilder.CreateBox(
      'box',
      {
        size: 1,
        width: 1,
        height: 1
      },
      scene
    )

    SceneLoader.ImportMeshAsync('chair', chair).then((result) => {
      result.meshes[1].position.x = 20
      const myMesh1 = scene.getMeshByName('chair')
      myMesh1.rotation.y = Math.PI / 2
    }).catch((err) => {
      console.error('error loading: ', err)
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
