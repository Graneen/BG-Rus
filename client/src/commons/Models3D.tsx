import React, { useEffect } from "react";
import * as THREE from "three";
import spaceTextureUrl from "../Images/3D/space.jpg";
import earthTextureUrl from "../Images/3D/01-3.jpg";
import image1Url from "../Images/3D/один.png";
import image2Url from "../Images/3D/два.png";
import image3Url from "../Images/3D/три.png";
import image4Url from "../Images/3D/четыре.png";
import image5Url from "../Images/3D/пять.png";
import image6Url from "../Images/3D/89.png";

interface Models3DProps {
  className?: string;
}

const Models3D: React.FC<Models3DProps> = () => {
  useEffect(() => {
    const scene = new THREE.Scene();

    const spaceTexture = new THREE.TextureLoader().load(spaceTextureUrl);
    scene.background = spaceTexture;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    const canvasContainer = document.createElement('div');
    canvasContainer.classList.add('canvas-container');
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0);
    canvasContainer.appendChild(renderer.domElement);
    const parentElement = document.querySelector('.login-container');
    if (parentElement) {
      parentElement.appendChild(canvasContainer);
    } else {
      console.error('Could not find .login-container element');
    }

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    const earthTexture = new THREE.TextureLoader().load(earthTextureUrl);
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshStandardMaterial({ map: earthTexture })
    );
    earth.position.z = -5;
    scene.add(earth);

    const image1Texture = new THREE.TextureLoader().load(image4Url);
    const image2Texture = new THREE.TextureLoader().load(image2Url);
    const image3Texture = new THREE.TextureLoader().load(image3Url);
    const image4Texture = new THREE.TextureLoader().load(image1Url);
    const image5Texture = new THREE.TextureLoader().load(image5Url);
    const image6Texture = new THREE.TextureLoader().load(image6Url);

    const materials = [
      new THREE.MeshStandardMaterial({ map: image1Texture, emissive: 0xffffff, emissiveIntensity: 0 }),
      new THREE.MeshStandardMaterial({ map: image2Texture, emissive: 0xffffff, emissiveIntensity: 0 }),
      new THREE.MeshStandardMaterial({ map: image3Texture, emissive: 0xffffff, emissiveIntensity: 0 }),
      new THREE.MeshStandardMaterial({ map: image4Texture, emissive: 0xffffff, emissiveIntensity: 0 }),
      new THREE.MeshStandardMaterial({ map: image5Texture, emissive: 0xffffff, emissiveIntensity: 0 }),
      new THREE.MeshStandardMaterial({ map: image6Texture, emissive: 0xffffff, emissiveIntensity: 0 }),
    ];

    const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const cube = new THREE.Mesh(cubeGeometry, materials);
    cube.position.set(2, 0, -5);
    
    scene.add(cube);

    function animate() {
      requestAnimationFrame(animate);

      earth.rotation.y += 0.003;
      earth.rotation.x += 0.002;
      earth.rotation.z += 0.002;
      cube.rotation.y += 0.01;
      cube.position.x = 2 * Math.cos(cube.rotation.y);
      cube.position.z = -5 + 2 * Math.sin(cube.rotation.y);

      renderer.render(scene, camera);
    }

    animate();

    function handleScroll() {
      const t = document.body.getBoundingClientRect().top;
      camera.position.z = t * 0.001;
    }

    document.body.onscroll = handleScroll;

    return () => {
      document.body.onscroll = null;
      if (parentElement) {
        parentElement.removeChild(canvasContainer);
      }
    };
  }, []);

  return null;
};
  

export default Models3D;