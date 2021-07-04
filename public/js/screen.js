const socket = io('/screen');
const cursor = {element: null, position: {x: 0, y: 0}};

socket.on('position', (position) => {

  // Scale the position to half the height and width of the browser viewport.
  cursor.position.x = position.x * document.body.offsetWidth * 0.5;
  cursor.position.y = position.y * document.body.offsetHeight * 0.5;
});

document.addEventListener('DOMContentLoaded', (event) => {
  cursor.element = document.getElementById('cursor');
  window.requestAnimationFrame(update);  
});

function update() {
  cursor.element.style.transform = 
    `translate3d(${cursor.position.x}px,${cursor.position.y}px,0)`;
  window.requestAnimationFrame(update);
}
