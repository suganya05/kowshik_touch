import React from "react";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import BarlowBold from "../../../assets/fonts/Barlow-Bold.ttf";

Font.register({
  family: "BarlowMedium",
  src: BarlowBold,
});

const styles = StyleSheet.create({
  pdfViewer: {
    width: 1000,
    height: 1000,
    border: "none",
  },
  page: {
    padding: "30px 50px",
  },
  text: {
    fontSize: "12px",
    padding: "5px 0",
    fontFamily: "BarlowBold",
    lineHeight: 1.5,
  },
});

const Data = [
  {
    question:
      "1. What is the difference between Virtual DOM and Real DOM ______",
  },
  {
    question:
      "2. What is the difference between Virtual DOM and Real DOM _______",
  },
  {
    question: "3. What is the difference between Virtual DOM  _______",
  },
  {
    question:
      "4. What is the difference between Virtual DOM and Real DOM _______",
  },
  {
    question:
      "5. What is the difference between Virtual DOM and Real DOM _______",
  },
];

const PdfFullUps: React.FC = () => {
  return (
    <PDFViewer style={styles.pdfViewer}>
      <Document>
        <Page style={styles.page}>
          {Data.map((f, index) => {
            return (
              <div key={index}>
                <Text style={styles.text}>{f.question}</Text>
              </div>
            );
          })}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfFullUps;
