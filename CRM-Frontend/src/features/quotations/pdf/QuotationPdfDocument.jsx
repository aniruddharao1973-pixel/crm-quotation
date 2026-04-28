// src\features\quotations\pdf\QuotationPdfDocument.jsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../../assets/micrologic_logo.png";
import { proposalData } from "./data/proposalData";

const styles = StyleSheet.create({
  page: {
    paddingTop: 24,
    paddingBottom: 22,
    paddingHorizontal: 26,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#374151",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingBottom: 10,
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  logoRow: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  logoImage: {
    width: 160,
    height: 40,
    objectFit: "contain",
  },
  tagline: {
    fontSize: 8,
    color: "#2563EB",
    marginTop: 2,
    letterSpacing: 0.5,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  metaBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
    marginHorizontal: 3,
  },
  metaLabel: {
    backgroundColor: "#F1F5F9",
    paddingVertical: 3,
    paddingHorizontal: 6,
    fontSize: 8,
    fontWeight: "bold",
    color: "#4B5563",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },
  metaValue: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    fontSize: 8,
    color: "#2563EB",
  },
  pageTitleWrap: {
    alignItems: "center",
    marginBottom: 12,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    letterSpacing: 1,
    textAlign: "center",
  },
  titleUnderline: {
    width: 60,
    height: 3,
    backgroundColor: "#2563EB",
    marginTop: 6,
    borderRadius: 2,
  },
  sectionCard: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  sectionCardSoft: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "#F9FBFF",
  },
  sectionHeaderBlue: {
    backgroundColor: "#EFF6FF",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  sectionHeaderSoft: {
    backgroundColor: "#EEF2FF",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    borderLeftWidth: 4,
    borderLeftColor: "#2563EB",
  },
  sectionHeaderTextBlue: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#2563EB",
  },
  sectionHeaderTextDark: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: "#1E3A8A",
    letterSpacing: 0.3,
  },
  cardBody: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  infoRowNoGap: {
    flexDirection: "row",
  },
  infoLabel: {
    width: "28%",
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#111827",
    paddingRight: 6,
  },
  infoValueText: {
    width: "72%",
    fontSize: 8.5,
    color: "#4B5563",
    lineHeight: 1.35,
  },
  infoValueNode: {
    width: "70%",
  },
  paragraph: {
    fontSize: 8.5,
    lineHeight: 1.45,
    color: "#4B5563",
    marginBottom: 6,
    textAlign: "justify",
  },
  highlightBox: {
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
    backgroundColor: "#FFFBEB",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 6,
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 8.3,
    lineHeight: 1.4,
    color: "#92400E",
    fontWeight: "bold",
  },
  tableWrap: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2563EB",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tableRowLast: {
    flexDirection: "row",
  },
  tableCellHeader: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontSize: 8,
    fontWeight: "bold",
    color: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.22)",
  },
  tableCell: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontSize: 8,
    color: "#4B5563",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    lineHeight: 1.35,
  },
  tableCellLast: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontSize: 8,
    color: "#4B5563",
    lineHeight: 1.35,
  },
  tableCellHighlighted: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontSize: 8,
    color: "#2563EB",
    fontWeight: "bold",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    lineHeight: 1.35,
  },
  tableCellHighlightedLast: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontSize: 8,
    color: "#2563EB",
    fontWeight: "bold",
    lineHeight: 1.35,
  },
  footer: {
    marginTop: "auto",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  footerLeft: {
    flex: 1,
  },
  footerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  footerMain: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 2,
  },
  footerSub: {
    fontSize: 7.8,
    color: "#9CA3AF",
    fontStyle: "italic",
    marginBottom: 1,
  },
  footerRightText: {
    fontSize: 7.8,
    color: "#9CA3AF",
    fontStyle: "italic",
    marginBottom: 1,
    textAlign: "right",
  },
  bulletLine: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bulletMark: {
    width: 10,
    fontSize: 8,
    color: "#4B5563",
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    color: "#374151",
    lineHeight: 1.5,
  },
  twoColGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  modelCard: {
    width: "49%",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  modelTitle: {
    fontSize: 8.3,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 4,
  },
  modelDesc: {
    fontSize: 8,
    color: "#4B5563",
    lineHeight: 1.35,
  },
  stepWrap: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 5,
    padding: 10,
  },
  stepRow: {
    flexDirection: "row",
    marginBottom: 9,
  },
  stepCircleWrap: {
    width: 22,
    alignItems: "center",
  },
  stepCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNum: {
    color: "#FFFFFF",
    fontSize: 7.5,
    fontWeight: "bold",
  },
  stepLine: {
    width: 1,
    flex: 1,
    backgroundColor: "#DBEAFE",
    marginTop: -1,
  },
  stepContent: {
    flex: 1,
    paddingLeft: 8,
  },
  stepTitle: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 8,
    color: "#4B5563",
    lineHeight: 1.35,
  },
  centeredIntro: {
    fontSize: 8.2,
    color: "#4B5563",
    lineHeight: 1.4,
    marginBottom: 8,
  },
  categoryBox: {
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 7,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 8.3,
    fontWeight: "bold",
    color: "#2563EB",
  },
  tinyMuted: {
    fontSize: 7.8,
    color: "#4B5563",
    lineHeight: 1.35,
  },
});

