const ALLOWED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
]

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

export function validateImageFile(file) {
  if (!file) {
    return {
      valid: false,
      message: 'Please select an image file.',
    }
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      message: 'Unsupported file type. Please upload a PNG, JPG, or WebP image.',
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      message: 'File is too large. Please upload an image smaller than 10 MB.',
    }
  }

  return {
    valid: true,
    message: '',
  }
}