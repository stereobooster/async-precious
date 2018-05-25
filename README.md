# async-precious

Experiment to build async component according to [Guide To Async Components](https://github.com/stereobooster/guide-to-async-components)

Eventually this will be extracted to [react-precious-image](https://github.com/stereobooster/react-precious-image)

## TODO

* compare with webp
* tool to generate srcsets
* `srcset` ([lazy-image](https://meowni.ca/lazy-image/))
* parse srcset string
* measure viewport size
* algorithm to pickup appropriate size
* compare against classic img with srcset and adaptive

## Find a way to compose components

* https://reactions.github.io/component/
* https://github.com/JamieDixon/react-lifecycle-component
* https://reactpatterns.com/
* https://github.com/developit/unistore
* https://github.com/acdlite/recompose
* https://krasimir.gitbooks.io/react-in-patterns/content/

## Ideas

* use text together with (or instead of) icons. Examples: download image, download image (1.2mb), error occurred - click to retry, error - 404 image not found etc.
* In case of no JS situation we can show palseholder with links to full size images, instead download icon.
* Use fetch to read http headers (`content-length`, `status`, `date` to detect if response is cached or not), without downloading the content itself.
* [Webworker](https://aerotwist.com/blog/one-weird-trick/) maybe?
* check contrast between placeholder and icon

### No script fallback

```html
<noscript>
  <style>.noscript{display:none}</style>
</noscript>
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
