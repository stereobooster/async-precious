# async-precious

Async component to rule them all.

Experiment to build async component according to [Guide To Async Components](https://github.com/stereobooster/guide-to-async-components)

## Idea

Image component which will lazy load images:

* Do not load images if they are not visible
* Require image dimensions to generate placeholders, to prevent browsers layout bounce when images get loaded
* Require placeholder (lqip, sqip or solid color) to improve perceived load speed.
* If client have good internet connection, component will load images as soon as user scrolls to it, no additional action required from user.
* If client have bad internet connection, component will generate placeholder and "button", which will let user to decide if they want to load image or not.

Additionally:

* When load starts there is no additional inidcator of process (clean placeholder), but if it takes more than specified threshold additional indicator appears and user can cancel download
* If error occurred while downloading image, component will provide visual indication and will allow to retry load
* If browser is offline and image is not loaded yet, component will provide visual indicator of this case, so user would know image is not loaded and there is no way to load it at the moment

### Technical limitations

There is no way to reliably measure speed of the connection, unless broswer provides [facility for it](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType). Theoretically we can take size of image (provided upfront or read from HTTP headers) and divide by time spent donwloading it, but connection capacity will be equlay splited between all parallel downloads, so this is not precise, and we need to wait finish of download to get final value of speed.



### Inspiration

* Lazy load - this is technique known from jQuery ages.
* Specify image dimensions - recomendation from PageSpeed and later AMP project
* Use placeholder to improve percieved load speed. LQIP - techinque used by Facebook and Medium. Solid color placeholder - techinque used by Google, Twitter and Pinterest.
* Overlay icons - to indicate state of the image and give user control over it. Technique used by Twitter.
* Use WebP format, if it is supported by the browser. Recomendation from PageSpeed
* Use image size according to the screen size. Idea comes from `srcset` and `@media` queries

## TODO

* placeholder: lqip, sqip or solid color
* Use [cancelable fetch](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort) to read http headers (`content-length`, `status`, `date` to detect if response is cached or not).
* `srcset` ([lazy-image](https://meowni.ca/lazy-image/))
* Add note about icons
* WebP

## Ideas

* [Webworker](https://aerotwist.com/blog/one-weird-trick/) maybe?
* check contrast between placeholder and icon

## Usorted notes

No script fallback:

```html
<noscript>
  <style>.noscript{display:none}</style>
</noscript>
```

Detect WebP:

```js
async function supportsWebp() {
  if (typeof createImageBitmap === "undefined") return false;
  return fetch(
    "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="
  )
    .then(response => response.blob())
    .then(blob => createImageBitmap(blob).then(() => true, () => false));
}
let webp = false;
supportsWebp().then(x => (webp = x));
```

```html
<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" />
```

* https://github.com/styleguidist/react-styleguidist/blob/master/docs/Documenting.md
* https://reactjs.org/docs/typechecking-with-proptypes.html
* https://via.placeholder.com/200x100
* https://www.ampproject.org/docs/design/responsive/control_layout
