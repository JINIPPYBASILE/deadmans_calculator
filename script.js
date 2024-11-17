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

function plotPoints() {
  const input = document.getElementById('points').value;
  const points = input.split(' ').map(pair => pair.split(',').map(Number));

  // Draw points
  points.forEach(([x, y]) => {
    const scaledX = x * 50; // Scale for canvas
    const scaledY = canvas.height - y * 50; // Flip Y-axis
    ctx.beginPath();
    ctx.arc(scaledX, scaledY, 5, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  });

  // Save points for later calculations
  window.points = points; // Store globally for line of best fit
}

function calculateLineOfBestFit() {
  const points = window.points;
  if (!points || points.length === 0) return;

  // Calculate mean of x and y
  const xMean = points.reduce((sum, [x]) => sum + x, 0) / points.length;
  const yMean = points.reduce((sum, [, y]) => sum + y, 0) / points.length;

  // Calculate slope (m) and intercept (b)
  let numerator = 0, denominator = 0;
  points.forEach(([x, y]) => {
    numerator += (x - xMean) * (y - yMean);
    denominator += (x - xMean) ** 2;
  });
  const m = numerator / denominator;
  const b = yMean - m * xMean;

  // Draw line of best fit
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.moveTo(0, canvas.height - b * 50); // Line start
  ctx.lineTo(canvas.width, canvas.height - (m * (canvas.width / 50) + b) * 50); // Line end
  ctx.stroke();
  ctx.closePath();
}
