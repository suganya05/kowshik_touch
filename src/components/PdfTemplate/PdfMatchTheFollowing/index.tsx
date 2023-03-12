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
import BarlowMedium from "../../../assets/fonts/Barlow-Medium.ttf";

Font.register({
  family: "BarlowMedium",
  src: BarlowMedium,
});

const styles = StyleSheet.create({
  pdfViewer: {
    width: 1000,
    height: 1000,
    border: "none",
  },
  page: {
    padding: "40px 0px",
  },
  viewContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    fontSize: 11,
    fontFamily: "BarlowMedium",
    lineHeight: "1.5px",
  },
  flexContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "64%",
    padding: 5,
  },
  heading: {
    marginBottom: 5,
    fontSize: 16,
    fontFamily: "BarlowMedium",
  },
});

const Demo = [
  {
    question: "What is the difference between Virtual DOM and Real DOM?",
    questionI: "i.) 3 Side of equal length",
    questionII: "ii.) 2 Side of equal length",
    questionIII: "iii.) 2 Side of equal length",
    questionIV: "iv.) 2 Side of equal length",
    optionA: "a.) Scalene",
    optionB: "b.) Isosceles right angle",
    optionC: "c.) Isosceles right angle",
    optionD: "d.) Isosceles right angle",
  },
  {
    question: "What is the difference between Virtual DOM and Real DOM?",
    questionI: "i.) 3 Side of equal length",
    questionII: "ii.) 2 Side of equal length",
    questionIII: "iii.) 2 Side of equal length",
    questionIV: "iv.) 2 Side of equal length",
    optionA: "a.) Scalene",
    optionB: "b.) Isosceles right angle",
    optionC: "c.) Isosceles right angle",
    optionD: "d.) Isosceles right angle",
  },
  {
    question: "What is the difference between Virtual DOM and Real DOM?",
    questionI: "i.) 3 Side of equal length",
    questionII: "ii.) 2 Side of equal length",
    questionIII: "iii.) 2 Side of equal length",
    questionIV: "iv.) 2 Side of equal length",
    optionA: "a.) Scalene",
    optionB: "b.) Isosceles right angle",
    optionC: "c.) Isosceles right angle",
    optionD: "d.) Isosceles right angle",
  },
];

const PdfMatchTheFollowing: React.FC = () => {
  return (
    <PDFViewer style={styles.pdfViewer}>
      <Document>
        <Page style={styles.page}>
          {/* <Text
            style={{
              fontSize: "12px",
              color: "red",
              fontFamily: "BarlowBold",
              marginBottom: "8px",
              marginLeft: "120px",
            }}
          >
            Choose the correct answer:
          </Text> */}
          {Demo.map((f, index) => {
            return (
              <View style={styles.viewContent} key={index}>
                <Text style={{ fontSize: "12px", fontFamily: "BarlowBold" }}>
                  {index + 1}. {f.question}
                </Text>
                <View style={styles.flexContent}>
                  <View>
                    <Text style={styles.text}>{f.questionI}</Text>
                    <Text style={styles.text}>{f.questionII}</Text>
                    <Text style={styles.text}>{f.questionIII}</Text>
                    <Text style={styles.text}>{f.questionIV}</Text>
                  </View>
                  <View>
                    <Text style={styles.text}>{f.optionA}</Text>
                    <Text style={styles.text}>{f.optionB}</Text>
                    <Text style={styles.text}>{f.optionC}</Text>
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

export default PdfMatchTheFollowing;
