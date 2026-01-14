// 株主優待データ構造と初期データ

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
  previousClosePrice: number; // 前日の株価終値
  benefitValue: number; // 優待価値（円）
  dividendYield: number; // 配当利回り（%）
  totalYield: number; // 総合利回り（%）
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

// JSONファイルから動的に読み込む関数
export async function loadSampleData(): Promise<StockBenefit[]> {
  try {
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error(`Failed to load data.json: ${response.statusText}`);
    }
    const data = await response.json();
    return data as StockBenefit[];
  } catch (error) {
    console.error('Error loading sample data:', error);
    return [];
  }
}

// 開発環境用のフォールバック（空配列）
export const sampleData: StockBenefit[] = [];
