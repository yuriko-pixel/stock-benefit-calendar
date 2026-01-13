import { ArrowLeft, Share2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StockBenefit } from '@/lib/data';

interface BenefitDetailProps {
  item: StockBenefit;
  onBack: () => void;
  onShare: () => void;
}

export function BenefitDetail({ item, onBack, onShare }: BenefitDetailProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="card-nordic p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mb-4 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            戻る
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {item.companyName}
          </h1>
          <p className="text-sm text-muted-foreground font-mono">
            ティッカー: {item.ticker}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onShare}
            className="rounded-lg"
          >
            <Share2 className="w-4 h-4 mr-2" />
            シェア
          </Button>
          {item.url && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(item.url, '_blank')}
              className="rounded-lg"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              企業サイト
            </Button>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-secondary rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">業種</p>
          <p className="text-lg font-semibold text-foreground">{item.sector}</p>
        </div>
        <div className="bg-secondary rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">優待タイプ</p>
          <p className="text-lg font-semibold text-foreground">
            {item.benefitType}
          </p>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="rounded-lg p-4 text-white"
          style={{ backgroundColor: 'var(--color-ex-right)' }}
        >
          <p className="text-xs mb-1 opacity-90">権利確定日</p>
          <p className="text-2xl font-bold">{formatDate(item.exRightDate)}</p>
        </div>
        <div
          className="rounded-lg p-4 text-white"
          style={{ backgroundColor: 'var(--color-ex-dividend)' }}
        >
          <p className="text-xs mb-1 opacity-90">権利落ち日</p>
          <p className="text-2xl font-bold">{formatDate(item.exDividendDate)}</p>
        </div>
      </div>

      {/* Investment Amount */}
      <div className="bg-secondary rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-2">最低投資額</p>
        <p className="text-3xl font-bold text-foreground">
          {formatPrice(item.minInvestment)}
        </p>
      </div>

      {/* Benefit Description */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">優待内容</h2>
        <p className="text-lg font-semibold text-foreground">
          {item.benefitDescription}
        </p>
        <p className="text-base text-foreground leading-relaxed">
          {item.benefitDetails}
        </p>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          このページの情報は参考情報です。最新の情報は企業の公式ウェブサイトをご確認ください。
        </p>
      </div>
    </div>
  );
}
