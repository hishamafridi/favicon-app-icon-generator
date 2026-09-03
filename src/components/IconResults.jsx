import { useEffect, useState } from 'react'

function IconResults({
  generatedIcons,
  onDownload,
  onGenerateNew,
  isDownloading,
}) {
  const [previewItems, setPreviewItems] = useState([])

  useEffect(() => {
    const items = generatedIcons.map((icon) => ({
      ...icon,
      previewUrl: URL.createObjectURL(icon.blob),
    }))

    setPreviewItems(items)

    return () => {
      items.forEach((item) => {
        URL.revokeObjectURL(item.previewUrl)
      })
    }
  }, [generatedIcons])

  return (
    <div className="icon-results">

      <div className="success-banner">
        <div className="success-icon">
          ✓
        </div>

        <div>
          <h2>Icon set generated successfully</h2>

          <p>
            {generatedIcons.length} professional icon sizes
            are ready to download.
          </p>
        </div>
      </div>

      <div className="results-header">

        <div>
          <h2>Generated Icons</h2>

          <p>
            Preview each generated size below. All icons are
            provided as PNG files.
          </p>
        </div>

        <div className="results-actions">

          <button
            type="button"
            className="download-button"
            onClick={onDownload}
            disabled={isDownloading}
          >
            {isDownloading
              ? 'Preparing ZIP...'
              : 'Download ZIP'}
          </button>

          <button
            type="button"
            className="new-set-button"
            onClick={onGenerateNew}
            disabled={isDownloading}
          >
            Generate New Set
          </button>

        </div>

      </div>

      <div className="icon-grid">

        {previewItems.map((icon) => (
          <div
            className="icon-card"
            key={icon.name}
          >

            <div className="icon-preview">

              <img
                src={icon.previewUrl}
                alt={`${icon.size} by ${icon.size} icon preview`}
              />

            </div>

            <h3>
              {icon.size} × {icon.size}
            </h3>

            <p>
              {icon.name}
            </p>

          </div>
        ))}

      </div>

      <div className="results-footer">
        <span>
          ✓ Ready for website and app use
        </span>

        <span>
          ✓ PNG format
        </span>

        <span>
          ✓ Multiple resolutions
        </span>
      </div>

    </div>
  )
}

export default IconResults