let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

initialize();

function initialize() {
    //window.addEventListener("resize", resizeCanvas, false);
    f1 = Math.floor((Math.random() * 50) + 1);
    f2 = Math.floor((Math.random() * 60) + 1);
    l1 = Math.floor((Math.random() * 20) + 1);
    l2 = Math.floor((Math.random() * 50) + 1);
    l3 = Math.floor((Math.random() * 50) + 1);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.strokeStyle = "blue";
    context.lineWidth = "5";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    let n = 0;
    let l = Math.min(canvas.width, canvas.height);
    let u = [[l*l1/100, 0],[l*(10)/100,0], [20*l/100,0]];
    let p = [[canvas.width/2, canvas.height/2], [canvas.width/2 + u[0][0],canvas.height/2], [canvas.width/2 + u[0][0] + u[1][0],canvas.height/2], [canvas.width/2 + u[0][0] + u[1][0] + u[2][0],canvas.height/2]];
    let ang = [n/f1, n/f2, n/(f1*f2)];
    play(n);

    function play(n){
        ang = [n/f1, n/f2, n/(f1*f2)];
        //u[0]=[p[1][0]-p[0][0], p[1][1]-p[0][1]];
        p[1]=next(p[0], u[0], ang[0]);
        //u[1]=[p[2][0]-p[1][0], p[2][1]-p[1][1]];
        p[2]=next(p[1], u[1], ang[1]);
        p[3]=next(p[2], u[2], ang[2]);
        context.fillRect(p[2][0], p[2][1], 1, 1);
        setTimeout(() => play(n + 1), 0)
    }
    
}



function next(p, u, ang) {
    return [p[0]+u[0]*Math.cos(ang),p[1]+u[0]*Math.sin(ang)]
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    redraw(0);
}

function redraw(n) {
    context.strokeStyle = "blue";
    context.lineWidth = "5";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
}


function drawPoint (ref, point) {
    context.fillRect(ref[0] + point[0], ref[1] - point[1],1,1);
}

function drawArr (ref, arr) {
    arr.forEach(point => drawPoint(ref, point))
}

// (2/3.14)* arctan(-x-i)
function transition (a, b, n) {
    let c = [];
    a.forEach((value, i) => {
        d = 50 * n;
        //let d = 50 * n * Math.sqrt(((10+ a.length/10 +i)/a.length));
        //let d = -(1/3.14) * Math.atan( -(i+n)/1000)
        //let d = -(2/3.14) + (2/3.14)*Math.atan(-10 + 1000*n + i/1000)
        if (d > 1) d = 1;
        c.push(add(a[i], scalar (d, substract(b[i],a[i]))));
    });
    return c;  
}

function add(a,b){
    return [a[0]+b[0], a[1]+b[1]];
}

function substract(a,b){
    return add(a, opp(b));
}

function opp(a){
    return [-a[0], -a[1]];
}

function abs(a){
    return Math.sqrt(a[0]*a[0]+a[1]*a[1]);
}

function scalar(b, a){
    return [a[0]*b, a[1]*b];
}

function direction(a, b){
    let c = [];
    c = subtract(b,a);
    c = scalar(c, (1/abs(c)));

    return c;
}





