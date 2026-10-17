export const buildSaleAgreementExtractionPrompt = (documentText) => `
You are an accurate parser for Indian property Sale Agreements.

${
  documentText === "[READ FROM IMAGE ABOVE]"
    ? "Read the provided document images. Review every page before extracting."
    : "Read the document text provided below. It may contain OCR errors or text from multiple pages."
}

Extract only information that is explicitly present in the Sale Agreement.
Do not guess, calculate, or fill gaps using outside knowledge. If a value is
missing or unreadable, use "N/A". Preserve names and property details as written.
For Tamil or other regional-language content, transliterate into English only
when the value can be read clearly.

Return only valid JSON with this structure:

{
  "purchaserNames": [],
  "vendorNames": [],
  "agreementDate": "N/A",
  "propertyLocation": "N/A",
  "flatNo": "N/A",
  "undividedArea": "N/A",
  "plotAreaAsPerDocumentSqft": "N/A",
  "northBoundary": "N/A",
  "southBoundary": "N/A",
  "eastBoundary": "N/A",
  "westBoundary": "N/A",
  "surveyNo": "N/A",
  "oldSurveyNo": "N/A",
  "newSurveyNo": "N/A",
  "plotDimNorthDoc": "N/A",
  "plotDimSouthDoc": "N/A",
  "plotDimEastDoc": "N/A",
  "plotDimWestDoc": "N/A"
}

Rules:
- List every purchaser and vendor named in the agreement. Use an empty array if none can be identified.
- Use the date of this Sale Agreement, not a date from a prior deed or another document.
- Use the property schedule to identify the property location, flat number, undivided share, survey numbers, boundaries, and dimensions.
- Do not treat the flat's built-up area as the undivided area or total plot area.
- Only return a plot area or dimension when the document clearly labels it as such.
- Do not extract Aadhaar, PAN, bank-account, or other sensitive identity numbers.
- Return JSON only; do not include Markdown or explanations.

${
  documentText === "[READ FROM IMAGE ABOVE]"
    ? ""
    : `DOCUMENT TEXT:\n${documentText}`
}
`;
