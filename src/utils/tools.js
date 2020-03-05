export const getFPS = onChange => {
  const rAF = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  let frame = 0;
  let allFrameCount = 0;
  let lastTime = Date.now();
  let lastFameTime = Date.now();

  const loop = function() {
    let now = Date.now();
    let fs = now - lastFameTime;
    let fps = Math.round(1000 / fs);

    lastFameTime = now;
    // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
    allFrameCount++;
    frame++;

    if (now > 1000 + lastTime) {
      let fps = Math.round((frame * 1000) / (now - lastTime));
      onChange && onChange(fps);
      // console.log(`${new Date()} 1S内 FPS：`, fps);
      frame = 0;
      lastTime = now;
    }

    rAF(loop);
  };

  loop();
};

export const resizeRendererToDisplaySize = renderer => {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
};

export const dragElem = (moveElem, max, onMove, onStop) => {
  let dragging; //是否激活拖拽状态
  let tLeft, tTop; //鼠标按下时相对于选中元素的位移
  let startX, startY;

  // 计算速度，最小为0，最大为1
  const calcSpeed = (current, max) => {
    return (current / max) * 10;
  };

  //监听鼠标按下事件
  document.addEventListener("mousedown", function(e) {
    if (e.target === moveElem) {
      dragging = true; //激活拖拽状态
      const moveElemRect = moveElem.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      tLeft = e.clientX - moveElemRect.left;
      tTop = e.clientY - moveElemRect.top;
      // console.log(moveElemRect.left, moveElemRect.top);
      // console.log(startX, startY);
    }
  });

  //监听鼠标放开事件
  document.addEventListener("mouseup", function(e) {
    dragging = false;
    moveElem.style.transform = `translate(0, 0)`;
    onStop();
  });

  //监听鼠标移动事件
  document.addEventListener("mousemove", function(e) {
    if (dragging) {
      let moveX = e.clientX - startX;
      let moveY = e.clientY - startY;

      let maxX = max;
      let maxY = max;

      let dx = moveX === 0 ? 0 : moveX > 0 ? 1 : -1;
      let dy = moveY === 0 ? 0 : moveY > 0 ? 1 : -1;

      if (moveX !== 0) {
        const tan = Math.abs(moveY / moveX);
        const maxX = Math.sqrt((max * max) / (1 + tan * tan));
        const maxY = tan * maxX;
        moveX = Math.min(maxX, Math.abs(moveX)) * dx;
        moveY = Math.min(maxY, Math.abs(moveY)) * dy;
      } else {
        moveY = Math.min(max, Math.abs(moveY)) * dy;
      }

      moveElem.style.transform = `translate(${moveX}px, ${moveY}px)`;

      const speedX = calcSpeed(moveX, maxX);
      const speedY = calcSpeed(moveY, maxY);
      onMove(dx, dy, speedX, speedY);
    }
  });
};