const bankDetails = [
  { label: "Account Name", value: "MICROLOGIC INTEGRATED SYSTEMS (P) LIMITED" },
  { label: "Bank Name", value: "HDFC Bank Ltd" },
  { label: "Branch", value: "Kumbalagodu Branch, Bengaluru" },
  { label: "Account Number", value: "50200012345678" },
  { label: "IFSC Code", value: "HDFC0001234" },
  { label: "Account Type", value: "Current Account" },
  { label: "MICR Code", value: "560240123" },
];

const statutoryDetails = [
  { label: "PAN Number", value: "AABCM1234P" },
  { label: "GSTIN", value: "29AABCM1234P1Z5" },
  { label: "State Code", value: "29 (Karnataka)" },
  { label: "MSME Reg No.", value: "UDYAM-KR-03-0123456" },
];

const models = [
  {
    title: "1. Fixed Price Model",
    desc: "Ideal for projects with well-defined requirements and scope. We provide a fixed quote and timeline, ensuring predictable costs and delivery schedules.",
  },
  {
    title: "2. Time & Material",
    desc: "Suitable for projects where scope is fluid or evolving. Billing is based on actual hours spent and materials used, offering maximum flexibility.",
  },
  {
    title: "3. Dedicated Team",
    desc: "We provide a dedicated team of experts who work exclusively on your project, acting as an extension of your own workforce.",
  },
  {
    title: "4. Support & Maintenance",
    desc: "Ongoing support post-deployment, ensuring system uptime, regular updates, and quick resolution of any issues.",
  },
];

const benefits = [
  "Flexibility to choose the model that best fits your project needs.",
  "Transparent communication and regular progress updates.",
  "Access to a pool of highly skilled and experienced professionals.",
  "Focus on delivering high-quality solutions on time and within budget.",
];

const processSteps = [
  {
    title: "Requirement Analysis & Kickoff",
    description:
      "Detailed review of customer requirements, finalizing the scope of work, and official project kickoff meeting.",
  },
  {
    title: "Design Approval Process (DAP)",
    description:
      "Submission of preliminary designs for customer review. Iterations and final approval of the design before manufacturing begins.",
  },
  {
    title: "Procurement & Manufacturing",
    description:
      "Sourcing of necessary components and materials. Fabrication and assembly of the equipment as per approved designs.",
  },
  {
    title: "Internal Testing & Validation",
    description:
      "Rigorous testing of the equipment at our facility to ensure it meets all functional and performance specifications.",
  },
  {
    title: "Factory Acceptance Test (FAT)",
    description:
      "Customer inspection and testing of the equipment at our facility before dispatch.",
  },
  {
    title: "Dispatch & Delivery",
    description:
      "Safe packaging and transportation of the equipment to the customer site.",
  },
  {
    title: "Installation & Commissioning",
    description:
      "On-site installation, integration, and final commissioning of the equipment.",
  },
  {
    title: "Site Acceptance Test (SAT) & Handover",
    description:
      "Final testing at the customer site, user training, and official handover of the equipment.",
  },
];

