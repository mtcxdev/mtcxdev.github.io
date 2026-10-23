import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** A transparent voxel sculpture with layered wave fields, orbiting particles, and a rotating wireframe core. */
export function PixelScene() {
  const hostRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const host=hostRef.current;if(!host)return;
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(38,1,.1,100);camera.position.set(0,0,18);
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;host.appendChild(renderer.domElement);
    const accent=new THREE.Color(0x8df0b2);
    const cols=35,rows=25,total=cols*rows;
    const geometry=new THREE.BoxGeometry(.17,.17,.17);
    const material=new THREE.MeshBasicMaterial({color:accent,transparent:true,opacity:.8});
    const voxels=new THREE.InstancedMesh(geometry,material,total);voxels.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const dummy=new THREE.Object3D();const colors=new Float32Array(total);
    for(let i=0;i<total;i++){
      const x=i%cols,y=Math.floor(i/cols),nx=(x-cols/2)/(cols/2),ny=(y-rows/2)/(rows/2);
      const radius=Math.hypot(nx,ny),spiral=Math.sin(Math.atan2(ny,nx)*4+radius*10);
      colors[i]=Math.max(0,1-radius)*.65+(spiral+1)*.16;
      dummy.position.set(nx*5.8,ny*4.1,Math.sin(radius*10)*.2);
      dummy.scale.setScalar(.16+colors[i]*.65);dummy.rotation.z=spiral*.12;dummy.updateMatrix();voxels.setMatrixAt(i,dummy.matrix);
      voxels.setColorAt(i,new THREE.Color().setHSL(.38,.48,.12+colors[i]*.35));
    }
    scene.add(voxels);
    const coreGeometry=new THREE.TorusKnotGeometry(1.35,.22,112,7,2,5);
    const coreMaterial=new THREE.MeshBasicMaterial({color:accent,wireframe:true,transparent:true,opacity:.68});
    const core=new THREE.Mesh(coreGeometry,coreMaterial);core.position.set(.25,.1,.9);scene.add(core);
    const innerGeometry=new THREE.IcosahedronGeometry(.8,1);
    const innerMaterial=new THREE.MeshBasicMaterial({color:0xc5ffda,wireframe:true,transparent:true,opacity:.35});
    const inner=new THREE.Mesh(innerGeometry,innerMaterial);inner.position.copy(core.position);scene.add(inner);
    const rings:THREE.Mesh[]=[];
    for(let i=0;i<3;i++){const ring=new THREE.Mesh(new THREE.TorusGeometry(2.4+i*.45,.012,4,128),new THREE.MeshBasicMaterial({color:accent,transparent:true,opacity:.25-i*.045}));ring.rotation.set(.8+i*.65,.3+i*.5,.4+i*.3);ring.position.z=-.2-i*.25;scene.add(ring);rings.push(ring)}
    const count=140,positions=new Float32Array(count*3),phases=new Float32Array(count);
    for(let i=0;i<count;i++){const a=Math.random()*Math.PI*2,r=2.1+Math.random()*4.2;positions[i*3]=Math.cos(a)*r;positions[i*3+1]=Math.sin(a)*r*.68;positions[i*3+2]=(Math.random()-.5)*3;phases[i]=Math.random()*Math.PI*2}
    const particleGeometry=new THREE.BufferGeometry();particleGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
    const particleMaterial=new THREE.PointsMaterial({color:0x9df4bd,size:.045,transparent:true,opacity:.6,sizeAttenuation:true});
    const particles=new THREE.Points(particleGeometry,particleMaterial);scene.add(particles);
    const pointer={x:0,y:0};
    const onPointer=(event:PointerEvent)=>{const r=host.getBoundingClientRect();pointer.x=((event.clientX-r.left)/r.width-.5)*.65;pointer.y=((event.clientY-r.top)/r.height-.5)*-.45};
    host.addEventListener('pointermove',onPointer,{passive:true});
    let frame=0,raf=0,visible=true;
    const resize=()=>{const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()};
    const observer=new ResizeObserver(resize);observer.observe(host);resize();
    const visibility=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible&&!reduce){cancelAnimationFrame(raf);raf=requestAnimationFrame(render)}else cancelAnimationFrame(raf)});visibility.observe(host);
    const render=()=>{
      if(!visible)return;frame++;
      for(let i=0;i<total;i++){const x=i%cols,y=Math.floor(i/cols),nx=(x-cols/2)/(cols/2),ny=(y-rows/2)/(rows/2),radius=Math.hypot(nx,ny),angle=Math.atan2(ny,nx);const wave=Math.sin(radius*9-frame*.035+angle*3)*.45+Math.cos(nx*7+frame*.022)*.18;dummy.position.set(nx*5.8,ny*4.1,wave+Math.sin(angle*5+frame*.012)*.18);const pulse=.72+Math.sin(frame*.035+colors[i]*9)*.2;dummy.scale.setScalar(Math.max(.12,.13+colors[i]*.58+pulse*.06));dummy.rotation.set(wave*.18,Math.sin(frame*.009+radius*5)*.15,Math.sin(angle*4+frame*.018)*.2);dummy.updateMatrix();voxels.setMatrixAt(i,dummy.matrix)}
      voxels.instanceMatrix.needsUpdate=true;voxels.rotation.y+=(pointer.x-voxels.rotation.y)*.018;voxels.rotation.x+=(pointer.y-voxels.rotation.x)*.018;
      core.rotation.x+=.004;core.rotation.y+=.007;inner.rotation.x-=.006;inner.rotation.y+=.004;
      rings.forEach((ring,i)=>{ring.rotation.x+=.0015*(i+1);ring.rotation.y-=.001*(i+1)});
      const p=particleGeometry.attributes.position as THREE.BufferAttribute;for(let i=0;i<count;i++){const a=frame*.003+phases[i];p.array[i*3]+=Math.cos(a)*.002;p.array[i*3+1]+=Math.sin(a)*.0015;if(p.array[i*3]>6.8)p.array[i*3]=-6.8;if(p.array[i*3]<-6.8)p.array[i*3]=6.8}p.needsUpdate=true;
      renderer.render(scene,camera);if(!reduce)raf=requestAnimationFrame(render);
    };
    render();
    return()=>{cancelAnimationFrame(raf);visibility.disconnect();observer.disconnect();host.removeEventListener('pointermove',onPointer);geometry.dispose();material.dispose();voxels.dispose();coreGeometry.dispose();coreMaterial.dispose();innerGeometry.dispose();innerMaterial.dispose();rings.forEach(r=>{r.geometry.dispose();(r.material as THREE.Material).dispose()});particleGeometry.dispose();particleMaterial.dispose();renderer.dispose();renderer.domElement.remove()};
  },[]);
  return <div className="pixel-scene" ref={hostRef} aria-hidden="true"/>;
}
