import { useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const COUNTRY_CODES = [
  { code: "+1", iso: "US", label: "United States / Canada" },
  { code: "+31", iso: "NL", label: "Netherlands" },
  { code: "+44", iso: "GB", label: "United Kingdom" },
  { code: "+61", iso: "AU", label: "Australia" },
  { code: "+43", iso: "AT", label: "Austria" },
  { code: "+32", iso: "BE", label: "Belgium" },
  { code: "+55", iso: "BR", label: "Brazil" },
  { code: "+86", iso: "CN", label: "China" },
  { code: "+45", iso: "DK", label: "Denmark" },
  { code: "+372", iso: "EE", label: "Estonia" },
  { code: "+358", iso: "FI", label: "Finland" },
  { code: "+33", iso: "FR", label: "France" },
  { code: "+49", iso: "DE", label: "Germany" },
  { code: "+30", iso: "GR", label: "Greece" },
  { code: "+852", iso: "HK", label: "Hong Kong" },
  { code: "+91", iso: "IN", label: "India" },
  { code: "+353", iso: "IE", label: "Ireland" },
  { code: "+972", iso: "IL", label: "Israel" },
  { code: "+39", iso: "IT", label: "Italy" },
  { code: "+81", iso: "JP", label: "Japan" },
  { code: "+82", iso: "KR", label: "South Korea" },
  { code: "+352", iso: "LU", label: "Luxembourg" },
  { code: "+52", iso: "MX", label: "Mexico" },
  { code: "+64", iso: "NZ", label: "New Zealand" },
  { code: "+47", iso: "NO", label: "Norway" },
  { code: "+48", iso: "PL", label: "Poland" },
  { code: "+351", iso: "PT", label: "Portugal" },
  { code: "+974", iso: "QA", label: "Qatar" },
  { code: "+966", iso: "SA", label: "Saudi Arabia" },
  { code: "+65", iso: "SG", label: "Singapore" },
  { code: "+34", iso: "ES", label: "Spain" },
  { code: "+46", iso: "SE", label: "Sweden" },
  { code: "+41", iso: "CH", label: "Switzerland" },
  { code: "+886", iso: "TW", label: "Taiwan" },
  { code: "+66", iso: "TH", label: "Thailand" },
  { code: "+90", iso: "TR", label: "Turkey" },
  { code: "+971", iso: "AE", label: "United Arab Emirates" },
  { code: "+598", iso: "UY", label: "Uruguay" },
  { code: "+58", iso: "VE", label: "Venezuela" },
  { code: "+84", iso: "VN", label: "Vietnam" },
  { code: "+260", iso: "ZM", label: "Zambia" },
  { code: "+263", iso: "ZW", label: "Zimbabwe" },
];

// Convert an ISO country code to its flag emoji (regional indicator symbols).
const flag = (iso: string) =>
  String.fromCodePoint(...[...iso].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65));

interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CountryCodeSelect = ({ value, onChange }: CountryCodeSelectProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selected = COUNTRY_CODES.find((c) => c.code === value);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? COUNTRY_CODES.filter(
        (c) => c.label.toLowerCase().includes(q) || c.code.includes(q) || c.iso.toLowerCase().includes(q)
      )
    : COUNTRY_CODES;

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setQuery("");
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Country code"
          className="flex h-12 w-[110px] shrink-0 items-center justify-between gap-1 rounded-none border border-input bg-background px-3 font-body text-base"
        >
          <span className="flex items-center gap-1.5">
            {selected && <span aria-hidden>{flag(selected.iso)}</span>}
            <span>{selected?.code ?? value}</span>
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] rounded-none p-0" align="start">
        <div className="flex items-center gap-2 border-b border-input px-3">
          <Search className="h-4 w-4 shrink-0 opacity-50" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country or code..."
            aria-label="Search country"
            className="h-11 w-full bg-transparent font-body text-base outline-none placeholder:text-muted-foreground"
          />
        </div>
        <ul className="max-h-64 overflow-y-auto py-1">
          {filtered.length === 0 && (
            <li className="px-3 py-2 font-body text-sm text-muted-foreground">No countries found.</li>
          )}
          {filtered.map((c) => (
            <li key={c.iso}>
              <button
                type="button"
                onClick={() => {
                  onChange(c.code);
                  setOpen(false);
                  setQuery("");
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left font-body text-base hover:bg-accent"
              >
                <span aria-hidden>{flag(c.iso)}</span>
                <span className="flex-1">{c.label}</span>
                <span className="text-muted-foreground">{c.code}</span>
                {c.code === value && <Check className="h-4 w-4" />}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default CountryCodeSelect;
