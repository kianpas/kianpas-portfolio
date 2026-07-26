/** 글 날짜를 "2025. 08. 28." 형식으로 포맷 */
export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

/** "YYYY-MM" 문자열을 "YYYY.MM"으로 포맷 (프로젝트 기간용) */
export const formatYearMonth = (dateStr: string) => {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  return `${year}.${month}`;
};

/** 프로젝트 시작~종료 기간 문자열 (종료일 없으면 "진행 중") */
export const formatProjectPeriod = (startDate?: string, endDate?: string) => {
  if (!startDate) return "";
  return `${formatYearMonth(startDate)} - ${endDate ? formatYearMonth(endDate) : "진행 중"}`;
};
