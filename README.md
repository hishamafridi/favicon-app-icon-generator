# IconForge — Favicon & App Icon Generator

IconForge is a browser-based tool that converts a single image into multiple favicon and app icon sizes for websites, mobile applications, and Progressive Web Apps (PWAs).

The application provides a simple workflow: upload an image, generate the required icon sizes, preview the results, and download the complete icon set as a ZIP file.

## Features

* Drag-and-drop image upload
* File picker support
* PNG, JPG/JPEG, and WebP input support
* File type validation
* Maximum 10 MB file-size validation
* Image preview before generation
* Automatic generation of multiple icon sizes
* Aspect-ratio-preserving image processing
* Generation progress indicator
* Clear error messages
* Generated icon previews
* Download all generated icons as a ZIP file
* Generate a new icon set without refreshing the page
* Change or remove the selected image
* Responsive design for desktop, tablet, and mobile
* Keyboard-accessible interactive controls
* Browser-based image processing for improved privacy

## Generated Icon Sizes

IconForge currently generates the following PNG files:

| File                   |      Size | Purpose                      |
| ---------------------- | --------: | ---------------------------- |
| `favicon-16x16.png`    |   16 × 16 | Small browser/favicon use    |
| `favicon-32x32.png`    |   32 × 32 | Standard favicon use         |
| `favicon-48x48.png`    |   48 × 48 | Larger favicon/display use   |
| `apple-touch-icon.png` | 180 × 180 | Apple touch icon             |
| `icon-192x192.png`     | 192 × 192 | PWA/app icon                 |
| `icon-512x512.png`     | 512 × 512 | High-resolution PWA/app icon |

## Supported Input Formats

IconForge accepts:

* PNG
* JPG/JPEG
* WebP

Maximum supported file size:

**10 MB**

## Technologies Used

* React
* Vite
* JavaScript
* HTML5 Canvas API
* CSS3
* JSZip

## How It Works

### 1. Upload

The user selects an image using the file picker or drags and drops an image into the upload area.

The application validates the file type and size before accepting it.

### 2. Generate

The selected image is processed using the browser's Canvas API.

The image is fitted into square canvases while preserving its original aspect ratio. Multiple PNG resolutions are then generated automatically.

### 3. Preview

The generated icons are displayed in a responsive preview grid so the user can inspect each size.

### 4. Download

The generated PNG files are packaged into a ZIP archive using JSZip and downloaded together.

## Privacy

Image processing is performed locally in the user's browser.

The uploaded image does not need to be sent to a backend server for icon generation.

This helps keep the user's source image private.

## Project Structure

```text
favicon-app-icon-generator/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── UploadZone.jsx
│   │   ├── IconResults.jsx
│   │   └── HowItWorks.jsx
│   ├── constants/
│   │   └── iconSizes.js
│   ├── utils/
│   │   ├── fileValidator.js
│   │   ├── imageProcessor.js
│   │   └── zipGenerator.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Installation

Clone the repository and open the project directory:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd favicon-app-icon-generator
```

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will then be available at the local development URL shown in the terminal.

## Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Future Improvements

Possible future improvements include:

* ICO favicon generation
* Automatic `site.webmanifest` generation
* Additional platform-specific icon sizes
* Custom background and padding controls
* Shape and mask options for app icons
* More export formats
* Individual icon download buttons
* Advanced PWA icon configuration

## Project Status

The current version implements the core favicon and app icon generation workflow, including validation, image processing, progress feedback, result previews, ZIP export, reset functionality, and responsive design.

Built as part of a Week 3 internship project.

## Lighthouse Audit

The deployed application was tested using Google Lighthouse on a mobile emulation profile.

| Category | Score |
|---|---:|
| Performance | 74 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 90 |

The audit was used to perform a quick performance, accessibility, best-practices, and SEO check before final submission.

### Audit Highlights

- Accessibility: **100/100**
- Best Practices: **100/100**
- Performance: **74/100**
- SEO: **90/100**
- Cumulative Layout Shift (CLS): **0**
- First Contentful Paint (FCP): **2.0 s**
- Largest Contentful Paint (LCP): **2.0 s**

The remaining Lighthouse recommendations are mainly optimization opportunities and do not prevent the application from functioning correctly.