const commercialTermsRows = [
  {
    no: "1",
    heading: "PRICE BASIS",
    lines: ["Ex-Works Micrologic, Duties, Taxes, Freight, Insurance Extra"],
  },
  {
    no: "2",
    heading: "DELIVERY",
    lines: [
      "As above from the date of receipt of the Purchase order & advance",
    ],
  },
  {
    no: "3",
    heading: "PAYMENT TERMS",
    lines: [
      "Stage 1: Advance (Down payment) 50% of the order value, along with the Purchase Order",
      "Payment to be released within 1 week from the date of Pro forma Invoice to keep up the committed delivery time.",
      "Stage 2: 40% of the order value + Taxes before dispatch on validation at Micrologic",
      "Stage 3: 10% of the order value against Installation & Commissioning",
    ],
  },
  {
    no: "4",
    heading: "Goods and Service Tax",
    lines: ["GST as above", "Or as applicable at the time of delivery"],
  },
  {
    no: "5",
    heading: "Warranty",
    lines: [
      "12 Months from the date of Invoice for Manufacturing Defects (Refer Micrologic General Warranty Terms below)",
    ],
  },
  {
    no: "6",
    heading: "Transit Insurance",
    lines: ["Buyers account"],
  },
  {
    no: "7",
    heading: "Equipment Validation & Acceptance",
    lines: [
      "The equipment will be fully tested in house prior to FAT (Factory Acceptance Test) and SAT (Site Acceptance Test). Our in-house test procedures will be in line with the Requirement Specification (RS) signed off by the Customer in the beginning of the Project.",
    ],
  },
  {
    no: "8",
    heading: "Inspection",
    lines: [
      "Inspection and validation by the customer.",
      "We suggest to validate with at least 100 samples",
    ],
  },
  {
    no: "9",
    heading: "Validity",
    lines: ["This quote is valid for 2 months from date"],
  },
  {
    no: "10",
    heading: "Placement of Purchase Order",
    lines: [
      "Please make the purchase order on:",
      "Micrologic Integrated Systems (P) Limited",
      "#22-D1, “Micrologic Drive”, KIADB Industrial Area, Phase 1, Kumbalagodu (Bengaluru-Mysuru Highway), Bengaluru-560 074, India",
    ],
  },
  {
    no: "11",
    heading: "Force Majeure",
    lines: [
      "The event either party is unable to perform its obligations under the terms of this Agreement because of acts of God, strikes, lockdowns, curfews, effects due to pandemic, equipment or transmission failure or damage reasonably beyond its control, or other causes reasonably beyond its control, such party shall not be liable for damages to the other for any damages resulting from such failure to perform or otherwise from such causes.",
    ],
  },
];

const delayedDeliveryRow = {
  no: "12",
  heading:
    "Delayed Delivery of the Project due to delays at customer’s end or force majeure",
  lines: [
    "In the event the customer does not take the delivery of the Project beyond 3 weeks of the readiness of the project at our factory or hold from the customer’s end for any other reason, the customer is liable to make the payment that is due as per the agreed terms with applicable taxes. Micrologic will intimate the readiness of the project with an internal test report.",
    "The reasons for such delays could be due to customer’s changed timelines, Lockdown/Curfew due to pandemic or any reasons causing a delay for the customer to take the delivery.",
  ],
};

const orderCancellationNotes = [
  "The deliverables proposed vide this proposal are completely customized and will be made specifically against your order. In order to deliver the project/product, there will be a set of stages which includes concept design, detailed design, software development, part manufacturing, integration, test & validation before it is ready for shipping. All these stages have cost content in effort & material.",
  "Orders once placed, and Micrologic accepts the order with an order acceptance, to meet the timelines, as a process the work begins internally.",
  "Cancellation of an order will have impact on the costs incurred at different stages;",
];

const cancellationItems = [
  { no: "1", text: "Order cancellation within 7 days of OA,\nNo charges" },
  {
    no: "2",
    text: "Cancellation of the order before DAP Signoff\n25% of the order value will be payable",
  },
  {
    no: "3",
    text: "Cancellation of the order after DAP Signoff\n50% of the order value will be payable",
  },
  {
    no: "4",
    text: "Cancellation of the order once the manufacturing has started\n100% of the order value will be payable",
  },
];

const noteItems = [
  "For Fast track deliveries with delivery timelines lesser than 7 days are not cancellable. 100% of the order value is payable",
  "For advances received, the cost as above will be forfeited at respective stages. The customer is deemed committed to pay the difference, where applicable",
  "For delayed payments an interest @2.5% per month",
];

