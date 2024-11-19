//make the grid
const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');
canvas.width = 600; // Width of canvas
canvas.height = 600; // Height of canvas
ctx.fillStyle = "#ddd"

function drawGraph() {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Draw grid lines
  ctx.beginPath();
  ctx.strokeStyle = "#000";

  // Scale grid to match 100x100 system
  const step = canvas.width / 50; // Divide into 100 divisions
  for (let i = 0; i <= canvas.width; i += step) {
    // Vertical lines
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);

    // Horizontal lines
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
  }
  ctx.stroke();
  ctx.closePath();

  // Draw axis labels
  ctx.font = "14px Arial";
  ctx.fillStyle = "#000";
  for (let i = 0; i <= 100; i += 10) {
    const scaled = i * (canvas.width / 100);
    // X-axis labels
    ctx.fillText(i, scaled, canvas.height - 5);
    // Y-axis labels
    ctx.fillText(100 - i, 5, scaled + 5);
  }
}
drawGraph();

//plotting the stuff
function plotPoints() {
  const xInput = document.getElementById('x-values').value;
  const yInput = document.getElementById('y-values').value;

  const xValues = xInput.split(',').map(Number);
  const yValues = yInput.split(',').map(Number);

  if (xValues.length !== yValues.length) {
    alert("X and Y values must have the same number of elements!");
    return;
  }

  // Save points for further calculations
  const points = xValues.map((x, index) => [x, yValues[index]]);
  window.points = points;

  // Plot points on canvas
  points.forEach(([x, y]) => {
    const scaledX = (x / 100) * canvas.width; // Scale x to canvas size
    const scaledY = canvas.height - (y / 100) * canvas.height; // Scale y to canvas and flip

    ctx.beginPath();
    ctx.arc(scaledX, scaledY, 5, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  });
}

//drawing line of best fit
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
  const startX = 0;
  const endX = 100;

  const startY = b;
  const endY = m * endX + b;

  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.moveTo((startX / 100) * canvas.width, canvas.height - (startY / 100) * canvas.height); // Scaled start point
  ctx.lineTo((endX / 100) * canvas.width, canvas.height - (endY / 100) * canvas.height); // Scaled end point
  ctx.stroke();
  ctx.closePath();
}


