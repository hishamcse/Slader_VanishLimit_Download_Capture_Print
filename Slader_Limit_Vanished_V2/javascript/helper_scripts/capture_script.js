/**
 * unused file as executeScript isn't accessible from content_script.js
 */

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