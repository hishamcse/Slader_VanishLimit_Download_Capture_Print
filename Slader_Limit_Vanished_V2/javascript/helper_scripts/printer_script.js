/**
 * Print Current Solution
 */

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