function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

setInputFilter(document.querySelector("#input-width"), (value) =>{
    return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 4000);
});

setInputFilter(document.querySelector("#input-height"), (value) =>{
    return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 2250);
});

setInputFilter(document.querySelector("#input-border-width"), (value) =>{
    return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 50);
});

setInputFilter(document.querySelector("#input-alternate-text"), function(value) {
    return /^[a-z]*$/i.test(value);
});

document.myForm.width.onfocus = () =>{
    document.myForm.width.classList.remove('error');
};

document.myForm.height.onfocus = () =>{
    document.myForm.height.classList.remove('error');
};

document.myForm.border_width.onfocus = () =>{
    document.myForm.border_width.classList.remove('error');
};

document.myForm.border_color.onfocus = () =>{
    document.myForm.border_color.classList.remove('error');
};

document.myForm.alternate_text.onfocus = () =>{
    document.myForm.alternate_text.classList.remove('error');
};

function validate() {
    let width = document.forms["myForm"]["width"].value;
    let height = document.forms["myForm"]["height"].value;
    let borderWidth = document.forms["myForm"]["border_width"].value;
    let borderColor = document.forms["myForm"]["border_color"].value;
    let text = document.forms["myForm"]["alternate_text"].value;
    let img = document.querySelector("#image");
    console.log(width);
    if(width === "") {
        document.myForm.width.classList.add("error");
    }
    if(height === "") {
        document.myForm.height.classList.add("error");
    }
    if(borderWidth === "") {
        document.myForm.border_width.classList.add("error");
    }
    if(borderColor === ""){
        document.myForm.border_color.classList.add("error");
    }
    if(text === ""){
        document.myForm.alternate_text.classList.add("error");
    }
    img.style.width =`${width}px`;
    img.style.height =`${height}px`;
    img.style.border =`${borderWidth}px solid ${borderColor} `;
    img.setAttribute("alt",`${text}`);
    return false;
}