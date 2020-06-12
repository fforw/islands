/**
 * HTML5 Helper function to trigger a text file download from javascript
 *
 * @param {string} filename         default filename for the client
 * @param {string} text             text context
 * @param {String} [mediaType]      media type to export file as (default "text/plain")
 */
export default function (filename, text, mediaType = "text/plain")
{
    const element = document.createElement("a");
    element.setAttribute("href", "data:" + mediaType+ ";charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
