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

* When load starts there is no additional inidcator of loading state (clean placeholder), but if it takes more than specified threshold additional indicator appears and user can cancel download
* If error occurred while downloading image, component will provide visual indication and will allow to retry load
* If browser is offline and image is not loaded yet, component will provide visual indicator of this case, so user would know image is not loaded and there is no way to load it at the moment

### Technical limitations

There is no way to reliably measure speed of the connection, unless browser provides [facility for it](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType). Theoretically we can take size of image (provided upfront or read from HTTP headers) and divide by time spent donwloading it, but connection capacity will be equlay splited between all parallel downloads, so this is not precise, and we need to wait finish of download to get final value.

If browser provides `navigator.connection.effectiveType` it will be used to detect speed of connection: 'slow-2g', '2g' are considered to be slow; '3g' is (sometimes) considerd slow, '4g' and everything else is considered as fast.

If browser doesn't provide `navigator.connection.effectiveType` and threshold provided component will broadcast event (to other components) in case of surpass threshold and all components which haven't started download yet will treat current browser connection as slow. Threshol is the time (in ms) till component considers load of image fast enough, if component gets over treshold it will show indicator of slow load and user will be able to cancel download.

If current browser connection considered to be **slow** all components fallback to manual-load mode.

If current browser connection considered to be **fast** all components use lazy-load mode, e.g. they will start download as soon as user scrolls to it.

### Inspiration

* Lazy load - this is technique known from jQuery ages.
* Specify image dimensions - recomendation from PageSpeed and later AMP project
* Use placeholder to improve percieved load speed. LQIP - techinque used by Facebook and Medium. Solid color placeholder - techinque used by Google, Twitter and Pinterest.
* Overlay icons - to indicate state of the image and give user control over it. Technique used by Twitter.
* Use WebP format, if it is supported by the browser. Recomendation from PageSpeed
* Use image size according to the screen size. Idea comes from `srcset` and `@media` queries

## TODO

* Use [cancelable fetch](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort) to read http headers (`content-length`, `status`, `date` to detect if response is cached or not).
* `srcset` ([lazy-image](https://meowni.ca/lazy-image/))
* Add note about icons
* WebP

## Ideas

* [Webworker](https://aerotwist.com/blog/one-weird-trick/) maybe?
* check contrast between placeholder and icon
* use text together with (or instead of) icons. Examples: download image, download image (1.2mb), error occurred - click to retry, error - 404 image not found etc.
* In case of SSR (or snapshoting) generate component in "noicon" state
* In case of no JS situation we can show palseholder with links to full size images, instead download icon.

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

let webp = undefined;
const webpPromise = supportsWebp();
webpPromise.then(x => (webp = x));

const supportsWebpSync = () => {
  if (webp === undefined) return webpPromise;
  return {
    then: callback => callback(webp)
  };
};
```

```html
<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" />
```

* https://github.com/styleguidist/react-styleguidist/blob/master/docs/Documenting.md
* https://reactjs.org/docs/typechecking-with-proptypes.html
* https://via.placeholder.com/200x100
* https://www.ampproject.org/docs/design/responsive/control_layout

```css
.hourglass {
  animation: spin 5s cubic-bezier(0.8, 0, 0.2, 1) infinite;
}
@keyframes spin {
  90% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
```