const engagementRows = [
  {
    no: "1.1",
    heading: "Software",
    lines: [
      "The software applications (Suite) are the product and property of Micrologic and are licensed to the user under the license agreement. All Intellectual Properties (IP) used are property of the respective owners.",
      "The software suite cannot be reused without prior licensing from Micrologic.",
      "This model of engagement will not allow sharing, part or full source codes/snippets.",
    ],
  },
  {
    no: "1.2",
    heading: "Software Engagement Models",
    lines: [],
  },
  {
    no: "1.3",
    heading: "Application Development",
    lines: [
      "In this engagement model, a software application (software suite) will be supplied. The application remains a property of Micrologic and will be licensed to the buyer.",
    ],
  },
  {
    no: "1.4",
    heading: "Time and Effort",
    lines: [
      "In this engagement model, the software will be built for a given specification and the software will be the buyer’s property. Micrologic will charge on a Time and Effort basis, wherein the Man-hours spent on software development will be charged. The software can either be developed at Micrologic or at the buyer’s premises as necessary. The source code will be the property of the buyer.",
    ],
  },
  {
    no: "1.5",
    heading: "Modifications & Additions",
    lines: [
      "A DAP process will be followed where in the design and the requirement is discussed and vetted by the user. Modifications post DAP will call for a cost and time implication, to be borne by the buyer. Minor and reasonable modifications with respect to the requirement specifications can be made with mutual understanding from the seller and buyer.",
      "Modifications or additions requiring material and additional time and effort might call for a change in delivery time and there might be cost implications.",
    ],
  },
  {
    no: "1.6",
    heading: "Time lines",
    lines: [
      "Time lines quoted will be adhered by Micrologic. Where the buyer has to provide details like drawings, information, samples, if delayed from the buyer’s end, which would affect the project time lines, the affect of the delays will be borne by the buyer.",
      "If the equipment is not taken by the buyer after readiness, within a reasonable time, the buyer shall have to pay the full balance amount and Micrologic is entitled to impose demurrage charges to the buyer for keeping the equipment at Micrologic.",
    ],
  },
  {
    no: "1.7",
    heading: "Pre-Shipping Acceptance",
    lines: [
      "The buyer will validate the line/equipment before dispatch at his discretion and a ‘Dispatch Clearance’ is necessary for Micrologic to arrange dispatch.",
    ],
  },
  {
    no: "1.8",
    heading: "Information and Samples",
    lines: [
      "Information and samples needed to complete the project will be provided by the buyer at no cost to Micrologic. All costs involved to ship the samples will be borne by the buyer.",
    ],
  },
  {
    no: "1.9",
    heading: "Non-Disclosure",
    lines: [
      "Information and drawings submitted to the buyer for reviews and approvals remain property of Micrologic and cannot be shared or used for other purposes.",
      "At the same time Micrologic will commit to protect all properties of the customer from misuse.",
      "Where necessary a Non-Disclosure Agreement can be signed by both parties.",
    ],
  },
];

function PdfHeader({ refNo, revNo, date }) {
  return (
    <View style={styles.header}>
      <View style={styles.logoRow}>
        <Image src={logo} style={styles.logoImage} />
        {/* <Text style={styles.tagline}>Efficiency Enhanced</Text> */}
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaBox}>
          <Text style={styles.metaLabel}>Ref</Text>
          <Text style={styles.metaValue}>{refNo}</Text>
        </View>
        <View style={styles.metaBox}>
          <Text style={styles.metaLabel}>Rev</Text>
          <Text style={styles.metaValue}>{revNo}</Text>
        </View>
        <View style={styles.metaBox}>
          <Text style={styles.metaLabel}>Date</Text>
          <Text style={styles.metaValue}>{date}</Text>
        </View>
      </View>
    </View>
  );
}

function PdfFooter({ pageNumber, totalPages = 11 }) {
  return (
    <View style={styles.footer}>
      <View style={styles.footerLeft}>
        <Text style={styles.footerMain}>
          Page {pageNumber} of {totalPages}
        </Text>
        <Text style={styles.footerSub}>
          Confidential – Intended for the Addressee &amp; Recipient only
        </Text>
      </View>

      <View style={styles.footerRight}>
        <Text style={styles.footerRightText}>
          Doc No: 4001.0004, Ver No:1.1, Date:27-Oct-2020
        </Text>
        <Text style={styles.footerRightText}>
          All Images &amp; Drawings shown are Indicative only
        </Text>
      </View>
    </View>
  );
}

function SectionCard({ title, children, soft = false }) {
  return (
    <View style={soft ? styles.sectionCardSoft : styles.sectionCard}>
      {title ? (
        <View
          style={soft ? styles.sectionHeaderSoft : styles.sectionHeaderBlue}
        >
          <Text
            style={
              soft ? styles.sectionHeaderTextDark : styles.sectionHeaderTextBlue
            }
          >
            {title}
          </Text>
        </View>
      ) : null}
      <View style={styles.cardBody}>{children}</View>
    </View>
  );
}

function HighlightBox({ text }) {
  return (
    <View style={styles.highlightBox}>
      <Text style={styles.highlightText}>{text}</Text>
    </View>
  );
}

function InfoCard({ title, items }) {
  return (
    <SectionCard title={title}>
      {items.map((item, index) => (
        <View
          key={`${item.label}-${index}`}
          style={
            index < items.length - 1 ? styles.infoRow : styles.infoRowNoGap
          }
        >
          <Text style={styles.infoLabel}>{item.label}</Text>
          {typeof item.value === "string" ? (
            <Text style={styles.infoValueText}>{item.value}</Text>
          ) : (
            <View style={styles.infoValueNode}>{item.value}</View>
          )}
        </View>
      ))}
    </SectionCard>
  );
}

