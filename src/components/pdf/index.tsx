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
import BarlowMedium from "../../assets/fonts/Barlow-Medium.ttf";
// import BarlowBold from "../../assets/fonts/Barlow-Bold.ttf";
// import BarlowRegular from "../../assets/fonts/Barlow-Regular.ttf";
// import BarlowSemiBold from "../../assets/fonts/Barlow-SemiBold.ttf";

Font.register({
  family: "BarlowMedium",
  src: BarlowMedium,
});

const styles = StyleSheet.create({
  page: {
    padding: "10px 50px",
  },
  oneMarkContent: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: "BarlowMedium",
  },
  oneMarkAnsContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
  },
  oneMarkAnswer: {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "left",
  },
  pdfViewer: {
    width: 1000,
    height: 1000,
    border: "none",
  },
});

interface IPdfPage {
  sectionData?: any;
}
const PdfPage: React.FC<IPdfPage> = ({ sectionData }) => {
  console.log(sectionData);
  return (
    <PDFViewer style={styles.pdfViewer}>
      <Document>
        <Page style={styles.page}>
          <View style={styles.oneMarkContent}>
            <Text style={styles.text}>
              1. What is the difference between Virtual DOM and Real DOM?
            </Text>
            <View style={styles.oneMarkAnsContent}>
              <View style={styles.oneMarkAnswer}>
                <Text style={styles.text}>a.) One</Text>
                <Text style={styles.text}>c.) Three</Text>
              </View>
              <View style={styles.oneMarkAnswer}>
                <Text style={styles.text}>b.) Two</Text>
                <Text style={styles.text}>d.) Five</Text>
              </View>
            </View>

            <Text style={styles.text}>
              2. What is the difference between Virtual DOM and Real DOM?
            </Text>
            <View style={styles.oneMarkAnsContent}>
              <View style={styles.oneMarkAnswer}>
                <Text style={styles.text}>Measure of Triangle</Text>
                <Text style={styles.text}>i.) 3 Side of equal length</Text>
                <Text style={styles.text}>ii.) 2 Side of equal length</Text>
                <Text style={styles.text}>iii.) 2 Side of equal length</Text>
                <Text style={styles.text}>iv.) 2 Side of equal length</Text>
              </View>
              <View style={styles.oneMarkAnswer}>
                <Text style={styles.text}>Types of Triangle</Text>
                <Text style={styles.text}>a.) Scalene</Text>
                <Text style={styles.text}>b.) Isosceles right angle</Text>
                <Text style={styles.text}>c.) Isosceles right angle</Text>
                <Text style={styles.text}>d.) Isosceles right angle</Text>
              </View>
            </View>

            <Text style={styles.text}>
              3. What is the difference between Virtual DOM and Real DOM _______
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfPage;
