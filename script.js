// ==UserScript==
// @name         List titles on Youtube
// @namespace    http://tampermonkey.net/
// @version      2024-07-13
// @description  Pull titles from hashed movies

// @author       You
// @match        https://www.youtube.com/hashtag/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        GM_setClipboard
// ==/UserScript==


function getTitlesString() {
    console.log("Query Class");
    var moviePanelsParent = document.querySelector("#contents")

    console.log("List Items");
    var response = ""


    for (const el of Array.from(moviePanelsParent.children)) {
        for (const cell of Array.from(el.children[0].children)) {
            //console.log(cell);
            if (cell.querySelector("#text > a").innerHTML == "AWS Events") {
                var count = cell.querySelector("#metadata-line > span:nth-child(3)").innerHTML + "                         "
                count = count.slice(0, 16)
                response += count +""+ cell.querySelector("#video-title").innerHTML + "   "  +"\n"
            }


        }
    }

    return response
}

// command + b で起動
(function() {
    document.addEventListener('keydown', function(event){
        console.log("event.code : " + event.code)
        if(!event.metaKey || event.code != 'KeyB') return;
        event.stopPropagation();

        var txt = getTitlesString();
        GM_setClipboard(txt);
        alert('Titles Copied');
    });
})();

