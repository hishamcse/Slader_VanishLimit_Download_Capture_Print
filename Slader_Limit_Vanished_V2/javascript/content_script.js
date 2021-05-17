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
 * listen to the events which are transferred from popup UI
 */
chrome.runtime.onMessage.addListener((msg, ignored, _) => {
    const z = document.URL.split('/');
    const fileName = z[z.length - 3].substr(0, 8) + ' ' + z[z.length - 2];
    if (msg === 'download') {
        if (!document.URL.includes("slader.com/textbook/")) return;
        const url = `https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${document.URL}&no_ads=true&element=.solution.user-content`;
        downloadImage(url, fileName).then(_ => {
        });
    } else {
        capture(fileName).then(_ => {
        });
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