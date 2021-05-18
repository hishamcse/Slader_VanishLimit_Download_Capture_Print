/**
 * @author Syed Jarullah Hisham
 */

const API_KEY = 'a9d94def90dd462ab145386029a9d785';     // please use yours as the request is limited. 100 req/month

/**
 * helper of downloader and capture scripts
 * @param url{string} either a normal url or DOMString
 * @param fileName{string} the name of the downloaded file
 * @param ext{string} file extension to create
 */
const download_helper = (url, fileName, ext) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.${ext}`;
    document.body.appendChild(link);
    link.click();
    setTimeout(function () {
        document.body.removeChild(link);
    }, 0);
}

/**
 * downloader_script  :  download the image of the solution
 * @param imageSrc{string} source of the image to download
 * @param fileName{string} the name of the downloaded file
 * @returns {Promise<void>}
 */
const downloadImage = async (imageSrc, fileName) => {
    try {
        const image = await fetch(imageSrc);
        const imageBlob = await image.blob();
        const file = new Blob([imageBlob], {type: 'image/png'});
        const imageURL = URL.createObjectURL(file);

        download_helper(imageURL, fileName, 'png');
        window.URL.revokeObjectURL(imageURL);
    } catch (e) {
        console.error(e.message);
    }
}

/**
 * capture_script  :  share the screen
 * @param fileName{string} the name of the downloaded file
 * @returns {Promise<void>}
 */
const capture = async (fileName) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const video = document.createElement("video");
    let recorder;

    try {
        const captureStream = await navigator.mediaDevices.getDisplayMedia({
            video: {mediaSource: "screen"}
        });
        video.srcObject = captureStream;
        context.drawImage(video, 0, 0, window.width, window.height);

        recorder = new MediaRecorder(captureStream);

        const chunks = [];
        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.start();

        recorder.onstop = (e) => {
            e.preventDefault();
            const completeBlob = new Blob(chunks, {type: chunks[0].type});
            video.src = URL.createObjectURL(completeBlob);

            download_helper(video.src, fileName, 'mp4');
            window.URL.revokeObjectURL(video.src);
        };
    } catch (err) {
        console.error("Error: " + err);
    }
};

/**
 * Helper for Printer_script
 * Retrieved a specific content of a webpage with all its styling keeping intact
 * Collected from: https://stackoverflow.com/a/6310120
 * @type {function(): string}
 */
Element.prototype.serializeWithStyles = (function () {

    // Mapping between tag names and css default values lookup tables. This allows to exclude default values in the result.
    let defaultStylesByTagName = {};

    // Styles inherited from style sheets will not be rendered for elements with these tag names
    const noStyleTags = {
        "BASE": true,
        "HEAD": true,
        "HTML": true,
        "META": true,
        "NOFRAME": true,
        "NOSCRIPT": true,
        "PARAM": true,
        "SCRIPT": true,
        "STYLE": true,
        "TITLE": true
    };

    // This list determines which css default values lookup tables are precomputed at load time
    // Lookup tables for other tag names will be automatically built at runtime if needed
    const tagNames = ["A", "ABBR", "ADDRESS", "AREA", "ARTICLE", "ASIDE", "AUDIO", "B", "BASE", "BDI", "BDO", "BLOCKQUOTE", "BODY", "BR", "BUTTON", "CANVAS",
        "CAPTION", "CENTER", "CITE", "CODE", "COL", "COLGROUP", "COMMAND", "DATALIST", "DD", "DEL", "DETAILS", "DFN", "DIV", "DL", "DT", "EM", "EMBED", "FIELDSET",
        "FIGCAPTION", "FIGURE", "FONT", "FOOTER", "FORM", "H1", "H2", "H3", "H4", "H5", "H6", "HEAD", "HEADER", "HGROUP", "HR", "HTML", "I", "IFRAME", "IMG", "INPUT",
        "INS", "KBD", "KEYGEN", "LABEL", "LEGEND", "LI", "LINK", "MAP", "MARK", "MATH", "MENU", "META", "METER", "NAV", "NOBR", "NOSCRIPT", "OBJECT", "OL", "OPTION",
        "OPTGROUP", "OUTPUT", "P", "PARAM", "PRE", "PROGRESS", "Q", "RP", "RT", "RUBY", "S", "SAMP", "SCRIPT", "SECTION", "SELECT", "SMALL", "SOURCE", "SPAN", "STRONG",
        "STYLE", "SUB", "SUMMARY", "SUP", "SVG", "TABLE", "TBODY", "TD", "TEXTAREA", "TFOOT", "TH", "THEAD", "TIME", "TITLE", "TR", "TRACK", "U", "UL", "VAR", "VIDEO", "WBR"];

    // Precompute the lookup tables.
    for (let i = 0; i < tagNames.length; i++) {
        if (!noStyleTags[tagNames[i]]) {
            defaultStylesByTagName[tagNames[i]] = computeDefaultStyleByTagName(tagNames[i]);
        }
    }

    function computeDefaultStyleByTagName(tagName) {
        let defaultStyle = {};
        let element = document.body.appendChild(document.createElement(tagName));
        let computedStyle = getComputedStyle(element);
        for (let i = 0; i < computedStyle.length; i++) {
            defaultStyle[computedStyle[i]] = computedStyle[computedStyle[i]];
        }
        document.body.removeChild(element);
        return defaultStyle;
    }

    function getDefaultStyleByTagName(tagName) {
        tagName = tagName.toUpperCase();
        if (!defaultStylesByTagName[tagName]) {
            defaultStylesByTagName[tagName] = computeDefaultStyleByTagName(tagName);
        }
        return defaultStylesByTagName[tagName];
    }

    return function serializeWithStyles() {
        if (this.nodeType !== Node.ELEMENT_NODE) {
            throw new TypeError();
        }
        let cssTexts = [];
        let elements = this.querySelectorAll("*");
        for (let i = 0; i < elements.length; i++) {
            let e = elements[i];
            if (!noStyleTags[e.tagName]) {
                let computedStyle = getComputedStyle(e);
                let defaultStyle = getDefaultStyleByTagName(e.tagName);
                cssTexts[i] = e.style.cssText;
                for (let ii = 0; ii < computedStyle.length; ii++) {
                    let cssPropName = computedStyle[ii];
                    if (computedStyle[cssPropName] !== defaultStyle[cssPropName]) {
                        e.style[cssPropName] = computedStyle[cssPropName];
                    }
                }
            }
        }
        let result = this.outerHTML;
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.cssText = cssTexts[i];
        }
        return result;
    }
})();

/**
 * Printer_script: print the solution portion of the page
 */
const print = () => {
    let prtContent = document.querySelector(".solution.user-content");
    let WinPrint = window.open("", "PRINT", 'height=600,width=900');
    WinPrint.document.write(prtContent.serializeWithStyles());
    WinPrint.document.close();
    WinPrint.setTimeout(function () {
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
    }, 1000);
}

/**
 * listen to the events which are transferred from popup UI
 */
chrome.runtime.onMessage.addListener((msg, ignored, _) => {
    const docURL = document.URL.split('/');
    const fileName = docURL[docURL.length - 3].substr(0, 8) + ' ' + docURL[docURL.length - 2];
    if (msg === 'download') {
        if (!document.URL.includes("slader.com/textbook/")) return;
        const url = `https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${document.URL}&no_ads=true&element=.solution.user-content`;
        downloadImage(url, fileName).then(_ => {
        });
    } else if (msg === 'capture') {
        capture(fileName).then(_ => {
        });
    } else {
        print();
    }
    return true;
});

/**
 * Select the node that will be observed for mutations
 * @type {HTMLElement}
 */
const nodeToObserve = document.body;

/**
 * Options for the observer (which mutations to observe)
 * @type {{subtree: boolean, childList: boolean}}
 */
const config = {childList: true, subtree: true};

/**
 * Callback function to execute when mutations are observed. It removes the paywall footer element
 * @param mutationsList{object} the elements of the list to be observed
 * @param observer{object} the observer instance
 * @returns void function
 */
const observerCallback = (mutationsList, observer) => {
    mutationsList.forEach(mutation => {
        if (mutation.type !== 'childList') return;

        const nodeToRemove = mutation.target.querySelector('.Paywall__footer-counter');
        if (!nodeToRemove) return;

        nodeToRemove.parentNode.removeChild(nodeToRemove);       // removing the paywall footer portion

        // stop observing
        observer.disconnect();
    });
};

/**
 *  Create an observer instance linked to the callback function
 * @type {MutationObserver}
 */
const observer = new MutationObserver(observerCallback);

/**
 * Start observing the target node for configured mutations
 */
observer.observe(nodeToObserve, config);