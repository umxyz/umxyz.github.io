function init(){
    showPicker();
    showWrapper(0);
    pickcolor(0);
}

function showPicker(){
    let colorList = document.querySelectorAll("#color-picker li"),
        spanList = document.querySelectorAll("#color-picker .after");
    for(let i = 0; i < 19; i++){
        colorList[i].style.backgroundColor = colorData[i].variations[4].hex;
        spanList[i].style.borderColor = colorData[i].variations[4].hex;
    }
}


function showWrapper(index){
    let wrapperList = document.querySelectorAll("#color-wrapper li");
        head = document.querySelector("#color-wrapper h2"),
        colorWeight = document.querySelectorAll(".weight"),
        colorHex = document.querySelectorAll(".hex");
    head.innerHTML = colorData[index].color;
    for(let i = 0; i < 10; i++){
        wrapperList[i].style.backgroundColor = colorData[index].variations[i].hex;
        colorWeight[i].innerHTML = colorData[index].variations[i].weight;
        colorHex[i].innerHTML = colorData[index].variations[i].hex;
    }
}

let pickerList = document.getElementById("pickerList");

pickerList.addEventListener("click", function(){
    let target = event.target;
    switch (target.id) {
        case "Red":
            showWrapper(0);
            pickcolor(0);
            break;
        case "Pink":
            pickcolor(1);
            showWrapper(1);
            break;
        case "Purple":
            showWrapper(2);
            pickcolor(2);
            break;
        case "DeepPurple":
            showWrapper(3);
            pickcolor(3);
            break;
        case "Indigo":
            showWrapper(4);
            pickcolor(4);
            break;
        case "Blue":
            showWrapper(5);
            pickcolor(5);
            break;
        case "LightBlue":
            showWrapper(6);
            pickcolor(6);
            break;
        case "Cyan":
            showWrapper(7);
            pickcolor(7);
            break;
        case "Teal":
            showWrapper(8);
            pickcolor(8);
            break;
        case "Green":
            showWrapper(9);
            pickcolor(9);
            break;
        case "LightGreen":
            showWrapper(10);
            pickcolor(10);
            break;
        case "Lime":
            showWrapper(11);
            pickcolor(11);
            break;
        case "Yellow":
            showWrapper(12);
            pickcolor(12);
            break;
        case "Amber":
            showWrapper(13);
            pickcolor(13);
            break;
        case "Orange":
            showWrapper(14);
            pickcolor(14);
            break;
        case "DeepOrange":
            showWrapper(15);
            pickcolor(15);
            break;
        case "Brown":
            showWrapper(16);
            pickcolor(16);
            break;
        case "Grey":
            showWrapper(17);
            pickcolor(17);
            break;
        case "BlueGrey":
            showWrapper(18);
            pickcolor(18);
            break;
        default:
            break;
    }
}, false);

let wrapperList = document.getElementById("wrapperList");

wrapperList.addEventListener("click", function(){
    let target = event.target;
    switch (target.id) {
        case "n0":
            tips(0);
            copy("#t0");
            break;
        case "n1":
            tips(1);
            copy("#t1");
            break;
        case "n2":
            tips(2);
            copy("#t2");
            break;
        case "n3":
            tips(3);
            copy("#t3");
            break;
        case "n4":
            tips(4);
            copy("#t4");
            break;
        case "n5":
            tips(5);
            copy("#t5");
            break;
        case "n6":
            tips(6);
            copy("#t6");
            break;
        case "n7":
            tips(7);
            copy("#t7");
            break;
        case "n8":
            tips(8);
            copy("#t8");
            break;
        case "n9":
            tips(9);
            copy("#t9");
            break;
        default:
            break;
    };
}, false);

function pickcolor(index){
    let spanList = document.querySelectorAll("#color-picker .after");
    exPick(spanList, index);
    exTip(tipIndex);
    spanList[index].style.padding = 0.9 + 'em';
}

let pickIndex = 0;
function exPick(spanList, index){
    spanList[pickIndex].style.padding = 0;
    pickIndex = index;
}

function tips(index){
    let tipList = document.querySelectorAll("#color-wrapper .tip");
    exTip(index);
    tipList[index].style.opacity = 0.75;
    tipList[index].innerHTML = "Color copied!";
}

let tipIndex = 0;
function exTip(index){
    let tipList = document.querySelectorAll("#color-wrapper .tip");
    tipList[tipIndex].style.opacity = 0;
    tipIndex = index;
}

function copy(className){
      let range = document.createRange();
      range.selectNodeContents(document.querySelector(className));
      var selection = document.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('Copy');
}