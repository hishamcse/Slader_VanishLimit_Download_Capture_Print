/**
 * modify the value of requestHeader "X-Forwarded-For" and replace it with a large random value
 * Bypass the limit and block limit message
 * handled synchronously because of 'blocking' opt_extraInfoSpec
 * @param headerDetails passed a dictionary containing information about the current URL request
 * @returns {{requestHeaders: *}}
 */
const headerCallBack = headerDetails => {
    const randomHeaderValue = (Math.floor((Math.random() * 9999999999234))).toString();
    const x_forward_for_header = headerDetails.requestHeaders.find(header => header.name === "X-Forwarded-For");

    x_forward_for_header ? x_forward_for_header.value = randomHeaderValue :
        headerDetails.requestHeaders.push({
            name: "X-Forwarded-For",
            value: randomHeaderValue
        });

    return {requestHeaders: headerDetails.requestHeaders};
};

/**
 * allows limiting the requests for which events are triggered
 * @type {{urls: string[]}} for which urls; events will be triggered
 */
const filter = {
    urls: ['*://*.slader.com/textbook/*']
};

/**
 * callBack function is handled accordingly based on this extraInfo specification array
 * @type {string[]}
 */
const opt_extraInfoSpec = ['blocking', 'requestHeaders'];

/**
 * Fires when a request is about to occur and the initial headers have been prepared
 * The onBeforeSendHeaders event is passed to all subscribers
 */
try {
    chrome.webRequest.onBeforeSendHeaders.addListener(headerCallBack, filter, opt_extraInfoSpec);
} catch (err) {
    console.error(err.message);
}