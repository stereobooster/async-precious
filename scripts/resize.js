#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const crypto = require('crypto')
const hash = crypto.createHash('sha512')

const widths = [360, 750, 1440, 1920].reverse()

const fileName = ({file, width, extension, digest}) => {
  extension = extension || '$1'
  digest = digest ? `.${digest}` : ''
  width = width ? `-${width}` : ''
  return file.replace(/\.(jpe?g|png)$/i, `${width}${digest}.${extension}`)
}

const getDigest = data =>
  hash
    .update(data)
    .digest('base64')
    .replace(/[\/\+=]/g, '')
    .substring(0, 10)

const getLqip = (sharpInstance, format) =>
  sharpInstance
    .resize(20)
    .toBuffer()
    .then(data => {
      return `data:image/${format};base64,${data.toString('base64')}`
    })

const getInfo = sharpInstance =>
  new Promise((resolve, reject) => {
    sharpInstance.toBuffer((err, data, info) => {
      if (err) return reject(err)
      const {width, format, height, size} = info
      const digest = getDigest(data)
      return resolve({width, height, size, digest, format})
    })
  })

const writeFile = ({filename, data}) =>
  new Promise((resolve, reject) =>
    fs.writeFile(
      filename,
      data,
      'UTF-8',
      err => (err ? reject(err) : resolve()),
    ),
  )

const resize = async file => {
  const original = sharp(file)
  const info = await getInfo(original)
  const {width, digest, format} = info
  const resizedFiles = []
  const availableWidths = widths.filter(x => x < width)
  availableWidths.unshift(width)
  availableWidths.forEach(width => {
    const resized = original.resize(width)
    resizedFiles.push(resized.toFile(fileName({file, width, digest})))
    resizedFiles.push(
      resized.toFile(fileName({file, width, extension: 'webp', digest})),
    )
  })
  let resizedInfos = await Promise.all(resizedFiles)
  resizedInfos = resizedInfos.map(({format, width, size}) => ({
    format,
    width,
    size,
  }))
  // info
  const lqip = await getLqip(sharp(file), format)
  const {name, ext} = path.parse(file)
  return writeFile({
    filename: fileName({file, extension: 'json'}),
    data: JSON.stringify({
      ...info,
      lqip,
      name,
      ext,
      sizes: resizedInfos,
    }),
  })
}

resize(process.argv[2])
  .then(() => console.log('ok'))
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
