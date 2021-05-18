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