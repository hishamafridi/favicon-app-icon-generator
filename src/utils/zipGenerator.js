import JSZip from 'jszip'

export async function createIconZip(generatedIcons) {
  const zip = new JSZip()

  generatedIcons.forEach((icon) => {
    zip.file(icon.name, icon.blob)
  })

  const zipBlob = await zip.generateAsync({
    type: 'blob',
  })

  return zipBlob
}