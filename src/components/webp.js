async function supportsWebp() {
  if (typeof createImageBitmap === 'undefined' || typeof fetch === 'undefined')
    return false
  return fetch(
    'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=',
  )
    .then(response => response.blob())
    .then(blob => createImageBitmap(blob).then(() => true, () => false))
}

let webp = undefined
const webpPromise = supportsWebp()
webpPromise.then(x => (webp = x))

export default () => {
  if (webp === undefined) return webpPromise
  return {
    then: callback => callback(webp),
  }
}
