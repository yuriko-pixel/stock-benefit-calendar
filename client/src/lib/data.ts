// 株主優待データ構造とデータ取得ロジック

export type Sector =
  | '食品'
  | '小売'
  | '金融'
  | '不動産'
  | '電気・ガス'
  | '通信'
  | '運輸'
  | '観光・ホテル'
  | '医療・介護'
  | 'IT・情報通信'
  | '製造業'
  | 'その他';

export type BenefitType =
  | '商品券'
  | '割引券'
  | 'サービス'
  | '株主優待品'
  | 'その他';

export type PriceRange =
  | 'under_100k'
  | '100k_500k'
  | '500k_1m'
  | 'over_1m';

export interface StockBenefit {
  id: string;
  companyName: string;
  ticker: string;
  sector: Sector;
  exRightDate: string; // YYYY-MM-DD 権利確定日
  exDividendDate: string; // YYYY-MM-DD 権利落ち日
  minInvestment: number; // 最低投資額（円）
  benefitType: BenefitType;
  benefitDescription: string; // 優待内容の説明
  benefitDetails: string; // 詳細説明
  url?: string; // 企業ウェブサイト
}

export const priceRangeLabels: Record<PriceRange, string> = {
  'under_100k': '10万円以下',
  '100k_500k': '10～50万円',
  '500k_1m': '50～100万円',
  'over_1m': '100万円以上',
};

export function getPriceRange(amount: number): PriceRange {
  if (amount <= 100000) return 'under_100k';
  if (amount <= 500000) return '100k_500k';
  if (amount <= 1000000) return '500k_1m';
  return 'over_1m';
}

export async function fetchStockBenefits(): Promise<StockBenefit[]> {
  const response = await fetch('/data.json');
  if (!response.ok) {
    throw new Error('データの取得に失敗しました');
  }
  return response.json();
}