function TableBlock({ columns, data, highlightLastRow = false }) {
  return (
    <View style={styles.tableWrap}>
      <View style={styles.tableHeader}>
        {columns.map((col, i) => {
          const isLastCol = i === columns.length - 1;
          return (
            <Text
              key={col.key}
              style={[
                styles.tableCellHeader,
                {
                  width: col.width,
                  textAlign: col.align || "left",
                  borderRightWidth: isLastCol ? 0 : 1,
                },
              ]}
            >
              {col.title}
            </Text>
          );
        })}
      </View>

      {data.map((row, rowIndex) => {
        const isLast = rowIndex === data.length - 1;
        const isHighlighted = highlightLastRow && isLast;
        const isMainRow = rowIndex === 0;

        return (
          <View
            key={rowIndex}
            style={[
              isLast ? styles.tableRowLast : styles.tableRow,
              isMainRow && { backgroundColor: "#F8FAFC" },
            ]}
          >
            {columns.map((col, colIndex) => {
              const isLastCol = colIndex === columns.length - 1;
              const cellStyle = isHighlighted
                ? isLastCol
                  ? styles.tableCellHighlightedLast
                  : styles.tableCellHighlighted
                : isLastCol
                  ? styles.tableCellLast
                  : styles.tableCell;

              return (
                <Text
                  key={col.key}
                  style={[
                    cellStyle,
                    {
                      width: col.width,
                      textAlign: col.align || "left",
                      borderRightWidth: isLastCol ? 0 : 1,
                    },
                  ]}
                >
                  {col.key === "description" && typeof row[col.key] === "string"
                    ? row[col.key].split("\n").map((line, i) => (
                        <Text key={i} style={{ marginBottom: 2 }}>
                          {line.trim()}
                        </Text>
                      ))
                    : row[col.key]}
                </Text>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

function BulletList({ items }) {
  return (
    <View>
      {items.map((item, index) => (
        <View key={`${item}-${index}`} style={styles.bulletLine}>
          <Text style={styles.bulletMark}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function StepFlow({ steps }) {
  return (
    <View style={styles.stepWrap}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <View key={`${step.title}-${index}`} style={styles.stepRow}>
            <View style={styles.stepCircleWrap}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNum}>{index + 1}</Text>
              </View>
              {!isLast ? <View style={styles.stepLine} /> : null}
            </View>

            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDesc}>{step.description}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

function NumberedTermsTable({ title, rows }) {
  return (
    <View style={styles.tableWrap}>
      <View style={styles.tableHeader}>
        <Text
          style={[
            styles.tableCellHeader,
            { width: "100%", textAlign: "center" },
          ]}
        >
          {title}
        </Text>
      </View>

      {rows.map((row, index) => {
        const isLast = index === rows.length - 1;

        return (
          <View
            key={row.no}
            style={{
              flexDirection: "row",
              borderBottomWidth: isLast ? 0 : 1,
              borderBottomColor: "#E5E7EB",
            }}
          >
            <View
              style={{
                width: "7%",
                paddingVertical: 5,
                paddingHorizontal: 5,
                borderRightWidth: 1,
                borderRightColor: "#E5E7EB",
              }}
            >
              <Text
                style={{ fontSize: 8, fontWeight: "bold", color: "#111827" }}
              >
                {row.no}
              </Text>
            </View>

            <View
              style={{ width: "93%", paddingVertical: 5, paddingHorizontal: 5 }}
            >
              {row.heading ? (
                <Text
                  style={{
                    fontSize: 8.2,
                    fontWeight: "bold",
                    color: "#111827",
                    marginBottom: row.lines && row.lines.length ? 2 : 0,
                  }}
                >
                  {row.heading}
                </Text>
              ) : null}

              {(row.lines || []).map((line, i) => (
                <Text
                  key={i}
                  style={{
                    fontSize: 8,
                    color: "#374151",
                    lineHeight: 1.35,
                    marginBottom: 2,
                  }}
                >
                  {line}
                </Text>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}

export function ProposalPDF({ quotation, totals }) {
  const metadata = {
    ref: "MISPL/COMM/F2425.1150",
    rev: quotation?.version || "01",
    date: new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  const company = proposalData.company;

  const pricing = proposalData.pricing;
  const warranty = proposalData.warranty;
  const softwareSupport = proposalData.softwareSupport;
  const revisionHistory = proposalData.revisionHistory;

  const contact = quotation?.account?.contacts?.[0];

  const fullAddress = [
    quotation?.account?.billingStreet,
    quotation?.account?.billingCity,
    quotation?.account?.billingState,
    quotation?.account?.billingPincode,
    quotation?.account?.billingCountry,
  ]
    .filter(Boolean)
    .join(", ");

  const customerItems = [
    {
      label: "Customer",
      value: quotation?.account?.accountName || "-",
    },

    {
      label: "Address",
      value: fullAddress || "-",
    },

    {
      label: "Contact",
      value: contact
        ? `${contact.firstName || ""} ${contact.lastName || ""}`.trim()
        : "-",
    },

    {
      label: "Phone No.",
      value: quotation?.account?.phone || contact?.phone || "-",
    },

    {
      label: "Email",
      value: contact?.email || "-",
    },
  ];

  const projectItems = [
    { label: "Project", value: quotation?.deal?.dealName || "-" },
    { label: "Ref Documents", value: "-" },
    { label: "Tech Prop Ref", value: "-" },
    { label: "Doc Owner", value: "Chaitra S B" },
    { label: "Approved By", value: "Bhavya K S" },
  ];

  const pricingColumns = [
    { key: "sl", title: "SL#", width: "6%", align: "center" },
    { key: "sku", title: "SKU", width: "10%", align: "center" },
    { key: "hsn", title: "HSN/SAC", width: "10%", align: "center" },
    { key: "gst", title: "GST*", width: "8%", align: "center" },
    { key: "discount", title: "Disc%", width: "8%", align: "center" },
    { key: "description", title: "Description", width: "30%" },
    {
      key: "unitPrice",
      title: "Unit Price",
      width: "10%",
      align: "right",
    },
    { key: "qty", title: "QTY", width: "6%", align: "center" },
    {
      key: "total",
      title: "Total",
      width: "12%",
      align: "right",
    },
  ];

  const deliveryColumns = [
    { key: "sl", title: "SL#", width: "10%", align: "center" },
    { key: "desc", title: "Delivery Timeline Details", width: "90%" },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />

        <View style={styles.pageTitleWrap}>
          <Text style={styles.pageTitle}>COMMERCIAL PROPOSAL</Text>
          <View style={styles.titleUnderline} />
        </View>

        <InfoCard title="Proposal Submitted to:" items={customerItems} />
        <InfoCard title="Project Details:" items={projectItems} />

        <View
          style={{
            marginTop: "auto",
            borderTopWidth: 1,
            borderTopColor: "#E2E8F0",
            paddingTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 9,
              fontWeight: "bold",
              color: "#1E3A8A",
              marginBottom: 3,
              textAlign: "center",
              letterSpacing: 0.5,
            }}
          >
            {company.name}
          </Text>
          <Text
            style={{
              fontSize: 8,
              color: "#475569",
              marginBottom: 2,
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            {company.address}
          </Text>
          <Text
            style={{
              fontSize: 8,
              color: "#2563EB",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            {company.website} | M: {company.phone}
          </Text>

          <View style={{ flexDirection: "row", marginTop: 8 }}>
            {company.contacts.map((contact, index) => (
              <View
                key={`${contact.name}-${index}`}
                style={{
                  flex: 1,
                  backgroundColor: "#F1F5F9",
                  padding: 8,
                  borderWidth: 1,
                  borderColor: "#E2E8F0",
                  borderRadius: 6,
                  marginRight: index === company.contacts.length - 1 ? 0 : 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 8.5,
                    fontWeight: "bold",
                    color: "#1E293B",
                    marginBottom: 3,
                  }}
                >
                  {contact.name}
                </Text>
                <Text
                  style={{ fontSize: 7.3, color: "#4B5563", marginBottom: 1 }}
                >
                  {contact.email}
                </Text>
                <Text style={{ fontSize: 7.3, color: "#4B5563" }}>
                  {contact.phone}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <PdfFooter pageNumber={1} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "#111827",
            marginBottom: 10,
          }}
        >
          Revision History
        </Text>

        <TableBlock
          columns={[
            { key: "sl", title: "SL#", width: "10%", align: "center" },
            { key: "revNo", title: "Revision No.", width: "30%" },
            { key: "date", title: "Revision Date", width: "30%" },
            { key: "history", title: "History", width: "30%" },
          ]}
          data={revisionHistory}
        />

        <PdfFooter pageNumber={2} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />
        <Text
          style={{
            fontSize: 11,
            fontWeight: "bold",
            color: "#111827",
            marginBottom: 10,
            textAlign: "center",
            textDecoration: "underline",
          }}
        >
          Confidentiality &amp; General Conditions
        </Text>

        <Text style={styles.paragraph}>
          This techno commercial proposal (the &quot;Proposal&quot;) is
          submitted with the intent of executing a definitive and legally
          binding agreement (the &quot;Agreement&quot;) following an award of
          business to Micrologic Integrated Systems (P) Limited (Micrologic).
        </Text>
        <Text style={styles.paragraph}>
          The Proposal itself is a legally binding offer to contract and in the
          event of an award to Micrologic, it shall execute an Agreement that
          will be the complete agreement between the parties, however, where the
          parties do not execute any such Agreement, then the terms and
          conditions mentioned in this Proposal shall govern any purchase
          order(s) issued by the Customer in reference to the specific project.
        </Text>
        <Text style={styles.paragraph}>
          This Proposal constitutes confidential and proprietary information of
          Micrologic and requires that Customer treat the information contained
          in this Proposal as confidential. Customer may use the information
          contained in this Proposal solely for the purposes of evaluating this
          Proposal and executing the Agreement with Micrologic. This Proposal
          and all supporting documentation and drawings, Images and concepts
          provided to Customer in connection with this Proposal shall remain the
          property of Micrologic and must be returned immediately upon request.
        </Text>
        <Text style={styles.paragraph}>
          This Proposal is based upon the set of requirements provided by
          Customer to Micrologic, and certain reasonable assumptions taken by
          Micrologic. If Customer alters the requirements or if any assumption
          stated herein are false or inaccurate, then this Proposal, including
          pricing, may change. Implementation of any services detailed in this
          Proposal is subject to applicable legal and regulatory norms and
          requirements in force as on the date when services are to be
          implemented and such implementation may vary to cater to the
          requirements of such applicable legal and regulatory norms and
          requirements.
        </Text>

        <HighlightBox text="These are customized equipment, this proposal is indicative of the concept there could be changes during the detailed design which will be dealt during Design Approval Process (DAP) & will be subjected to the customer approval." />

        <PdfFooter pageNumber={3} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "#111827",
            marginBottom: 8,
          }}
        >
          PRICE:
        </Text>

        <View style={styles.categoryBox}>
          <Text style={styles.categoryText}>Category: {pricing.category}</Text>
        </View>

        <Text style={styles.centeredIntro}>
          Design, Development, Manufacture, Test &amp; Validate, Supply &amp;
          Commissioning of:
        </Text>
        <Text
          style={{
            fontSize: 8.5,
            fontWeight: "bold",
            color: "#2563EB",
            marginBottom: 8,
          }}
        >
          {proposalData.project.name}
        </Text>

        <TableBlock columns={pricingColumns} data={pricing.items} />

        <HighlightBox text={pricing.notes} />

        <SectionCard title="Price Basis & Delivery" soft>
          <Text
            style={{
              fontSize: 8.5,
              fontWeight: "bold",
              color: "#4B5563",
              marginBottom: 6,
            }}
          >
            {pricing.priceBasis}
          </Text>
          <TableBlock columns={deliveryColumns} data={pricing.delivery} />
        </SectionCard>

        <SectionCard title="Important Notes" soft>
          {pricing.generalNotes.map((note, index) => (
            <View key={`${note}-${index}`} style={styles.bulletLine}>
              <Text style={styles.bulletMark}>{index + 1}.</Text>
              <Text style={styles.bulletText}>{note}</Text>
            </View>
          ))}
        </SectionCard>

        <PdfFooter pageNumber={4} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />

        <SectionCard title="MICROLOGIC GENERAL WARRANTY TERMS" soft>
          <BulletList items={warranty} />
          <View
            style={{
              backgroundColor: "#EFF6FF",
              paddingVertical: 8,
              paddingHorizontal: 10,
              borderRadius: 5,
              marginTop: 10,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#BFDBFE",
            }}
          >
            <Text
              style={{ fontSize: 8.7, fontWeight: "bold", color: "#1E40AF" }}
            >
              Subject to Bangalore Jurisdiction only
            </Text>
          </View>
        </SectionCard>

        <SectionCard title="Software Support Terms" soft>
          <BulletList items={softwareSupport} />
        </SectionCard>

        <PdfFooter pageNumber={5} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />

        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "#111827",
            marginBottom: 4,
          }}
        >
          Engagement Model
        </Text>
        <Text style={styles.centeredIntro}>
          Our engagement model is designed to ensure transparency, efficiency,
          and successful project delivery.
        </Text>

        <View style={styles.twoColGrid}>
          {models.map((model) => (
            <View key={model.title} style={styles.modelCard}>
              <Text style={styles.modelTitle}>{model.title}</Text>
              <Text style={styles.modelDesc}>{model.desc}</Text>
            </View>
          ))}
        </View>

        <SectionCard title="Key Benefits" soft>
          <BulletList items={benefits} />
        </SectionCard>

        <PdfFooter pageNumber={6} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />

        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "#111827",
            marginBottom: 4,
          }}
        >
          Project Execution Process Flow
        </Text>
        <Text style={styles.centeredIntro}>
          Standard operating procedure for the successful delivery of the
          proposed solution.
        </Text>

        <StepFlow steps={processSteps} />

        <PdfFooter pageNumber={7} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />

        <NumberedTermsTable
          title="COMMERCIAL TERMS"
          rows={commercialTermsRows}
        />

        <PdfFooter pageNumber={8} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />

        <NumberedTermsTable
          title="COMMERCIAL TERMS"
          rows={[delayedDeliveryRow]}
        />

        <Text
          style={{
            fontSize: 11,
            fontWeight: "bold",
            color: "#111827",
            marginTop: 14,
            marginBottom: 8,
            textDecoration: "underline",
          }}
        >
          Order Cancellation
        </Text>

        {orderCancellationNotes.map((line, index) => (
          <Text
            key={index}
            style={{
              fontSize: 8.4,
              color: "#374151",
              lineHeight: 1.45,
              marginBottom: 8,
              textAlign: "justify",
            }}
          >
            {line}
          </Text>
        ))}

        <View style={{ marginLeft: 6, marginTop: 2 }}>
          {cancellationItems.map((item) => (
            <View
              key={item.no}
              style={{ flexDirection: "row", marginBottom: 6 }}
            >
              <Text style={{ width: 12, fontSize: 8.4, color: "#111827" }}>
                {item.no}.
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 8.4,
                  color: "#374151",
                  lineHeight: 1.4,
                }}
              >
                {item.text}
              </Text>
            </View>
          ))}
        </View>

        <Text
          style={{
            fontSize: 8.4,
            color: "#374151",
            marginTop: 2,
            marginBottom: 8,
          }}
        >
          The dates of the activity will be shared in the timelines released by
          the project team
        </Text>

        <Text
          style={{
            fontSize: 11,
            fontWeight: "bold",
            color: "#111827",
            marginTop: 8,
            marginBottom: 6,
            textDecoration: "underline",
          }}
        >
          Note:
        </Text>

        <View style={{ marginLeft: 6 }}>
          {noteItems.map((line, index) => (
            <View key={index} style={{ flexDirection: "row", marginBottom: 6 }}>
              <Text style={{ width: 12, fontSize: 8.4, color: "#111827" }}>
                {index + 1}.
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 8.4,
                  color: "#374151",
                  lineHeight: 1.4,
                }}
              >
                {line}
              </Text>
            </View>
          ))}
        </View>

        <PdfFooter pageNumber={9} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />

        <NumberedTermsTable
          title="ENGAGEMENT MODEL & DEFINITIONS"
          rows={engagementRows}
        />

        <PdfFooter pageNumber={10} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader
          refNo={metadata.ref}
          revNo={metadata.rev}
          date={metadata.date}
        />

        <SectionCard title="Bank Account Information" soft>
          {bankDetails.map((item, index) => (
            <View
              key={`${item.label}-${index}`}
              style={
                index < bankDetails.length - 1
                  ? styles.infoRow
                  : styles.infoRowNoGap
              }
            >
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValueText}>{item.value}</Text>
            </View>
          ))}
        </SectionCard>

        <SectionCard title="Statutory Information" soft>
          {statutoryDetails.map((item, index) => (
            <View
              key={`${item.label}-${index}`}
              style={
                index < statutoryDetails.length - 1
                  ? styles.infoRow
                  : styles.infoRowNoGap
              }
            >
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValueText}>{item.value}</Text>
            </View>
          ))}
        </SectionCard>

        <SectionCard title="Payment Terms" soft>
          <View style={styles.bulletLine}>
            <Text style={styles.bulletMark}>•</Text>
            <Text style={styles.bulletText}>
              40% Advance along with the Purchase Order.
            </Text>
          </View>
          <View style={styles.bulletLine}>
            <Text style={styles.bulletMark}>•</Text>
            <Text style={styles.bulletText}>
              40% Against proforma invoice before dispatch after successful FAT.
            </Text>
          </View>
          <View style={styles.bulletLine}>
            <Text style={styles.bulletMark}>•</Text>
            <Text style={styles.bulletText}>
              20% After successful installation and commissioning at site (SAT).
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#F1F5F9",
              paddingVertical: 7,
              paddingHorizontal: 8,
              borderRadius: 4,
              marginTop: 8,
            }}
          >
            <Text
              style={{ fontSize: 8.3, fontWeight: "bold", color: "#4B5563" }}
            >
              Note: All payments should be made via NEFT/RTGS to the
              above-mentioned bank account.
            </Text>
          </View>
        </SectionCard>

        <PdfFooter pageNumber={11} />
      </Page>
    </Document>
  );
}

export default ProposalPDF;
