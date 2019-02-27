/*
 * Required in order to include CSS files.
 *
 * See https://www.11ty.io/docs/copy/ for details.
 *
 */
module.exports = {
    templateFormats: [
        "html",
        "md",
        "css" // css is not yet a valid template extension
    ],
    passthroughFileCopy: true
};
