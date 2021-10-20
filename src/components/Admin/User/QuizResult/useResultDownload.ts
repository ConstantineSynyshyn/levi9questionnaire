import { useCallback } from "react"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"

const useResultDownload = (elementId: string, email: string) => {
  return useCallback((cb?: () => void) => {
    const element = document?.getElementById(elementId)
    if (element) {
      // @ts-ignore
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL("image/png")
        const imgWidth = 210
        const pageHeight = 295
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        let heightLeft = imgHeight
        const doc = new jsPDF("p", "mm", "a4")
        let position = 0

        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight
          doc.addPage()
          doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
          heightLeft -= pageHeight
        }
        doc.save(`${email}.pdf`)
        if (cb) {
          cb()
        }
      })
    }
  }, [elementId, email])
}

export default useResultDownload
