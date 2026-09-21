import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const COUNTRY_CODES = [
  { code: "+1", label: "United States / Canada" },
  { code: "+31", label: "Netherlands" },
  { code: "+44", label: "United Kingdom" },
  { code: "+61", label: "Australia" },
  { code: "+43", label: "Austria" },
  { code: "+32", label: "Belgium" },
  { code: "+55", label: "Brazil" },
  { code: "+86", label: "China" },
  { code: "+45", label: "Denmark" },
  { code: "+372", label: "Estonia" },
  { code: "+358", label: "Finland" },
  { code: "+33", label: "France" },
  { code: "+49", label: "Germany" },
  { code: "+30", label: "Greece" },
  { code: "+852", label: "Hong Kong" },
  { code: "+91", label: "India" },
  { code: "+353", label: "Ireland" },
  { code: "+972", label: "Israel" },
  { code: "+39", label: "Italy" },
  { code: "+81", label: "Japan" },
  { code: "+82", label: "South Korea" },
  { code: "+352", label: "Luxembourg" },
  { code: "+52", label: "Mexico" },
  { code: "+64", label: "New Zealand" },
  { code: "+47", label: "Norway" },
  { code: "+48", label: "Poland" },
  { code: "+351", label: "Portugal" },
  { code: "+974", label: "Qatar" },
  { code: "+966", label: "Saudi Arabia" },
  { code: "+65", label: "Singapore" },
  { code: "+34", label: "Spain" },
  { code: "+46", label: "Sweden" },
  { code: "+41", label: "Switzerland" },
  { code: "+886", label: "Taiwan" },
  { code: "+66", label: "Thailand" },
  { code: "+90", label: "Turkey" },
  { code: "+971", label: "United Arab Emirates" },
  { code: "+598", label: "Uruguay" },
  { code: "+58", label: "Venezuela" },
  { code: "+84", label: "Vietnam" },
  { code: "+260", label: "Zambia" },
  { code: "+263", label: "Zimbabwe" },
];

interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CountryCodeSelect = ({ value, onChange }: CountryCodeSelectProps) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger
      aria-label="Country code"
      className="h-12 w-[140px] shrink-0 rounded-none border border-input bg-background font-body text-base"
    >
      <SelectValue />
    </SelectTrigger>
    <SelectContent className="max-h-72">
      {COUNTRY_CODES.map((c) => (
        <SelectItem key={c.code} value={c.code} className="font-body text-base">
          {c.code} {c.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default CountryCodeSelect;
