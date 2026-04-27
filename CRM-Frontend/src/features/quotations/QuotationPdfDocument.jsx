// // src/features/quotations/QuotationPdfDocument.jsx

// import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     padding: 24,
//     fontSize: 10,
//     fontFamily: "Helvetica",
//   },

//   // ===== HEADER =====
//   header: {
//     marginBottom: 10,
//     borderBottom: "1 solid #000",
//     paddingBottom: 6,
//   },
//   company: { fontSize: 12, fontWeight: "bold" },
//   subText: { fontSize: 9, marginTop: 2 },

//   title: {
//     textAlign: "center",
//     fontSize: 14,
//     fontWeight: "bold",
//     marginVertical: 6,
//   },

//   metaRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 2,
//   },

//   section: {
//     marginTop: 10,
//   },

//   box: {
//     border: "1 solid #000",
//     padding: 6,
//     marginTop: 4,
//   },

//   // ===== TABLE =====
//   table: {
//     marginTop: 6,
//     border: "1 solid #000",
//   },

//   row: {
//     flexDirection: "row",
//   },

//   th: {
//     fontWeight: "bold",
//     borderBottom: "1 solid #000",
//     padding: 4,
//   },

//   td: {
//     padding: 4,
//     borderTop: "1 solid #ddd",
//   },

//   col1: { width: "5%" },
//   col2: { width: "25%" },
//   col3: { width: "30%" },
//   col4: { width: "10%", textAlign: "right" },
//   col5: { width: "10%", textAlign: "right" },
//   col6: { width: "10%", textAlign: "right" },
//   col7: { width: "10%", textAlign: "right" },

//   // ===== TOTALS =====
//   totals: {
//     marginTop: 10,
//     alignSelf: "flex-end",
//     width: "45%",
//   },

//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 2,
//   },

//   totalBold: {
//     fontWeight: "bold",
//   },

//   divider: {
//     borderTop: "1 solid #000",
//     marginVertical: 4,
//   },

//   footer: {
//     marginTop: 20,
//   },
// });

// export default function QuotationPdfDocument({ quotation, totals }) {
//   const rows = totals?.rows || [];

//   return (
//     <Document>
//       <Page size="A4" style={styles.page} wrap>
//         {/* ===== HEADER ===== */}
//         <View style={styles.header}>
//           <Text style={styles.company}>MICROLOGIC INTEGRATED SYSTEMS</Text>
//           <Text style={styles.subText}>Bengaluru, Karnataka, India</Text>
//           <Text style={styles.subText}>
//             GSTIN: [YOUR GSTIN] | Contact: [Phone / Email]
//           </Text>
//         </View>

//         <Text style={styles.title}>QUOTATION</Text>

//         <View style={styles.metaRow}>
//           <Text>Quotation No: {quotation.quotationNumber}</Text>
//           <Text>Status: {quotation.status}</Text>
//         </View>

//         <View style={styles.metaRow}>
//           <Text>Date: {quotation.date}</Text>
//           <Text>Valid Until: {quotation.validUntil || "-"}</Text>
//         </View>

//         {/* ===== BILL TO ===== */}
//         <View style={styles.section}>
//           <Text>Bill To:</Text>
//           <View style={styles.box}>
//             <Text>{quotation.accountName || "-"}</Text>
//             <Text>[Company Name]</Text>
//             <Text>[Address Line]</Text>
//             <Text>GSTIN: [Customer GSTIN]</Text>
//           </View>
//         </View>

//         {/* ===== TABLE ===== */}
//         <View style={styles.section}>
//           <Text>Line Items:</Text>

//           <View style={styles.table}>
//             {/* header */}
//             <View style={styles.row}>
//               <Text style={[styles.th, styles.col1]}>#</Text>
//               <Text style={[styles.th, styles.col2]}>Product</Text>
//               <Text style={[styles.th, styles.col3]}>Description</Text>
//               <Text style={[styles.th, styles.col4]}>Qty</Text>
//               <Text style={[styles.th, styles.col5]}>Price</Text>
//               <Text style={[styles.th, styles.col6]}>Disc</Text>
//               <Text style={[styles.th, styles.col7]}>Amount</Text>
//             </View>

//             {/* rows */}
//             {rows.map((item, i) => (
//               <View key={i} style={styles.row} wrap={false}>
//                 <Text style={[styles.td, styles.col1]}>{i + 1}</Text>
//                 <Text style={[styles.td, styles.col2]}>{item.name || "-"}</Text>
//                 <Text style={[styles.td, styles.col3]}>
//                   {item.description || "-"}
//                 </Text>
//                 <Text style={[styles.td, styles.col4]}>{item.qty}</Text>
//                 <Text style={[styles.td, styles.col5]}>Rs. {item.price}</Text>
//                 <Text style={[styles.td, styles.col6]}>
//                   Rs. {item.discount}
//                 </Text>
//                 <Text style={[styles.td, styles.col7]}>Rs. {item.net}</Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* ===== TOTALS ===== */}
//         <View style={styles.totals} wrap={false}>
//           <View style={styles.totalRow}>
//             <Text>Subtotal</Text>
//             <Text>Rs. {totals.subtotal}</Text>
//           </View>

//           <View style={styles.totalRow}>
//             <Text>Discount</Text>
//             <Text>Rs. {totals.discount}</Text>
//           </View>

//           <View style={styles.totalRow}>
//             <Text>Taxable Value</Text>
//             <Text>Rs. {totals.taxable}</Text>
//           </View>

//           <View style={styles.divider} />

//           <View style={styles.totalRow}>
//             <Text>CGST (9%)</Text>
//             <Text>Rs. {totals.cgst}</Text>
//           </View>

//           <View style={styles.totalRow}>
//             <Text>SGST (9%)</Text>
//             <Text>Rs. {totals.sgst}</Text>
//           </View>

//           <View style={styles.divider} />

//           <View style={[styles.totalRow, styles.totalBold]}>
//             <Text>Grand Total</Text>
//             <Text>Rs. {totals.grandTotal}</Text>
//           </View>
//         </View>

//         {/* ===== NOTES ===== */}
//         <View style={styles.section}>
//           <Text>Notes:</Text>
//           <View style={styles.box}>
//             <Text>{quotation.notes || "-"}</Text>
//           </View>
//         </View>

//         {/* ===== TERMS ===== */}
//         <View style={styles.section}>
//           <Text>Terms & Conditions:</Text>
//           <View style={styles.box}>
//             <Text>{quotation.terms}</Text>
//           </View>
//         </View>

//         {/* ===== FOOTER ===== */}
//         <View style={styles.footer}>
//           <Text>Authorized Signature</Text>
//           <Text>For MicroLogic Integrated Systems</Text>
//         </View>
//       </Page>
//     </Document>
//   );
// }

// src/features/quotations/QuotationPdfDocument.jsx

// import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     paddingTop: 24,
//     paddingHorizontal: 24,
//     paddingBottom: 28,
//     fontSize: 9.5,
//     fontFamily: "Helvetica",
//     color: "#111827",
//     lineHeight: 1.35,
//   },

//   // ===== HEADER =====
//   header: {
//     paddingBottom: 8,
//     borderBottom: "1 solid #111827",
//     marginBottom: 10,
//   },
//   company: {
//     fontSize: 13,
//     fontWeight: "bold",
//     letterSpacing: 0.2,
//   },
//   subText: {
//     fontSize: 8.5,
//     marginTop: 2,
//     color: "#374151",
//   },

//   titleWrap: {
//     marginBottom: 10,
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 15,
//     fontWeight: "bold",
//     letterSpacing: 1,
//   },
//   titleLine: {
//     width: "100%",
//     marginTop: 6,
//     borderTop: "1 solid #D1D5DB",
//   },

