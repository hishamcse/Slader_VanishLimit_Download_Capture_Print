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