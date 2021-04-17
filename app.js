const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jscolor");
const range = document.getElementById("jsRange");
const fillBtn = document.getElementById("jsFillMode");
const resetBtn = document.getElementById("jsReset");
const saveBtn = document.getElementById("jsSAVE");

const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

CWIDTH = canvas.width;
CHEIGHT = canvas.height;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
let filling = false;
let LiNEWT = 2.5;




let painting = false;

function stopPainting(e){
    painting = false;
    console.log(painting);
}

function startPainting(e){
    painting = true;
    console.log("filling is "+filling);
    if(filling){
        ctx.fillStyle = LCOLOR;
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function onMouseMove(event){

    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
    console.log("beginpath"+painting);
    ctx.beginPath();
    ctx.moveTo(x, y);
    }
    else if(painting && !filling){
        console.log(painting);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
};

function onMouseDown(e){
    painting  = true;

}

function onMouseLeave(e){
    stopPainting();
}


function handleColorClick(e){
    LCOLOR = e.target.style.backgroundColor;
    ctx.strokeStyle = LCOLOR;
}

function handleRange(e){
    console.log(range.value);
    ctx.lineWidth = range.value;
    
}

function modeChange(e){
    if(filling ===false){
        fillBtn.innerText = "Fill";
        filling = true;
        console.log("filling is "+filling);
        fillBtn.style.backgroundColor= "#0779FF";
        fillBtn.style.color="white";
    }else{
        fillBtn.innerText = "Paint";
        filling = false;       
        console.log("filling is "+filling);
        fillBtn.style.backgroundColor="white";
        fillBtn.style.color="black";
    }
}
function resetCanvas(e){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleCM(e){
    e.preventDefault();
}

function handleSaveClick(e){
    const image = canvas.toDataURL("image/jpeg");
    console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJs🎨"
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("contextmenu", handleCM);
}

function init(){
    range.addEventListener("click",handleRange);
    fillBtn.addEventListener("click",modeChange);
    resetBtn.addEventListener("click",resetCanvas);
    saveBtn.addEventListener("click",handleSaveClick);
    //colors.addEventListener("click",handleColorClick);
}

(Array.from(colors)).forEach(color =>
    color.addEventListener("click",handleColorClick));
init();
