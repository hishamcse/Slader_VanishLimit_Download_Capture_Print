/**
 * @author Syed Jarullah Hisham
 */

const API_KEY = 'a9d94def90dd462ab145386029a9d785';     // please use yours as the request is limited. 100 req/month

/**
 * listen to the events which are transferred from popup UI
 */
chrome.runtime.onMessage.addListener((msg, ignored, _) => {
    const docURL = document.URL.split('/');
    const fileName = docURL[docURL.length - 3].substr(0, 8) + ' ' + docURL[docURL.length - 2];
    if (msg === 'download') {
        if (!document.URL.includes("slader.com/textbook/")) return;
        const url = `https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${document.URL}&no_ads=true&element=.solution.user-content`;
        downloadImage(url, fileName).then(_ => {            // navigate to downloader_script.js
        });
    } else if (msg === 'capture') {
        capture(fileName).then(_ => {                       // navigate to capture_script.js
        });
    } else {
        print();                                            // navigate to printer_script.js
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