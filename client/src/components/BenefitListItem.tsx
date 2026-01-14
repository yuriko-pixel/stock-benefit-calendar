import { ChevronRight, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StockBenefit } from '@/lib/data';

interface BenefitListItemProps {
  item: StockBenefit;
  onClick: () => void;
  onShare: () => void;
}

export function BenefitListItem({ item, onClick, onShare }: BenefitListItemProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="card-nordic p-4 hover:shadow-md transition-all cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Company Header */}
          <div className="flex items-baseline gap-3 mb-2">
            <h3 className="font-bold text-foreground text-lg">{item.companyName}</h3>
            <span className="text-xs font-mono text-muted-foreground">{item.ticker}</span>
          </div>

          {/* Sector and Benefit Type */}
          <div className="flex gap-2 mb-3">
            <span className="inline-block px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md font-medium">
              {item.sector}
            </span>
            <span
              className="inline-block px-2 py-1 text-xs rounded-md font-medium text-white"
              style={{ backgroundColor: 'var(--color-ex-right)' }}
            >
              {item.benefitType}
            </span>
          </div>

          {/* Benefit Description */}
          <p className="text-sm text-foreground mb-3 line-clamp-2">
            {item.benefitDescription}
          </p>

          {/* Dates and Price */}
          <div className="flex flex-wrap gap-5 text-xs mb-2 items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground text-xs">確:</span>
              <span
                className="font-bold text-base"
                style={{ color: 'var(--color-ex-right)' }}
              >
                {formatDate(item.exRightDate)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground text-xs">落:</span>
              <span
                className="font-bold text-base"
                style={{ color: 'var(--color-ex-dividend)' }}
              >
                {formatDate(item.exDividendDate)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">最低投資額:</span>
              <span className="font-semibold text-foreground">
                {formatPrice(item.minInvestment)}
              </span>
            </div>
          </div>

          {/* Stock Price and Yields */}
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">株価:</span>
              <span className="font-semibold text-foreground">
                {formatPrice(item.previousClosePrice)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">優待価値:</span>
              <span className="font-semibold text-foreground">
                {formatPrice(item.benefitValue)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">配当利回り:</span>
              <span className="font-semibold text-foreground">
                {item.dividendYield.toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">総合利回り:</span>
              <span className="font-semibold" style={{ color: 'var(--color-ex-right)' }}>
                {item.totalYield.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 ml-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onShare();
            }}
            className="rounded-lg"
            title="シェア"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="rounded-lg"
            title="詳細を見る"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
