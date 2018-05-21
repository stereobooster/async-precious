# async-precious

Experiment to build async component according to [Guide To Async Components](https://github.com/stereobooster/guide-to-async-components)

Eventually this will be extracted to [react-precious-image](https://github.com/stereobooster/react-precious-image)

## TODO

- Implement loader, with interface similar to Promise (then, catch), that way it will be easy to integrate with other potential sources
- but for image and fetch we can also implement cancel




* WebP
* Use [cancelable fetch](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort) to read http headers (`content-length`, `status`, `date` to detect if response is cached or not).
* `srcset` ([lazy-image](https://meowni.ca/lazy-image/))

## Ideas

* [Webworker](https://aerotwist.com/blog/one-weird-trick/) maybe?
* check contrast between placeholder and icon
* use text together with (or instead of) icons. Examples: download image, download image (1.2mb), error occurred - click to retry, error - 404 image not found etc.
* In case of SSR (or snapshoting) generate component in "noicon" state
* In case of no JS situation we can show palseholder with links to full size images, instead download icon.

### No script fallback

```html
<noscript>
  <style>.noscript{display:none}</style>
</noscript>
```

### Detect WebP

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

## Usorted notes

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

* https://jmperezperez.com/svg-placeholders/
* https://github.com/gatsbyjs/gatsby/pull/2456