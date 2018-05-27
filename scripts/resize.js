#!/usr/bin/env node

const fs = require('fs')
const sharp = require('sharp')

const widths = [360, 750, 1440, 1920]

const fileWithWidth = (file, width, extension = '$1') =>
  file.replace(/\.(jpe?g|png)$/i, `-${width}.${extension}`)

const resize = file => {
  const original = sharp(file)
  const resizedFiles = []
  const originalWebp = new Promise((resolve, reject) => {
    original.toBuffer((err, data, info) => {
      if (err) return reject(err)
      fs
        .createReadStream(file)
        .pipe(fs.createWriteStream(fileWithWidth(file, info.width)))
      original
        .toFile(fileWithWidth(file, info.width, 'webp'))
        .then(resolve, reject)
    })
  })
  resizedFiles.push(originalWebp)
  widths.forEach(width => {
    const resized = original.resize(width)
    resizedFiles.push(resized.toFile(fileWithWidth(file, width)))
    resizedFiles.push(resized.toFile(fileWithWidth(file, width, 'webp')))
  })
  return Promise.all(resizedFiles)
}

resize(process.argv[2])
  .then(() => console.log('ok'))
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
