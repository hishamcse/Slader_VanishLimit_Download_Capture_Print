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
 * downloader_script  :  download the image of the solution
 * @param imageSrc{string} source of the image to download
 * @param fileName{string} the name of the downloaded file
 * @returns {Promise<void>}
 */
const downloadImage = async (imageSrc, fileName) => {
    try {
        const image = await fetch(imageSrc)
        const imageBlog = await image.blob()
        const file = new Blob([imageBlog], {type: "image/png"});
        const imageURL = URL.createObjectURL(file);

        download_helper(imageURL, fileName, 'png');
        window.URL.revokeObjectURL(imageURL);
    } catch (e) {
        console.error(e.message);
    }
}