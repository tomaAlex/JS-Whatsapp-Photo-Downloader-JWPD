let forceDownload = (url, fileName) => {
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

let n = prompt("How many photos do you want to download?", 25);
let isAlphabetical = prompt("Is it alphabetical", "yes");
isAlphabetical = isAlphabetical.toLowerCase() == 'y' || isAlphabetical.toLowerCase() == 'yes';
let c = 1;
let chars = 'abcdefghijklmnopqrstuvwxyz';
let next_button = document.getElementById('app').children[0].children[2].children[0].children[0].children[1].children[0].children[1].children[2].children[0];

let download_photo = () => {
    let photo = document.getElementById('app').children[0].children[2].children[0].children[0].children[1].children[0].children[1].children[1];
    for (let i = 1; i <= 4; i++) photo = photo.firstElementChild;
    photo = photo.children[1].firstElementChild;
    let fname = (isAlphabetical ? chars.charAt((c - 1) % chars.length) : c - 1) + '.jpg';
    forceDownload(photo.src, fname);
    next_button.click();
    c++;
}

let downloader = setInterval(() => {
    download_photo();
    console.log('donwloaded the photograph number ' + (c - 1).toString());
    if(c - 1 == n) clearInterval(downloader);
}, 1000); // wait for the images to load, don't overflow the download process
