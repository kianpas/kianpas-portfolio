/**
 * 텍스트의 예상 읽기 시간을 계산합니다.
 * @param text - 계산할 텍스트
 * @param wordsPerMinute - 분당 읽기 단어 수 (기본값: 200)
 * @returns 읽기 시간 (분)
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  // HTML 태그 제거
  const cleanText = text.replace(/<[^>]*>/g, '');
  
  // 한글과 영어 단어 수 계산
  const koreanChars = (cleanText.match(/[가-힣]/g) || []).length;
  const englishWords = (cleanText.match(/[a-zA-Z]+/g) || []).length;
  
  // 한글은 글자당, 영어는 단어당 계산
  // 한글 읽기 속도는 분당 약 300-400자로 가정
  const koreanWordsPerMinute = 350;
  const totalReadingTime = (koreanChars / koreanWordsPerMinute) + (englishWords / wordsPerMinute);
  
  return Math.max(1, Math.ceil(totalReadingTime));
}

/**
 * 읽기 시간을 한국어 형식으로 포맷팅합니다.
 * @param minutes - 읽기 시간 (분)
 * @returns 포맷된 문자열 (예: "3분 읽기")
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes}분 읽기`;
}