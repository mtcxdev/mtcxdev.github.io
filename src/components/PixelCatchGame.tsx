import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type MovingObject = { mesh: THREE.Group; speed: number; phase: number; kind: 'energy' | 'fragment' };

export function PixelCatchGame() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [playing,setPlaying] = useState(false);
  const [score,setScore] = useState(0);
  const [round,setRound] = useState(0);
  const playingRef = useRef(false);
  const scoreRef = useRef(0);
  const pointer = useRef({x:0,y:0});
  useEffect(()=>{playingRef.current=playing},[playing]);
  useEffect(()=>{
    const host=hostRef.current;if(!host)return;
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(40,1,.1,100);camera.position.set(0,0,12);
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
    renderer.setClearColor(0x000000,0);
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    const accent=new THREE.Color(0x8df0b2);
    const player=new THREE.Group();scene.add(player);
    const voxelGeometry=new THREE.BoxGeometry(.22,.22,.22);
    const voxelMaterial=new THREE.MeshBasicMaterial({color:accent,transparent:true,opacity:.92});
    const positions:[[number,number,number],[number,number,number],[number,number,number],[number,number,number],[number,number,number]]=[
      [0,0,0],[.22,0,0],[-.22,0,0],[0,.22,0],[0,-.22,0]
    ];
    positions.forEach(([x,y,z],i)=>{const voxel=new THREE.Mesh(voxelGeometry,voxelMaterial);voxel.position.set(x,y,z);voxel.scale.setScalar(i===0?1.25:.85);player.add(voxel)});
    const playerGlow=new THREE.PointLight(0x6ff5ad,1.6,3);player.add(playerGlow);
    const energyGeometry=new THREE.OctahedronGeometry(.19,0);
    const energyMaterial=new THREE.MeshBasicMaterial({color:0xd0ffe1,wireframe:false});
    const fragmentGeometry=new THREE.IcosahedronGeometry(.25,0);
    const fragmentMaterial=new THREE.MeshBasicMaterial({color:0x639b7a,wireframe:true,transparent:true,opacity:.7});
    const objects:MovingObject[]=[];
    for(let i=0;i<15;i++){
      const kind=i%3===0?'fragment':'energy';
      const mesh=new THREE.Group();
      const core=new THREE.Mesh(kind==='energy'?energyGeometry:fragmentGeometry,kind==='energy'?energyMaterial:fragmentMaterial);
      mesh.add(core);
      if(kind==='energy'){const halo=new THREE.Mesh(new THREE.OctahedronGeometry(.31,0),new THREE.MeshBasicMaterial({color:accent,wireframe:true,transparent:true,opacity:.28}));mesh.add(halo)}
      mesh.position.set((Math.random()-.5)*10,(Math.random()-.5)*5.4,-Math.random()*5);
      scene.add(mesh);objects.push({mesh,speed:.012+Math.random()*.016,phase:Math.random()*Math.PI*2,kind});
    }
    const starCount=180;
    const starPositions=new Float32Array(starCount*3);
    for(let i=0;i<starCount;i++){starPositions[i*3]=(Math.random()-.5)*13;starPositions[i*3+1]=(Math.random()-.5)*7;starPositions[i*3+2]=-Math.random()*8}
    const starGeometry=new THREE.BufferGeometry();starGeometry.setAttribute('position',new THREE.BufferAttribute(starPositions,3));
    const stars=new THREE.Points(starGeometry,new THREE.PointsMaterial({color:0x91b8a0,size:.025,transparent:true,opacity:.5}));scene.add(stars);
    const sparks:THREE.Mesh[]=[];
    const sparkGeometry=new THREE.BoxGeometry(.045,.045,.045);
    const sparkMaterial=new THREE.MeshBasicMaterial({color:accent,transparent:true,opacity:.7});
    for(let i=0;i<30;i++){const spark=new THREE.Mesh(sparkGeometry,sparkMaterial);spark.position.set((Math.random()-.5)*10,(Math.random()-.5)*6,-Math.random()*4);spark.userData={drift:Math.random()*.018+.006,phase:Math.random()*6};scene.add(spark);sparks.push(spark)}
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf=0,tick=0,visible=true,width=1,height=1,lastScoreAt=0;
    const onPointerMove=(event:PointerEvent)=>{const r=host.getBoundingClientRect();pointer.current.x=((event.clientX-r.left)/r.width-.5)*9;pointer.current.y=((event.clientY-r.top)/r.height-.5)*4.5};
    const onPointerDown=()=>{if(!playingRef.current){scoreRef.current=0;setScore(0);setPlaying(true)}};
    const onKey=(event:KeyboardEvent)=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(event.key))event.preventDefault();const step=.35;if(event.key==='ArrowLeft'||event.key.toLowerCase()==='a')pointer.current.x-=step;if(event.key==='ArrowRight'||event.key.toLowerCase()==='d')pointer.current.x+=step;if(event.key==='ArrowUp'||event.key.toLowerCase()==='w')pointer.current.y+=step;if(event.key==='ArrowDown'||event.key.toLowerCase()==='s')pointer.current.y-=step};
    host.addEventListener('pointermove',onPointerMove,{passive:true});
    renderer.domElement.addEventListener('pointerdown',onPointerDown);
    window.addEventListener('keydown',onKey);
    const resize=new ResizeObserver(()=>{width=Math.max(1,host.clientWidth);height=Math.max(1,host.clientHeight);renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix()});resize.observe(host);resize.observe(document.documentElement);
    const visibility=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible){cancelAnimationFrame(raf);raf=requestAnimationFrame(draw)}else cancelAnimationFrame(raf)});visibility.observe(host);
    const draw=()=>{
      if(!visible)return;tick+=.016;
      const demoX=Math.sin(tick*.58)*3.3,demoY=Math.cos(tick*.43)*1.4;
      const targetX=playingRef.current?pointer.current.x:demoX;
      const targetY=playingRef.current?pointer.current.y:demoY;
      player.position.x+=(THREE.MathUtils.clamp(targetX,-4.7,4.7)-player.position.x)*.055;
      player.position.y+=(THREE.MathUtils.clamp(targetY,-2.5,2.5)-player.position.y)*.055;
      player.rotation.z+=(Math.sin(tick*.8)*.09-player.rotation.z)*.04;
      player.rotation.x=Math.sin(tick*.6)*.08;
      objects.forEach((object,i)=>{
        const {mesh,kind}=object;
        mesh.rotation.x+=kind==='energy'?.012:.004;mesh.rotation.y+=kind==='energy'?.018:-.009;
        mesh.position.y+=Math.sin(tick*.8+object.phase)*.002;
        if(playingRef.current){mesh.position.z+=object.speed*2.1;if(mesh.position.z>2){mesh.position.z=-8;mesh.position.x=(Math.random()-.5)*10;mesh.position.y=(Math.random()-.5)*5.4}
          if(kind==='energy'&&tick-lastScoreAt>.15&&mesh.position.distanceTo(player.position)<.55){lastScoreAt=tick;mesh.position.z=-8;mesh.position.x=(Math.random()-.5)*9;mesh.position.y=(Math.random()-.5)*4.5;scoreRef.current+=1;setScore(scoreRef.current)}
          if(kind==='fragment'&&mesh.position.distanceTo(player.position)<.42){mesh.position.z=-8;mesh.position.x=(Math.random()-.5)*9;mesh.position.y=(Math.random()-.5)*4.5;scoreRef.current=Math.max(0,scoreRef.current-1);setScore(scoreRef.current)}
        }else{mesh.position.z+=Math.sin(tick*.3+object.phase)*.001;mesh.position.x+=Math.sin(tick*.25+object.phase)*.002}
      });
      sparks.forEach(spark=>{spark.position.y-=spark.userData.drift;if(spark.position.y< -3.5)spark.position.y=3.5;spark.rotation.x+=.006;spark.rotation.y+=.009});
      stars.rotation.z=Math.sin(tick*.08)*.015;
      renderer.render(scene,camera);
      if(!reduce)raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);visibility.disconnect();resize.disconnect();host.removeEventListener('pointermove',onPointerMove);renderer.domElement.removeEventListener('pointerdown',onPointerDown);window.removeEventListener('keydown',onKey);voxelGeometry.dispose();voxelMaterial.dispose();energyGeometry.dispose();energyMaterial.dispose();fragmentGeometry.dispose();fragmentMaterial.dispose();starGeometry.dispose();(stars.material as THREE.Material).dispose();sparkGeometry.dispose();sparkMaterial.dispose();objects.forEach(o=>{scene.remove(o.mesh);o.mesh.children.forEach(child=>{if(child instanceof THREE.Mesh&&child.material!==energyMaterial&&child.material!==fragmentMaterial)(child.material as THREE.Material).dispose()})});renderer.dispose();renderer.domElement.remove();};
  },[round]);
  const start=()=>{scoreRef.current=0;setScore(0);setPlaying(true)};
  const reset=()=>{setPlaying(false);scoreRef.current=0;setScore(0);setRound(v=>v+1);pointer.current={x:0,y:0}};
  return <><div className={`game-board three-game-board ${playing?'is-playing':'is-demo'}`} ref={hostRef} role="application" aria-label="Orbit Runner game. Move the pointer or use arrow keys or WASD to collect glowing energy and avoid fragments."><div className="game-overlay"><span>{playing?'Collect energy. Avoid fragments.':' '}</span>{!playing&&<button className="game-play-button" type="button" onClick={start}>Play <span aria-hidden="true">↗</span></button>}</div></div><div className="game-footer"><span>{playing?'MOVE · ARROWS / WASD':'Move the pointer to preview'}</span><span>SCORE <b>{score.toString().padStart(2,'0')}</b></span><button type="button" onClick={playing?reset:start}>{playing?'Reset':'Start'}</button></div></>;
}
