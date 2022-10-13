const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let playAnim = false;

let ball = { x: 30, y: 30, speed: 0.01, t: 0, radius: 20 };

let points = [
    { x: ball.x, y: ball.y },
    { x: 70, y: 200 },
    { x: 125, y: 295 },
    { x: 350, y: 350 }
];


function moveBallInBezierCurve () {
    let [p0, p1, p2, p3] = points;

    let cx = 3 * (p1.x - p0.x);
    let bx = 3 * (p2.x - p1.x) - cx;
    let ax = p3.x - p0.x - cx - bx;

    let cy = 3 * (p1.y - p0.y);
    let by = 3 * (p2.y - p1.y) - cy;
    let ay = p3.y - p0.y - cy - by;

    let t = ball.t;

    ball.t += ball.speed;

    let xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x;
    let yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y;

    if (ball.t > 1) {
        ball.t = 1;
    }

    ball.x = xt;
    ball.y = yt;
    drawBall();
}

function drawBall () {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    ctx.fill();
}

function animate () {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!playAnim) {
        drawBall();
    } else {
        moveBallInBezierCurve();
    }
}


animate();

canvas.addEventListener("click", () => {
    playAnim = true;
});