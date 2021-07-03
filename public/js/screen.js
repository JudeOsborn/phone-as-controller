const socket = io('/screen');

socket.on('position', (position) => {
  console.log(position);
});
