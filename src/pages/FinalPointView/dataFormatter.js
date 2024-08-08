export const serverDataFormatter = (data) => {
  return {
    studyPoint: {
      extraPoint: +data.studyPoint,
      comment: data.studyComment ?? "",
    },
    activityPoint: {
      extraPoint1: +data.activityPoint1,
      extraPoint2: +data.activityPoint2,
      extraPoint3: +data.activityPoint3,
      extraPoint4: +data.activityPoint4,
      extraPoint5: +data.activityPoint5,
    },
    citizenshipPoint: {
      extraPoint: +data.citizenshipPoint,
      comment: data.citizenshipComment ?? "",
    },
    organizationPoint: {
      extraPoint: +data.organizationPoint,
      comment: data.organizationComment ?? "",
    },
  };
};

export const clientDataFormatter = (data) => {
  return {
    studyPoint: data.studyPoint.extraPoint,
    studyComment: data.studyPoint.comment ?? "",
    activityPoint1: data.activityPoint.extraPoint1 ?? 0,
    activityPoint2: data.activityPoint.extraPoint2 ?? 0,
    activityPoint3: data.activityPoint.extraPoint3 ?? 0,
    activityPoint4: data.activityPoint.extraPoint4 ?? 0,
    activityPoint5: data.activityPoint.extraPoint5 ?? 0,
    citizenshipPoint: data.citizenshipPoint.extraPoint ?? 0,
    citizenshipComment: data.citizenshipPoint.comment ?? "",
    organizationPoint: data.organizationPoint.extraPoint,
    organizationComment: data.organizationPoint.comment ?? "",
  };
};

