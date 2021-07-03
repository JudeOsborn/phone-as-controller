const socket = io('/remote');
const maxAngles = {x: 20, y: 24};

let alpha = 0;
let alphaOffset = 0;

const promise = new FULLTILT.getDeviceOrientation({ 'type': 'world' });
promise.then((controller) => {
  deviceOrientation = controller;
  update();
});

function handleTouchStart(event) {
  event.preventDefault();
  alphaOffset = alpha;
}

// Convert the phone's gyro data into screen coordinates.
function update() {
  let data = deviceOrientation.getScreenAdjustedEuler();
  alpha = data.alpha;

  // Convert alpha values from (0 to 360) to (-180 to 180).
  let x = ((alpha - alphaOffset + 180) % 360) - 180;

  // Stop at max angles.
  x = Math.max(-maxAngles.x, Math.min(x, maxAngles.x));
  let y = Math.max(-maxAngles.y, Math.min(data.beta, maxAngles.y));

  // Convert from (-180 to 180) to (-1 to 1) and reverse direction.
  x = x / maxAngles.x * -1;
  y = y / maxAngles.y * -1;

  socket.emit('position', {x: x, y: y});

  requestAnimationFrame(update);
}
