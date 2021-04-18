const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jscolor");
const sizerange = document.getElementById("jsSizeRange");
const fillBtn = document.getElementById("jsFillMode");
const paintBtn = document.getElementById("jsPointMode");
const resetBtn = document.getElementById("jsReset");
const saveBtn = document.getElementById("jsSAVE");
const print = document.getElementById("jsPrint");
const SqrBrushBtn = document.getElementById("SquareBrushBtn");
const RodBrushBtn = document.getElementById("RoundBrushBtn");
const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.shadowColor = 'rgba(255, 0, 0, .2)';
ctx.shadowBlur = 1;
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;
CWIDTH = canvas.width;
CHEIGHT = canvas.height;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
let RoundOrSquare = true;
let paintorfill = true;
//true일때 paint false일때 fill
let LiNEWT = 2.5;
let painting = false;
ctx.globalAlpha = 1;
let LCOLOR = "black";

function stopPainting(e){
    painting = false;
    console.log(painting);
}

function startPainting(e){
    painting = true;
    console.log("filling is "+paintorfill);
    if(!paintorfill){
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
    else if(painting && paintorfill){
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
    console.log(sizerange.value);
    ctx.lineWidth = sizerange.value;
    
}

function modeChangePaint(e){
    if(paintorfill ===  false){
        paintorfill = true;
        console.log("painting is "+paintorfill);
        fillBtn.style.backgroundColor="white";
        fillBtn.style.color="black";
        paintBtn.style.backgroundColor= "#0779FF";
        paintBtn.style.color="white";
    }
}

function modeChangeFill(e){
    if(paintorfill ===  true){
        paintorfill = false;
        console.log("painting is "+paintorfill);
        paintBtn.style.backgroundColor="white";
        paintBtn.style.color="black";
        fillBtn.style.backgroundColor= "#0779FF";
        fillBtn.style.color="white";
    }
}

function brushStyleRound(){
    if(RoundOrSquare ===  false){
        RoundOrSquare = true;
        ctx.lineCap = "round"; 
        ctx.lineJoin = "round";
        SqrBrushBtn.style.backgroundColor="white";
        SqrBrushBtn.style.color="black";
        RodBrushBtn.style.backgroundColor= "#0779FF";
        RodBrushBtn.style.color="white";
    }

}

function brushStyleSquare(){
    if(RoundOrSquare ===  true){
        RoundOrSquare = false;
        ctx.lineCap = "butt"; 
        ctx.lineJoin = "miter";
        RodBrushBtn.style.backgroundColor="white";
        RodBrushBtn.style.color="black";
        SqrBrushBtn.style.backgroundColor= "#0779FF";
        SqrBrushBtn.style.color="white";
    }

}



function resetCanvas(e){
    ctx.fillStyle = "white";
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleCM(e){
  //  e.preventDefault();
}

function handleSaveClick(e){
    const image = canvas.toDataURL("image/webp");
    console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "";
    console.log(link);
    link.click();
}

function ImagePrintPage(){
    const dataUrl = document.getElementById('jsCanvas').toDataURL(); 
    let Content = '<!DOCTYPE html>';
    Content += '<html>';
    Content += '<head></head>';
    Content += '<body>';
    Content += '<img src="' + dataUrl + '">';
    Content += '</body>';
    Content += '</html>';
    return Content;
}

function print_current_page(e){
    const windowContent = ImagePrintPage();
    const printWin = window.open('', '', 'width=' + screen.availWidth + ',height=' + screen.availHeight);
    printWin.document.open();
    printWin.document.write(windowContent); 
    printWin.document.addEventListener('load', function() {
        printWin.focus();
        printWin.print();
        printWin.document.close();
        printWin.close();            
    }, true);
}

function initPaint(){
    paintorfill = true;
    fillBtn.style.backgroundColor="white";
    fillBtn.style.color="black";
    paintBtn.style.backgroundColor= "#0779FF";
    paintBtn.style.color="white";
}

function initBrush(){
    paintorfill = true;
    ctx.lineCap = "round"; 
    ctx.lineJoin = "round";
    RodBrushBtn.style.backgroundColor= "#0779FF";
    RodBrushBtn.style.color="white";
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("contextmenu", handleCM);
}

function init(){
    print.addEventListener("click", print_current_page);
    sizerange.addEventListener("click",handleRange);
    fillBtn.addEventListener("click",modeChangeFill);
    paintBtn.addEventListener("click",modeChangePaint);
    resetBtn.addEventListener("click",resetCanvas);
    saveBtn.addEventListener("click",handleSaveClick);
    SqrBrushBtn.addEventListener("click",brushStyleSquare);
    RodBrushBtn.addEventListener("click", brushStyleRound);

    initPaint();
    initBrush();
}

(Array.from(colors)).forEach(color =>
    color.addEventListener("click",handleColorClick));
init();