//   metaGrid: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     gap: 10,
//     marginBottom: 10,
//   },
//   metaCol: {
//     width: "49%",
//   },
//   metaBox: {
//     border: "1 solid #D1D5DB",
//     padding: 8,
//     borderRadius: 2,
//     backgroundColor: "#F9FAFB",
//   },
//   metaRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 2,
//   },
//   metaLabel: {
//     color: "#6B7280",
//     fontSize: 8.5,
//   },
//   metaValue: {
//     fontSize: 8.5,
//     fontWeight: "bold",
//     color: "#111827",
//   },

//   section: {
//     marginTop: 10,
//   },
//   sectionHeader: {
//     backgroundColor: "#F3F4F6",
//     border: "1 solid #D1D5DB",
//     paddingHorizontal: 8,
//     paddingVertical: 5,
//     fontSize: 9,
//     fontWeight: "bold",
//     textTransform: "uppercase",
//     letterSpacing: 0.4,
//   },
//   sectionBody: {
//     borderLeft: "1 solid #D1D5DB",
//     borderRight: "1 solid #D1D5DB",
//     borderBottom: "1 solid #D1D5DB",
//     padding: 8,
//   },

//   billToBox: {
//     border: "1 solid #D1D5DB",
//     borderRadius: 2,
//     padding: 8,
//     backgroundColor: "#FFFFFF",
//   },
//   billToText: {
//     fontSize: 9,
//     marginBottom: 1,
//     color: "#111827",
//   },
//   billToMuted: {
//     fontSize: 8.5,
//     color: "#6B7280",
//   },

//   // ===== TABLE =====
//   table: {
//     marginTop: 6,
//     border: "1 solid #111827",
//   },
//   tableHeader: {
//     flexDirection: "row",
//     backgroundColor: "#F3F4F6",
//     borderBottom: "1 solid #111827",
//   },
//   row: {
//     flexDirection: "row",
//   },
//   th: {
//     paddingVertical: 5,
//     paddingHorizontal: 4,
//     fontSize: 8.5,
//     fontWeight: "bold",
//     color: "#111827",
//   },
//   td: {
//     paddingVertical: 5,
//     paddingHorizontal: 4,
//     fontSize: 8.5,
//     borderTop: "1 solid #E5E7EB",
//   },

//   col1: { width: "5%" },
//   col2: { width: "24%" },
//   col3: { width: "31%" },
//   col4: { width: "10%", textAlign: "right" },
//   col5: { width: "10%", textAlign: "right" },
//   col6: { width: "10%", textAlign: "right" },
//   col7: { width: "10%", textAlign: "right" },

//   // ===== TOTALS =====
//   totalsWrap: {
//     marginTop: 10,
//     flexDirection: "row",
//     justifyContent: "flex-end",
//   },
//   totals: {
//     width: "44%",
//     border: "1 solid #D1D5DB",
//     backgroundColor: "#FAFAFA",
//   },
//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
//   totalLabel: {
//     fontSize: 8.8,
//     color: "#374151",
//   },
//   totalValue: {
//     fontSize: 8.8,
//     color: "#111827",
//     fontWeight: "bold",
//   },
//   totalLine: {
//     borderTop: "1 solid #D1D5DB",
//     marginVertical: 4,
//   },
//   grandTotalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     backgroundColor: "#E5E7EB",
//     borderTop: "1 solid #111827",
//   },
//   grandLabel: {
//     fontSize: 9,
//     fontWeight: "bold",
//     color: "#111827",
//   },
//   grandValue: {
//     fontSize: 9,
//     fontWeight: "bold",
//     color: "#111827",
//   },

//   // ===== TWO COLUMN SUPPORT BLOCKS =====
//   supportGrid: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     gap: 10,
//     marginTop: 10,
//   },
//   supportCol: {
//     width: "49%",
//   },
//   supportBox: {
//     border: "1 solid #D1D5DB",
//     borderTop: "0 solid #D1D5DB",
//     padding: 8,
//     minHeight: 58,
//   },
//   supportText: {
//     fontSize: 8.6,
//     color: "#111827",
//     marginBottom: 2,
//   },
//   supportMuted: {
//     fontSize: 8.2,
//     color: "#6B7280",
//   },

//   notesBox: {
//     border: "1 solid #D1D5DB",
//     borderTop: "0 solid #D1D5DB",
//     padding: 8,
//     minHeight: 30,
//   },
//   smallBodyText: {
//     fontSize: 8.6,
//     color: "#111827",
//   },

//   footer: {
//     marginTop: 14,
//     paddingTop: 8,
//     borderTop: "1 solid #D1D5DB",
//   },
//   signatureTitle: {
//     fontSize: 9,
//     fontWeight: "bold",
//     color: "#111827",
//   },
//   signatureSub: {
//     fontSize: 8.4,
//     color: "#374151",
//     marginTop: 1,
//   },

//   pageNumber: {
//     position: "absolute",
//     bottom: 12,
//     right: 24,
//     fontSize: 7.5,
//     color: "#6B7280",
//   },
// });

// function formatMoney(value) {
//   const n = Number(value || 0);
//   return `Rs. ${new Intl.NumberFormat("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(n)}`;
// }

// function safeText(value, fallback = "-") {
//   if (value === null || value === undefined || value === "") return fallback;
//   return String(value);
// }

// function normalizeLines(value, fallbackLines = []) {
//   if (Array.isArray(value) && value.length) return value.filter(Boolean).map(String);
//   if (typeof value === "string" && value.trim()) {
//     return value
//       .split("\n")
//       .map((x) => x.trim())
//       .filter(Boolean);
//   }
//   return fallbackLines;
// }

// export default function QuotationPdfDocument({ quotation, totals }) {
//   const rows = totals?.rows || [];

//   const companyName = "MICROLOGIC INTEGRATED SYSTEMS";
//   const companyLocation = "Bengaluru, Karnataka, India";
//   const companyContact = "GSTIN: [YOUR GSTIN] | Contact: [Phone / Email]";

//   const defaultTerms = [
//     "Quotation valid for 15 days from the issue date.",
//     "Payment terms: As mutually agreed.",
//     "Taxes are applicable as per GST rules and shown separately in the quotation.",
//     "Delivery timeline will be confirmed at the time of order finalization.",
//   ];

//   const defaultWarranty = [
//     "Warranty is applicable only for supplied hardware items, if covered under the final sales order.",
//     "Warranty period and coverage depend on product category and vendor terms.",
//     "Consumables, wear-and-tear items, and misuse-related damage are excluded unless specified otherwise.",
//   ];

//   const defaultSoftwareRole = [
//     "Software support covers basic configuration guidance, integration assistance, and handover support as agreed in scope.",
//     "This does not include custom software development unless explicitly quoted.",
//     "Remote assistance may be provided for commissioning, parameter checks, and operational clarification.",
//   ];

//   const defaultAppEngineer = [
//     "Application engineering support includes requirement review, technical clarification, and solution alignment.",
//     "Support may include site discussion, commissioning guidance, and coordination with the customer team.",
//     "Final scope is subject to project complexity and mutually agreed deliverables.",
//   ];

//   const termsLines = normalizeLines(quotation?.terms, defaultTerms);
//   const warrantyLines = normalizeLines(quotation?.warranty, defaultWarranty);
//   const softwareRoleLines = normalizeLines(
//     quotation?.softwareRole,
//     defaultSoftwareRole,
//   );
//   const appEngineerLines = normalizeLines(
//     quotation?.applicationEngineer,
//     defaultAppEngineer,
//   );

//   const issueDate = safeText(quotation?.date, "-");
//   const validUntil = safeText(quotation?.validUntil, "-");
//   const quotationNo = safeText(quotation?.quotationNumber, "-");
//   const status = safeText(quotation?.status, "Draft");
//   const customerName = safeText(quotation?.accountName, "-");

//   return (
//     <Document>
//       <Page size="A4" style={styles.page} wrap>
//         {/* ===== HEADER ===== */}
//         <View style={styles.header}>
//           <Text style={styles.company}>{companyName}</Text>
//           <Text style={styles.subText}>{companyLocation}</Text>
//           <Text style={styles.subText}>{companyContact}</Text>
//         </View>

//         <View style={styles.titleWrap}>
//           <Text style={styles.title}>QUOTATION</Text>
//           <View style={styles.titleLine} />
//         </View>

//         {/* ===== META ===== */}
//         <View style={styles.metaGrid}>
//           <View style={styles.metaCol}>
//             <View style={styles.metaBox}>
//               <View style={styles.metaRow}>
//                 <Text style={styles.metaLabel}>Quotation No</Text>
//                 <Text style={styles.metaValue}>{quotationNo}</Text>
//               </View>
//               <View style={styles.metaRow}>
//                 <Text style={styles.metaLabel}>Date</Text>
//                 <Text style={styles.metaValue}>{issueDate}</Text>
//               </View>
//             </View>
//           </View>

//           <View style={styles.metaCol}>
//             <View style={styles.metaBox}>
//               <View style={styles.metaRow}>
//                 <Text style={styles.metaLabel}>Status</Text>
//                 <Text style={styles.metaValue}>{status}</Text>
//               </View>
//               <View style={styles.metaRow}>
//                 <Text style={styles.metaLabel}>Valid Until</Text>
//                 <Text style={styles.metaValue}>{validUntil}</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* ===== BILL TO ===== */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text>Bill To</Text>
//           </View>
//           <View style={styles.sectionBody}>
//             <View style={styles.billToBox}>
//               <Text style={styles.billToText}>{customerName}</Text>
//               <Text style={styles.billToMuted}>[Company Name]</Text>
//               <Text style={styles.billToMuted}>[Address Line]</Text>
//               <Text style={styles.billToMuted}>GSTIN: [Customer GSTIN]</Text>
//             </View>
//           </View>
//         </View>

//         {/* ===== LINE ITEMS ===== */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text>Line Items</Text>
//           </View>
//           <View style={styles.sectionBody}>
//             <View style={styles.table}>
//               <View style={styles.tableHeader}>
//                 <Text style={[styles.th, styles.col1]}>#</Text>
//                 <Text style={[styles.th, styles.col2]}>Product</Text>
//                 <Text style={[styles.th, styles.col3]}>Description</Text>
//                 <Text style={[styles.th, styles.col4]}>Qty</Text>
//                 <Text style={[styles.th, styles.col5]}>Price</Text>
//                 <Text style={[styles.th, styles.col6]}>Disc</Text>
//                 <Text style={[styles.th, styles.col7]}>Amount</Text>
//               </View>

//               {rows.map((item, i) => (
//                 <View key={i} style={styles.row} wrap={false}>
//                   <Text style={[styles.td, styles.col1]}>{i + 1}</Text>
//                   <Text style={[styles.td, styles.col2]}>
//                     {safeText(item.name)}
//                   </Text>
//                   <Text style={[styles.td, styles.col3]}>
//                     {safeText(item.description)}
//                   </Text>
//                   <Text style={[styles.td, styles.col4]}>
//                     {safeText(item.qty, 0)}
//                   </Text>
//                   <Text style={[styles.td, styles.col5]}>
//                     {formatMoney(item.price)}
//                   </Text>
//                   <Text style={[styles.td, styles.col6]}>
//                     {formatMoney(item.discount)}
//                   </Text>
//                   <Text style={[styles.td, styles.col7]}>
//                     {formatMoney(item.net)}
//                   </Text>
//                 </View>
//               ))}
//             </View>

//             {/* ===== TOTALS ===== */}
//             <View style={styles.totalsWrap}>
//               <View style={styles.totals} wrap={false}>
//                 <View style={styles.totalRow}>
//                   <Text style={styles.totalLabel}>Subtotal</Text>
//                   <Text style={styles.totalValue}>
//                     {formatMoney(totals?.subtotal)}
//                   </Text>
//                 </View>

//                 <View style={styles.totalRow}>
//                   <Text style={styles.totalLabel}>Discount</Text>
//                   <Text style={styles.totalValue}>
//                     {formatMoney(totals?.discount)}
//                   </Text>
//                 </View>

//                 <View style={styles.totalRow}>
//                   <Text style={styles.totalLabel}>Taxable Value</Text>
//                   <Text style={styles.totalValue}>
//                     {formatMoney(totals?.taxable)}
//                   </Text>
//                 </View>

//                 <View style={styles.totalLine} />

//                 <View style={styles.totalRow}>
//                   <Text style={styles.totalLabel}>CGST (9%)</Text>
//                   <Text style={styles.totalValue}>
//                     {formatMoney(totals?.cgst)}
//                   </Text>
//                 </View>

//                 <View style={styles.totalRow}>
//                   <Text style={styles.totalLabel}>SGST (9%)</Text>
//                   <Text style={styles.totalValue}>
//                     {formatMoney(totals?.sgst)}
//                   </Text>
//                 </View>

//                 <View style={styles.totalLine} />

//                 <View style={styles.grandTotalRow}>
//                   <Text style={styles.grandLabel}>Grand Total</Text>
//                   <Text style={styles.grandValue}>
//                     {formatMoney(totals?.grandTotal)}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* ===== NOTES ===== */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text>Notes</Text>
//           </View>
//           <View style={styles.notesBox}>
//             <Text style={styles.smallBodyText}>
//               {safeText(quotation?.notes, "-")}
//             </Text>
//           </View>
//         </View>

//         {/* ===== TERMS & CONDITIONS ===== */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text>Terms & Conditions</Text>
//           </View>
//           <View style={styles.notesBox}>
//             {termsLines.map((line, idx) => (
//               <Text key={idx} style={styles.smallBodyText}>
//                 {idx + 1}. {line}
//               </Text>
//             ))}
//           </View>
//         </View>

//         {/* ===== WARRANTY ===== */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text>Warranty</Text>
//           </View>
//           <View style={styles.notesBox}>
//             {warrantyLines.map((line, idx) => (
//               <Text key={idx} style={styles.smallBodyText}>
//                 {idx + 1}. {line}
//               </Text>
//             ))}
//           </View>
//         </View>

//         {/* ===== SOFTWARE ROLE ===== */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text>Software Role</Text>
//           </View>
//           <View style={styles.notesBox}>
//             {softwareRoleLines.map((line, idx) => (
//               <Text key={idx} style={styles.smallBodyText}>
//                 {idx + 1}. {line}
//               </Text>
//             ))}
//           </View>
//         </View>

//         {/* ===== APPLICATION ENGINEER ===== */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text>Application Engineer</Text>
//           </View>
//           <View style={styles.notesBox}>
//             {appEngineerLines.map((line, idx) => (
//               <Text key={idx} style={styles.smallBodyText}>
//                 {idx + 1}. {line}
//               </Text>
//             ))}
//           </View>
//         </View>

//         {/* ===== FOOTER ===== */}
//         <View style={styles.footer}>
//           <Text style={styles.signatureTitle}>Authorized Signature</Text>
//           <Text style={styles.signatureSub}>
//             For MicroLogic Integrated Systems
//           </Text>
//         </View>

//         <Text
//           style={styles.pageNumber}
//           render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
//           fixed
//         />
//       </Page>
//     </Document>
//   );
// }

// // src/features/quotations/QuotationPdfDocument.jsx

// import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     paddingTop: 22,
//     paddingHorizontal: 22,
//     paddingBottom: 26,
//     fontSize: 8.8,
//     fontFamily: "Helvetica",
//     color: "#111827",
//     lineHeight: 1.32,
//   },

//   header: {
//     paddingBottom: 8,
//     borderBottom: "1 solid #111827",
//     marginBottom: 10,
//   },
//   company: {
//     fontSize: 13,
//     fontWeight: "bold",
//     letterSpacing: 0.2,
//   },
//   subText: {
//     fontSize: 8,
//     marginTop: 2,
//     color: "#374151",
//   },

//   titleWrap: {
//     marginBottom: 10,
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 15,
//     fontWeight: "bold",
//     letterSpacing: 1,
//   },
//   titleLine: {
//     width: "100%",
//     marginTop: 6,
//     borderTop: "1 solid #D1D5DB",
//   },

//   summaryGrid: {
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 10,
//   },
//   summaryCard: {
//     flex: 1,
//     border: "1 solid #D1D5DB",
//     borderRadius: 2,
//     padding: 7,
//     backgroundColor: "#F9FAFB",
//   },
//   summaryLabel: {
//     fontSize: 7,
//     color: "#6B7280",
//     marginBottom: 2,
//   },
//   summaryValue: {
//     fontSize: 9,
//     fontWeight: "bold",
//     color: "#111827",
//   },

//   metaGrid: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     gap: 10,
//     marginBottom: 10,
//   },
//   metaCol: {
//     width: "49%",
//   },
//   metaBox: {
//     border: "1 solid #D1D5DB",
//     padding: 8,
//     borderRadius: 2,
//     backgroundColor: "#F9FAFB",
//   },
//   metaRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 2,
//   },
//   metaLabel: {
//     color: "#6B7280",
//     fontSize: 8,
//   },
//   metaValue: {
//     fontSize: 8,
//     fontWeight: "bold",
//     color: "#111827",
//   },

//   section: {
//     marginTop: 10,
//   },
//   sectionHeader: {
//     backgroundColor: "#F3F4F6",
//     border: "1 solid #D1D5DB",
//     paddingHorizontal: 8,
//     paddingVertical: 5,
//     fontSize: 8.5,
//     fontWeight: "bold",
//     textTransform: "uppercase",
//     letterSpacing: 0.4,
//   },
//   sectionBody: {
//     borderLeft: "1 solid #D1D5DB",
//     borderRight: "1 solid #D1D5DB",
//     borderBottom: "1 solid #D1D5DB",
//     padding: 8,
//   },

//   billToBox: {
//     border: "1 solid #D1D5DB",
//     borderRadius: 2,
//     padding: 8,
//     backgroundColor: "#FFFFFF",
//   },
//   billToText: {
//     fontSize: 8.8,
//     marginBottom: 1,
//     color: "#111827",
//   },
//   billToMuted: {
//     fontSize: 8,
//     color: "#6B7280",
//   },

//   table: {
//     marginTop: 6,
//     border: "1 solid #111827",
//     display: "flex",
//     flexDirection: "column",
//   },
//   tableHeader: {
//     flexDirection: "row",
//     backgroundColor: "#F3F4F6",
//     borderBottom: "1 solid #111827",
//   },
//   row: {
//     flexDirection: "row",
//   },
//   th: {
//     paddingVertical: 4.5,
//     paddingHorizontal: 3,
//     fontSize: 7.2,
//     fontWeight: "bold",
//     color: "#111827",
//   },
//   td: {
//     paddingVertical: 4.5,
//     paddingHorizontal: 3,
//     fontSize: 7.2,
//     borderTop: "1 solid #E5E7EB",
//   },

//   col1: { width: "12%" },
//   col2: { width: "20%" },
//   col3: { width: "10%" },
//   col4: { width: "10%" },
//   col5: { width: "6%" },
//   col6: { width: "6%", textAlign: "right" },
//   col7: { width: "9%", textAlign: "right" },
//   col8: { width: "8%", textAlign: "right" },
//   col9: { width: "10%", textAlign: "right" },
//   col10: { width: "9%" },

//   totalsWrap: {
//     marginTop: 10,
//     flexDirection: "row",
//     justifyContent: "flex-end",
//   },
//   totals: {
//     width: "48%",
//     border: "1 solid #D1D5DB",
//     backgroundColor: "#FAFAFA",
//   },
//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
//   totalLabel: {
//     fontSize: 8.4,
//     color: "#374151",
//   },
//   totalValue: {
//     fontSize: 8.4,
//     color: "#111827",
//     fontWeight: "bold",
//   },
//   totalLine: {
//     borderTop: "1 solid #D1D5DB",
//     marginVertical: 4,
//   },
//   grandTotalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     backgroundColor: "#E5E7EB",
//     borderTop: "1 solid #111827",
//   },
//   grandLabel: {
//     fontSize: 8.8,
//     fontWeight: "bold",
//     color: "#111827",
//   },
//   grandValue: {
//     fontSize: 8.8,
//     fontWeight: "bold",
//     color: "#111827",
//   },

//   notesBox: {
//     border: "1 solid #D1D5DB",
//     borderTop: "0 solid #D1D5DB",
//     padding: 8,
//     minHeight: 28,
//   },
//   smallBodyText: {
//     fontSize: 8.3,
//     color: "#111827",
//   },

//   footer: {
//     marginTop: 14,
//     paddingTop: 8,
//     borderTop: "1 solid #D1D5DB",
//   },
//   signatureTitle: {
//     fontSize: 8.8,
//     fontWeight: "bold",
//     color: "#111827",
//   },
//   signatureSub: {
//     fontSize: 8,
//     color: "#374151",
//     marginTop: 1,
//   },

//   pageNumber: {
//     position: "absolute",
//     bottom: 10,
//     right: 22,
//     fontSize: 7.2,
//     color: "#6B7280",
//   },
// });

// function formatMoney(value) {
//   const n = Number(value || 0);
//   return `Rs. ${new Intl.NumberFormat("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(n)}`;
// }

// function safeText(value, fallback = "-") {
//   if (value === null || value === undefined || value === "") return fallback;
//   return String(value);
// }

// function normalizeLines(value, fallbackLines = []) {
//   if (Array.isArray(value) && value.length)
//     return value.filter(Boolean).map(String);
//   if (typeof value === "string" && value.trim()) {
//     return value
//       .split("\n")
//       .map((x) => x.trim())
//       .filter(Boolean);
//   }
//   return fallbackLines;
// }

// function fmtDate(value) {
//   if (!value) return "-";
//   const d = new Date(value);
//   return Number.isNaN(d.getTime())
//     ? safeText(value, "-")
//     : d.toLocaleDateString();
// }

// function lineAmount(item) {
//   const qty = Number(item?.qty ?? item?.quantity ?? 0);
//   const price = Number(item?.price ?? 0);
//   const discount = Number(item?.discount ?? 0);

//   const net =
//     item?.net !== undefined && item?.net !== null
//       ? Number(item.net)
//       : item?.lineTotal !== undefined && item?.lineTotal !== null
//         ? Number(item.lineTotal)
//         : qty * price - discount;

//   return Number.isFinite(net) ? net : 0;
// }

// export default function QuotationPdfDocument({ quotation, totals }) {
//   const rows = totals?.rows || quotation?.items || [];

//   const companyName = "MICROLOGIC INTEGRATED SYSTEMS";
//   const companyLocation = "Bengaluru, Karnataka, India";
//   const companyContact =
//     "GSTIN: 29ABCDE1234F1Z5 | Contact: techsales@micrologicglobal.com";

//   const defaultTerms = [
//     "Quotation valid for 15 days from the issue date.",
//     "Payment terms: As mutually agreed.",
//     "GST is applied at the quotation total level.",
//     "Delivery timeline will be confirmed at the time of order finalization.",
//   ];

//   const defaultWarranty = [
//     "Warranty is applicable only for supplied hardware items, if covered under the final sales order.",
//     "Warranty period and coverage depend on product category and vendor terms.",
//     "Consumables, wear-and-tear items, and misuse-related damage are excluded unless specified otherwise.",
//   ];

//   const defaultSoftwareRole = [
//     "Software support covers basic configuration guidance, integration assistance, and handover support as agreed in scope.",
//     "This does not include custom software development unless explicitly quoted.",
//     "Remote assistance may be provided for commissioning, parameter checks, and operational clarification.",
//   ];

//   const defaultAppEngineer = [
//     "Application engineering support includes requirement review, technical clarification, and solution alignment.",
//     "Support may include site discussion, commissioning guidance, and coordination with the customer team.",
//     "Final scope is subject to project complexity and mutually agreed deliverables.",
//   ];

//   const termsLines = normalizeLines(quotation?.terms, defaultTerms);
//   const warrantyLines = normalizeLines(quotation?.warranty, defaultWarranty);
//   const softwareRoleLines = normalizeLines(
//     quotation?.softwareRole,
//     defaultSoftwareRole,
//   );
//   const appEngineerLines = normalizeLines(
//     quotation?.applicationEngineer,
//     defaultAppEngineer,
//   );

//   const issueDate = fmtDate(quotation?.date || quotation?.issueDate);
//   const validUntil = fmtDate(quotation?.validUntil);
//   const quotationNo = safeText(
//     quotation?.quotationNumber || quotation?.quotationNo,
//     "-",
//   );
//   const status = safeText(quotation?.status, "DRAFT");
//   const customerName = safeText(
//     quotation?.accountName || quotation?.account?.accountName,
//     "-",
//   );

//   const dealName = safeText(
//     quotation?.dealName || quotation?.deal?.dealName || "-",
//   );

//   const contactText = safeText(
//     quotation?.contactName ||
//       quotation?.contact?.firstName ||
//       quotation?.contact?.email ||
//       (quotation?.contactIds?.length ? "Multiple Contacts" : ""),
//     "-",
//   );

//   const subtotal = Number(totals?.subtotal ?? 0);
//   const discount = Number(
//     totals?.discount ??
//       totals?.headerDiscount ??
//       totals?.discountTotal ??
//       quotation?.headerDiscount ??
//       0,
//   );
//   const taxable =
//     totals?.taxable !== undefined && totals?.taxable !== null
//       ? Number(totals.taxable)
//       : Math.max(subtotal - discount, 0);

//   const taxTotal = Number(
//     totals?.taxTotal ?? totals?.tax ?? quotation?.taxTotal ?? 0,
//   );
//   const cgst =
//     totals?.cgst !== undefined && totals?.cgst !== null
//       ? Number(totals.cgst)
//       : taxTotal / 2;
//   const sgst =
//     totals?.sgst !== undefined && totals?.sgst !== null
//       ? Number(totals.sgst)
//       : taxTotal / 2;

//   const grandTotal = Number(totals?.grandTotal ?? quotation?.grandTotal ?? 0);

//   return (
//     <Document>
//       <Page size="A4" style={styles.page} wrap>
//         <View style={styles.header}>
//           <Text style={styles.company}>{companyName}</Text>
//           <Text style={styles.subText}>{companyLocation}</Text>
//           <Text style={styles.subText}>{companyContact}</Text>
//         </View>

//         <View style={styles.titleWrap}>
//           <Text style={styles.title}>QUOTATION</Text>
//           <View style={styles.titleLine} />
//         </View>

//         <View style={styles.summaryGrid}>
//           <View style={styles.summaryCard}>
//             <Text style={styles.summaryLabel}>Quotation No</Text>
//             <Text style={styles.summaryValue}>{quotationNo}</Text>
//           </View>

//           <View style={styles.summaryCard}>
//             <Text style={styles.summaryLabel}>GST</Text>
//             <Text style={styles.summaryValue}>18% (9% + 9%)</Text>
//           </View>

//           <View style={styles.summaryCard}>
//             <Text style={styles.summaryLabel}>Issue Date</Text>
//             <Text style={styles.summaryValue}>{issueDate}</Text>
//           </View>

//           <View style={styles.summaryCard}>
//             <Text style={styles.summaryLabel}>Grand Total</Text>
//             <Text style={styles.summaryValue}>{formatMoney(grandTotal)}</Text>
//           </View>
//         </View>

//         <View style={styles.metaGrid}>
//           <View style={styles.metaCol}>
//             <View style={styles.metaBox}>
//               {/* <View style={styles.metaRow}>
//                 <Text style={styles.metaLabel}>Quotation No</Text>
//                 <Text style={styles.metaValue}>{quotationNo}</Text>
//               </View> */}
//               <View style={styles.metaRow}>
//                 <Text style={styles.metaLabel}>Date</Text>
//                 <Text style={styles.metaValue}>{issueDate}</Text>
//               </View>
//             </View>
//           </View>

//           <View style={styles.metaCol}>
//             <View style={styles.metaBox}>
//               <View style={styles.metaRow}>
//                 <Text style={styles.metaLabel}>Status</Text>
//                 <Text style={styles.metaValue}>{status}</Text>
//               </View>
//               <View style={styles.metaRow}>
//                 <Text style={styles.metaLabel}>Valid Until</Text>
//                 <Text style={styles.metaValue}>{validUntil}</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text>Bill To</Text>
//           </View>
//           <View style={styles.sectionBody}>
//             <View style={styles.billToBox}>
//               <Text style={styles.billToText}>{customerName}</Text>
//               <Text style={styles.billToMuted}>Deal: {dealName}</Text>
//               <Text style={styles.billToMuted}>Contact: {contactText}</Text>
//               {quotation?.account?.address && (
//                 <Text style={styles.billToMuted}>
//                   {quotation.account.address}
//                 </Text>
//               )}

//               {quotation?.account?.gstin && (
//                 <Text style={styles.billToMuted}>
//                   GSTIN: {quotation.account.gstin}
//                 </Text>
//               )}
//             </View>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text>Line Items</Text>
//           </View>
//           <View style={styles.sectionBody}>
//             <View style={styles.table} wrap>
//               <View style={styles.tableHeader}>
//                 <Text style={[styles.th, styles.col1]}>Item</Text>
//                 <Text style={[styles.th, styles.col2]}>Description</Text>
//                 <Text style={[styles.th, styles.col3]}>Make</Text>
//                 <Text style={[styles.th, styles.col4]}>Mfg PN</Text>
//                 <Text style={[styles.th, styles.col5]}>UOM</Text>
//                 <Text style={[styles.th, styles.col6]}>Qty</Text>
//                 <Text style={[styles.th, styles.col7]}>Price</Text>
//                 <Text style={[styles.th, styles.col8]}>Disc</Text>
//                 <Text style={[styles.th, styles.col9]}>Amount</Text>
//                 <Text style={[styles.th, styles.col10]}>Remarks</Text>
//               </View>

//               {rows.map((item, i) => {
//                 const qty = Number(item?.qty ?? item?.quantity ?? 0);
//                 const price = Number(item?.price ?? 0);
//                 const discount = Number(item?.discount ?? 0);
//                 const amount = lineAmount(item);

//                 return (
//                   <View key={i} style={styles.row} wrap={false}>
//                     <Text style={[styles.td, styles.col1]}>
//                       {safeText(item?.name || item?.sku || item?.productName)}
//                     </Text>
//                     <Text style={[styles.td, styles.col2]}>
//                       {safeText(item?.description)}
//                     </Text>
//                     <Text style={[styles.td, styles.col3]}>
//                       {safeText(item?.make || item?.manufacturer)}
//                     </Text>
//                     <Text style={[styles.td, styles.col4]}>
//                       {safeText(item?.mfgPartNo || item?.mfgPN || item?.partNo)}
//                     </Text>
//                     <Text style={[styles.td, styles.col5]}>
//                       {safeText(item?.uom || item?.unit)}
//                     </Text>
//                     <Text style={[styles.td, styles.col6]}>
//                       {safeText(qty, 0)}
//                     </Text>
//                     <Text style={[styles.td, styles.col7]}>
//                       {formatMoney(price)}
//                     </Text>
//                     <Text style={[styles.td, styles.col8]}>
//                       {formatMoney(discount)}
//                     </Text>
//                     <Text style={[styles.td, styles.col9]}>
//                       {formatMoney(amount)}
//                     </Text>
//                     <Text style={[styles.td, styles.col10]}>
//                       {safeText(item?.remarks)}
//                     </Text>
//                   </View>
//                 );
//               })}
//             </View>

//             <View style={styles.totalsWrap}>
//               <View style={styles.totals} wrap={false}>
//                 <View style={styles.totalRow}>
//                   <Text style={styles.totalLabel}>Subtotal</Text>
//                   <Text style={styles.totalValue}>{formatMoney(subtotal)}</Text>
//                 </View>

//                 <View style={styles.totalRow}>
//                   <Text style={styles.totalLabel}>Quotation Discount</Text>
//                   <Text style={styles.totalValue}>{formatMoney(discount)}</Text>
//                 </View>

//                 <View style={styles.totalRow}>
//                   <Text style={styles.totalLabel}>Taxable Value</Text>
//                   <Text style={styles.totalValue}>{formatMoney(taxable)}</Text>
//                 </View>

//                 <View style={styles.totalLine} />

//                 <View style={styles.totalRow}>
//                   <Text style={styles.totalLabel}>CGST (9%)</Text>
//                   <Text style={styles.totalValue}>{formatMoney(cgst)}</Text>
//                 </View>

//                 <View style={styles.totalRow}>
//                   <Text style={styles.totalLabel}>SGST (9%)</Text>
//                   <Text style={styles.totalValue}>{formatMoney(sgst)}</Text>
//                 </View>

//                 <View style={styles.totalRow}>
//                   <Text style={styles.totalLabel}>GST Total</Text>
//                   <Text style={styles.totalValue}>
//                     {formatMoney(cgst + sgst)}
//                   </Text>
//                 </View>

//                 <View style={styles.totalLine} />

//                 <View style={styles.grandTotalRow}>
//                   <Text style={styles.grandLabel}>Grand Total</Text>
//                   <Text style={styles.grandValue}>
//                     {formatMoney(grandTotal)}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>

//         <View break />

//         <View style={styles.section} wrap={false}>
//           <View style={styles.sectionHeader}>
//             <Text>Notes</Text>
//           </View>
//           <View style={styles.notesBox}>
//             <Text style={styles.smallBodyText}>
//               {quotation?.notes?.trim()
//                 ? quotation.notes
//                 : "No additional notes provided."}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text>Terms & Conditions</Text>
//           </View>
//           <View style={styles.notesBox}>
//             {termsLines.map((line, idx) => (
//               <Text key={idx} style={styles.smallBodyText}>
//                 {idx + 1}. {line}
//               </Text>
//             ))}
//           </View>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text>Warranty</Text>
//           </View>
//           <View style={styles.notesBox}>
//             {warrantyLines.map((line, idx) => (
//               <Text key={idx} style={styles.smallBodyText}>
//                 {idx + 1}. {line}
//               </Text>
//             ))}
//           </View>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text>Software Role</Text>
//           </View>
//           <View style={styles.notesBox}>
//             {softwareRoleLines.map((line, idx) => (
//               <Text key={idx} style={styles.smallBodyText}>
//                 {idx + 1}. {line}
//               </Text>
//             ))}
//           </View>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text>Application Engineer</Text>
//           </View>
//           <View style={styles.notesBox}>
//             {appEngineerLines.map((line, idx) => (
//               <Text key={idx} style={styles.smallBodyText}>
//                 {idx + 1}. {line}
//               </Text>
//             ))}
//           </View>
//         </View>

//         <View style={styles.footer}>
//           <Text style={styles.signatureTitle}>Authorized Signature</Text>
//           <Text style={styles.signatureSub}>
//             For MicroLogic Integrated Systems
//           </Text>
//         </View>

//         <Text
//           style={styles.pageNumber}
//           render={({ pageNumber, totalPages }) =>
//             `${pageNumber} / ${totalPages}`
//           }
//           fixed
//         />
//       </Page>
//     </Document>
//   );
// }

// src/features/quotations/QuotationPdfDocument.jsx

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const COLORS = {
  pageBg: "#F8FAFC",
  white: "#FFFFFF",
  ink: "#0F172A",
  text: "#111827",
  muted: "#64748B",
  border: "#CBD5E1",
  borderSoft: "#E2E8F0",
  headerBlue: "#1D4ED8",
  headerBlueSoft: "#DBEAFE",
  accentCyan: "#06B6D4",
  accentEmerald: "#10B981",
  accentViolet: "#8B5CF6",
  accentAmber: "#F59E0B",
  accentRose: "#F43F5E",
  rowAlt: "#F8FBFF",
  tableHead: "#EEF2FF",
  totalBg: "#F1F5F9",
  grandBg: "#DBEAFE",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 22,
    paddingHorizontal: 22,
    paddingBottom: 26,
    fontSize: 8.8,
    fontFamily: "Helvetica",
    color: COLORS.text,
    lineHeight: 1.32,
    backgroundColor: COLORS.pageBg,
  },

  header: {
    paddingBottom: 9,
    borderBottom: `1 solid ${COLORS.headerBlue}`,
    marginBottom: 10,
  },
  company: {
    fontSize: 13.5,
    fontWeight: "bold",
    letterSpacing: 0.35,
    color: COLORS.headerBlue,
  },
  subText: {
    fontSize: 8,
    marginTop: 2,
    color: COLORS.muted,
  },

  titleWrap: {
    marginBottom: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 15.5,
    fontWeight: "bold",
    letterSpacing: 1.15,
    color: COLORS.ink,
  },
  titleLine: {
    width: "100%",
    marginTop: 6,
    borderTop: `1 solid ${COLORS.border}`,
  },

  summaryGrid: {
    flexDirection: "row",
    marginBottom: 10,
  },
  summaryCard: {
    flex: 1,
    border: `1 solid ${COLORS.border}`,
    borderRadius: 5,
    padding: 7,
    backgroundColor: COLORS.white,
    marginRight: 8,
  },
  summaryCardLast: {
    marginRight: 0,
  },
  summaryCardBlue: {
    borderTop: `3 solid ${COLORS.headerBlue}`,
    backgroundColor: COLORS.headerBlueSoft,
  },
  summaryCardCyan: {
    borderTop: `3 solid ${COLORS.accentCyan}`,
    backgroundColor: "#ECFEFF",
  },
  summaryCardEmerald: {
    borderTop: `3 solid ${COLORS.accentEmerald}`,
    backgroundColor: "#ECFDF5",
  },
  summaryCardAmber: {
    borderTop: `3 solid ${COLORS.accentAmber}`,
    backgroundColor: "#FFF7ED",
  },
  summaryLabel: {
    fontSize: 7,
    color: COLORS.muted,
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  summaryValue: {
    fontSize: 9,
    fontWeight: "bold",
    color: COLORS.ink,
  },

  metaGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  metaCol: {
    width: "49%",
  },
  metaBox: {
    border: `1 solid ${COLORS.border}`,
    padding: 8,
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  metaLabel: {
    color: COLORS.muted,
    fontSize: 8,
  },
  metaValue: {
    fontSize: 8,
    fontWeight: "bold",
    color: COLORS.text,
  },

  section: {
    marginTop: 10,
  },
  sectionHeader: {
    backgroundColor: COLORS.headerBlue,
    border: `1 solid ${COLORS.headerBlue}`,
    paddingHorizontal: 8,
    paddingVertical: 5,
    fontSize: 8.5,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: COLORS.white,
  },
  sectionBody: {
    borderLeft: `1 solid ${COLORS.border}`,
    borderRight: `1 solid ${COLORS.border}`,
    borderBottom: `1 solid ${COLORS.border}`,
    padding: 8,
    backgroundColor: COLORS.white,
  },

  billToBox: {
    border: `1 solid ${COLORS.borderSoft}`,
    borderRadius: 5,
    padding: 8,
    backgroundColor: "#F8FBFF",
  },
  billToText: {
    fontSize: 8.8,
    marginBottom: 1,
    color: COLORS.ink,
    fontWeight: "bold",
  },
  billToMuted: {
    fontSize: 8,
    color: COLORS.muted,
    marginTop: 1,
  },

  table: {
    marginTop: 6,
    border: `1 solid ${COLORS.ink}`,
    display: "flex",
    flexDirection: "column",
    backgroundColor: COLORS.white,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.tableHead,
    borderBottom: `1 solid ${COLORS.ink}`,
  },
  row: {
    flexDirection: "row",
  },
  rowAlt: {
    backgroundColor: COLORS.rowAlt,
  },
  th: {
    paddingVertical: 4.5,
    paddingHorizontal: 3,
    fontSize: 7.2,
    fontWeight: "bold",
    color: COLORS.ink,
  },
  td: {
    paddingVertical: 4.5,
    paddingHorizontal: 3,
    fontSize: 7.2,
    borderTop: `1 solid ${COLORS.borderSoft}`,
    color: COLORS.text,
  },

  col1: { width: "12%" },
  col2: { width: "20%" },
  col3: { width: "10%" },
  col4: { width: "10%" },
  col5: { width: "6%" },
  col6: { width: "6%", textAlign: "right" },
  col7: { width: "9%", textAlign: "right" },
  col8: { width: "8%", textAlign: "right" },
  col9: { width: "10%", textAlign: "right" },
  col10: { width: "9%" },

  totalsWrap: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  totals: {
    width: "48%",
    border: `1 solid ${COLORS.border}`,
    backgroundColor: COLORS.totalBg,
    borderRadius: 4,
    overflow: "hidden",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  totalLabel: {
    fontSize: 8.4,
    color: COLORS.muted,
  },
  totalValue: {
    fontSize: 8.4,
    color: COLORS.text,
    fontWeight: "bold",
  },
  totalLine: {
    borderTop: `1 solid ${COLORS.border}`,
    marginVertical: 4,
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: COLORS.grandBg,
    borderTop: `1 solid ${COLORS.headerBlue}`,
  },
  grandLabel: {
    fontSize: 8.8,
    fontWeight: "bold",
    color: COLORS.ink,
  },
  grandValue: {
    fontSize: 8.8,
    fontWeight: "bold",
    color: COLORS.ink,
  },

  notesBox: {
    border: `1 solid ${COLORS.border}`,
    borderTop: "0 solid #000000",
    padding: 8,
    minHeight: 28,
    backgroundColor: COLORS.white,
  },
  smallBodyText: {
    fontSize: 8.3,
    color: COLORS.text,
    marginBottom: 2,
  },

  footer: {
    marginTop: 14,
    paddingTop: 8,
    borderTop: `1 solid ${COLORS.border}`,
  },
  signatureTitle: {
    fontSize: 8.8,
    fontWeight: "bold",
    color: COLORS.ink,
  },
  signatureSub: {
    fontSize: 8,
    color: COLORS.muted,
    marginTop: 1,
  },

  pageNumber: {
    position: "absolute",
    bottom: 10,
    right: 22,
    fontSize: 7.2,
    color: COLORS.muted,
  },
});

function formatMoney(value) {
  const n = Number(value || 0);
  return `Rs. ${new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)}`;
}

function safeText(value, fallback = "-") {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value);
}

function normalizeLines(value, fallbackLines = []) {
  if (Array.isArray(value) && value.length) {
    return value.filter(Boolean).map(String);
  }
  if (typeof value === "string" && value.trim()) {
    return value
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);
  }
  return fallbackLines;
}

function fmtDate(value) {
  if (!value) return "-";
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? safeText(value, "-")
    : d.toLocaleDateString();
}

function lineAmount(item) {
  const qty = Number(item?.qty ?? item?.quantity ?? 0);
  const price = Number(item?.price ?? 0);
  const discount = Number(item?.discount ?? 0);

  const net =
    item?.net !== undefined && item?.net !== null
      ? Number(item.net)
      : item?.lineTotal !== undefined && item?.lineTotal !== null
        ? Number(item.lineTotal)
        : qty * price - discount;

  return Number.isFinite(net) ? net : 0;
}

export default function QuotationPdfDocument({ quotation, totals }) {
  const rows = totals?.rows || quotation?.items || [];

  const companyName = "MICROLOGIC INTEGRATED SYSTEMS";
  const companyLocation = "Bengaluru, Karnataka, India";
  const companyContact =
    "GSTIN: 29ABCDE1234F1Z5 | Contact: techsales@micrologicglobal.com";

  const defaultTerms = [
    "Quotation valid for 15 days from the issue date.",
    "Payment terms: As mutually agreed.",
    "GST is applied at the quotation total level.",
    "Delivery timeline will be confirmed at the time of order finalization.",
  ];

  const defaultWarranty = [
    "Warranty is applicable only for supplied hardware items, if covered under the final sales order.",
    "Warranty period and coverage depend on product category and vendor terms.",
    "Consumables, wear-and-tear items, and misuse-related damage are excluded unless specified otherwise.",
  ];

  const defaultSoftwareRole = [
    "Software support covers basic configuration guidance, integration assistance, and handover support as agreed in scope.",
    "This does not include custom software development unless explicitly quoted.",
    "Remote assistance may be provided for commissioning, parameter checks, and operational clarification.",
  ];

  const defaultAppEngineer = [
    "Application engineering support includes requirement review, technical clarification, and solution alignment.",
    "Support may include site discussion, commissioning guidance, and coordination with the customer team.",
    "Final scope is subject to project complexity and mutually agreed deliverables.",
  ];

  const termsLines = normalizeLines(quotation?.terms, defaultTerms);
  const warrantyLines = normalizeLines(quotation?.warranty, defaultWarranty);
  const softwareRoleLines = normalizeLines(
    quotation?.softwareRole,
    defaultSoftwareRole,
  );
  const appEngineerLines = normalizeLines(
    quotation?.applicationEngineer,
    defaultAppEngineer,
  );

  const issueDate = fmtDate(quotation?.date || quotation?.issueDate);
  const validUntil = fmtDate(quotation?.validUntil);
  const quotationNo = safeText(
    quotation?.quotationNumber || quotation?.quotationNo,
    "-",
  );
  const status = safeText(quotation?.status, "DRAFT");
  const customerName = safeText(
    quotation?.accountName || quotation?.account?.accountName,
    "-",
  );

  const dealName = safeText(
    quotation?.dealName || quotation?.deal?.dealName || "-",
  );

  const contactText = safeText(
    quotation?.contactName ||
      quotation?.contact?.firstName ||
      quotation?.contact?.email ||
      (quotation?.contactIds?.length ? "Multiple Contacts" : ""),
    "-",
  );

  const subtotal = Number(totals?.subtotal ?? 0);
  const discount = Number(
    totals?.discount ??
      totals?.headerDiscount ??
      totals?.discountTotal ??
      quotation?.headerDiscount ??
      0,
  );
  const taxable =
    totals?.taxable !== undefined && totals?.taxable !== null
      ? Number(totals.taxable)
      : Math.max(subtotal - discount, 0);

  const taxTotal = Number(
    totals?.taxTotal ?? totals?.tax ?? quotation?.taxTotal ?? 0,
  );
  const cgst =
    totals?.cgst !== undefined && totals?.cgst !== null
      ? Number(totals.cgst)
      : taxTotal / 2;
  const sgst =
    totals?.sgst !== undefined && totals?.sgst !== null
      ? Number(totals.sgst)
      : taxTotal / 2;

  const grandTotal = Number(totals?.grandTotal ?? quotation?.grandTotal ?? 0);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          <Text style={styles.company}>{companyName}</Text>
          <Text style={styles.subText}>{companyLocation}</Text>
          <Text style={styles.subText}>{companyContact}</Text>
        </View>

        <View style={styles.titleWrap}>
          <Text style={styles.title}>QUOTATION</Text>
          <View style={styles.titleLine} />
        </View>

        <View style={styles.summaryGrid}>
          <View style={[styles.summaryCard, styles.summaryCardBlue]}>
            <Text style={styles.summaryLabel}>Quotation No</Text>
            <Text style={styles.summaryValue}>{quotationNo}</Text>
          </View>

          <View style={[styles.summaryCard, styles.summaryCardCyan]}>
            <Text style={styles.summaryLabel}>GST</Text>
            <Text style={styles.summaryValue}>18% (9% + 9%)</Text>
          </View>

          <View style={[styles.summaryCard, styles.summaryCardEmerald]}>
            <Text style={styles.summaryLabel}>Issue Date</Text>
            <Text style={styles.summaryValue}>{issueDate}</Text>
          </View>

          <View
            style={[
              styles.summaryCard,
              styles.summaryCardAmber,
              styles.summaryCardLast,
            ]}
          >
            <Text style={styles.summaryLabel}>Grand Total</Text>
            <Text style={styles.summaryValue}>{formatMoney(grandTotal)}</Text>
          </View>
        </View>

        <View style={styles.metaGrid}>
          <View style={styles.metaCol}>
            <View style={styles.metaBox}>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Date</Text>
                <Text style={styles.metaValue}>{issueDate}</Text>
              </View>
            </View>
          </View>

          <View style={styles.metaCol}>
            <View style={styles.metaBox}>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Status</Text>
                <Text style={styles.metaValue}>{status}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Valid Until</Text>
                <Text style={styles.metaValue}>{validUntil}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text>Bill To</Text>
          </View>
          <View style={styles.sectionBody}>
            <View style={styles.billToBox}>
              <Text style={styles.billToText}>{customerName}</Text>
              <Text style={styles.billToMuted}>Deal: {dealName}</Text>
              <Text style={styles.billToMuted}>Contact: {contactText}</Text>
              {quotation?.account?.address && (
                <Text style={styles.billToMuted}>
                  {quotation.account.address}
                </Text>
              )}

              {quotation?.account?.gstin && (
                <Text style={styles.billToMuted}>
                  GSTIN: {quotation.account.gstin}
                </Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text>Line Items</Text>
          </View>
          <View style={styles.sectionBody}>
            <View style={styles.table} wrap>
              <View style={styles.tableHeader}>
                <Text style={[styles.th, styles.col1]}>Item</Text>
                <Text style={[styles.th, styles.col2]}>Description</Text>
                <Text style={[styles.th, styles.col3]}>Make</Text>
                <Text style={[styles.th, styles.col4]}>Mfg PN</Text>
                <Text style={[styles.th, styles.col5]}>UOM</Text>
                <Text style={[styles.th, styles.col6]}>Qty</Text>
                <Text style={[styles.th, styles.col7]}>Price</Text>
                <Text style={[styles.th, styles.col8]}>Disc</Text>
                <Text style={[styles.th, styles.col9]}>Amount</Text>
                <Text style={[styles.th, styles.col10]}>Remarks</Text>
              </View>

              {rows.map((item, i) => {
                const qty = Number(item?.qty ?? item?.quantity ?? 0);
                const price = Number(item?.price ?? 0);
                const discount = Number(item?.discount ?? 0);
                const amount = lineAmount(item);

                return (
                  <View
                    key={i}
                    style={[styles.row, i % 2 === 1 ? styles.rowAlt : null]}
                    wrap={false}
                  >
                    <Text style={[styles.td, styles.col1]}>
                      {safeText(item?.name || item?.sku || item?.productName)}
                    </Text>
                    <Text style={[styles.td, styles.col2]}>
                      {safeText(item?.description)}
                    </Text>
                    <Text style={[styles.td, styles.col3]}>
                      {safeText(item?.make || item?.manufacturer)}
                    </Text>
                    <Text style={[styles.td, styles.col4]}>
                      {safeText(item?.mfgPartNo || item?.mfgPN || item?.partNo)}
                    </Text>
                    <Text style={[styles.td, styles.col5]}>
                      {safeText(item?.uom || item?.unit)}
                    </Text>
                    <Text style={[styles.td, styles.col6]}>
                      {safeText(qty, 0)}
                    </Text>
                    <Text style={[styles.td, styles.col7]}>
                      {formatMoney(price)}
                    </Text>
                    <Text style={[styles.td, styles.col8]}>
                      {formatMoney(discount)}
                    </Text>
                    <Text style={[styles.td, styles.col9]}>
                      {formatMoney(amount)}
                    </Text>
                    <Text style={[styles.td, styles.col10]}>
                      {safeText(item?.remarks)}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.totalsWrap}>
              <View style={styles.totals} wrap={false}>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Subtotal</Text>
                  <Text style={styles.totalValue}>{formatMoney(subtotal)}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Quotation Discount</Text>
                  <Text style={styles.totalValue}>{formatMoney(discount)}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Taxable Value</Text>
                  <Text style={styles.totalValue}>{formatMoney(taxable)}</Text>
                </View>

                <View style={styles.totalLine} />

                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>CGST (9%)</Text>
                  <Text style={styles.totalValue}>{formatMoney(cgst)}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>SGST (9%)</Text>
                  <Text style={styles.totalValue}>{formatMoney(sgst)}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>GST Total</Text>
                  <Text style={styles.totalValue}>
                    {formatMoney(cgst + sgst)}
                  </Text>
                </View>

                <View style={styles.totalLine} />

                <View style={styles.grandTotalRow}>
                  <Text style={styles.grandLabel}>Grand Total</Text>
                  <Text style={styles.grandValue}>
                    {formatMoney(grandTotal)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View break />

        <View style={styles.section} wrap={false}>
          <View style={styles.sectionHeader}>
            <Text>Notes</Text>
          </View>
          <View style={styles.notesBox}>
            <Text style={styles.smallBodyText}>
              {quotation?.notes?.trim()
                ? quotation.notes
                : "No additional notes provided."}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text>Terms & Conditions</Text>
          </View>
          <View style={styles.notesBox}>
            {termsLines.map((line, idx) => (
              <Text key={idx} style={styles.smallBodyText}>
                {idx + 1}. {line}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text>Warranty</Text>
          </View>
          <View style={styles.notesBox}>
            {warrantyLines.map((line, idx) => (
              <Text key={idx} style={styles.smallBodyText}>
                {idx + 1}. {line}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text>Software Role</Text>
          </View>
          <View style={styles.notesBox}>
            {softwareRoleLines.map((line, idx) => (
              <Text key={idx} style={styles.smallBodyText}>
                {idx + 1}. {line}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text>Application Engineer</Text>
          </View>
          <View style={styles.notesBox}>
            {appEngineerLines.map((line, idx) => (
              <Text key={idx} style={styles.smallBodyText}>
                {idx + 1}. {line}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.signatureTitle}>Authorized Signature</Text>
          <Text style={styles.signatureSub}>
            For MicroLogic Integrated Systems
          </Text>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
