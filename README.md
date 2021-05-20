# Slader_VanishLimit_Download_Capture_Print
 
Chrome extension to bypass monthly limit of slader solutions, download single solution, capture the screen and print the solution.<br />

#### Update: I have updated the whole code structure and try to make it clean and simple to follow

## Features:
   1. Bypass slader monthly limit of premium books. so now solutions are limited<br />
   2. Download solution of a particular page<br />
   3. Capture the screen and save the capture as a mp4 file<br />
   4. Print the solution of current page<br />

## Available Browsers: 
   1. Google Chrome (Recommended)<br />
   2. Microsoft Edge<br />
    
## How to use:
   1. Download this repository as zip then unzip. N.B: We will need 'Slader_Limit_Vanished_V2' folder only. Not full unzipped folder<br />
   2. go to chrome/edge extension page and enable developer mode<br />
   3. Click load unpacked button<br />
   4. And then select the 'Slader_Limit_Vanished_V2' folder<br /><br />
    
#### here is the demonstration of 'How to use'

![1 Adding Extension](https://user-images.githubusercontent.com/60782190/119012431-da722700-b9b7-11eb-8a31-00a387b0e006.gif)


<br/>

## Limit Bypass:
   At slader, besides free books, there are also books which require premium access. This extension bypasses the paywall, remove the warning message and make all solutions accessible. For example: This book https://www.slader.com/textbook/9780989472104-book-of-proof requires premium access <br />
    
#### here is the demonstration of 'Limit Bypass'

https://user-images.githubusercontent.com/60782190/118552263-86c9c880-b780-11eb-82f3-cf1410b70fc3.mp4

<br />

## Download Single Solution:
   This option downloads the solution and the comments of the problem. Please wait as the response from the API takes time. Also please use your own API key as the request is limited. The API request limit is 100 req/month. So you can download upto 100 solution per month:
<br />

> <b>For API Key</b>: <b>As there is a limit of 100 req/month, so, it is recommended to use your own api key</b>. Go to this site https://apiflash.com/ , create free account       and you will get free API_KEY. Now, go to 'Slader_Limit_Vanished_V2/javascript/content_script.js' file and at line 5, change the API_KEY and that's it. <br />
    
#### here is the demonstration of 'Download Single Solution'

https://user-images.githubusercontent.com/60782190/118553139-bc22e600-b781-11eb-82a2-6f0c0139e620.mp4

<br />

## Capture Screen and download mp4: 
   This option share and capture screen based on various options like tab, window and whole screen. After closing screen sharing, it will automatically download the recorded video capture file as mp4 file <br />
    
#### here is the demonstration of 'Capture Screen'

https://user-images.githubusercontent.com/60782190/118554195-f5a82100-b782-11eb-923c-80050727d30c.mp4

<br />

## Print the solution
   This option prints the solution of the currently active page <br />
    
#### here is the demonstration of 'Print the solution'


https://user-images.githubusercontent.com/60782190/118611247-6f212d00-b7de-11eb-873f-263ccf560708.mp4


<br />

## Resources:
   1. Chrome Getting Started Tutorial:  &nbsp;&nbsp; [Getting Started](https://developer.chrome.com/docs/extensions/mv2/getstarted/) <br />
   2. Chrome API Reference:  &nbsp;&nbsp; [Chrome API Reference](https://developer.chrome.com/docs/extensions/reference/) <br />
   3. Extension Guide:  &nbsp;&nbsp; [Shiffman_Extension](https://shiffman.net/a2z/chrome-ext/) <br />
   4. Some Example: &nbsp;&nbsp;  [TamimEhsan/ChromeExtensions](https://github.com/TamimEhsan/ChromeExtensions) <br />
   5. Facebook HideSharedPost:  &nbsp;&nbsp; [TamimEhsan/HideSharedPost](https://github.com/TamimEhsan/HideSharedPost) <br />
   6. Idea taken: &nbsp;&nbsp; https://github.com/lebr0nli/slader-extension
   7. Fire event at element creation: &nbsp;&nbsp;  https://stackoverflow.com/questions/8560819/chrome-extension-fire-an-event-when-element-created <br />
   8. X-Forwarder-For(Request Header) doc: &nbsp;&nbsp;  https://en.wikipedia.org/wiki/X-Forwarded-For <br />
   9. Download image: &nbsp;&nbsp;  https://dev.to/sbodi10/download-images-using-javascript-51a9 <br />
   10. Screenshot API documentation:  &nbsp;&nbsp; https://apiflash.com/documentation <br />
   11. Screenshot Implementation: &nbsp;&nbsp;  https://hackernoon.com/how-to-take-screenshots-in-the-browser-using-javascript-l92k3xq <br />
   12. Screen Capture documentation: &nbsp;&nbsp;  https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture <br />
   13. Screen Capture implementation: &nbsp;&nbsp;  https://dev.to/sebastianstamm/screen-recording-in-10-lines-of-vanilla-js-3bo8 <br />
   14. MediaRecorder API documentation: &nbsp;&nbsp;  https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder <br />
   15. Retrive Specific content of a webpage with all its styles: https://stackoverflow.com/a/6310120
   16. Popup template:  &nbsp;&nbsp; https://freefrontend.com/css-modal-windows/


#### N.B: Use it for only educational purposes. If you can afford to buy subscription of slader,then buy and use
