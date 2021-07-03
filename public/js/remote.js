const promise = new FULLTILT.getDeviceOrientation({ 'type': 'world' });
promise.then((controller) => {
  deviceOrientation = controller;
  update();
});

// Convert the phone's gyro data into screen coordinates.
function update() {
  console.log(deviceOrientation.getScreenAdjustedEuler());
  requestAnimationFrame(update);
}
