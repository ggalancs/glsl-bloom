const glslify = require('glslify');

export default class PlaneBlur {
  constructor(texture, direction) {
    this.uniforms = null;
    this.texture = texture;
    this.direction = direction;
    this.mesh = this.createMesh();
  }
  createMesh() {
    this.uniforms = {
      resolution: {
        type: 'v2',
        value: new THREE.Vector2(window.innerWidth / 8, window.innerHeight / 8),
      },
      direction: {
        type: 'v2',
        value: this.direction,
      },
      texture: {
        type: 't',
        value: this.texture,
      },
    };
    return new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: glslify('../../glsl/gaussian_blur.vs'),
        fragmentShader: glslify('../../glsl/gaussian_blur.fs'),
      })
    );
  }
  resize() {
    this.uniforms.resolution.value.set(window.innerWidth / 8, window.innerHeight / 8);
  }
}
