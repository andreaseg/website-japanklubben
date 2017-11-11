this.addEventListener("DOMContentLoaded", onLoadComplete, true);

function onLoadComplete(event) {
    drawBoxes({x:0, y:0},contentSize);
}

/*
function drawPage(index) {
    document.getElementById('title').innerHTML = content[index].title;
    document.getElementById('text').innerHTML = content[index].text;
    document.getElementsByTagName('body')[0].style.backgroundImage = 'url(' + content[index].img + ')'
}
*/

var current_index = 0;
var contentSize = {x:3, y:3};

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
    //console.log("P: "+JSON.stringify(position)+"D: "+JSON.stringify(dimensions));

    let box = document.createElement("div");
    box.className = "tile";
    box.style.position = "absolute";
    box.style.left = 100 * position.x / contentSize.x + "%";
    box.style.top = 100 * position.y / contentSize.y + "%";
    box.style.width = 100 * dimensions.x / contentSize.x + "%";
    box.style.height = 100 * dimensions.y / contentSize.y + "%";
    box.style.backgroundColor = "#"+(Math.floor(Math.random()*16777215)).toString(16);
    

    if (current_index < content.length) {
        let textBox = document.createElement("header");
        textBox.innerHTML = content[current_index].title;

        box.appendChild(textBox);

        box.style.backgroundImage = 'url(' + content[current_index].img + ')'
    }
    
    current_index++;
    document.getElementById('content').appendChild(box);
}