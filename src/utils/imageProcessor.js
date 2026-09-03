import { ICON_SIZES } from '../constants/iconSizes'

export async function generateIcons(file, onProgress) {
  const image = await loadImage(file)

  const generatedIcons = []

  for (let index = 0; index < ICON_SIZES.length; index++) {
    const icon = ICON_SIZES[index]

    const canvas = document.createElement('canvas')

    canvas.width = icon.size
    canvas.height = icon.size

    const context = canvas.getContext('2d')

    if (!context) {
      throw new Error('Could not create the image processing context.')
    }

    context.clearRect(0, 0, icon.size, icon.size)

    /*
      Keep the original image aspect ratio.

      The image is fitted inside the square canvas instead of
      being stretched or distorted.
    */

    const scale = Math.min(
      icon.size / image.width,
      icon.size / image.height
    )

    const width = image.width * scale
    const height = image.height * scale

    const x = (icon.size - width) / 2
    const y = (icon.size - height) / 2

    context.drawImage(
      image,
      x,
      y,
      width,
      height
    )

    const blob = await canvasToBlob(canvas)

    generatedIcons.push({
      name: icon.name,
      size: icon.size,
      blob,
    })

    if (onProgress) {
      onProgress(
        index + 1,
        ICON_SIZES.length
      )
    }
  }

  return generatedIcons
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => {
      URL.revokeObjectURL(image.src)
      resolve(image)
    }

    image.onerror = () => {
      URL.revokeObjectURL(image.src)
      reject(
        new Error('The image could not be processed.')
      )
    }

    image.src = URL.createObjectURL(file)
  })
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(
            new Error('Failed to generate the image.')
          )
        }
      },
      'image/png'
    )
  })
}