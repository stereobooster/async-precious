# async-precious

Async component to rule them all.

Experiment to build async component according to [Guide To Async Components](https://github.com/stereobooster/guide-to-async-components)

## Ideas

* preview: lqip, sqip, color, function
* webp
* [lazy-image](https://meowni.ca/lazy-image/): `srcset`
* [Webworker](https://aerotwist.com/blog/one-weird-trick/) maybe?
* contrast
* [navigator.connection.effectiveType](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType)

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
