const cleanValue = (value) => {
  if (value == null || typeof value === "object") return "";

  const text = String(value).trim();

  if (/^(?:n\/?a|null|undefined|-)$/i.test(text)) {
    return "";
  }

  return text;
};

const joinNames = (value) => {
  const names = Array.isArray(value)
    ? value.map(cleanValue).filter(Boolean)
    : [cleanValue(value)].filter(Boolean);

  return names.length ? names.join(" & ") : "N/A";
};

const reportValue = (value) => cleanValue(value) || "N/A";

export const mapSaleAgreementToReport = (raw = {}) => ({
  // Purchasers are the buyers named in this agreement.
  ownerName: joinNames(raw.purchaserNames),

  // Vendors are the sellers named in this agreement.
  sellerName: joinNames(raw.vendorNames),

  saleAgreementDate: reportValue(raw.agreementDate),
  propertyLocation: reportValue(raw.propertyLocation),
  flatNo: reportValue(raw.flatNo),
  undividedArea: reportValue(raw.undividedArea),
  plotAreaAsPerDocumentSqft: reportValue(raw.plotAreaAsPerDocumentSqft),

  boundaryNorthDeed: reportValue(raw.northBoundary),
  boundarySouthDeed: reportValue(raw.southBoundary),
  boundaryEastDeed: reportValue(raw.eastBoundary),
  boundaryWestDeed: reportValue(raw.westBoundary),

  surveyNo: reportValue(raw.surveyNo),
  oldSurveyNo: reportValue(raw.oldSurveyNo),
  newSurveyNo: reportValue(raw.newSurveyNo),

  plotDimNorthDoc: reportValue(raw.plotDimNorthDoc),
  plotDimSouthDoc: reportValue(raw.plotDimSouthDoc),
  plotDimEastDoc: reportValue(raw.plotDimEastDoc),
  plotDimWestDoc: reportValue(raw.plotDimWestDoc),
});
