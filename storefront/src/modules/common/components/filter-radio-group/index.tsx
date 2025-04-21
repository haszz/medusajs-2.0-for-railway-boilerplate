import { RadioGroup } from "@medusajs/ui"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex gap-x-3 flex-col gap-y-2">
      <div className="text-sm text-[#2d711c]/80 mb-1 font-medium">{title}</div>
      <RadioGroup data-testid={dataTestId} onValueChange={handleChange}>
        {items?.map((i) => (
          <div
            key={i.value}
            className="flex items-center gap-x-2 py-1.5"
          >
            <RadioGroup.Item
              checked={i.value === value}
              id={i.value}
              value={i.value}
              className="h-4 w-4 border border-gray-300 rounded-full checked:border-[#2d711c] after:bg-[#2d711c] relative flex items-center justify-center outline-none transition cursor-pointer"
            >
              {i.value === value && (
                <div className="h-2 w-2 bg-[#2d711c] rounded-full"></div>
              )}
            </RadioGroup.Item>
            <label
              htmlFor={i.value}
              className={`text-sm cursor-pointer transition-colors ${
                i.value === value 
                  ? "text-[#2d711c] font-medium" 
                  : "text-gray-600 hover:text-[#2d711c]"
              }`}
              data-testid="radio-label"
              data-active={i.value === value}
            >
              {i.label}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
