//Grab all the <a> tags of the slideshow elements
var urls = document.getElementsByClassName("article-slide-belt-slide");

//Save a reference to the first slide so we can insert subsequent slides after it
var main = document.getElementById("slide_main_content");
var hrefs = [];

//Extract the actual URL strings from the <a> tags
for (var i = 0; i < urls.length; i++) {
  hrefs.push(urls[i].firstChild.href);
}

var URLIndex = 0;
fireXHR(0);

function loadSlideContent() {
  var parser = new DOMParser();
  
  //take the raw HTML strings for the slide from the xhr response object and parse it to a DOM object
  var doc = parser.parseFromString(xhr.responseText, 'text/html');
  
  //grab the actual slide content from the DOM object
  var content = doc.getElementById('slide_main_content');
  
  //inject that content into the main page
  document.getElementById("slide_main_content").appendChild(content);
  
  //increment the index and go again
  fireXHR(++URLIndex);
}

function fireXHR(i) {
  xhr = new XMLHttpRequest();
  xhr.open("GET", hrefs[i], true);
  xhr.onload = loadSlideContent;
  xhr.send(null);
}

/*
 * The code below this line was written by Eli Grey and posted at http://stackoverflow.com/questions/9500318/troubles-trying-to-parse-an-html-string-with-domparser
 * It extends the DOMParser() object to be able to parse HTML.
 * The original license is left intact.
 */

/* 
 * DOMParser HTML extension 
 * 2012-02-02 
 * 
 * By Eli Grey, http://eligrey.com 
 * Public domain. 
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK. 
 */  

/*! @source https://gist.github.com/1129031 */  
/*global document, DOMParser*/  
(function(DOMParser) {  
    "use strict";  
    var DOMParser_proto = DOMParser.prototype  
      , real_parseFromString = DOMParser_proto.parseFromString;

    // Firefox/Opera/IE throw errors on unsupported types  
    try {  
        // WebKit returns null on unsupported types  
        if ((new DOMParser).parseFromString("", "text/html")) {  
            // text/html parsing is natively supported  
            return;  
        }  
    } catch (ex) {}  

    DOMParser_proto.parseFromString = function(markup, type) {  
        if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {  
            var doc = document.implementation.createHTMLDocument("")
              , doc_elt = doc.documentElement
              , first_elt;

            doc_elt.innerHTML = markup;
            first_elt = doc_elt.firstElementChild;

            if (doc_elt.childElementCount === 1
                && first_elt.localName.toLowerCase() === "html") {  
                doc.replaceChild(first_elt, doc_elt);  
            }  

            return doc;  
        } else {  
            return real_parseFromString.apply(this, arguments);  
        }  
    };  
}(DOMParser));