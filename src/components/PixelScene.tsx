import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** Low-cost, viewport-aware Three.js pixel field. Instancing keeps draw calls low. */
export function PixelScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 19);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    const cols = 25, rows = 17, total = cols * rows;
    const geometry = new THREE.BoxGeometry(.22, .22, .22);
    const material = new THREE.MeshBasicMaterial({ color: 0x8df0b2, transparent: true, opacity: .88 });
    const pixels = new THREE.InstancedMesh(geometry, material, total);
    pixels.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const dummy = new THREE.Object3D();
    const base = new Float32Array(total);
    for (let i=0;i<total;i++) {
      const x=i%cols, y=Math.floor(i/cols);
      const glow=Math.max(0,1-Math.hypot(x-cols*.66,y-rows*.47)/(Math.max(cols,rows)*.72));
      base[i]=.12+glow*.82;
      dummy.position.set((x-cols/2)*.36,(y-rows/2)*.36,0);
      dummy.scale.setScalar(.45+base[i]*.7); dummy.updateMatrix(); pixels.setMatrixAt(i,dummy.matrix);
      pixels.setColorAt(i,new THREE.Color().setHSL(.38, .48, .12+base[i]*.28));
    }
    scene.add(pixels);
    const pointer = {x:0,y:0};
    const onPointer = (event: PointerEvent) => { const r=host.getBoundingClientRect(); pointer.x=((event.clientX-r.left)/r.width-.5)*.5; pointer.y=((event.clientY-r.top)/r.height-.5)*-.35; };
    host.addEventListener('pointermove',onPointer,{passive:true});
    let width=1,height=1,frame=0,raf=0,visible=true;
    const resize=()=>{width=Math.max(1,host.clientWidth);height=Math.max(1,host.clientHeight);renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();};
    const observer=new ResizeObserver(resize); observer.observe(host); resize();
    const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible&&!reducedMotion){cancelAnimationFrame(raf);raf=requestAnimationFrame(render)}else cancelAnimationFrame(raf);}); intersection.observe(host);
    const render=()=>{if(!visible)return;frame++;for(let i=0;i<total;i++){const x=i%cols,y=Math.floor(i/cols);const wave=(Math.sin(x*.35+frame*.018)+Math.cos(y*.32-frame*.012))*.12;dummy.position.set((x-cols/2)*.36,(y-rows/2)*.36,Math.sin(x*.2+frame*.01)*.06);dummy.scale.setScalar(.38+base[i]*.66+wave);dummy.rotation.z=wave*.2;dummy.updateMatrix();pixels.setMatrixAt(i,dummy.matrix);}pixels.instanceMatrix.needsUpdate=true;pixels.rotation.y+=(pointer.x-pixels.rotation.y)*.025;pixels.rotation.x+=(pointer.y-pixels.rotation.x)*.025;renderer.render(scene,camera);if(!reducedMotion)raf=requestAnimationFrame(render);};
    render();
    return ()=>{cancelAnimationFrame(raf);intersection.disconnect();observer.disconnect();host.removeEventListener('pointermove',onPointer);geometry.dispose();material.dispose();pixels.dispose();renderer.dispose();renderer.domElement.remove();};
  },[]);
  return <div className="pixel-scene" ref={hostRef} aria-hidden="true" />;
}
