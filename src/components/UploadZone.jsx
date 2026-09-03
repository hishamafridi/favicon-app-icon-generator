import { useRef, useState } from 'react'
import { validateImageFile } from '../utils/fileValidator'
import { generateIcons } from '../utils/imageProcessor'
import { createIconZip } from '../utils/zipGenerator'
import IconResults from './IconResults'

function UploadZone() {
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [generatedIcons, setGeneratedIcons] = useState([])
  const [isDownloading, setIsDownloading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [totalIcons, setTotalIcons] = useState(0)

  const fileInputRef = useRef(null)

  const processFile = (file) => {
    const result = validateImageFile(file)

    if (!result.valid) {
      setError(result.message)
      return
    }

    setError('')
    setSelectedFile(file)
    setGeneratedIcons([])
    setProgress(0)
    setTotalIcons(0)

    const imageUrl = URL.createObjectURL(file)
    setPreviewUrl(imageUrl)
  }

  const handleChooseFile = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      processFile(file)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)

    const file = event.dataTransfer.files[0]

    if (file) {
      processFile(file)
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setPreviewUrl('')
    setError('')
    setGeneratedIcons([])
    setProgress(0)
    setTotalIcons(0)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleGenerateNew = () => {
    setSelectedFile(null)
    setPreviewUrl('')
    setError('')
    setGeneratedIcons([])
    setProgress(0)
    setTotalIcons(0)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleGenerateIcons = async () => {
    if (!selectedFile) {
      return
    }

    try {
      setError('')
      setIsProcessing(true)
      setProgress(0)
      setTotalIcons(0)

      const icons = await generateIcons(
        selectedFile,
        (completed, total) => {
          setProgress(completed)
          setTotalIcons(total)
        }
      )

      setGeneratedIcons(icons)
    } catch (error) {
      setError('Something went wrong while generating the icons.')
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownloadZip = async () => {
    if (generatedIcons.length === 0) {
      return
    }

    try {
      setError('')
      setIsDownloading(true)

      const zipBlob = await createIconZip(generatedIcons)

      const downloadUrl = URL.createObjectURL(zipBlob)
      const link = document.createElement('a')

      link.href = downloadUrl
      link.download = 'iconforge-icons.zip'

      document.body.appendChild(link)
      link.click()
      link.remove()

      URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      setError('Something went wrong while creating the ZIP file.')
      console.error(error)
    } finally {
      setIsDownloading(false)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const progressPercentage =
    totalIcons > 0
      ? Math.round((progress / totalIcons) * 100)
      : 0

  return (
    <section id="generator" className="upload-section">
      <div className="upload-container">

        <div className="upload-content">

          <div className="hero-badge">
            Fast • Private • Browser-based
          </div>

          <h1>
            Favicon & App Icon
            <span> Generator</span>
          </h1>

          <p className="upload-description">
            Transform one image into a complete set of professional
            favicon and app icons for websites, mobile apps, and PWAs.
          </p>

          <div className="feature-list">
            <span>✓ Multiple sizes</span>
            <span>✓ PNG, JPG & WebP</span>
            <span>✓ ZIP download</span>
          </div>

          {!selectedFile ? (
            <div
              className={`upload-box ${
                isDragging ? 'dragging' : ''
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              role="region"
              aria-label="Image upload area"
            >

              <div className="upload-icon">
                ↑
              </div>

              <h2>Upload your image</h2>

              <p>
                Drag and drop your image here, or choose a file
                from your device.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
                hidden
              />

              <button
                type="button"
                className="upload-button"
                onClick={handleChooseFile}
              >
                Choose Image
              </button>

              {error && (
                <p className="error-message" role="alert">
                  {error}
                </p>
              )}

              <span className="upload-info">
                PNG, JPG or WebP · Maximum file size: 10 MB
              </span>

            </div>
          ) : (
            <div className="file-preview">

              <div className="preview-heading">
                <span className="status-dot"></span>
                Image ready
              </div>

              <div className="preview-image-container">
                <img
                  src={previewUrl}
                  alt="Selected image preview"
                  className="preview-image"
                />
              </div>

              <div className="file-details">
                <h2>{selectedFile.name}</h2>

                <p>
                  {formatFileSize(selectedFile.size)} · Ready to generate
                </p>
              </div>

              {isProcessing && (
                <div className="processing-container">

                  <div className="processing-top">
                    <p className="processing-message">
                      Generating icons...
                    </p>

                    <span>
                      {progressPercentage}%
                    </span>
                  </div>

                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuenow={progressPercentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label="Icon generation progress"
                  >
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${progressPercentage}%`,
                      }}
                    ></div>
                  </div>

                  <p className="progress-status">
                    Creating icon {progress} of {totalIcons}
                  </p>

                </div>
              )}

              <div className="preview-actions">

                <button
                  type="button"
                  className="generate-button"
                  onClick={handleGenerateIcons}
                  disabled={isProcessing || isDownloading}
                >
                  {isProcessing
                    ? 'Generating...'
                    : 'Generate Icons'}
                </button>

                <button
                  type="button"
                  className="upload-button secondary-button"
                  onClick={handleChooseFile}
                  disabled={isProcessing || isDownloading}
                >
                  Change Image
                </button>

                <button
                  type="button"
                  className="remove-button"
                  onClick={handleRemoveFile}
                  disabled={isProcessing || isDownloading}
                >
                  Remove
                </button>

              </div>

              {error && (
                <p className="error-message" role="alert">
                  {error}
                </p>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
                hidden
              />

              {generatedIcons.length > 0 && (
                <IconResults
                  generatedIcons={generatedIcons}
                  onDownload={handleDownloadZip}
                  onGenerateNew={handleGenerateNew}
                  isDownloading={isDownloading}
                />
              )}

            </div>
          )}

          {!selectedFile && (
            <div className="privacy-note">
              🔒 Your image is processed locally in your browser.
              It is not uploaded to a server.
            </div>
          )}

        </div>

      </div>
    </section>
  )
}

export default UploadZone