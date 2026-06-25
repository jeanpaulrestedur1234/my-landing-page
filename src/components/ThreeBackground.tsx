"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 30;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particles Configuration
    const particleCount = 200;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    // Spawn volume
    const boxSize = 40;

    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * boxSize;
      positions[i * 3 + 1] = (Math.random() - 0.5) * boxSize;
      positions[i * 3 + 2] = (Math.random() - 0.5) * boxSize;

      // Velocity
      velocities.push({
        x: (Math.random() - 0.5) * 0.05,
        y: (Math.random() - 0.5) * 0.05,
        z: (Math.random() - 0.5) * 0.05,
      });
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle Texture (Circle)
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(0, 242, 254, 0.8)");
      gradient.addColorStop(0.5, "rgba(0, 102, 255, 0.3)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    // Particle Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 1.2,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Points
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // Connections (Lines between particles)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0066ff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 6); // Max possible connections
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Holographic Spheres (3D Elements)
    const spheres: THREE.Mesh[] = [];
    const sphereCount = 3;
    const sphereColors = [0x00f2fe, 0x0066ff, 0xffffff];
    const sphereSizes = [5, 3.5, 2];

    for (let i = 0; i < sphereCount; i++) {
      const sphereGeometry = new THREE.SphereGeometry(sphereSizes[i], 16, 16);
      const sphereMaterial = new THREE.MeshBasicMaterial({
        color: sphereColors[i],
        wireframe: true,
        transparent: true,
        opacity: 0.08 - i * 0.02,
        blending: THREE.AdditiveBlending,
      });

      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      
      // Initial floating position
      sphere.position.x = (Math.random() - 0.5) * 20;
      sphere.position.y = (Math.random() - 0.5) * 15;
      sphere.position.z = (Math.random() - 0.5) * 10;
      
      scene.add(sphere);
      spheres.push(sphere);
    }

    // Light Glow Source
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f2fe, 2, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x0066ff, 2, 50);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // Mouse Interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Rotate whole particle system slightly based on mouse
      particleSystem.rotation.y = elapsedTime * 0.02 + mouse.x * 0.15;
      particleSystem.rotation.x = elapsedTime * 0.01 + mouse.y * 0.15;
      lines.rotation.y = particleSystem.rotation.y;
      lines.rotation.x = particleSystem.rotation.x;

      // Update particles
      const positionsAttr = particlesGeometry.attributes.position as THREE.BufferAttribute;
      const positionsArray = positionsAttr.array as Float32Array;

      let lineCount = 0;
      const activeLinePositions: number[] = [];

      for (let i = 0; i < particleCount; i++) {
        // Current positions
        let px = positionsArray[i * 3];
        let py = positionsArray[i * 3 + 1];
        let pz = positionsArray[i * 3 + 2];

        // Apply velocity
        px += velocities[i].x;
        py += velocities[i].y;
        pz += velocities[i].z;

        // Boundaries check (wrap around)
        if (Math.abs(px) > boxSize / 2) velocities[i].x *= -1;
        if (Math.abs(py) > boxSize / 2) velocities[i].y *= -1;
        if (Math.abs(pz) > boxSize / 2) velocities[i].z *= -1;

        // Mouse attraction force for close particles
        const dx = mouse.x * 15 - px;
        const dy = mouse.y * 10 - py;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        if (distToMouse < 12) {
          // Attract gently
          px += dx * 0.005;
          py += dy * 0.005;
        }

        // Save updated position back to array
        positionsArray[i * 3] = px;
        positionsArray[i * 3 + 1] = py;
        positionsArray[i * 3 + 2] = pz;

        // Calculate connections (neural network lines)
        for (let j = i + 1; j < particleCount; j++) {
          const jx = positionsArray[j * 3];
          const jy = positionsArray[j * 3 + 1];
          const jz = positionsArray[j * 3 + 2];

          const distX = px - jx;
          const distY = py - jy;
          const distZ = pz - jz;
          const dist = Math.sqrt(distX * distX + distY * distY + distZ * distZ);

          // Connect if particles are close
          if (dist < 6.5) {
            activeLinePositions.push(px, py, pz);
            activeLinePositions.push(jx, jy, jz);
            lineCount++;
          }
        }
      }

      // Tell Three.js positions changed
      positionsAttr.needsUpdate = true;

      // Update line buffer geometry
      const linePositionsAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const linePositionsArray = linePositionsAttr.array as Float32Array;

      for (let i = 0; i < activeLinePositions.length; i++) {
        linePositionsArray[i] = activeLinePositions[i];
      }

      // Hide unused line vertices by setting them to 0
      for (let i = activeLinePositions.length; i < linePositionsArray.length; i++) {
        linePositionsArray[i] = 0;
      }

      linePositionsAttr.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineCount * 2);

      // Animate holographic spheres (floating & rotating)
      spheres.forEach((sphere, index) => {
        const offset = index * Math.PI * 0.6;
        sphere.position.y += Math.sin(elapsedTime * 0.8 + offset) * 0.015;
        sphere.position.x += Math.cos(elapsedTime * 0.5 + offset) * 0.01;
        
        sphere.rotation.x += 0.002 * (index + 1);
        sphere.rotation.y += 0.003 * (index + 1);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      // Dispose resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      particleTexture.dispose();

      spheres.forEach((sphere) => {
        sphere.geometry.dispose();
        if (Array.isArray(sphere.material)) {
          sphere.material.forEach((mat) => mat.dispose());
        } else {
          sphere.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      style={{ mixBlendingMode: "screen" }}
    />
  );
}
