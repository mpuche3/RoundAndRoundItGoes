



let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

initialize();



function initialize() {

    //window.addEventListener("resize", resizeCanvas, false);
    i = Math.floor((Math.random() * 1) + 2.5);
    f1 = Math.floor((Math.random() * 30) + 1);
    f2 = Math.floor((Math.random() * 30) + 1);
    f3 = Math.floor((Math.random() * 30) + 1);
    l1 = Math.floor((Math.random() * 30) + 40);
    l2 = Math.floor((Math.random() * 10) + 20);
    //l3 = Math.floor((Math.random() * 05) + 10);
    l3 = 10
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle="#000000";
    context.fillRect(0,0,window.innerWidth, window.innerHeight);
    context.strokeStyle = "blue";
    context.lineWidth = "1";
    //context.clearRect(0, 0, canvas.width, canvas.height);
    //context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    let n = 0;
    let l = Math.min(canvas.width, canvas.height);
    let u = [
                [l*l1/200,0],
                [l*l2/200,0], 
                [l*l3/200,0]
            ];
    let p = [
                [canvas.width/2, canvas.height/2], 
                [canvas.width/2 + u[0][0],canvas.height/2], 
                [canvas.width/2 + u[0][0] + u[1][0],canvas.height/2], 
                [canvas.width/2 + u[0][0] + u[1][0] + u[2][0],canvas.height/2]
            ];
    let ang = [n/f1, -n/f2, n/f3];
    
        p[1]=next(p[0], u[0], ang[0]);
        p[2]=next(p[1], u[1], ang[1]);
        p[3]=next(p[2], u[2], ang[2]);    
    
    
    
    play(n);
    function play(n){
        context.lineJoin="round";
        context.moveTo(p[i][0], p[i][1]);
        ang = [-n/(f1+f2), n/f1, -n/f2];
        //u[0]=[p[1][0]-p[0][0], p[1][1]-p[0][1]];
        p[1]=next(p[0], u[0], ang[0]);
        //u[1]=[p[2][0]-p[1][0], p[2][1]-p[1][1]];        
        p[2]=next(p[1], u[1], ang[1]);
        //u[2]=[p[2][0]-p[1][0], p[2][1]-p[1][1]];   
        p[3]=next(p[2], u[2], ang[2]);
        context.lineTo(p[i][0], p[i][1]);
        context.stroke();
        context.beginPath();
        setTimeout(() => play(n + 1), 10)
    }
}



function next(p, u, ang) {
    return [p[0]+(u[0]*Math.cos(ang)-u[1]*Math.sin(ang)),p[1]+(u[0]*Math.sin(ang)+u[1]*Math.cos(ang))]
}
