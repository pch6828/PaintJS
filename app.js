const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function start_painting(){
    painting = true;
}

function stop_painting(){
    painting = false;
}

function onMouceMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function fillColor(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeBrushSize(event){
    ctx.lineWidth = event.target.value;
}

function changeMode(event){
    if(filling){
        filling = false;
        mode.innerText="fill";
    }else{
        filling = true;
        mode.innerText="paint";
    }
}

function noContextMenu(event){
    event.preventDefault();
}

function saveImage(event){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouceMove);
    canvas.addEventListener("mousedown", start_painting);
    canvas.addEventListener("mouseup", stop_painting);
    canvas.addEventListener("mouseleave", stop_painting);
    canvas.addEventListener("click", fillColor);
    canvas.addEventListener("contextmenu",noContextMenu);
}

if(range){
    range.addEventListener("input", changeBrushSize);
}

if(mode){
    mode.addEventListener("click", changeMode);
}

if(save){
    save.addEventListener("click", saveImage);
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColor));