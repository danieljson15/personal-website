import { Engine } from '@babylonjs/core/Engines/engine'
import { Scene } from '@babylonjs/core/scene'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import { Color3, Color4 } from '@babylonjs/core/Maths/math.color'
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight'
import { SpotLight } from '@babylonjs/core/Lights/spotLight'
import { PointLight } from '@babylonjs/core/Lights/pointLight'
import { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator'
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent'
import { GlowLayer } from '@babylonjs/core/Layers/glowLayer'
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'
import { PBRMaterial } from '@babylonjs/core/Materials/PBR/pbrMaterial'
import { ShaderMaterial } from '@babylonjs/core/Materials/shaderMaterial'
import { Texture } from '@babylonjs/core/Materials/Textures/texture'
import { Mesh } from '@babylonjs/core/Meshes/mesh'
import { TransformNode } from '@babylonjs/core/Meshes/transformNode'
import { CreateGround } from '@babylonjs/core/Meshes/Builders/groundBuilder'
import { CreateSphere } from '@babylonjs/core/Meshes/Builders/sphereBuilder'
import { LoadAssetContainerAsync } from '@babylonjs/core/Loading/sceneLoader'
import '@babylonjs/core/Culling/ray'
import '@babylonjs/loaders/glTF'
import type { AnimationGroup } from '@babylonjs/core/Animations/animationGroup'
import type { AssetContainer } from '@babylonjs/core/assetContainer'

export type RuinsWorld = {
  dispose: () => void
  reset: () => void
  setPaused: (paused: boolean) => void
  /** Eases the camera to that route's framing of the scene — called on navigation. */
  focus: (pathname: string) => void
  /** Eases the whole scene between its night look and a warm golden-hour look. */
  setMood: (mood: 'day' | 'night', instant?: boolean) => void
}

type Focus = { alpha: number; beta: number; radius: number; target: Vector3 }

/** The capybara stands in profile in front of the tall stone, fireflies ringed around it. */
const CAPY = new Vector3(3.6, -0.28, 0.8)
const CAPY_YAW = 2.13

/** Each route gets its own crop of the same small clearing — a wide establishing
 * shot on the way in, then closer looks at the archway, the tree, and the
 * capybara as you move through the site. Tuned by eye against the loaded scene. */
const FOCUS: Record<string, Focus> = {
  '/': { alpha: 1.02, beta: 1.4, radius: 25, target: new Vector3(4.5, 3.5, -3) },
  '/projects': {
    alpha: 0.96,
    beta: 1.24,
    radius: 12.5,
    target: new Vector3(4.7, 4.3, -2.1),
  },
  '/experience': {
    alpha: 1.58,
    beta: 1.28,
    radius: 11,
    target: new Vector3(1.1, 2.6, -0.8),
  },
  '/hobbies': {
    alpha: -0.75,
    beta: 1.38,
    radius: 14,
    target: CAPY.add(new Vector3(3.4, 1.8, 3.65)),
  },
  '/contact': {
    alpha: -0.5,
    beta: 1.42,
    radius: 19,
    target: CAPY.add(new Vector3(-7.5, 1.5, -3.5)),
  },
  '/capybara': {
    alpha: -0.05,
    beta: 1.34,
    radius: 9.5,
    target: CAPY.add(new Vector3(0, 1.8, 0)),
  },
}
const normalizeFocusPath = (pathname: string) => {
  const key = pathname.replace(/\/$/, '') || '/'
  return FOCUS[key] ? key : '/'
}

/** Scene assets are CC BY; see public/scene/CREDITS.md. */
export function createRuinsScene(
  canvas: HTMLCanvasElement,
  onReady: () => void,
  onError: () => void,
  initialPathname = '/',
  onPoke?: () => void,
): RuinsWorld {
  const coarse = matchMedia('(pointer: coarse)').matches
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
  let paused = reducedMotion.matches,
    disposed = false,
    loaded = false
  const abort = new AbortController()
  let insectSource: AssetContainer | null = null
  let critterSource: AssetContainer | null = null
  let capybaraRoot: TransformNode | null = null
  let capybaraPhase = 0
  const engine = new Engine(
    canvas,
    !coarse,
    { stencil: false, powerPreference: 'low-power' },
    false,
  )
  engine.setHardwareScalingLevel(
    1 / Math.min(devicePixelRatio || 1, coarse ? 1 : 1.5),
  )
  const scene = new Scene(engine)
  scene.clearColor = Color4.FromHexString('#080e16ff')
  scene.fogMode = Scene.FOGMODE_EXP2
  scene.fogDensity = 0.022
  scene.fogColor = Color3.FromHexString('#0c1520')
  scene.skipPointerMovePicking = true
  const camera = new ArcRotateCamera(
    'ruins camera',
    1.02,
    1.4,
    25,
    new Vector3(4.5, 3.5, -3),
    scene,
  )
  camera.fov = 0.78
  camera.minZ = 0.2
  camera.maxZ = 200
  // The landing is a framed world: drag gently changes the view; zoom/pan stay disabled.
  let orbitX = 0,
    orbitY = 0,
    pointerX = 0,
    pointerY = 0,
    dragging = false,
    previousX = 0,
    previousY = 0
  const reset = () => {
    orbitX = orbitY = pointerX = pointerY = 0
  }
  // Poking the capybara: a click (not a drag) that lands on it makes it hop and
  // pulls the fireflies in for a moment.
  let downX = 0,
    downY = 0,
    downAt = 0,
    lastHover = 0,
    pokeStart = -1e9
  const overCapybara = (clientX: number, clientY: number) => {
    if (!capybaraRoot) return false
    const rect = canvas.getBoundingClientRect()
    const hit = scene.pick(clientX - rect.left, clientY - rect.top, (m) =>
      m.isDescendantOf(capybaraRoot as TransformNode),
    )
    return !!hit?.hit
  }
  const down = (e: PointerEvent) => {
    dragging = true
    previousX = downX = e.clientX
    previousY = downY = e.clientY
    downAt = performance.now()
    canvas.setPointerCapture(e.pointerId)
  }
  const move = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') {
      pointerX = e.clientX / innerWidth - 0.5
      pointerY = e.clientY / innerHeight - 0.5
      const now = performance.now()
      if (!dragging && now - lastHover > 120) {
        lastHover = now
        if (overCapybara(e.clientX, e.clientY)) canvas.style.cursor = 'pointer'
        else canvas.style.removeProperty('cursor')
      }
    }
    if (dragging) {
      orbitX = Math.max(
        -0.38,
        Math.min(0.38, orbitX - (e.clientX - previousX) * 0.0016),
      )
      orbitY = Math.max(
        -0.1,
        Math.min(0.07, orbitY - (e.clientY - previousY) * 0.001),
      )
      previousX = e.clientX
      previousY = e.clientY
    }
  }
  const up = (e: PointerEvent) => {
    dragging = false
    if (canvas.hasPointerCapture(e.pointerId))
      canvas.releasePointerCapture(e.pointerId)
    const tap =
      e.type === 'pointerup' &&
      Math.hypot(e.clientX - downX, e.clientY - downY) < 6 &&
      performance.now() - downAt < 500
    if (tap && overCapybara(e.clientX, e.clientY)) {
      if (!reducedMotion.matches) {
        pokeStart = performance.now()
      }
      onPoke?.()
    }
  }
  const leave = () => {
    pointerX = pointerY = 0
    canvas.style.removeProperty('cursor')
  }
  canvas.addEventListener('pointerdown', down)
  canvas.addEventListener('pointermove', move)
  canvas.addEventListener('pointerup', up)
  canvas.addEventListener('pointercancel', up)
  canvas.addEventListener('pointerleave', leave)

  const ambient = new HemisphericLight(
    'night ambient',
    new Vector3(0, 1, 0),
    scene,
  )
  ambient.diffuse = Color3.FromHexString('#93b3d6')
  ambient.groundColor = Color3.FromHexString('#0c141b')
  ambient.intensity = 0.13
  const key = new SpotLight(
    'warm clearing',
    new Vector3(0, 12, 8),
    new Vector3(0, -1, -0.8),
    Math.PI * 0.65,
    2,
    scene,
  )
  key.diffuse = Color3.FromHexString('#ffc673')
  key.intensity = 5.5
  key.range = 38
  key.shadowMinZ = 1
  key.shadowMaxZ = 45
  const shadows = coarse ? null : new ShadowGenerator(1024, key)
  if (shadows) {
    shadows.usePercentageCloserFiltering = true
    shadows.filteringQuality = ShadowGenerator.QUALITY_LOW
    shadows.bias = 0.0004
    shadows.normalBias = 0.03
    shadows.setDarkness(0.25)
  }
  const bounce = new PointLight(
    'amber ground bounce',
    new Vector3(1, 0.8, 2),
    scene,
  )
  bounce.diffuse = Color3.FromHexString('#ffa936')
  bounce.intensity = 1.3
  bounce.range = 13
  // Follows the capybara's own light pool — it moved out of the main clearing's glow.
  const capybaraLight = new PointLight(
    'capybara glow',
    CAPY.add(new Vector3(3, 3.6, 2.5)),
    scene,
  )
  capybaraLight.diffuse = Color3.FromHexString('#ffb84f')
  capybaraLight.intensity = 3.2
  capybaraLight.range = 16

  // Original procedural cloud sky; the reference's external sky images are not redistributed.
  const sky = CreateSphere(
    'night sky',
    { diameter: 160, segments: 12, sideOrientation: Mesh.BACKSIDE },
    scene,
  )
  sky.isPickable = false
  sky.infiniteDistance = true
  const skyMaterial = new ShaderMaterial(
    'cloud sky',
    scene,
    {
      vertexSource: `precision highp float; attribute vec3 position; uniform mat4 worldViewProjection; varying vec3 direction; void main(){direction=position;gl_Position=worldViewProjection*vec4(position,1.);}`,
      fragmentSource: `precision highp float; varying vec3 direction; uniform float mood;
    float hash(vec3 p){p=fract(p*.3183099+vec3(.13,.37,.71));p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
    float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
    void main(){vec3 d=normalize(direction);vec3 p=d*6.;float n=noise(p)*.55+noise(p*2.1)*.27+noise(p*4.3)*.13+noise(p*8.7)*.05;float cloud=smoothstep(.33,.7,n);float h=smoothstep(-.08,.6,d.y);vec3 nb=mix(vec3(.002,.004,.008),vec3(.025,.055,.10),h);vec3 db=mix(vec3(.40,.20,.09),vec3(.11,.19,.34),smoothstep(-.05,.7,d.y));vec3 base=mix(nb,db,mood);vec3 cc=mix(vec3(.13,.18,.24),vec3(.34,.19,.11),mood);vec3 color=base+cc*cloud*h;gl_FragColor=vec4(pow(color,vec3(.4545)),1.);}`,
    },
    { attributes: ['position'], uniforms: ['worldViewProjection', 'mood'] },
  )
  skyMaterial.setFloat('mood', 0)
  skyMaterial.backFaceCulling = false
  skyMaterial.disableDepthWrite = true
  sky.material = skyMaterial
  const glow = new GlowLayer('firefly bloom', scene, {
    mainTextureFixedSize: coarse ? 256 : 512,
    blurKernelSize: 24,
  })
  glow.intensity = 0.55
  glow.addExcludedMesh(sky)
  const flies: Array<{
    root: TransformNode
    phase: number
    radius: number
    lift: number
    center: Vector3
    animations: AnimationGroup[]
  }> = []
  const particles: Mesh[] = []
  const gold = new StandardMaterial('small drifting lights', scene)
  gold.disableLighting = true
  gold.emissiveColor = Color3.FromHexString('#ffd879')
  for (let i = 0; i < (coarse ? 12 : 22); i++) {
    const dot = CreateSphere(
      'distant golden mote',
      { diameter: 0.023 + (i % 3) * 0.008, segments: 2 },
      scene,
    )
    dot.material = gold
    dot.isPickable = false
    particles.push(dot)
  }
  const movingLights = Array.from({ length: coarse ? 1 : 2 }, (_, i) => {
    const light = new PointLight(
      `firefly pool ${i}`,
      new Vector3(0, 1, 0),
      scene,
    )
    light.diffuse = Color3.FromHexString('#ffc35a')
    light.intensity = 2.8
    light.range = 5
    return light
  })
  // Night is the default world; "day" is a warm golden hour used for light mode.
  const nightFog = Color3.FromHexString('#0c1520'),
    dayFog = Color3.FromHexString('#b48b62'),
    nightSky = Color3.FromHexString('#93b3d6'),
    daySky = Color3.FromHexString('#f0cfa2'),
    nightGround = Color3.FromHexString('#0c141b'),
    dayGround = Color3.FromHexString('#54463a'),
    nightKey = Color3.FromHexString('#ffc673'),
    dayKey = Color3.FromHexString('#ffcf94')
  const mix = (a: number, b: number, t: number) => a + (b - a) * t
  let moodValue = 0,
    moodTarget = 0
  const applyMood = (t: number) => {
    scene.fogColor = Color3.Lerp(nightFog, dayFog, t)
    scene.fogDensity = mix(0.022, 0.009, t)
    scene.clearColor = Color4.FromColor3(scene.fogColor, 1)
    ambient.diffuse = Color3.Lerp(nightSky, daySky, t)
    ambient.groundColor = Color3.Lerp(nightGround, dayGround, t)
    ambient.intensity = mix(0.13, 0.5, t)
    key.diffuse = Color3.Lerp(nightKey, dayKey, t)
    key.intensity = mix(5.5, 2.3, t)
    bounce.intensity = mix(1.3, 0.5, t)
    capybaraLight.intensity = mix(3.2, 0.9, t)
    movingLights.forEach((l) => (l.intensity = mix(2.8, 1, t)))
    glow.intensity = mix(0.55, 0.22, t)
    skyMaterial.setFloat('mood', t)
  }
  const setMood = (mood: 'day' | 'night', instant = false) => {
    moodTarget = mood === 'day' ? 1 : 0
    if (instant || reducedMotion.matches) {
      moodValue = moodTarget
      applyMood(moodValue)
    }
  }
  const load = async (name: string) => {
    const response = await fetch(`/personal-website/scene/${name}`, {
      signal: abort.signal,
    })
    if (!response.ok) throw new Error(`Could not load ${name}`)
    const bytes = new Uint8Array(await response.arrayBuffer())
    if (disposed) return null
    return LoadAssetContainerAsync(bytes, scene, { pluginExtension: '.glb' })
  }
  const initialize = async () => {
    const environment = await load('ancient-ruins.glb')
    if (!environment) return
    if (disposed) {
      environment.dispose()
      return
    }
    environment.addAllToScene()
    for (const mat of environment.materials) {
      if (mat instanceof PBRMaterial) {
        mat.usePhysicalLightFalloff = false
        mat.metallic = 0
        mat.roughness = 1
        mat.environmentIntensity = 0.15
        mat.backFaceCulling = false
        mat.maxSimultaneousLights = 5
        mat.alphaCutOff = 0.4
      }
      for (const texture of mat.getActiveTextures())
        if (texture instanceof Texture && !mat.name.includes('Ground'))
          texture.updateSamplingMode(Texture.NEAREST_NEAREST)
    }
    for (const mesh of environment.meshes) {
      mesh.isPickable = false
      mesh.receiveShadows = true
      if (mesh.name.includes('Ground')) mesh.scaling.set(2, 1, 2)
      else if (!mesh.name.includes('Grass') && !mesh.name.includes('Leaves'))
        shadows?.addShadowCaster(mesh)
      mesh.freezeWorldMatrix()
    }
    const floor = CreateGround(
      'distant ground',
      { width: 500, height: 500 },
      scene,
    )
    floor.position.y = -0.28
    floor.isPickable = false
    floor.receiveShadows = true
    const originalGround = environment.materials.find(
      (m) => m.name === 'Ground',
    )
    if (originalGround instanceof PBRMaterial) {
      const floorMaterial = originalGround.clone('extended ground')
      if (floorMaterial?.albedoTexture instanceof Texture) {
        floorMaterial.albedoTexture = floorMaterial.albedoTexture.clone()
        if (floorMaterial.albedoTexture instanceof Texture) {
          floorMaterial.albedoTexture.uScale = 6
          floorMaterial.albedoTexture.vScale = 6
        }
      }
      floor.material = floorMaterial
    }
    const critter = await load('capybara.glb')
    if (disposed) {
      critter?.dispose()
      return
    }
    if (critter) {
      critterSource = critter
      critter.addAllToScene()
      for (const mesh of critter.meshes) {
        mesh.isPickable = true
        mesh.receiveShadows = true
        shadows?.addShadowCaster(mesh)
      }
      for (const mat of critter.materials)
        if (mat instanceof PBRMaterial) {
          mat.usePhysicalLightFalloff = false
          mat.metallic = 0
          mat.roughness = 0.85
          mat.environmentIntensity = 0.18
          mat.maxSimultaneousLights = 5
        }
      capybaraRoot = new TransformNode('capybara root', scene)
      for (const node of critter.rootNodes) node.parent = capybaraRoot
      capybaraRoot.position.copyFrom(CAPY)
      capybaraRoot.rotation.y = CAPY_YAW
      capybaraRoot.scaling.setAll(1.05)
      capybaraPhase = Math.random() * Math.PI * 2
    }
    const insects = await load('firefly.glb')
    if (disposed) {
      insects?.dispose()
      return
    }
    if (insects) {
      insectSource = insects
      for (const mat of insects.materials)
        if (mat instanceof PBRMaterial) {
          mat.usePhysicalLightFalloff = false
          mat.emissiveIntensity = 4
          mat.emissiveColor = Color3.FromHexString('#ffb844')
          if (mat.name.includes('Wing')) {
            mat.emissiveTexture = mat.albedoTexture
            mat.emissiveIntensity = 0.65
          }
          mat.maxSimultaneousLights = 5
          mat.backFaceCulling = false
        }
      for (let i = 0; i < (coarse ? 8 : 21); i++) {
        const entries = insects.instantiateModelsToScene(
          (n) => `firefly ${i} ${n}`,
          false,
          { doNotInstantiate: true },
        )
        const root = new TransformNode(`flight path ${i}`, scene)
        for (const node of entries.rootNodes) {
          node.parent = root
          if (node instanceof TransformNode) node.scaling.scaleInPlace(3)
        }
        // Two of every three fireflies ring the capybara; the rest drift through the wider clearing.
        const nearCapybara = i % 3 !== 0
        const ring = 4.2 + (i % 3) * 0.8
        root.position.set(
          nearCapybara
            ? CAPY.x + Math.cos(i * 2.4) * ring
            : Math.sin(i * 2.4) * 6,
          0.7,
          nearCapybara
            ? CAPY.z + Math.sin(i * 2.4) * ring * 0.8
            : Math.cos(i * 2.4) * 4 - 1,
        )
        entries.animationGroups.forEach((g) => g.stop())
        entries.animationGroups[1]?.start(true, 0.65 + (i % 3) * 0.13)
        if (paused) entries.animationGroups.forEach((g) => g.pause())
        flies.push({
          root,
          phase: i * 2.399,
          radius: 1 + (i % 4) * 0.4,
          lift: nearCapybara ? (i % 4) * 0.5 : 0,
          center: root.position.clone(),
          animations: entries.animationGroups,
        })
      }
    }
    loaded = true
    await scene.whenReadyAsync()
    if (!disposed) onReady()
  }
  initialize().catch(() => {
    if (!disposed) onError()
  })
  const setPaused = (value: boolean) => {
    paused = value
    flies.forEach((f) =>
      f.animations.forEach((g) => {
        if (value) g.pause()
        else if (g.name.includes('Fly')) g.restart()
      }),
    )
  }
  const motionChange = () => setPaused(reducedMotion.matches)
  reducedMotion.addEventListener('change', motionChange)
  let currentFocus = FOCUS[normalizeFocusPath(initialPathname)]
  let restAlpha = currentFocus.alpha
  let restBeta = currentFocus.beta
  let restRadius = currentFocus.radius
  const restTarget = currentFocus.target.clone()
  const applyFocus = (snap: boolean) => {
    const portrait = canvas.clientWidth / canvas.clientHeight < 0.85
    restAlpha = currentFocus.alpha
    restBeta = currentFocus.beta
    restRadius = currentFocus.radius * (portrait ? 1.16 : 1)
    restTarget.copyFrom(currentFocus.target)
    if (portrait) restTarget.x *= 0.45
    camera.fov = portrait ? 0.93 : 0.78
    if (snap) {
      camera.alpha = restAlpha
      camera.beta = restBeta
      camera.radius = restRadius
      camera.target.copyFrom(restTarget)
    }
  }
  const resize = () => {
    engine.resize()
    applyFocus(false)
  }
  const observer = new ResizeObserver(resize)
  observer.observe(canvas)
  applyFocus(true)
  resize()
  const lost = (event: Event) => {
    event.preventDefault()
    onError()
  }
  canvas.addEventListener('webglcontextlost', lost)
  // Eases the camera to a new route's framing — the transition *is* the cue,
  // so it stays smooth even if focus() lands again before the last one settles.
  const focus = (pathname: string) => {
    currentFocus = FOCUS[normalizeFocusPath(pathname)]
    applyFocus(reducedMotion.matches)
  }
  let time = 0,
    last = performance.now()
  const render = () => {
    if (disposed || document.hidden) return
    const now = performance.now()
    if (coarse && now - last < 30) return
    const dt = Math.min((now - last) / 1000, 0.06)
    last = now
    if (!paused) time += dt
    const ease = 1 - Math.exp(-dt * 2.2)
    if (Math.abs(moodTarget - moodValue) > 0.0005) {
      moodValue += (moodTarget - moodValue) * (1 - Math.exp(-dt * 1.6))
      applyMood(moodValue)
    }
    camera.alpha +=
      (restAlpha + orbitX + (paused ? 0 : pointerX * 0.045) - camera.alpha) *
      ease
    camera.beta +=
      (restBeta + orbitY + (paused ? 0 : pointerY * 0.02) - camera.beta) *
      ease
    camera.radius += (restRadius - camera.radius) * ease
    camera.target.x += (restTarget.x - camera.target.x) * ease
    camera.target.y += (restTarget.y - camera.target.y) * ease
    camera.target.z += (restTarget.z - camera.target.z) * ease
    const poke = Math.min((now - pokeStart) / 1100, 1)
    if (capybaraRoot) {
      const breathe = 1 + Math.sin(time * 1.6 + capybaraPhase) * 0.02
      const hop = poke < 1 ? Math.sin(Math.PI * poke) : 0
      capybaraRoot.position.y = CAPY.y + hop * 1.3
      capybaraRoot.scaling.set(
        1.05 * breathe,
        (1.05 / breathe) * (1 + hop * 0.07),
        1.05 * breathe,
      )
      capybaraRoot.rotation.y =
        CAPY_YAW +
        Math.sin(time * 0.22) * 0.07 +
        (poke < 1 ? Math.sin(poke * 20) * 0.09 * (1 - poke) : 0)
    }
    // When the capybara hops the fireflies burst outward, ease back over ~2s, and
    // get a smaller nudge again on landing (~1.1s in).
    const scatterT = Math.min((now - pokeStart) / 3000, 1)
    const smooth = (a: number, b: number, x: number) => {
      const t = Math.min(Math.max((x - a) / (b - a), 0), 1)
      return t * t * (3 - 2 * t)
    }
    const push =
      scatterT < 1
        ? smooth(0, 0.12, scatterT) * (1 - smooth(0.24, 1, scatterT)) +
          0.3 * Math.exp(-(((scatterT - 0.37) / 0.05) ** 2))
        : 0
    flies.forEach(({ root, phase, radius, lift, center }) => {
      const angle = time * 0.12 + phase
      let x = center.x + Math.sin(angle) * radius
      let y = 0.5 + lift + (0.5 + Math.sin(time * 0.4 + phase)) * 0.55
      let z = center.z + Math.cos(angle * 0.8) * radius
      if (push > 0) {
        const dx = x - CAPY.x,
          dz = z - CAPY.z
        const len = Math.hypot(dx, dz) || 1
        const out = push * (2.2 + radius * 0.7)
        x += (dx / len) * out
        z += (dz / len) * out
        y += push * (0.7 + (phase % 1) * 0.6)
      }
      root.position.set(x, y, z)
      root.rotation.y = -angle
    })
    movingLights.forEach((light, i) => {
      const fly = flies[i * 3 + 1]
      if (fly) light.position.copyFrom(fly.root.position)
    })
    particles.forEach((p, i) => {
      p.position.set(
        Math.sin(i * 3.7 + time * 0.035) * 9,
        1 + Math.sin(i * 2.3 + time * 0.15) * 0.8 + (i % 3) * 0.4,
        Math.cos(i * 2.4 + time * 0.045) * 7 - 2,
      )
      p.visibility =
        0.35 + Math.pow(0.5 + 0.5 * Math.sin(time * 0.5 + i), 3) * 0.65
    })
    if (loaded) scene.render()
  }
  canvas.tabIndex = -1
  engine.runRenderLoop(render)
  const visibility = () => {
    if (document.hidden) engine.stopRenderLoop(render)
    else {
      last = performance.now()
      engine.runRenderLoop(render)
    }
  }
  document.addEventListener('visibilitychange', visibility)
  return {
    reset,
    setPaused,
    focus,
    setMood,
    dispose: () => {
      disposed = true
      abort.abort()
      engine.stopRenderLoop(render)
      observer.disconnect()
      reducedMotion.removeEventListener('change', motionChange)
      document.removeEventListener('visibilitychange', visibility)
      canvas.removeEventListener('webglcontextlost', lost)
      canvas.removeEventListener('pointerdown', down)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerup', up)
      canvas.removeEventListener('pointercancel', up)
      canvas.removeEventListener('pointerleave', leave)
      scene.dispose()
      insectSource?.dispose()
      critterSource?.dispose()
      engine.dispose()
    },
  }
}
