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