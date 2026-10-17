const cleanValue = (value) => {
  if (value == null || typeof value === "object") return "";

  const text = String(value).trim();

  if (/^(?:n\/?a|null|undefined|-)$/i.test(text)) {
    return "";
  }

  return text;
};

const reportValue = (value) => cleanValue(value) || "N/A";

export const mapApprovedBuildingPlanToReport = (raw = {}) => ({
  buildingPlanAuthority: reportValue(raw.issuingAuthority),
  buildingPlanApprovalNo: reportValue(raw.buildingPlanApprovalNo),
  buildingPlanNo: reportValue(raw.buildingPlanNo),
  buildingPlanBANo: reportValue(raw.buildingPlanBANo),
  buildingPlanDate: reportValue(raw.buildingPlanDate),
  approvedBuildingPlanArea: reportValue(raw.approvedBuildingPlanArea),
  floorsAsPerPlan: reportValue(raw.floorsAsPerPlan),

  propertyLocation: reportValue(raw.propertyLocation),
  plotNo: reportValue(raw.plotNo),
  surveyNo: reportValue(raw.surveyNo),
  oldSurveyNo: reportValue(raw.oldSurveyNo),
  newSurveyNo: reportValue(raw.newSurveyNo),
});
