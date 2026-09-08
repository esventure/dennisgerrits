import { useEffect, useRef } from "react";

const WIDGET_ID = "TA_cdsratingsonlynarrow13";
const SCRIPT_SRC =
  "https://www.jscache.com/wejs?wtype=cdsratingsonlynarrow&uniq=13&locationId=13431295&lang=en_US&border=true&display_version=2";
const REVIEW_URL =
  "https://www.tripadvisor.com/Attraction_Review-g188590-d13431295-Reviews-Love_My_City_Tours-Amsterdam_North_Holland_Province.html";

export default function TripAdvisorNarrowWidget() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const existing = wrapperRef.current.querySelector(
      `script[src*="jscache.com/wejs"]`
    );
    if (existing) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = SCRIPT_SRC;
    script.dataset.loadtrk = "";
    script.onload = () => {
      (script as HTMLScriptElement & { loadtrk?: boolean }).loadtrk = true;
    };

    // Append as a sibling of the widget div, matching TripAdvisor's embed structure.
    wrapperRef.current.appendChild(script);
  }, []);

  return (
    <div ref={wrapperRef} className="inline-block" data-tripadvisor-widget>
      <div id={WIDGET_ID} className="TA_cdsratingsonlynarrow">
        <ul id="vMXpuNT41xRZ" className="TA_links qDA0oom2Mj8Z">
          <li id="popbb5U7mJ" className="NVyWe6yh">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={REVIEW_URL}
              className="flex flex-col items-center gap-2 text-center"
            >
              <img
                src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-18034-2.svg"
                alt="TripAdvisor"
                className="h-6 w-auto"
              />
              <span className="font-body text-sm text-foreground/80">
                231 reviews
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
