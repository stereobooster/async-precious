// There is an issue with cancelable interface
// It is not obvious that
// `image(src)` has `cancel` function
// but `image(src).then()` doesn't

import {unfetch, AbortController} from './unfetch'

export const image = src => {
  let image = new Image()
  const result = new Promise((resolve, reject) => {
    image.onload = resolve
    image.onabort = image.onerror = reject
    image.src = src
  })
  result.cancel = () => {
    if (!image) throw new Error('Already canceled')
    image.onload = image.onabort = image.onerror = undefined
    image.src = ''
    image = undefined
  }
  return result
}

export const timeout = threshold => {
  let timerId
  const result = new Promise(resolve => {
    timerId = setTimeout(resolve, threshold)
  })
  result.cancel = () => {
    // if (!timerId) throw new Error('Already canceled')
    clearTimeout(timerId)
    timerId = undefined
  }
  return result
}

/**
 * If first promise resolved, rejected or canceled
 * second promise will be caneled
 *
 * @param {Promise} p1
 * @param {Promise} p2
 */
export const cancelSecond = (p1, p2) => {
  if (!p2) return p1
  const result = p1.then(
    x => {
      p2.cancel()
      return x
    },
    x => {
      p2.cancel()
      return x
    },
  )
  // TODO check if p1 already canceled
  // then cancel p2 immediately
  result.cancel = () => {
    p1.cancel()
    p2.cancel()
  }
  return result
}

export const unfetchCancelable = (url, options) => {
  // https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
  let controller = new AbortController()
  const signal = controller.signal
  const result = new Promise((resolve, reject) =>
    unfetch(url, {...options, signal}).then(response => {
      if (response.ok) {
        options && options.onMeta && options.onMeta(response.headers)
        response
          .blob()
          .then(() => image(url))
          .then(resolve)
      } else {
        reject(response.status)
      }
    }, reject),
  )
  result.cancel = () => {
    if (!controller) throw new Error('Already canceled')
    controller.abort()
    controller = undefined
  }
  return result
}

// export const fetchNonCancelable = (url, options) => {
//   return new Promise((resolve, reject) =>
//     fetch(url, options).then(response => {
//       if (response.ok) {
//         options.onMeta && options.onMeta(response.headers)
//         response.arrayBuffer().then(resolve)
//       } else {
//         reject(response.status)
//       }
//     }, reject),
//   )
// }
