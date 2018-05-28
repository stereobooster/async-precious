# async-precious

Experiment to build async component according to [Guide To Async Components](https://github.com/stereobooster/guide-to-async-components)

Eventually this will be extracted to [react-precious-image](https://github.com/stereobooster/react-precious-image)

## TODO

* fix noscript
* ? take into account rotation
* compare against classic img with srcset and adaptive
* documentation: fetures - responsive, lazy, adaptive, offline
* code clean-up

## Find a way to compose components

* https://reactions.github.io/component/
* https://github.com/JamieDixon/react-lifecycle-component
* https://reactpatterns.com/
* https://github.com/developit/unistore
* https://github.com/jamiebuilds/unstated
* https://github.com/acdlite/recompose
* https://krasimir.gitbooks.io/react-in-patterns/content/

## Ideas

* In case of no JS situation we can show placeholder with links to full size images, instead download icon.
* Use fetch to read http headers (`content-length`, `status`, `date` to detect if response is cached or not), without downloading the content itself.
* [Webworker](https://aerotwist.com/blog/one-weird-trick/) maybe?
* check contrast between placeholder and icon

### Get screen resolutions

* https://gist.github.com/PaquitoSoft/4451865
* https://github.com/guess-js/guess/blob/master/packages/ga/src/client.ts
* https://ga-dev-tools.appspot.com/query-explorer/
* https://material.io/tools/devices/
* https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions
* https://stackoverflow.com/questions/6272384/most-popular-screen-sizes-resolutions-on-android-phones
* http://screensiz.es/
* https://css-tricks.com/google-analytics-can-show-screen-resolution-%E2%89%A0-browser-window/

### No script fallback

```html
<noscript>
  <style>.noscript{display:none}</style>
</noscript>
```

## Usorted notes

```js
var oReq = new XMLHttpRequest()

oReq.addEventListener('progress', updateProgress)
function updateProgress(oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = oEvent.loaded / oEvent.total * 100
    // ...
  } else {
    // Unable to compute progress information since the total size is unknown
  }
}
```

```js
window.addEventListener('orientationchange', function() {
  alert('the orientation of the device is now ' + screen.orientation.angle)
})
window.addEventListener('resize', resizeThrottler, false)
```

* http://underscorejs.org/#debounce
* https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries
* https://www.smashingmagazine.com/2016/01/responsive-image-breakpoints-generation/
* https://cloudfour.com/thinks/how-do-you-pick-responsive-images-breakpoints/
* https://medium.com/hceverything/applying-srcset-choosing-the-right-sizes-for-responsive-images-at-different-breakpoints-a0433450a4a3

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
