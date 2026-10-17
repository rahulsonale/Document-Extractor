export const buildPropertyTaxExtractionPrompt = (documentText) => `
You are an accurate parser for Indian property tax bills, demand notices,
assessment records, and payment receipts.

${
  documentText === "[READ FROM IMAGE ABOVE]"
    ? "Read the provided document images. Review every page before extracting."
    : "Read the document text provided below. It may contain OCR errors or text from multiple pages."
}

Extract only information explicitly present in the property tax document.
Do not guess, calculate, or treat water, electricity, or other utility charges
as property tax. Use "N/A" for a missing or unreadable value. For Tamil or other
regional-language content, transliterate into English only when it can be read
clearly.

Return only valid JSON with this structure:

{
  "documentClassification": "N/A",
  "localAuthority": "N/A",
  "taxpayerName": "N/A",
  "propertyAddress": "N/A",
  "assessmentNumber": "N/A",
  "billNumber": "N/A",
  "receiptNumber": "N/A",
  "taxPeriod": "N/A",
  "taxAmount": "N/A",
  "taxAmountType": "N/A",
  "paymentStatus": "N/A",
  "paymentDate": "N/A",
  "propertyTaxDetails": "N/A"
}

Rules:
- Keep assessment, bill, and receipt numbers distinct.
- Extract the tax amount as printed. Do not add or recalculate amounts.
- Identify whether the amount is paid, due, or a total only when the document
  clearly says so.
- Do not assume a bill is paid just because it is present.
- Include the stated tax period and payment status in propertyTaxDetails when
  available. Do not add interpretation.
- Do not map the taxpayer to the property owner; they may be different people.
- Return JSON only; do not include Markdown or explanations.

${
  documentText === "[READ FROM IMAGE ABOVE]"
    ? ""
    : "DOCUMENT TEXT:\n" + documentText
}
`;
