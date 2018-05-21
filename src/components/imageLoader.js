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
  const result = new Promise((resolve, reject) => {
    timerId = setTimeout(resolve, threshold)
  })
  result.cancel = () => {
    if (!timerId) throw new Error('Already canceled')
    clearTimeout(timerId)
    timerId = undefined
  }
  return result
}

/**
 * If first promise resolved, rejected or canceled
 * second also will be caneled
 *
 * @param {Promise} i
 * @param {Promise} t
 */
export const cancelSecond = (i, t) => {
  const result = i.then(
    x => {
      t.cancel()
      return x
    },
    x => {
      t.cancel()
      return x
    },
  )
  // TODO check if 1 already canceled
  // then cancel 2 immediately
  result.cancel = () => {
    t.cancel()
    i.cancel()
  }
  return result
}

// const load = () => {
//   const i = image(src)
//   const t = timeout(threshold)
//   cancelSecond(i, t)
// }
