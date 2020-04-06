window.onload = function(){
    fun();
};

function fun(){
    let regions_h = document.getElementById("Table").querySelectorAll('.row_region');
    let values_h  = document.getElementById("Table").querySelectorAll('.row_value');
    let buttons_h = document.getElementById("Table").querySelectorAll('.delete');
    let regions             = [],
        values              = [],
        diagram__columnName = [];


    for (let elem of regions_h) {
        elem.setAttribute("data-region-name", elem.textContent);
        regions.push(elem.dataset.regionName);
    }

    for (let elem of values_h) {
        elem.setAttribute("data-value", elem.textContent);
        values.push(elem.dataset.value);
    }

    for (let elem of buttons_h) {
        elem.addEventListener("click",  () => {remove(elem)});
    }

    let diagram__color_h = document.getElementById("diagram").querySelectorAll('.diagram_color');
    let diagram__columnName_h = document.getElementById("diagram").querySelectorAll('.diagram__columnName');

    let i = 0;
    for (let elem of diagram__color_h) {
        elem.addEventListener("mouseover",  () => {mouseOnDiagram(elem)});
        elem.addEventListener("mouseout",  () => {mouseOutDiagram(elem)});
        elem.style.height=`${values[i]}px`;
        elem.classList.add("addPadding");
        elem.setAttribute("data-height", values[i]);
        i++;
    }
    i = 0;

    for (let elem of diagram__columnName_h) {
        elem.innerText = regions[i];
        i++;
        diagram__columnName.push(elem.textContent);

    }
}


function addRow(){
    let row = document.getElementById("row").cloneNode(true);
    row.setAttribute("class", "row");
    row.setAttribute("id", "");
    document.getElementById("Table").appendChild(row);
    addDiagram();
}

function addDiagram(){
    let col = document.getElementById("col_ex").cloneNode(true);
    col.setAttribute("id", "");
    document.getElementById("diagram").appendChild(col);
}


function remove(elem) {
    let region = elem.parentNode.parentNode.querySelector('.row_region');
    let colName = document.getElementById("diagram").querySelectorAll('.diagram__columnName');
    for(let element of colName){
        if(element.textContent === region.textContent){
            element.parentNode.remove();
        }
    }
    let newElem = elem.parentNode.parentNode;
    newElem.remove();
}

function mouseOnDiagram(elem) {
    let alt_text = document.createElement("p");
    alt_text.setAttribute("class","alt_text");
    elem.classList.remove("addPadding");

    alt_text.innerText = elem.dataset.height;
    elem.parentNode.insertBefore(alt_text, elem.parentNode.firstChild);
}
function mouseOutDiagram(elem) {
    elem.parentNode.firstChild.remove();
    elem.classList.add("addPadding");
}