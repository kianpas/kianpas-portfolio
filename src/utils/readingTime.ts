// 텍스트 읽기 시간 계산
export function calculateReadingTime(text: string): number {
  // HTML 태그 제거
  const cleanText = text.replace(/<[^>]*>/g, "");

  // 한글과 영어 단어 수 계산
  const koreanChars = (cleanText.match(/[가-힣]/g) || []).length;
  const englishWords = (cleanText.match(/[a-zA-Z]+/g) || []).length;

  // 읽기 시간 계산 (한글: 분당 350자, 영어: 분당 200단어)
  const readingTime = koreanChars / 350 + englishWords / 200;

  return Math.max(1, Math.ceil(readingTime));
}

// 읽기 시간 포맷팅
export function formatReadingTime(minutes: number): string {
  return `${minutes}분 읽기`;
}
