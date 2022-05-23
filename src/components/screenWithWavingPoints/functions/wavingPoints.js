import * as THREE from 'three'

class WavingPoints {
  constructor () {
    this.SEPARATION = 50
    this.AMOUNTX = 150
    this.AMOUNTY = 150
    this.container = null
    this.camera = null
    this.scene = null
    this.renderer = null
    this.praticals = null
    this.count = 0
    this.mouseX = 0
    this.mouseY = 0
    this.windowHalfX = window.innerWidth / 2
    this.windowHalfY = window.innerHeight / 2
  }

  init (DOM) {
    this.container = document.createElement('div')
    DOM.appendChild(this.container)

    // 创建camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    )
    this.camera.position.z = 800
    this.camera.position.x = 300
    this.camera.position.y = 500

    // 创建场景
    this.scene = new THREE.Scene()

    const numParticles = this.AMOUNTX * this.AMOUNTY

    // 创建points的位置和基本大小
    const positions = new Float32Array(numParticles * 3)
    const scales = new Float32Array(numParticles)

    let i = 0
    let j = 0

    for (let ix = 0; ix < this.AMOUNTX; ix++) {
      for (let iy = 0; iy < this.AMOUNTY; iy++) {
        positions[i] =
          ix * this.SEPARATION - (this.AMOUNTX * this.SEPARATION) / 2 // x
        positions[i + 1] = 0 // y
        positions[i + 2] =
          iy * this.SEPARATION - (this.AMOUNTY * this.SEPARATION) / 2 // z

        scales[j] = 1

        i += 3
        j++
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

    // 创建材质
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x003C76), },
      },
      vertexShader: document.getElementById('vertexshader').textContent,
      fragmentShader: document.getElementById('fragmentshader').textContent,
    })

    // particles创建完成，添加进场景
    this.particles = new THREE.Points(geometry, material)
    this.scene.add(this.particles)

    this.renderer = new THREE.WebGLRenderer({ antialias: true, })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor('#052464')
    this.container.appendChild(this.renderer.domElement)

    this.container.style.touchAction = 'none'
    this.container.addEventListener('pointermove', this.onPointerMove.bind(this))

    //

    window.addEventListener('resize', this.onWindowResize.bind(this))
    this.animate()
  }

  onWindowResize () {
    this.windowHalfX = window.innerWidth / 2
    this.windowHalfY = window.innerHeight / 2

    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  onPointerMove (event) {
    if (event.isPrimary === false) return

    this.mouseX = event.clientX - this.windowHalfX
    this.mouseY = event.clientY - this.windowHalfY
  }

  animate () {
    this.render()
    requestAnimationFrame(this.animate.bind(this))
  }

  render () {
    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.01
    this.camera.lookAt(this.scene.position)

    const positions = this.particles.geometry.attributes.position.array
    const scales = this.particles.geometry.attributes.scale.array

    let i = 0
    let j = 0

    for (let ix = 0; ix < this.AMOUNTX; ix++) {
      for (let iy = 0; iy < this.AMOUNTY; iy++) {
        positions[i + 1] =
          Math.sin((ix + this.count) * 0.3) * 20 +
          Math.sin((iy + this.count) * 0.5) * 20

        scales[j] =
          (Math.sin((ix + this.count) * 0.3) + 1) * 10 +
          (Math.sin((iy + this.count) * 0.5) + 1) * 10

        i += 3
        j++
      }
    }
    this.particles.geometry.attributes.position.needsUpdate = true
    this.particles.geometry.attributes.scale.needsUpdate = true

    this.renderer.render(this.scene, this.camera)

    this.count += 0.1
  }
}

export default {
  WavingPoints,
}
