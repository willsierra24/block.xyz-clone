import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Configuración de la escena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Configura el renderizador con transparencia
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Fondo transparente
    mountRef.current.appendChild(renderer.domElement);

    // Configuración de OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Hace que el movimiento sea más suave
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 500;

    // Geometría y material del cubo
    const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8, 32, 32, 32);
    const clock = new THREE.Clock();

    const uniforms = {
      time: { value: clock.getElapsedTime() },
      color1: { value: new THREE.Color(0x8ff8ec) }, // Azul
      color2: { value: new THREE.Color(0xffb89c) }  // Naranja
    };

    const vert = `
      varying vec2 v_uv;
      uniform float time;

      mat3 rotation3dY(float angle) {
        float s = sin(angle);
        float c = cos(angle);

        return mat3(
          c, 0.0, -s,
          0.0, 1.0, 0.0,
          s, 0.0, c
        );
      }

      void main () {
        vec3 new_position = position.xyz;
        new_position *= rotation3dY(
          3.141 / 2.0 * sin(position.y + time)
        );
        gl_Position = projectionMatrix * modelViewMatrix * vec4(new_position, 1.0);
        v_uv = uv;
      }
    `;

    const frag = `
      varying vec2 v_uv;
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;

      void main () {
        vec2 uv = v_uv;
        vec3 color = mix(color1, color2, uv.x);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true // Habilita la transparencia en el material
    });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 2;

    const animate = () => {
      cube.rotation.x += 0.002;
      cube.rotation.y += 0.002;
      cube.rotation.z += 0.002;
      uniforms.time.value = clock.getElapsedTime();
      controls.update(); // Actualiza los controles en cada frame
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Limpiar la escena cuando el componente se desmonte
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      controls.dispose(); // Limpia los controles cuando el componente se desmonte
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeScene;