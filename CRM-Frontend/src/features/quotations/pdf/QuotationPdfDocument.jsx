import { Document } from "@react-pdf/renderer";
import { buildQuotationPdfData } from "./quotationPdfMapper";
import CoverPage from "./pages/CoverPage";
import RevisionHistoryPage from "./pages/RevisionHistoryPage";
import TextSectionPage from "./pages/TextSectionPage";
import PricingPage from "./pages/PricingPage";
import ProcessFlowPage from "./pages/ProcessFlowPage";
import BankDetailsPage from "./pages/BankDetailsPage";

export default function QuotationPdfDocument({ quotation = {} }) {
  const data = buildQuotationPdfData(quotation);

  return (
    <Document>
      <CoverPage data={data} />
      <RevisionHistoryPage data={data} />

      <TextSectionPage
        title="Confidentiality & General Conditions"
        paragraphs={data.confidentiality.paragraphs}
      />

      <PricingPage data={data} />

      <TextSectionPage
        title={data.warranty.title}
        blocks={data.warranty.blocks}
        note={data.warranty.note}
      />

      <TextSectionPage
        title={data.softwareSupport.title}
        blocks={data.softwareSupport.blocks}
      />

      <TextSectionPage
        title={data.commercialTerms.title}
        blocks={data.commercialTerms.blocks}
      />

      <TextSectionPage
        title={data.delayedDelivery.title}
        blocks={data.delayedDelivery.blocks}
      />

      <TextSectionPage
        title={data.engagement.title}
        blocks={data.engagement.blocks}
      />

      <ProcessFlowPage data={data} />
      <BankDetailsPage data={data} />
    </Document>
  );
}