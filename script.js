const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

function drawGraph() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw grid lines
  ctx.beginPath();
  ctx.strokeStyle = "#ccc";
  for (let i = 0; i <= canvas.width; i += 50) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
  }
  for (let i = 0; i <= canvas.height; i += 50) {
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
  }
  ctx.stroke();
  ctx.closePath();
}
drawGraph();
