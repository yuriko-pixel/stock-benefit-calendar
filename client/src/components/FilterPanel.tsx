import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Sector, BenefitType, priceRangeLabels, PriceRange } from '@/lib/data';

interface FilterPanelProps {
  sectors: Sector[];
  benefitTypes: BenefitType[];
  priceRanges: PriceRange[];
  selectedSectors: Set<Sector>;
  selectedBenefitTypes: Set<BenefitType>;
  selectedPriceRanges: Set<PriceRange>;
  onSectorChange: (sector: Sector, checked: boolean) => void;
  onBenefitTypeChange: (type: BenefitType, checked: boolean) => void;
  onPriceRangeChange: (range: PriceRange, checked: boolean) => void;
  onReset: () => void;
}

export function FilterPanel({
  sectors,
  benefitTypes,
  priceRanges,
  selectedSectors,
  selectedBenefitTypes,
  selectedPriceRanges,
  onSectorChange,
  onBenefitTypeChange,
  onPriceRangeChange,
  onReset,
}: FilterPanelProps) {
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  const hasActiveFilters =
    selectedSectors.size > 0 ||
    selectedBenefitTypes.size > 0 ||
    selectedPriceRanges.size > 0;

  const toggleFilter = (filterName: string) => {
    setExpandedFilter(expandedFilter === filterName ? null : filterName);
  };

  return (
    <div className="space-y-4">
      {/* Filter Buttons - Horizontal Layout */}
      <div className="flex flex-wrap gap-3">
        {/* Sector Filter Button */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleFilter('sector')}
            className="rounded-lg flex items-center gap-2"
          >
            業種
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                expandedFilter === 'sector' ? 'rotate-180' : ''
              }`}
            />
          </Button>

          {/* Sector Dropdown */}
          {expandedFilter === 'sector' && (
            <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg p-4 shadow-lg z-10 min-w-48">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
                <span className="text-sm font-semibold">業種を選択</span>
                <button
                  onClick={() => setExpandedFilter(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {sectors.map((sector) => (
                  <div key={sector} className="flex items-center gap-2">
                    <Checkbox
                      id={`sector-${sector}`}
                      checked={selectedSectors.has(sector)}
                      onCheckedChange={(checked) =>
                        onSectorChange(sector, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`sector-${sector}`}
                      className="text-sm cursor-pointer font-normal"
                    >
                      {sector}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Benefit Type Filter Button */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleFilter('benefit')}
            className="rounded-lg flex items-center gap-2"
          >
            優待タイプ
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                expandedFilter === 'benefit' ? 'rotate-180' : ''
              }`}
            />
          </Button>

          {/* Benefit Type Dropdown */}
          {expandedFilter === 'benefit' && (
            <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg p-4 shadow-lg z-10 min-w-48">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
                <span className="text-sm font-semibold">優待タイプを選択</span>
                <button
                  onClick={() => setExpandedFilter(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {benefitTypes.map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <Checkbox
                      id={`benefit-${type}`}
                      checked={selectedBenefitTypes.has(type)}
                      onCheckedChange={(checked) =>
                        onBenefitTypeChange(type, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`benefit-${type}`}
                      className="text-sm cursor-pointer font-normal"
                    >
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Price Range Filter Button */}
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleFilter('price')}
            className="rounded-lg flex items-center gap-2"
          >
            最低投資額
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                expandedFilter === 'price' ? 'rotate-180' : ''
              }`}
            />
          </Button>

          {/* Price Range Dropdown */}
          {expandedFilter === 'price' && (
            <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg p-4 shadow-lg z-10 min-w-48">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
                <span className="text-sm font-semibold">最低投資額を選択</span>
                <button
                  onClick={() => setExpandedFilter(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {priceRanges.map((range) => (
                  <div key={range} className="flex items-center gap-2">
                    <Checkbox
                      id={`price-${range}`}
                      checked={selectedPriceRanges.has(range)}
                      onCheckedChange={(checked) =>
                        onPriceRangeChange(range, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`price-${range}`}
                      className="text-sm cursor-pointer font-normal"
                    >
                      {priceRangeLabels[range]}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selected Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {Array.from(selectedSectors).map((sector) => (
            <div
              key={`sector-${sector}`}
              className="inline-flex items-center gap-2 bg-white text-foreground px-3 py-1.5 rounded-lg text-sm border border-border shadow-sm"
            >
              <span>{sector}</span>
              <button
                onClick={() => onSectorChange(sector, false)}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {Array.from(selectedBenefitTypes).map((type) => (
            <div
              key={`benefit-${type}`}
              className="inline-flex items-center gap-2 bg-white text-foreground px-3 py-1.5 rounded-lg text-sm border border-border shadow-sm"
            >
              <span>{type}</span>
              <button
                onClick={() => onBenefitTypeChange(type, false)}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {Array.from(selectedPriceRanges).map((range) => (
            <div
              key={`price-${range}`}
              className="inline-flex items-center gap-2 bg-white text-foreground px-3 py-1.5 rounded-lg text-sm border border-border shadow-sm"
            >
              <span>{priceRangeLabels[range]}</span>
              <button
                onClick={() => onPriceRangeChange(range, false)}
                className="hover:opacity-70 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-xs ml-2"
            >
              すべてクリア
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
