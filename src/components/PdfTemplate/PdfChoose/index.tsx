import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import BarlowBold from "../../../assets/fonts/Barlow-Bold.ttf";
import BarlowMedium from "../../../assets/fonts/Barlow-Medium.ttf";

Font.register({
  family: "BarlowBold",
  src: BarlowBold,
  familyMedium: "BarlowMedium",
  scr: BarlowMedium,
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
    fontSize: 11,
    fontFamily: "BarlowMedium",
  },
  oneMarkAnswerContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "90%",
    padding: 5,
  },
  oneMarkAnswer: {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "left",
  },
});

const Data = [
  {
    questions:
      "1.  What is the difference between Virtual DOM and Real DOM? What is the difference between Virtual DOM and Real DOM?",
    optionA: "a.) One",
    optionB: "b.) Two",
    optionC: "c.) Three",
    optionD: "d.) Five",
  },
  {
    questions: "2. What is the difference between Virtual DOM and Real DOM?",
    optionA: "a.) One",
    optionB: "b.) Two",
    optionC: "c.) Three",
    optionD: "d.) Five",
  },
  {
    questions:
      "3. What is the difference between Virtual DOM and Real DOM Virtual DOM and Real? ",
    optionA: "a.) One",
    optionB: "b.) Two",
    optionC: "c.) Three",
    optionD: "d.) Five",
  },
];

const PdfChoose: React.FC = () => {
  return (
    <PDFViewer style={styles.pdfViewer}>
      <Document>
        <Page style={styles.page}>
          {Data.map((f, index) => {
            return (
              <View key={index}>
                <Text
                  style={{
                    fontSize: "12px",
                    fontFamily: "BarlowBold",
                    lineHeight: "1.5px",
                  }}
                >
                  {f.questions}
                </Text>
                <View style={styles.oneMarkAnswerContent}>
                  <View style={styles.oneMarkAnswer}>
                    <Text style={styles.text}>{f.optionA}</Text>
                    <Text style={styles.text}>{f.optionC}</Text>
                  </View>
                  <View style={styles.oneMarkAnswer}>
                    <Text style={styles.text}>{f.optionB}</Text>
                    <Text style={styles.text}>{f.optionD}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfChoose;
