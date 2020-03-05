<script>
  import { onMount } from "svelte";
  import Arrow from "./components/Arrow.svelte";
  import { render3D, moveCamera, DIRECTION } from "./3d";
  import { getFPS, dragElem } from "./utils/tools";

  let fps = 0;

  const onFpsChange = value => {
    fps = value;
  };

  onMount(() => {
    render3D();
    getFPS(onFpsChange);

    handleDrag();
  });

  let req = 0;
  const onMove = (() => {
    let dx = 0;
    let dy = 0;
    let sx = 0;
    let sy = 0;
    let stepX = 0;
    let stepY = 0;

    const animate = () => {
      if (dx > 0) {
        moveCamera(DIRECTION.RIGHT, stepX);
      }
      if (dx < 0) {
        moveCamera(DIRECTION.LEFT, stepX);
      }

      if (dy < 0) {
        moveCamera(DIRECTION.UP, stepY);
      }
      if (dy > 0) {
        moveCamera(DIRECTION.DOWN, stepY);
      }

      if (dx !== 0 || dy !== 0) {
        req = requestAnimationFrame(animate);
      }
    };

    return (ndx, ndy, nsx, nsy) => {
      if (dx !== ndx || dy !== ndy || sx !== nsx || sy !== nsy) {
        // 动画数据有更新，去除原有的动画循环
        req && cancelAnimationFrame(req);
      } else {
        return;
      }

      dx = ndx;
      dy = ndy;
      sx = nsx;
      sy = nsy;

      stepX = 0.06 * sx;
      stepY = 0.06 * sy;

      // 启动新的动画
      animate();
    };
  })();

  const onStop = () => {
    req && cancelAnimationFrame(req);
  };

  const handleDrag = () => {
    const moveElem = document.querySelector("#bar");

    dragElem(moveElem, 90, onMove, onStop);
  };

  export let name;
</script>

<style>
  .direction-control {
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 176px;
    height: 176px;
    background: rgba(225, 225, 225, 0.4);
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(215, 215, 215, 0.8);
    user-select: none;
  }
  .direction * {
    user-select: none;
  }
  .item {
    position: absolute;
    display: inline-block;
  }
  .up {
    top: 0;
    left: 50%;
    transform: translate(-50%, -10%);
  }
  .right {
    right: 0;
    top: 50%;
    transform: translate(10%, -50%);
  }
  .down {
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 10%);
  }
  .left {
    left: 0;
    top: 50%;
    transform: translate(-10%, -50%);
  }
  .center {
    width: 50px;
    height: 50px;
    background: #f5f5f5;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
  .bar {
    width: 100%;
    height: 100%;
    background: #ccc;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 15px rgba(215, 215, 215, 0.7);
  }
</style>

<canvas
  id="canvas"
  width="100%"
  height="100%"
  style="width: 100%; height: 100%;" />

<div style="position: fixed; top: 10px; left: 10px;">
  <h3>THREEJS DEMO: {name}</h3>
  <h2>FPS: {fps}</h2>
</div>

<div class="direction-control">
  <span class="item up">
    <Arrow direction="up" />
  </span>
  <span class="item right">
    <Arrow direction="right" />
  </span>
  <span class="item down">
    <Arrow direction="down" />
  </span>
  <span class="item left">
    <Arrow direction="left" />
  </span>
  <div class="item center">
    <span id="bar" class="item bar" />
  </div>
</div>
