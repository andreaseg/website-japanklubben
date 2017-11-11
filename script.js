this.addEventListener("DOMContentLoaded", onLoadComplete, true);

function onLoadComplete(event) {
    let currentArticle = location.search.split('i=')[1];
    
    if(typeof(currentArticle) == 'undefined' || currentArticle >= getNumberOfContent() || currentArticle < 0) {
        drawBoxes({x:0, y:0},contentSize);
    }
    else {
        drawContent(currentArticle);   
    }   
}

var current_index = 0;
var contentSize = {x:3, y:3};

var colorScheme = ["#913CCD","#F15F74","#F76D3C","#F7D842","#2CA8C2","#98CB4A","#839098","#5481E6"];

function drawBoxes(position, area) {
    // random number
    // 0-0.5 == default action
    // 0.5-0.75 == horisontal split
    // 0.75-1.0 == vertical split

    let r = Math.random();
    let f = Math.floor;
    let g = Math.ceil;
    if (r % 1/8 < 1/16) {
        f = Math.ceil;
        g = Math.floor;
    }

    if ((r <= 0.5 && area.x<=2 && area.y<=2) || (area.x === 1 && area.y === 1)) {
        //draw
        drawSingleBox(position, area);
    }
    else if ((r > 0.75 || r < 0.25) && area.x > 1 || area.y === 1) {
        // horisontal split
        drawBoxes(position,{x:f(area.x/2),y:area.y});
        drawBoxes({x:position.x+f(area.x/2),y:position.y},{x:g(area.x/2),y:area.y});
    }
    else {
        // vertical split
        drawBoxes(position,{x:area.x,y:f(area.y/2)});
        drawBoxes({x:position.x,y:position.y+f(area.y/2)},{x:area.x,y:g(area.y/2)});
    }
}

function drawSingleBox(position, dimensions) {

    let box = document.createElement("a");
    box.className = "tile";
    box.style.position = "absolute";
    box.style.left = 100 * position.x / contentSize.x + "%";
    box.style.top = 100 * position.y / contentSize.y + "%";
    box.style.width = 100 * dimensions.x / contentSize.x + "%";
    box.style.height = 100 * dimensions.y / contentSize.y + "%";

    if (current_index < getNumberOfContent()) {
        let textBox = document.createElement("header");
        textBox.innerHTML = getContent(current_index).title;
        box.appendChild(textBox);

        box.href = "./?i="+current_index;
        box.className = "tile clickable";
        box.style.backgroundImage = 'url(' + getContent(current_index).img + ')'
    }
    else {
        box.style.backgroundColor = colorScheme[current_index % colorScheme.length];
    }
    
    current_index++;
    document.getElementById('content').appendChild(box);
}

function drawContent(index) {
    document.getElementById('content').innerHTML = "";
    document.getElementById('content').innerHTML = getContent(index).title + "<br />" + getContent(index).text;
    document.getElementsByTagName('body')[0].style.backgroundImage = 'url(' + getContent(index).img + ')'
}