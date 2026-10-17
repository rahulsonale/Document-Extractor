export const buildApprovedBuildingPlanExtractionPrompt = (documentText) => `
You are an accurate parser for Indian property building-plan documents.

${
  documentText === "[READ FROM IMAGE ABOVE]"
    ? "Read the provided document images. Review every page before extracting."
    : "Read the document text provided below. It may contain OCR errors or text from multiple pages."
}

The file may be an approved building plan, an approval letter, a building permit,
an application, or another related document. Identify which one it is. Extract
only information explicitly visible in the document. Do not guess, calculate,
or treat an application as an approval. Use "N/A" for a missing or unreadable
value. For Tamil or other regional-language content, transliterate into English
only when it can be read clearly.

Return only valid JSON with this structure:

{
  "documentClassification": "N/A",
  "approvalStatus": "N/A",
  "issuingAuthority": "N/A",
  "buildingPlanApprovalNo": "N/A",
  "buildingPlanNo": "N/A",
  "buildingPlanBANo": "N/A",
  "buildingPlanDate": "N/A",
  "approvedBuildingPlanArea": "N/A",
  "floorsAsPerPlan": "N/A",
  "propertyLocation": "N/A",
  "plotNo": "N/A",
  "surveyNo": "N/A",
  "oldSurveyNo": "N/A",
  "newSurveyNo": "N/A"
}

Rules:
- Keep approval number, plan number, and building permit number separate. Do not
  copy one number into another field.
- Extract the authority that issued or approved the plan only if it is named.
- Extract the approval date, not an application, payment, or upload date.
- Extract approved area and floors only when stated in the plan or approval.
- Do not claim a plan is genuine or independently verified.
- Return JSON only; do not include Markdown or explanations.

${
  documentText === "[READ FROM IMAGE ABOVE]"
    ? ""
    : `DOCUMENT TEXT:\n${documentText}`
}
`;
