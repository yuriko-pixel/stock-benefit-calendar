import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { CalendarView } from '@/components/CalendarView';
import { FilterPanel } from '@/components/FilterPanel';
import { BenefitListItem } from '@/components/BenefitListItem';
import { BenefitDetail } from '@/components/BenefitDetail';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { sampleData, Sector, BenefitType, PriceRange, getPriceRange, StockBenefit } from '@/lib/data';

/**
 * Design Philosophy: Nordic Minimalism
 * - Warm cream background (#FFFBF5) with gentle blue primary (#5B9BD5)
 * - Green (#70AD47) for ex-right dates, Orange (#FFA500) for ex-dividend dates
 * - Rounded cards (16px) with soft shadows
 * - Noto Sans JP typography for warmth and accessibility
 * - Dark mode support with inverted color scheme
 */

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // January 2024
  const [selectedSectors, setSelectedSectors] = useState<Set<Sector>>(new Set());
  const [selectedBenefitTypes, setSelectedBenefitTypes] = useState<Set<BenefitType>>(new Set());
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<Set<PriceRange>>(new Set());
  const [selectedBenefit, setSelectedBenefit] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(50);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);

  // Get unique values for filters
  const uniqueSectors = Array.from(new Set(sampleData.map((item) => item.sector))).sort() as Sector[];
  const uniqueBenefitTypes = Array.from(new Set(sampleData.map((item) => item.benefitType))).sort() as BenefitType[];
  const uniquePriceRanges: PriceRange[] = ['under_100k', '100k_500k', '500k_1m', 'over_1m'];

  // Filter data
  const filteredData = useMemo(() => {
    return sampleData.filter((item) => {
      // Sector filter
      if (selectedSectors.size > 0 && !selectedSectors.has(item.sector)) {
        return false;
      }

      // Benefit type filter
      if (selectedBenefitTypes.size > 0 && !selectedBenefitTypes.has(item.benefitType)) {
        return false;
      }

      // Price range filter
      if (selectedPriceRanges.size > 0) {
        const priceRange = getPriceRange(item.minInvestment);
        if (!selectedPriceRanges.has(priceRange)) {
          return false;
        }
      }

      // Date filter (if a date is selected from calendar)
      if (selectedDateFilter) {
        const exRightMatch = item.exRightDate === selectedDateFilter;
        const exDividendMatch = item.exDividendDate === selectedDateFilter;
        if (!exRightMatch && !exDividendMatch) {
          return false;
        }
      }

      return true;
    });
  }, [selectedSectors, selectedBenefitTypes, selectedPriceRanges, selectedDateFilter]);

  const handleSectorChange = (sector: Sector, checked: boolean) => {
    const newSectors = new Set(selectedSectors);
    if (checked) {
      newSectors.add(sector);
    } else {
      newSectors.delete(sector);
    }
    setSelectedSectors(newSectors);
    setDisplayCount(50); // Reset display count when filter changes
    setSelectedDateFilter(null);
  };

  const handleBenefitTypeChange = (type: BenefitType, checked: boolean) => {
    const newTypes = new Set(selectedBenefitTypes);
    if (checked) {
      newTypes.add(type);
    } else {
      newTypes.delete(type);
    }
    setSelectedBenefitTypes(newTypes);
    setDisplayCount(50);
    setSelectedDateFilter(null);
  };

  const handlePriceRangeChange = (range: PriceRange, checked: boolean) => {
    const newRanges = new Set(selectedPriceRanges);
    if (checked) {
      newRanges.add(range);
    } else {
      newRanges.delete(range);
    }
    setSelectedPriceRanges(newRanges);
    setDisplayCount(50);
    setSelectedDateFilter(null);
  };

  const handleResetFilters = () => {
    setSelectedSectors(new Set());
    setSelectedBenefitTypes(new Set());
    setSelectedPriceRanges(new Set());
    setDisplayCount(50);
    setSelectedDateFilter(null);
  };

  const handleDateClick = (dateStr: string) => {
    setSelectedDateFilter(selectedDateFilter === dateStr ? null : dateStr);
    setDisplayCount(50);
  };

  const handleShare = (item: typeof sampleData[0]) => {
    const text = `${item.companyName}の株主優待をチェック！\n${item.benefitDescription}\n最低投資額: ${new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', minimumFractionDigits: 0 }).format(item.minInvestment)}`;

    if (navigator.share) {
      navigator.share({
        title: '株主優待カレンダー',
        text: text,
      }).catch((err) => console.log('Share failed:', err));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(text);
      toast.success('シェア情報をコピーしました');
    }
  };

  const selectedBenefitData = selectedBenefit
    ? sampleData.find((item) => item.id === selectedBenefit)
    : null;

  if (selectedBenefitData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <BenefitDetail
            item={selectedBenefitData}
            onBack={() => setSelectedBenefit(null)}
            onShare={() => handleShare(selectedBenefitData)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container py-8">
        <div className="space-y-8">
          {/* Calendar */}
          <CalendarView
            data={sampleData}
            currentDate={currentDate}
            onMonthChange={setCurrentDate}
            onDateClick={handleDateClick}
          />

          {/* List Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">
                {selectedDateFilter ? '該当する優待' : '全ての優待'} ({filteredData.length}件)
              </h2>
              {selectedDateFilter && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedDateFilter(null)}
                  className="text-xs"
                >
                  ✕ 日付フィルタをクリア
                </Button>
              )}
            </div>

            {/* Filters */}
            <FilterPanel
              sectors={uniqueSectors}
              benefitTypes={uniqueBenefitTypes}
              priceRanges={uniquePriceRanges}
              selectedSectors={selectedSectors}
              selectedBenefitTypes={selectedBenefitTypes}
              selectedPriceRanges={selectedPriceRanges}
              onSectorChange={handleSectorChange}
              onBenefitTypeChange={handleBenefitTypeChange}
              onPriceRangeChange={handlePriceRangeChange}
              onReset={handleResetFilters}
            />

            {/* List */}
            {filteredData.length === 0 ? (
              <div className="card-nordic p-8 text-center">
                <p className="text-muted-foreground">
                  条件に合う優待が見つかりません
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {filteredData.slice(0, displayCount).map((item) => (
                    <BenefitListItem
                      key={item.id}
                      item={item}
                      onClick={() => setSelectedBenefit(item.id)}
                      onShare={() => handleShare(item)}
                    />
                  ))}
                </div>

                {displayCount < filteredData.length && (
                  <div className="flex justify-center pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setDisplayCount(displayCount + 50)}
                      className="rounded-lg"
                    >
                      もっと見る ({displayCount}/{filteredData.length})
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
