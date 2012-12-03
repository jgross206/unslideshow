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

var COMPLEX_BASE = "http://www.complex.com";

var urls = document.getElementsByClassName("article-slide-belt-slide");
var main = document.getElementById("slide_main_content");
var hrefs = [];

for (var i = 0; i < urls.length; i++) {
  hrefs.push(urls[i].firstChild.href);
  }

var global = 0;
fireXHR(0);
function loadSlideContent() {
  var parser = new DOMParser();
  var doc = parser.parseFromString(xhr.responseText, 'text/html');
  console.log(xhr, xhr.responseText);
  var content = doc.getElementById('slide_main_content');
  console.log(content);
  document.getElementById("slide_main_content").appendChild(content);
  fireXHR(++global);
}

function fireXHR(i) {
  xhr = new XMLHttpRequest();
  console.log(hrefs[i]);
  xhr.open("GET", hrefs[i], true);
  xhr.onload = loadSlideContent;
  xhr.send(null);
}