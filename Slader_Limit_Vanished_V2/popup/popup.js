let download = document.querySelector('.download');
let capture = document.querySelector('.capture');
let print = document.querySelector('.print');

chrome.storage.sync.get('color', (data) => {
    download.setAttribute('value', data.color);
});

download.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, 'download');
    });
});

capture.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, 'capture');
    });
});

print.addEventListener('click', () => {
    chrome.tabs.executeScript({
        "file": "./javascript/helper_scripts/printer_script.js"
    });
})