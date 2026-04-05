const AmsterdamSkyline = () => {
  return (
    <div className="w-full py-16 lg:py-24 overflow-hidden">
      <svg
        viewBox="0 0 1200 900"
        className="w-full h-auto text-foreground/70"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Row 1 (L→R): Centraal Station, Damrak canal houses, Royal Palace, Nieuwe Kerk */}
        <g>
          {/* Ground line */}
          <path d="M0,195 L1200,195" strokeWidth="0.8" />
          
          {/* Centraal Station */}
          <path d="M30,195 L30,140 L40,130 L50,125 L60,120 L80,115 L100,112 L120,115 L140,120 L150,125 L160,130 L170,140 L170,195" />
          <path d="M55,195 L55,145 L65,140 L75,138 L85,135 L95,133 L105,135 L115,138 L125,140 L145,145 L145,195" />
          <path d="M85,133 L85,105 L90,95 L95,90 L100,88 L105,90 L110,95 L115,105 L115,133" />
          <path d="M96,88 L100,70 L104,88" />
          {/* Station windows */}
          <path d="M65,160 L65,150 L75,150 L75,160" />
          <path d="M85,160 L85,150 L95,150 L95,160" />
          <path d="M105,160 L105,150 L115,150 L115,160" />
          <path d="M125,160 L125,150 L135,150 L135,160" />
          {/* Station arches */}
          <path d="M42,195 L42,170 Q56,155 70,170 L70,195" />
          <path d="M130,195 L130,170 Q144,155 158,170 L158,195" />

          {/* Canal water line under station */}
          <path d="M175,195 Q185,200 195,195 Q205,190 215,195" strokeWidth="0.6" />

          {/* Damrak canal houses */}
          {/* House 1 - stepped gable */}
          <path d="M220,195 L220,135 L225,130 L230,125 L235,120 L240,125 L245,130 L250,135 L250,195" />
          <path d="M228,195 L228,160 L242,160 L242,195" />
          <path d="M232,175 L232,165 L238,165 L238,175" />
          
          {/* House 2 - bell gable */}
          <path d="M255,195 L255,130 Q265,110 275,115 Q285,110 295,130 L295,195" />
          <path d="M263,195 L263,160 L287,160 L287,195" />
          <path d="M270,155 L270,145 L280,145 L280,155" />
          <path d="M270,175 L270,165 L280,165 L280,175" />
          
          {/* House 3 - neck gable */}
          <path d="M300,195 L300,125 L305,118 L310,115 L315,112 L320,115 L325,118 L330,125 L330,195" />
          <path d="M308,195 L308,165 L322,165 L322,195" />
          <path d="M310,158 L310,148 L320,148 L320,158" />
          <path d="M313,112 L315,100 L317,112" />
          
          {/* House 4 - spout gable */}
          <path d="M340,195 L340,128 L345,128 L345,122 L355,122 L365,122 L365,128 L370,128 L370,195" />
          <path d="M347,195 L347,162 L363,162 L363,195" />
          <path d="M350,155 L350,145 L360,145 L360,155" />
          
          {/* House 5 - tall narrow */}
          <path d="M378,195 L378,120 L383,112 L388,108 L393,112 L398,120 L398,195" />
          <path d="M382,195 L382,160 L394,160 L394,195" />
          <path d="M384,152 L384,142 L392,142 L392,152" />
          
          {/* Canal bridge */}
          <path d="M410,195 Q430,175 450,195" />
          <path d="M415,190 L415,195" />
          <path d="M445,190 L445,195" />
          <path d="M430,178 L430,175" />

          {/* Bicycle on bridge */}
          <circle cx="428" cy="174" r="3" />
          <circle cx="436" cy="174" r="3" />
          <path d="M428,174 L432,168 L436,174" />
          <path d="M432,168 L432,165 L434,163" />
          
          {/* More canal water */}
          <path d="M455,195 Q465,200 475,195 Q485,190 495,195" strokeWidth="0.6" />

          {/* Royal Palace */}
          <path d="M510,195 L510,120 L520,120 L520,105 L530,105 L530,100 L570,100 L570,105 L580,105 L580,120 L590,120 L590,195" />
          {/* Palace dome */}
          <path d="M535,100 L535,85 Q550,60 565,85 L565,100" />
          <path d="M550,60 L550,48" />
          {/* Palace windows row 1 */}
          <path d="M520,140 L520,130 L530,130 L530,140" />
          <path d="M540,140 L540,130 L560,130 L560,140" />
          <path d="M570,140 L570,130 L580,130 L580,140" />
          {/* Palace windows row 2 */}
          <path d="M520,165 L520,150 L530,150 L530,165" />
          <path d="M540,165 L540,150 L560,150 L560,165" />
          <path d="M570,165 L570,150 L580,150 L580,165" />
          {/* Palace door */}
          <path d="M543,195 L543,172 Q550,165 557,172 L557,195" />
          {/* Palace columns */}
          <path d="M525,195 L525,120" strokeWidth="1" />
          <path d="M575,195 L575,120" strokeWidth="1" />

          {/* Small trees/gap */}
          <path d="M610,195 L610,175" />
          <circle cx="610" cy="168" r="8" strokeWidth="1" />
          <path d="M635,195 L635,170" />
          <circle cx="635" cy="163" r="8" strokeWidth="1" />

          {/* Nieuwe Kerk */}
          <path d="M660,195 L660,115 L670,108 L680,115 L680,195" />
          <path d="M680,195 L680,100 L690,92 L700,85 L720,78 L740,85 L750,92 L760,100 L760,195" />
          <path d="M760,195 L760,115 L770,108 L780,115 L780,195" />
          {/* Church tower */}
          <path d="M710,78 L710,50 L715,42 L720,35 L725,42 L730,50 L730,78" />
          <path d="M720,35 L720,18" />
          <path d="M716,18 L720,10 L724,18" />
          {/* Church windows */}
          <path d="M695,160 Q700,148 705,160" />
          <path d="M725,160 Q730,148 735,160" />
          <path d="M710,120 Q720,108 730,120" />
          {/* Church door */}
          <path d="M713,195 L713,170 Q720,162 727,170 L727,195" />

          {/* More houses trailing off */}
          <path d="M800,195 L800,140 L810,132 L820,140 L820,195" />
          <path d="M825,195 L825,135 L830,135 L830,130 L845,130 L845,135 L850,135 L850,195" />
          <path d="M855,195 L855,142 Q865,125 875,142 L875,195" />
          
          {/* Canal boat */}
          <path d="M900,195 L895,188 L905,185 L935,185 L945,188 L940,195" />
          <path d="M915,185 L915,178 L925,178 L925,185" />
          <path d="M920,178 L920,172" />
          <path d="M916,172 L924,172" />

          {/* Trailing houses */}
          <path d="M960,195 L960,145 L970,138 L980,145 L980,195" />
          <path d="M985,195 L985,140 L990,140 L990,135 L1005,135 L1005,140 L1010,140 L1010,195" />
          <path d="M1015,195 L1015,148 Q1025,132 1035,148 L1035,195" />
          <path d="M1040,195 L1040,138 L1050,130 L1060,138 L1060,195" />
          <path d="M1070,195 L1070,145 L1080,145 L1080,140 L1095,140 L1095,145 L1100,145 L1100,195" />
          <path d="M1110,195 L1110,150 Q1120,135 1130,150 L1130,195" />
          <path d="M1140,195 L1140,142 L1150,135 L1160,142 L1160,195" />
          <path d="M1170,195 L1170,148 L1180,148 L1180,142 L1195,142 L1195,148 L1200,148 L1200,195" />
        </g>

        {/* Connecting line down on right side */}
        <path d="M1195,195 L1195,230 Q1195,240 1185,240 L1185,240" strokeWidth="0.8" strokeDasharray="4,4" />

        {/* Row 2 (R→L): Westerkerk, Anne Frank House area, canal bridges, Jordaan houses */}
        <g>
          <path d="M0,440 L1200,440" strokeWidth="0.8" />

          {/* Jordaan houses (left side) */}
          <path d="M30,440 L30,385 L40,378 L50,385 L50,440" />
          <path d="M55,440 L55,380 Q65,365 75,380 L75,440" />
          <path d="M80,440 L80,375 L85,375 L85,370 L100,370 L100,375 L105,375 L105,440" />
          <path d="M110,440 L110,382 L120,375 L130,382 L130,440" />
          <path d="M135,440 L135,378 Q145,362 155,378 L155,440" />
          
          {/* Small details - windows */}
          <path d="M36,410 L36,400 L44,400 L44,410" />
          <path d="M62,405 L62,395 L68,395 L68,405" />
          <path d="M88,405 L88,395 L97,395 L97,405" />
          <path d="M116,408 L116,398 L124,398 L124,408" />

          {/* Canal with boat */}
          <path d="M165,440 Q175,445 185,440 Q195,435 205,440" strokeWidth="0.6" />
          <path d="M180,440 L178,435 L185,433 L200,433 L207,435 L205,440" />
          <path d="M190,433 L190,428 L198,428 L198,433" />

          {/* Canal bridge with railing */}
          <path d="M220,440 Q250,415 280,440" />
          <path d="M230,432 L230,425 L240,425 L240,432" />
          <path d="M250,420 L250,415" />
          <path d="M260,425 L260,432 L270,432 L270,425" />
          
          {/* More canal houses */}
          <path d="M300,440 L300,380 L310,372 L320,380 L320,440" />
          <path d="M325,440 L325,375 L330,375 L330,368 L345,368 L345,375 L350,375 L350,440" />
          <path d="M355,440 L355,382 Q365,368 375,382 L375,440" />
          <path d="M380,440 L380,378 L390,370 L400,378 L400,440" />
          
          {/* Windows */}
          <path d="M306,415 L306,405 L314,405 L314,415" />
          <path d="M333,410 L333,400 L342,400 L342,410" />
          <path d="M362,412 L362,402 L368,402 L368,412" />
          <path d="M386,415 L386,405 L394,405 L394,415" />

          {/* Tree-lined canal */}
          <path d="M420,440 L420,415" />
          <circle cx="420" cy="408" r="8" strokeWidth="1" />
          <path d="M445,440 L445,410" />
          <circle cx="445" cy="403" r="8" strokeWidth="1" />
          <path d="M470,440 L470,412" />
          <circle cx="470" cy="405" r="8" strokeWidth="1" />

          {/* Anne Frank House area */}
          <path d="M500,440 L500,370 L510,362 L520,370 L520,440" />
          <path d="M525,440 L525,365 Q535,348 545,365 L545,440" />
          <path d="M550,440 L550,358 L555,358 L555,352 L570,352 L570,358 L575,358 L575,440" />
          {/* Characteristic hook beam */}
          <path d="M560,352 L560,345 L565,342" />
          <path d="M562,345 L568,345" />
          {/* Windows */}
          <path d="M506,410 L506,395 L514,395 L514,410" />
          <path d="M531,408 L531,393 L539,393 L539,408" />
          <path d="M557,405 L557,390 L567,390 L567,405" />

          {/* Canal */}
          <path d="M585,440 Q595,445 605,440 Q615,435 625,440" strokeWidth="0.6" />

          {/* Second canal bridge */}
          <path d="M640,440 Q660,420 680,440" />
          <path d="M650,435 L650,428" />
          <path d="M660,423 L660,420" />
          <path d="M670,428 L670,435" />

          {/* Westerkerk */}
          <path d="M710,440 L710,350 L720,340 L730,350 L730,440" />
          <path d="M730,440 L730,330 L740,318 L760,308 L780,318 L790,330 L790,440" />
          <path d="M790,440 L790,350 L800,340 L810,350 L810,440" />
          {/* Westerkerk tower */}
          <path d="M745,308 L745,280 L750,272 L755,265 L760,258 L765,265 L770,272 L775,280 L775,308" />
          <path d="M753,258 L755,245 L760,235 L765,245 L767,258" />
          <path d="M760,235 L760,215" />
          {/* Crown on top */}
          <path d="M755,215 L757,208 L760,205 L763,208 L765,215" />
          {/* Clock face */}
          <circle cx="760" cy="290" r="8" />
          <path d="M760,285 L760,290 L764,292" />
          {/* Church windows */}
          <path d="M748,370 Q755,358 762,370" />
          <path d="M768,370 Q775,358 782,370" />
          {/* Church door */}
          <path d="M753,440 L753,400 Q760,390 767,400 L767,440" />

          {/* More Jordaan houses trailing */}
          <path d="M830,440 L830,385 L840,377 L850,385 L850,440" />
          <path d="M855,440 L855,380 Q865,365 875,380 L875,440" />
          <path d="M880,440 L880,378 L885,378 L885,372 L900,372 L900,378 L905,378 L905,440" />
          <path d="M910,440 L910,385 L920,377 L930,385 L930,440" />
          <path d="M935,440 L935,380 Q945,365 955,380 L955,440" />
          
          {/* Windows */}
          <path d="M836,415 L836,405 L844,405 L844,415" />
          <path d="M862,412 L862,402 L868,402 L868,412" />
          <path d="M888,410 L888,400 L897,400 L897,410" />

          {/* Street lamp */}
          <path d="M975,440 L975,395" />
          <path d="M970,395 L975,388 L980,395" />
          <circle cx="975" cy="385" r="3" />

          {/* More houses */}
          <path d="M1000,440 L1000,382 L1010,374 L1020,382 L1020,440" />
          <path d="M1025,440 L1025,378 Q1035,362 1045,378 L1045,440" />
          <path d="M1050,440 L1050,385 L1060,377 L1070,385 L1070,440" />
          <path d="M1075,440 L1075,380 L1080,380 L1080,374 L1095,374 L1095,380 L1100,380 L1100,440" />
          <path d="M1105,440 L1105,388 Q1115,372 1125,388 L1125,440" />
          <path d="M1130,440 L1130,382 L1140,375 L1150,382 L1150,440" />
          <path d="M1155,440 L1155,378 L1160,378 L1160,372 L1175,372 L1175,378 L1180,378 L1180,440" />
          <path d="M1185,440 L1185,385 Q1192,370 1200,385 L1200,440" />
        </g>

        {/* Connecting line down on left side */}
        <path d="M5,440 L5,475 Q5,485 15,485 L15,485" strokeWidth="0.8" strokeDasharray="4,4" />

        {/* Row 3 (L→R): Rijksmuseum, Vondelpark gate, Concertgebouw, canal boat */}
        <g>
          <path d="M0,680 L1200,680" strokeWidth="0.8" />

          {/* Rijksmuseum */}
          <path d="M40,680 L40,590 L50,585 L60,590 L60,680" />
          <path d="M60,680 L60,580 L80,570 L120,560 L160,570 L180,580 L180,680" />
          <path d="M180,680 L180,590 L190,585 L200,590 L200,680" />
          {/* Central passage */}
          <path d="M105,680 L105,620 Q120,605 135,620 L135,680" />
          {/* Twin towers */}
          <path d="M70,580 L70,555 L75,548 L80,542 L85,548 L90,555 L90,580" />
          <path d="M150,580 L150,555 L155,548 L160,542 L165,548 L170,555 L170,580" />
          {/* Spires */}
          <path d="M80,542 L80,525 L82,520 L80,525" />
          <path d="M160,542 L160,525 L162,520 L160,525" />
          {/* Main tower */}
          <path d="M105,560 L105,530 L108,522 L112,516 L118,512 L125,516 L130,522 L133,530 L133,560" />
          <path d="M118,512 L120,498 L122,512" />
          {/* Windows */}
          <path d="M90,630 L90,615 L100,615 L100,630" />
          <path d="M140,630 L140,615 L150,615 L150,630" />
          <path d="M108,590 L108,578 L130,578 L130,590" />

          {/* Garden/Museumplein */}
          <path d="M215,680 L215,665" />
          <circle cx="215" cy="658" r="7" strokeWidth="1" />
          <path d="M235,680 L235,660" />
          <circle cx="235" cy="653" r="8" strokeWidth="1" />
          <path d="M255,680 L255,662" />
          <circle cx="255" cy="655" r="7" strokeWidth="1" />
          <path d="M275,680 L275,658" />
          <circle cx="275" cy="651" r="8" strokeWidth="1" />

          {/* Vondelpark gate */}
          <path d="M310,680 L310,635 L315,635 L315,625 L325,620 L335,625 L335,635 L340,635 L340,680" />
          <path d="M350,680 L350,635 L355,635 L355,625 L365,620 L375,625 L375,635 L380,635 L380,680" />
          {/* Gate arch */}
          <path d="M340,680 L340,650 Q345,640 350,650 L350,680" />
          {/* Fence */}
          <path d="M310,660 L340,660" strokeWidth="0.8" />
          <path d="M350,660 L380,660" strokeWidth="0.8" />
          <path d="M318,660 L318,680" strokeWidth="0.8" />
          <path d="M326,660 L326,680" strokeWidth="0.8" />
          <path d="M358,660 L358,680" strokeWidth="0.8" />
          <path d="M366,660 L366,680" strokeWidth="0.8" />

          {/* Park trees */}
          <path d="M400,680 L400,655" />
          <circle cx="400" cy="648" r="9" strokeWidth="1" />
          <path d="M425,680 L425,650" />
          <circle cx="425" cy="642" r="10" strokeWidth="1" />
          <path d="M450,680 L450,658" />
          <circle cx="450" cy="650" r="9" strokeWidth="1" />
          
          {/* Duck in park pond */}
          <path d="M475,678 Q478,674 483,675 Q486,674 488,678" strokeWidth="1" />
          <path d="M480,674 L480,672 L483,671" />
          <path d="M470,680 Q480,676 490,680" strokeWidth="0.6" />

          {/* Concertgebouw */}
          <path d="M520,680 L520,610 L530,605 L530,595 L540,590 L550,585 L580,580 L610,585 L620,590 L630,595 L630,605 L640,610 L640,680" />
          {/* Pediment */}
          <path d="M540,595 L540,590 L580,575 L620,590 L620,595" />
          {/* Columns */}
          <path d="M545,680 L545,600" strokeWidth="1" />
          <path d="M560,680 L560,598" strokeWidth="1" />
          <path d="M575,680 L575,596" strokeWidth="1" />
          <path d="M590,680 L590,598" strokeWidth="1" />
          <path d="M605,680 L605,600" strokeWidth="1" />
          <path d="M620,680 L620,602" strokeWidth="1" />
          {/* Lyre on pediment */}
          <path d="M575,582 Q572,575 575,568 Q578,575 581,582" />
          <path d="M573,578 L583,578" strokeWidth="0.8" />
          <path d="M574,575 L582,575" strokeWidth="0.8" />
          {/* Windows */}
          <path d="M548,640 Q555,630 562,640" />
          <path d="M598,640 Q605,630 612,640" />
          {/* Door */}
          <path d="M573,680 L573,650 Q580,642 587,650 L587,680" />

          {/* Street with tram */}
          <path d="M660,680 L660,665 L720,665 L720,680" />
          <path d="M665,665 L665,660 L715,660 L715,665" />
          <path d="M670,660 L670,655 L680,655 L680,660" />
          <path d="M690,660 L690,655 L700,655 L700,660" />
          {/* Tram wires */}
          <path d="M690,655 L690,640" strokeWidth="0.6" />
          {/* Wheels */}
          <circle cx="670" cy="680" r="2.5" />
          <circle cx="710" cy="680" r="2.5" />

          {/* Canal houses */}
          <path d="M740,680 L740,628 L750,620 L760,628 L760,680" />
          <path d="M765,680 L765,622 Q775,608 785,622 L785,680" />
          <path d="M790,680 L790,625 L795,625 L795,618 L810,618 L810,625 L815,625 L815,680" />
          <path d="M820,680 L820,630 L830,622 L840,630 L840,680" />

          {/* Canal boat */}
          <path d="M860,680 L855,672 L865,668 L905,668 L915,672 L910,680" />
          <path d="M875,668 L875,660 L895,660 L895,668" />
          <path d="M885,660 L885,652" />
          <path d="M880,652 L890,652" />
          {/* Flag on boat */}
          <path d="M890,652 L898,648 L890,644" />
          
          {/* Water ripples */}
          <path d="M850,680 Q855,684 860,680" strokeWidth="0.6" />
          <path d="M910,680 Q915,684 920,680" strokeWidth="0.6" />

          {/* More trailing houses */}
          <path d="M940,680 L940,632 L950,625 L960,632 L960,680" />
          <path d="M965,680 L965,628 Q975,612 985,628 L985,680" />
          <path d="M990,680 L990,635 L1000,627 L1010,635 L1010,680" />
          <path d="M1015,680 L1015,630 L1020,630 L1020,623 L1035,623 L1035,630 L1040,630 L1040,680" />
          <path d="M1045,680 L1045,638 Q1055,622 1065,638 L1065,680" />
          <path d="M1070,680 L1070,632 L1080,624 L1090,632 L1090,680" />
          
          {/* Windmill */}
          <path d="M1120,680 L1120,620 L1140,610 L1160,620 L1160,680" />
          <path d="M1140,610 L1140,595" />
          {/* Windmill blades */}
          <path d="M1140,595 L1120,570" />
          <path d="M1140,595 L1160,570" />
          <path d="M1140,595 L1115,600" />
          <path d="M1140,595 L1165,600" />
          <circle cx="1140" cy="595" r="3" />
          {/* Windmill door */}
          <path d="M1135,680 L1135,655 Q1140,648 1145,655 L1145,680" />
          
          {/* Final houses */}
          <path d="M1175,680 L1175,635 L1185,628 L1195,635 L1195,680" />
        </g>

        {/* Row labels - subtle */}
        <text x="1180" y="210" fontSize="8" fill="currentColor" opacity="0.3" textAnchor="end" fontFamily="Outfit, sans-serif">Dam Square</text>
        <text x="20" y="455" fontSize="8" fill="currentColor" opacity="0.3" fontFamily="Outfit, sans-serif">Jordaan</text>
        <text x="1180" y="695" fontSize="8" fill="currentColor" opacity="0.3" textAnchor="end" fontFamily="Outfit, sans-serif">Museum Quarter</text>

        {/* Connecting line down on right side (row 1 to row 2) */}
        <path d="M1197,198 C1197,220 1197,420 1197,437" strokeWidth="0.8" strokeDasharray="4,4" />
        
        {/* Connecting line down on left side (row 2 to row 3) */}
        <path d="M3,443 C3,465 3,658 3,677" strokeWidth="0.8" strokeDasharray="4,4" />
      </svg>
    </div>
  );
};

export default AmsterdamSkyline;
