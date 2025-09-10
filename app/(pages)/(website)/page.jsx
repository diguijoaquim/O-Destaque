import FlipbookViewer from '@/app/_components/ui/flipbook-viewer/flipbook-viewer'
import React from 'react'

const Page = () => {
  return (
    <div className="block">
      <FlipbookViewer pdfUrl='https://file-examples.com/storage/fe43bb696b68c0a979c1a06/2017/10/file-example_PDF_1MB.pdf' />
    </div>
  )
}

export default Page