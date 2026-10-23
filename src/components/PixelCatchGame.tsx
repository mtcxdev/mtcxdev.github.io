import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function PixelCatchGame() {
  const hostRef=useRef<HTMLDivElement>(null);
  const [playing,setPlaying]=useState(false);
  const [score,setScore]=useState(0);
  const scoreRef=useRef(0);
  const [round,setRound]=useState(0);
  useEffect(()=>{
    const host=hostRef.current;if(!host||!playing)return;
    const scene=new THREE.Scene();scene.background=new THREE.Color(0x0b120d);
    const camera=new THREE.PerspectiveCamera(42,1,.1,100);camera.position.set(0,0,8);
    const renderer=new THREE.WebGLRenderer({antialias:false,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));renderer.setSize(host.clientWidth,host.clientHeight);host.appendChild(renderer.domElement);
    const ambient=new THREE.AmbientLight(0xffffff,.8);scene.add(ambient);
    const geometry=new THREE.BoxGeometry(.6,.6,.6);const material=new THREE.MeshBasicMaterial({color:0x8df0b2});const target=new THREE.Mesh(geometry,material);scene.add(target);
    const edges=new THREE.LineSegments(new THREE.EdgesGeometry(geometry),new THREE.LineBasicMaterial({color:0xd2ffe0}));target.add(edges);
    const grid=new THREE.GridHelper(14,28,0x24442f,0x183021);grid.position.y=-2.2;scene.add(grid);
    const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let raf=0,visible=true,tick=0;
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const moveTarget=()=>{target.position.set((Math.random()-.5)*5,(Math.random()-.5)*2.6,0);target.rotation.set(Math.random()*2,Math.random()*2,Math.random()*2);};moveTarget();
    const onClick=(e:PointerEvent)=>{const r=renderer.domElement.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width)*2-1;pointer.y=-((e.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(pointer,camera);if(raycaster.intersectObject(target).length){scoreRef.current+=1;setScore(scoreRef.current);moveTarget();}};
    renderer.domElement.addEventListener('pointerdown',onClick);
    const resize=new ResizeObserver(()=>{const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();});resize.observe(host);
    const visibility=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible&&!reduce){cancelAnimationFrame(raf);raf=requestAnimationFrame(draw)}else cancelAnimationFrame(raf)});visibility.observe(host);
    const draw=()=>{if(!visible)return;tick+=.015;if(!reduce){target.rotation.x+=.008;target.rotation.y+=.012;target.position.y+=Math.sin(tick)*.0015;}renderer.render(scene,camera);if(!reduce)raf=requestAnimationFrame(draw);};draw();
    return()=>{cancelAnimationFrame(raf);visibility.disconnect();resize.disconnect();renderer.domElement.removeEventListener('pointerdown',onClick);geometry.dispose();material.dispose();edges.geometry.dispose();(edges.material as THREE.Material).dispose();grid.geometry.dispose();(grid.material as THREE.Material).dispose();renderer.dispose();renderer.domElement.remove();};
  },[playing,round]);
  const reset=()=>{scoreRef.current=0;setScore(0);setRound(v=>v+1);};
  return <><div className={`game-board three-game-board ${playing?'is-playing':''}`} ref={hostRef}>{!playing&&<div className="game-start"><button className="button button-primary" onClick={()=>{reset();setPlaying(true)}}>Start game <span aria-hidden="true">↗</span></button></div>}</div><div className="game-footer"><span>{playing?'TAP THE CUBE TO SCORE':'NO DOWNLOAD · JUST PLAY'}</span><span>SCORE <b>{score.toString().padStart(2,'0')}</b></span><button onClick={()=>{setPlaying(false);reset()}}>Reset</button></div></>;
}
