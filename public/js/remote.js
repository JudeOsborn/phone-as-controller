const promise = new FULLTILT.getDeviceOrientation({ 'type': 'world' });

let deviceOrientation;

promise.then((controller) => {
  deviceOrientation = controller;
  update();
});

// Convert the phone's gyro data into screen coordinates.
function update() {
  let data = deviceOrientation.getScreenAdjustedEuler();
  console.log(data);
  requestAnimationFrame(update);
}
