import React from "react";
import Pdf from "../../components/pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

const PdfPage: React.FC = () => {
  return (
    <div>
      <Pdf />
      <PDFDownloadLink document={<Pdf />} fileName="FORM">
        {({ loading }) =>
          loading ? (
            <button>Loading Document...</button>
          ) : (
            <button>Download</button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default PdfPage;
