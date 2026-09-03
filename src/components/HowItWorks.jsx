function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="how-it-works-container">

        <div className="section-heading">
          <span className="section-label">
            Simple workflow
          </span>

          <h2>
            Create your icons in three steps
          </h2>

          <p>
            Upload your image, generate the required sizes,
            and download everything in one ZIP file.
          </p>
        </div>

        <div className="steps-grid">

          <article className="step-card">
            <div className="step-number">01</div>

            <h3>Upload your image</h3>

            <p>
              Choose a PNG, JPG, or WebP image from your device,
              or drag and drop it into the upload area.
            </p>
          </article>

          <article className="step-card">
            <div className="step-number">02</div>

            <h3>Generate icon sizes</h3>

            <p>
              IconForge automatically creates multiple optimized
              PNG sizes suitable for websites, apps, and PWAs.
            </p>
          </article>

          <article className="step-card">
            <div className="step-number">03</div>

            <h3>Download your icons</h3>

            <p>
              Preview the generated icons and download the complete
              icon set together as a convenient ZIP file.
            </p>
          </article>

        </div>

      </div>
    </section>
  )
}

export default HowItWorks