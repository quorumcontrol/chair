import { Engine } from '@babylonjs/core'

export default function createEngine() {
  // create the canvas html element and attach it to the webpage
  var canvas = document.createElement('canvas')
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.id = 'gameCanvas'
  document.body.appendChild(canvas)

  // initialize babylon scene and engine
  return {
    engine: new Engine(canvas, true),
    canvas
  }
}
