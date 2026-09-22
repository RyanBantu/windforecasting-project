import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import './PaperViewer.css'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

export default function PaperViewer() {
  const wrapRef = useRef(null)
  const [numPages, setNumPages] = useState(0)
  const [page, setPage] = useState(1)
  const [width, setWidth] = useState(720)
  const [error, setError] = useState(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return undefined
    const apply = () => setWidth(Math.min(el.clientWidth, 860))
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'ArrowRight') setPage((p) => Math.min(numPages || p, p + 1))
      if (event.key === 'ArrowLeft') setPage((p) => Math.max(1, p - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [numPages])

  return (
    <div className="paper-viewer">
      <div className="paper-toolbar">
        <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
          Previous
        </button>
        <span className="paper-counter">
          Page {page} of {numPages || '—'}
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(numPages || p, p + 1))}
          disabled={!numPages || page >= numPages}
        >
          Next
        </button>
        <a className="paper-open" href="/paper.pdf" target="_blank" rel="noopener noreferrer">
          Open PDF
        </a>
      </div>

      <div className="paper-stage" ref={wrapRef}>
        <Document
          file="/paper.pdf"
          onLoadSuccess={({ numPages: n }) => {
            setNumPages(n)
            setError(null)
          }}
          onLoadError={(err) => setError(err.message || 'The paper could not be loaded.')}
          loading={<p className="paper-status">Loading paper…</p>}
          error={<p className="paper-status error">The paper could not be loaded.</p>}
        >
          <Page
            pageNumber={page}
            width={width}
            renderAnnotationLayer
            renderTextLayer
            loading={<p className="paper-status">Rendering page…</p>}
          />
        </Document>
      </div>

      {error ? <p className="paper-status error">{error}</p> : null}
    </div>
  )
}
