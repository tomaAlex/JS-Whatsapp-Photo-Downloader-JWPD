function forceDownload(url, fileName){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function(){
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        var tag = document.createElement('a');
        tag.href = imageUrl;
        tag.download = fileName;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }
    xhr.send();
}

// numeste butonul de next id="next_button"
// numeste poza pe full screen cu id="poza"
let n = prompt("Cate poze descarci", 25);
let c = 1;
let nex_button = document.getElementById("next_button");

function download_photo() {
    if(c <= n) {
        let poza = document.getElementById("poza");
        for (let i = 1; i <= 4; i++) {
            poza = poza.firstElementChild;
        }
        let fname = c + '.jpg';
        forceDownload(poza.src, fname);
        next_button.click();
        c++;
    }
}

setInterval(download_photo(), 500); // adauga interval de timp intre download-uri, evita overflow-ul
