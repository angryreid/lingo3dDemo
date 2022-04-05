import { Cube, Model, OrbitCamera, World, Skybox, useLoop } from 'lingo3d-react'
import { useState, useRef } from 'react'
import './App.css'

function App() {
  let [position, setPosition] = useState({x: 0, y:0, z:0});
  let [walking, setWalking] = useState(false);
  let foxModelRef = useRef();
  let handleGroundClick = (ev) => {
    ev.point.z = 0;
    setPosition(ev.point);
    setWalking(true);

    let foxModel = foxModelRef.current;
    foxModel.lookAt(ev.point);
  }

  let handleIntersect = () => {
    setWalking(false);
  }

  useLoop(()=> {
    let foxModel = foxModelRef.current;
    foxModel.moveForward(-1);
  }, walking)

  return (
    <World>
      <Skybox texture="skybox.jpg" />
      <Cube width={9999} depth={9999} y={-100} texture="ground.jpeg" textureRepeat={20} onClick={handleGroundClick}/>
      <Model
        ref={foxModelRef}
        src='Fox.fbx'
        animations={{idle: 'Idle.fbx', walking: 'Walking.fbx'}}
        animation={walking ? 'walking' : 'idle'}
        intersectIDs={['orangeBox']}
        onIntersect={handleIntersect}
      />
      <OrbitCamera active z={300}/>
      <Cube id='orangeBox' depth={10} scale={0.5} color='orange' visible={false} x={position.x} y={position.y} z={position.z}/>
    </World>
  )
}

export default App
