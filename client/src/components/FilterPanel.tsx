import { X } from 'lucide-react';
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
  const hasActiveFilters =
    selectedSectors.size > 0 ||
    selectedBenefitTypes.size > 0 ||
    selectedPriceRanges.size > 0;

  return (
    <div className="card-nordic p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">フィルター</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-xs"
          >
            <X className="w-3 h-3 mr-1" />
            リセット
          </Button>
        )}
      </div>

      {/* Sector Filter */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground text-sm">業種</h4>
        <div className="space-y-2">
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

      {/* Benefit Type Filter */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground text-sm">優待タイプ</h4>
        <div className="space-y-2">
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

      {/* Price Range Filter */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground text-sm">最低投資額</h4>
        <div className="space-y-2">
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
    </div>
  );
}
