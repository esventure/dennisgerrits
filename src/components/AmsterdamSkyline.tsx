const AmsterdamSkyline = () => {
  return (
    <div className="w-full py-12 lg:py-20 overflow-hidden">
      <svg
        viewBox="0 0 1200 880"
        className="w-full h-auto text-foreground/60"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* ============ ROW 1 (L→R): Centraal Station → Dam Square ============ */}
        <g strokeWidth="1.4">
          {/* Ground line - slightly wavy */}
          <path d="M0,195 Q30,196 60,194.5 Q120,196 180,195 Q240,193.5 300,195.5 Q360,196.5 420,194.5 Q480,196 540,195 Q600,194 660,195.5 Q720,196.5 780,195 Q840,194 900,195.5 Q960,196 1020,194.5 Q1080,196 1140,195 L1200,195.5" strokeWidth="0.7" opacity="0.5" />

          {/* === Amsterdam Centraal Station === */}
          {/* Main building body */}
          <path d="M22,195 L23,152 Q24,148 28,145 L32,142 Q36,140 42,138 L58,134 Q68,132 80,131 Q92,130 100,131 Q112,132 122,134 L138,138 Q144,140 148,142 L152,145 Q156,148 157,152 L158,195" strokeWidth="1.5" />
          {/* Central tower */}
          <path d="M78,131 L79,108 Q80,104 82,100 L84,96 Q86,92 88,89 L90,86 L92,89 Q94,92 96,96 L98,100 Q100,104 101,108 L102,131" strokeWidth="1.3" />
          {/* Tower spire */}
          <path d="M88,86 L89,72 L90,65 L91,72 L92,86" strokeWidth="1.1" />
          {/* Tower clock */}
          <circle cx="90" cy="98" r="5" strokeWidth="1" />
          <path d="M90,95 L90,98 L92.5,99.5" strokeWidth="0.8" />
          {/* Left wing roof detail */}
          <path d="M35,145 L38,138 Q42,134 48,132 L55,130" strokeWidth="1" />
          {/* Right wing roof detail */}
          <path d="M125,130 L132,132 Q138,134 142,138 L145,145" strokeWidth="1" />
          {/* Arched entrance - left */}
          <path d="M42,195 L42.5,172 Q43,168 48,164 Q55,158 62,164 Q67,168 67.5,172 L68,195" strokeWidth="1.2" />
          {/* Arched entrance - center */}
          <path d="M80,195 L80.5,168 Q81,163 86,158 Q90,155 94,158 Q99,163 99.5,168 L100,195" strokeWidth="1.2" />
          {/* Arched entrance - right */}
          <path d="M112,195 L112.5,172 Q113,168 118,164 Q125,158 132,164 Q137,168 137.5,172 L138,195" strokeWidth="1.2" />
          {/* Windows above arches */}
          <path d="M48,158 L48,150 L62,150 L62,158" strokeWidth="0.9" />
          <path d="M118,158 L118,150 L132,150 L132,158" strokeWidth="0.9" />
          {/* Decorative horizontal bands */}
          <path d="M28,155 L152,155" strokeWidth="0.5" opacity="0.4" />
          <path d="M25,165 L155,165" strokeWidth="0.5" opacity="0.4" />

          {/* === Water / IJ river === */}
          <path d="M162,195 Q168,198 174,195 Q180,192 186,195 Q192,198 198,195" strokeWidth="0.6" opacity="0.4" />
          <path d="M165,198 Q171,201 177,198 Q183,195 189,198" strokeWidth="0.5" opacity="0.3" />

          {/* === Damrak Canal Houses === */}
          {/* House 1 - Stepped gable */}
          <path d="M208,195 L208.5,148 L211,143 L214,139 L217,136 L220,133 L223,136 L226,139 L229,143 L231.5,148 L232,195" strokeWidth="1.3" />
          <path d="M213,148 L213,143 L217,140 L217,137" strokeWidth="0.7" />
          <path d="M227,148 L227,143 L223,140 L223,137" strokeWidth="0.7" />
          {/* Hook beam */}
          <path d="M220,133 L220,128" strokeWidth="0.9" />
          <path d="M217,128 L223,128" strokeWidth="0.8" />
          {/* Windows */}
          <path d="M214,172 L214,163 L218,163 L218,172" strokeWidth="0.8" />
          <path d="M222,172 L222,163 L226,163 L226,172" strokeWidth="0.8" />
          <path d="M214,158 L214,150 L226,150 L226,158" strokeWidth="0.8" />
          {/* Door */}
          <path d="M217,195 L217,180 Q220,176 223,180 L223,195" strokeWidth="0.9" />

          {/* House 2 - Bell gable (taller) */}
          <path d="M237,195 L237.5,138 Q238,132 242,127 Q247,121 252,118 Q257,121 262,127 Q266,132 266.5,138 L267,195" strokeWidth="1.3" />
          <path d="M252,118 L252,112" strokeWidth="0.9" />
          <path d="M249,112 L255,112" strokeWidth="0.8" />
          {/* Windows */}
          <path d="M243,168 L243,159 L249,159 L249,168" strokeWidth="0.8" />
          <path d="M255,168 L255,159 L261,159 L261,168" strokeWidth="0.8" />
          <path d="M243,153 L243,144 L261,144 L261,153" strokeWidth="0.8" />
          {/* Door */}
          <path d="M249,195 L249,180 Q252,176 255,180 L255,195" strokeWidth="0.9" />

          {/* House 3 - Neck gable (narrow, tall) */}
          <path d="M272,195 L272.5,135 L275,130 L278,126 L282,123 L286,126 L289,130 L291.5,135 L292,195" strokeWidth="1.3" />
          {/* Neck detail */}
          <path d="M277,130 L277,126 L287,126 L287,130" strokeWidth="0.7" />
          <path d="M282,123 L282,116" strokeWidth="0.9" />
          {/* Windows */}
          <path d="M277,168 L277,160 L283,160 L283,168" strokeWidth="0.8" />
          <path d="M277,154 L277,146 L287,146 L287,154" strokeWidth="0.8" />
          {/* Door */}
          <path d="M279,195 L279,181 Q282,177 285,181 L285,195" strokeWidth="0.9" />

          {/* House 4 - Spout gable (wide) */}
          <path d="M298,195 L298.5,138 L302,135 L302,130 L308,128 L318,128 L324,130 L324,135 L327.5,138 L328,195" strokeWidth="1.3" />
          <path d="M313,128 L313,122" strokeWidth="0.9" />
          {/* Windows */}
          <path d="M305,168 L305,159 L312,159 L312,168" strokeWidth="0.8" />
          <path d="M316,168 L316,159 L323,159 L323,168" strokeWidth="0.8" />
          <path d="M305,153 L305,144 L323,144 L323,153" strokeWidth="0.8" />
          {/* Door with steps */}
          <path d="M310,195 L310,180 Q313,176 316,180 L316,195" strokeWidth="0.9" />
          <path d="M307,195 L307,192 L319,192 L319,195" strokeWidth="0.6" />

          {/* House 5 - Cornice gable */}
          <path d="M334,195 L334.5,132 L338,130 L342,130 L348,130 L352,130 L355.5,132 L356,195" strokeWidth="1.3" />
          <path d="M338,130 L338,127 L352,127 L352,130" strokeWidth="0.8" />
          <path d="M345,127 L345,121" strokeWidth="0.9" />
          {/* Windows */}
          <path d="M339,165 L339,157 L346,157 L346,165" strokeWidth="0.8" />
          <path d="M339,152 L339,144 L351,144 L351,152" strokeWidth="0.8" />

          {/* === Bicycle on bridge === */}
          <path d="M370,195 Q385,180 400,195" strokeWidth="1.1" />
          <path d="M374,192 L374,195 M396,192 L396,195" strokeWidth="0.7" />
          {/* Bike */}
          <circle cx="382" cy="183" r="3.2" strokeWidth="0.8" />
          <circle cx="392" cy="183" r="3.2" strokeWidth="0.8" />
          <path d="M382,183 L387,176 L392,183 M387,176 L387,172 L389,170" strokeWidth="0.7" />

          {/* Canal water */}
          <path d="M405,195 Q412,198 419,195 Q426,192 433,195" strokeWidth="0.5" opacity="0.4" />

          {/* === Royal Palace on Dam Square === */}
          {/* Main body */}
          <path d="M448,195 L448.5,128 L453,125 L458,122 L463,122 L555,122 L560,122 L565,125 L569.5,128 L570,195" strokeWidth="1.5" />
          {/* Central pediment */}
          <path d="M480,122 L480,115 Q509,105 538,115 L538,122" strokeWidth="1.2" />
          {/* Cupola / dome */}
          <path d="M498,115 L498,100 Q500,92 505,86 Q509,82 513,86 Q518,92 520,100 L520,115" strokeWidth="1.2" />
          {/* Weather vane / Atlas figure suggestion */}
          <path d="M509,82 L509,68 M506,72 L512,72" strokeWidth="0.9" />
          {/* Pilasters / vertical rhythm */}
          <path d="M465,195 L465,125" strokeWidth="0.6" opacity="0.5" />
          <path d="M480,195 L480,122" strokeWidth="0.6" opacity="0.5" />
          <path d="M495,195 L495,122" strokeWidth="0.6" opacity="0.5" />
          <path d="M509,195 L509,122" strokeWidth="0.6" opacity="0.5" />
          <path d="M523,195 L523,122" strokeWidth="0.6" opacity="0.5" />
          <path d="M538,195 L538,122" strokeWidth="0.6" opacity="0.5" />
          <path d="M553,195 L553,125" strokeWidth="0.6" opacity="0.5" />
          {/* Windows - row 1 */}
          <path d="M468,145 Q472,140 476,145" strokeWidth="0.7" />
          <path d="M483,145 Q487,140 491,145" strokeWidth="0.7" />
          <path d="M498,145 Q502,140 506,145" strokeWidth="0.7" />
          <path d="M512,145 Q516,140 520,145" strokeWidth="0.7" />
          <path d="M527,145 Q531,140 535,145" strokeWidth="0.7" />
          <path d="M542,145 Q546,140 550,145" strokeWidth="0.7" />
          {/* Windows - row 2 */}
          <path d="M468,165 L468,155 L476,155 L476,165" strokeWidth="0.7" />
          <path d="M483,165 L483,155 L491,155 L491,165" strokeWidth="0.7" />
          <path d="M498,165 L498,155 L506,155 L506,165" strokeWidth="0.7" />
          <path d="M512,165 L512,155 L520,155 L520,165" strokeWidth="0.7" />
          <path d="M527,165 L527,155 L535,155 L535,165" strokeWidth="0.7" />
          <path d="M542,165 L542,155 L550,155 L550,165" strokeWidth="0.7" />
          {/* Main entrance */}
          <path d="M501,195 L501,175 Q509,167 517,175 L517,195" strokeWidth="1" />
          {/* Horizontal band */}
          <path d="M450,148 L568,148" strokeWidth="0.5" opacity="0.4" />

          {/* === Nieuwe Kerk (next to Palace) === */}
          {/* Main nave */}
          <path d="M585,195 L585.5,128 Q586,122 592,116 Q600,108 612,102 Q624,108 632,116 Q638,122 638.5,128 L639,195" strokeWidth="1.4" />
          {/* Gothic tower */}
          <path d="M602,102 L602.5,68 Q603,60 607,52 Q610,46 612,42 Q614,46 617,52 Q621,60 621.5,68 L622,102" strokeWidth="1.2" />
          {/* Spire */}
          <path d="M610,42 L611,30 L612,22 L613,30 L614,42" strokeWidth="1" />
          <path d="M612,22 L612,14" strokeWidth="0.8" />
          {/* Gothic windows */}
          <path d="M598,165 Q604,150 610,165" strokeWidth="0.8" />
          <path d="M614,165 Q620,150 626,165" strokeWidth="0.8" />
          <path d="M604,140 Q612,125 620,140" strokeWidth="0.8" />
          {/* Tracery in main window */}
          <path d="M612,128 L612,140" strokeWidth="0.5" />
          {/* Flying buttress suggestion */}
          <path d="M585,155 L578,165 L578,195" strokeWidth="0.7" />
          <path d="M639,155 L646,165 L646,195" strokeWidth="0.7" />
          {/* Church door */}
          <path d="M607,195 L607,175 Q612,168 617,175 L617,195" strokeWidth="0.9" />

          {/* === Monument on Dam Square (National Monument) === */}
          <path d="M660,195 L660,188 L665,188 L665,155 L668,145 L670,140 L672,145 L675,155 L675,188 L680,188 L680,195" strokeWidth="1" />
          <path d="M670,140 L670,130" strokeWidth="0.8" />

          {/* === Trailing canal houses to the right === */}
          {/* House A - tall narrow bell gable */}
          <path d="M700,195 L700.5,142 Q701,136 705,131 Q710,126 713,131 Q717,136 717.5,142 L718,195" strokeWidth="1.2" />
          <path d="M713,126 L713,120" strokeWidth="0.8" />
          <path d="M705,165 L705,157 L713,157 L713,165" strokeWidth="0.7" />

          {/* House B - stepped gable */}
          <path d="M724,195 L724.5,138 L727,134 L730,130 L733,127 L736,130 L739,134 L741.5,138 L742,195" strokeWidth="1.2" />
          <path d="M730,134 L730,130 L733,128 L736,130 L736,134" strokeWidth="0.6" />
          <path d="M729,165 L729,157 L737,157 L737,165" strokeWidth="0.7" />

          {/* House C */}
          <path d="M748,195 L748.5,140 L752,137 L756,137 L762,137 L766,137 L769.5,140 L770,195" strokeWidth="1.2" />
          <path d="M752,137 L752,133 L766,133 L766,137" strokeWidth="0.7" />
          <path d="M754,165 L754,157 L764,157 L764,165" strokeWidth="0.7" />

          {/* House D - leaning slightly (Amsterdam charm!) */}
          <path d="M776,195 L777.5,140 Q778,134 782,130 Q785,127 788,130 Q792,134 792.5,140 L793,195" strokeWidth="1.2" />
          <path d="M780,165 L780,157 L790,157 L790,165" strokeWidth="0.7" />

          {/* === Canal boat === */}
          <path d="M810,195 L806,188 L812,185 L842,185 L848,188 L844,195" strokeWidth="1" />
          <path d="M820,185 L820,180 L835,180 L835,185" strokeWidth="0.8" />
          <path d="M827,180 L827,174" strokeWidth="0.7" />
          <path d="M823,174 L831,174" strokeWidth="0.7" />
          {/* Flag */}
          <path d="M831,174 L838,171 L831,168" strokeWidth="0.6" />
          {/* Water around boat */}
          <path d="M800,195 Q806,198 812,195" strokeWidth="0.5" opacity="0.3" />
          <path d="M844,195 Q850,198 856,195" strokeWidth="0.5" opacity="0.3" />

          {/* More trailing houses */}
          <path d="M870,195 L870.5,145 L874,140 L878,137 L882,140 L885.5,145 L886,195" strokeWidth="1.1" />
          <path d="M892,195 L892.5,140 Q893,134 897,130 Q902,126 907,130 Q911,134 911.5,140 L912,195" strokeWidth="1.1" />
          <path d="M918,195 L918.5,142 L922,138 L926,138 L932,138 L936,138 L939.5,142 L940,195" strokeWidth="1.1" />
          <path d="M946,195 L946.5,148 L950,142 L954,140 L958,142 L961.5,148 L962,195" strokeWidth="1.1" />
          <path d="M968,195 L968.5,145 Q969,138 974,134 Q979,130 984,134 Q989,138 989.5,145 L990,195" strokeWidth="1.1" />
          {/* Windows on trailing houses */}
          <path d="M875,170 L875,162 L881,162 L881,170" strokeWidth="0.6" />
          <path d="M898,168 L898,160 L906,160 L906,168" strokeWidth="0.6" />
          <path d="M924,168 L924,160 L934,160 L934,168" strokeWidth="0.6" />
          <path d="M951,172 L951,164 L957,164 L957,172" strokeWidth="0.6" />
          <path d="M975,170 L975,162 L983,162 L983,170" strokeWidth="0.6" />

          {/* Street lamp */}
          <path d="M1008,195 L1008,162" strokeWidth="0.8" />
          <path d="M1004,162 L1008,155 L1012,162" strokeWidth="0.7" />
          <circle cx="1008" cy="153" r="2.5" strokeWidth="0.6" />

          {/* Final houses fading out */}
          <path d="M1030,195 L1030.5,150 L1034,145 L1038,142 L1042,145 L1045.5,150 L1046,195" strokeWidth="1" />
          <path d="M1052,195 L1052.5,148 Q1053,142 1058,138 Q1063,134 1068,138 Q1073,142 1073.5,148 L1074,195" strokeWidth="1" />
          <path d="M1080,195 L1080.5,152 L1084,148 L1090,148 L1096,148 L1099.5,152 L1100,195" strokeWidth="1" />
          <path d="M1108,195 L1108.5,155 Q1112,148 1118,148 Q1124,148 1127.5,155 L1128,195" strokeWidth="0.9" opacity="0.8" />
          <path d="M1136,195 L1136.5,158 L1140,154 L1145,154 L1149.5,158 L1150,195" strokeWidth="0.8" opacity="0.6" />
          <path d="M1158,195 L1158.5,162 Q1162,156 1168,156 Q1174,156 1177.5,162 L1178,195" strokeWidth="0.7" opacity="0.4" />
          <path d="M1185,195 L1185.5,168 L1190,164 L1195.5,168 L1196,195" strokeWidth="0.6" opacity="0.3" />
        </g>

        {/* Connecting dashed line right side */}
        <path d="M1196,197 C1198,220 1198,270 1198,290" strokeWidth="0.7" strokeDasharray="3,5" opacity="0.4" />

        {/* ============ ROW 2 (R→L): Jordaan → Westerkerk → Anne Frank Huis ============ */}
        <g strokeWidth="1.4">
          {/* Ground line */}
          <path d="M0,440 Q60,441 120,439.5 Q180,441 240,440 Q300,438.5 360,440.5 Q420,441.5 480,439.5 Q540,441 600,440 Q660,439 720,440.5 Q780,441.5 840,440 Q900,439 960,440.5 Q1020,441 1080,439.5 Q1140,441 1200,440" strokeWidth="0.7" opacity="0.5" />

          {/* === Jordaan Houses (left) === */}
          <path d="M18,440 L18.5,392 L22,387 L26,383 L30,387 L33.5,392 L34,440" strokeWidth="1.2" />
          <path d="M40,440 L40.5,388 Q41,382 46,377 Q51,373 56,377 Q61,382 61.5,388 L62,440" strokeWidth="1.2" />
          <path d="M68,440 L68.5,385 L72,382 L76,382 L82,382 L86,382 L89.5,385 L90,440" strokeWidth="1.2" />
          <path d="M96,440 L96.5,390 L100,385 L104,382 L108,385 L111.5,390 L112,440" strokeWidth="1.2" />
          <path d="M118,440 L118.5,386 Q119,380 124,376 Q129,372 134,376 Q139,380 139.5,386 L140,440" strokeWidth="1.2" />
          {/* Hook beams on Jordaan houses */}
          <path d="M26,383 L26,378 M23,378 L29,378" strokeWidth="0.7" />
          <path d="M51,373 L51,367 M48,367 L54,367" strokeWidth="0.7" />
          <path d="M79,382 L79,376" strokeWidth="0.7" />
          <path d="M104,382 L104,376 M101,376 L107,376" strokeWidth="0.7" />
          {/* Windows */}
          <path d="M23,418 L23,410 L31,410 L31,418" strokeWidth="0.6" />
          <path d="M47,416 L47,408 L55,408 L55,416" strokeWidth="0.6" />
          <path d="M74,416 L74,408 L84,408 L84,416" strokeWidth="0.6" />
          <path d="M101,418 L101,410 L109,410 L109,418" strokeWidth="0.6" />
          <path d="M125,416 L125,408 L133,408 L133,416" strokeWidth="0.6" />

          {/* === Canal with trees === */}
          <path d="M148,440 Q155,443 162,440 Q169,437 176,440" strokeWidth="0.5" opacity="0.4" />
          {/* Trees along canal */}
          <path d="M165,440 L165,418" strokeWidth="0.7" />
          <path d="M160,418 Q162,408 165,405 Q168,408 170,418" strokeWidth="0.8" />
          <circle cx="165" cy="410" r="8" strokeWidth="0.6" opacity="0.5" />
          
          <path d="M190,440 L190,415" strokeWidth="0.7" />
          <path d="M185,415 Q187,405 190,402 Q193,405 195,415" strokeWidth="0.8" />
          <circle cx="190" cy="407" r="9" strokeWidth="0.6" opacity="0.5" />

          {/* === Arched Bridge === */}
          <path d="M210,440 Q215,438 220,435 Q230,425 240,420 Q250,418 260,420 Q270,425 280,435 Q285,438 290,440" strokeWidth="1.1" />
          {/* Bridge railing posts */}
          <path d="M225,432 L225,428" strokeWidth="0.6" />
          <path d="M240,422 L240,418" strokeWidth="0.6" />
          <path d="M260,422 L260,418" strokeWidth="0.6" />
          <path d="M275,432 L275,428" strokeWidth="0.6" />
          {/* Railing line */}
          <path d="M222,430 Q240,418 260,418 Q278,418 290,435" strokeWidth="0.5" />

          {/* === More canal houses === */}
          <path d="M300,440 L300.5,388 L304,383 L308,380 L312,383 L315.5,388 L316,440" strokeWidth="1.2" />
          <path d="M322,440 L322.5,384 Q323,378 328,374 Q333,370 338,374 Q343,378 343.5,384 L344,440" strokeWidth="1.2" />
          <path d="M350,440 L350.5,382 L354,378 L358,376 L364,376 L368,378 L371.5,382 L372,440" strokeWidth="1.2" />
          {/* Windows */}
          <path d="M305,418 L305,410 L311,410 L311,418" strokeWidth="0.6" />
          <path d="M329,416 L329,408 L337,408 L337,416" strokeWidth="0.6" />
          <path d="M356,415 L356,407 L366,407 L366,415" strokeWidth="0.6" />

          {/* === Anne Frank Huis === */}
          {/* The actual Prinsengracht 263 building */}
          <path d="M395,440 L395.5,372 L399,367 L403,363 L407,360 L411,363 L415,367 L418.5,372 L419,440" strokeWidth="1.4" />
          {/* Characteristic neck gable */}
          <path d="M401,367 L401,362 L415,362 L415,367" strokeWidth="0.8" />
          <path d="M407,360 L407,352" strokeWidth="0.9" />
          {/* Hook beam */}
          <path d="M404,352 L410,352" strokeWidth="0.7" />
          {/* Achterhuis (annex behind - slightly visible) */}
          <path d="M419,440 L419.5,378 L423,375 L427,375 L433,375 L437,375 L440.5,378 L441,440" strokeWidth="1.1" opacity="0.6" />
          {/* Windows - large characteristic ones */}
          <path d="M400,420 L400,405 L408,405 L408,420" strokeWidth="0.8" />
          <path d="M400,400 L400,385 L416,385 L416,400" strokeWidth="0.8" />
          {/* Shutters suggestion */}
          <path d="M398,400 L398,385" strokeWidth="0.5" />
          <path d="M418,400 L418,385" strokeWidth="0.5" />
          {/* Door */}
          <path d="M403,440 L403,425 Q407,420 411,425 L411,440" strokeWidth="0.9" />
          
          {/* Tree in front */}
          <path d="M385,440 L385,410" strokeWidth="0.7" />
          <circle cx="385" cy="402" r="9" strokeWidth="0.7" opacity="0.5" />

          {/* === Canal === */}
          <path d="M450,440 Q458,443 466,440 Q474,437 482,440" strokeWidth="0.5" opacity="0.4" />

          {/* === Westerkerk === */}
          {/* Main church body */}
          <path d="M500,440 L500.5,358 Q501,350 508,342 Q518,332 532,325 Q546,332 556,342 Q563,350 563.5,358 L564,440" strokeWidth="1.5" />
          {/* Tower - the famous blue crown tower */}
          <path d="M518,325 L518.5,285 Q519,278 522,272 L525,266 Q528,260 530,256 L532,252 L534,256 Q536,260 539,266 L542,272 Q545,278 545.5,285 L546,325" strokeWidth="1.3" />
          {/* Upper tower section */}
          <path d="M524,266 L524.5,248 Q525,242 528,238 L530,234 L532,230 L534,234 L536,238 Q539,242 539.5,248 L540,266" strokeWidth="1.1" />
          {/* Crown / Keizerskroon */}
          <path d="M528,230 L529,222 L530,218 L532,214 L534,218 L535,222 L536,230" strokeWidth="1" />
          <path d="M532,214 L532,204" strokeWidth="0.8" />
          {/* Cross on top */}
          <path d="M530,204 L534,204 M532,202 L532,206" strokeWidth="0.7" />
          {/* Clock */}
          <circle cx="532" cy="295" r="7" strokeWidth="0.8" />
          <path d="M532,290 L532,295 L535.5,297" strokeWidth="0.6" />
          {/* Gothic windows on tower */}
          <path d="M525,310 Q528,303 532,300 Q536,303 539,310" strokeWidth="0.7" />
          {/* Church windows - pointed arches */}
          <path d="M510,395 Q518,378 526,395" strokeWidth="0.8" />
          <path d="M538,395 Q546,378 554,395" strokeWidth="0.8" />
          {/* Tracery */}
          <path d="M518,385 L518,395" strokeWidth="0.4" />
          <path d="M546,385 L546,395" strokeWidth="0.4" />
          {/* Rose window */}
          <circle cx="532" cy="355" r="8" strokeWidth="0.7" />
          <path d="M532,347 L532,363 M524,355 L540,355" strokeWidth="0.4" />
          {/* Church door */}
          <path d="M526,440 L526,415 Q532,406 538,415 L538,440" strokeWidth="1" />
          {/* Buttresses */}
          <path d="M500,380 L493,395 L493,440" strokeWidth="0.7" />
          <path d="M564,380 L571,395 L571,440" strokeWidth="0.7" />

          {/* === More houses after Westerkerk === */}
          <path d="M585,440 L585.5,392 L589,387 L593,384 L597,387 L600.5,392 L601,440" strokeWidth="1.1" />
          <path d="M607,440 L607.5,388 Q608,382 613,378 Q618,374 623,378 Q628,382 628.5,388 L629,440" strokeWidth="1.1" />
          <path d="M635,440 L635.5,386 L639,382 L643,380 L649,380 L653,382 L656.5,386 L657,440" strokeWidth="1.1" />
          <path d="M663,440 L663.5,390 L667,386 L671,383 L675,386 L678.5,390 L679,440" strokeWidth="1.1" />
          {/* Windows */}
          <path d="M590,418 L590,411 L596,411 L596,418" strokeWidth="0.6" />
          <path d="M614,416 L614,409 L622,409 L622,416" strokeWidth="0.6" />
          <path d="M641,415 L641,408 L651,408 L651,415" strokeWidth="0.6" />
          <path d="M668,418 L668,411 L674,411 L674,418" strokeWidth="0.6" />

          {/* === Another bridge === */}
          <path d="M695,440 Q710,425 725,440" strokeWidth="1" />
          <path d="M700,435 L700,432 M720,435 L720,432" strokeWidth="0.6" />
          
          {/* Person walking on bridge (tiny) */}
          <circle cx="712" cy="426" r="1.5" strokeWidth="0.6" />
          <path d="M712,428 L712,433 M710,431 L714,431 M711,433 L710,437 M713,433 L714,437" strokeWidth="0.5" />

          {/* === Houseboat === */}
          <path d="M740,440 L736,434 L742,431 L772,431 L778,434 L774,440" strokeWidth="1" />
          <path d="M748,431 L748,424 L766,424 L766,431" strokeWidth="0.8" />
          <path d="M750,424 L750,420 L758,420 L758,424" strokeWidth="0.7" />
          {/* Flower pots on houseboat */}
          <path d="M744,431 L744,429 L746,429 L746,431" strokeWidth="0.5" />
          <path d="M745,429 L744,427 L746,427 L745,429" strokeWidth="0.4" />
          <path d="M768,431 L768,429 L770,429 L770,431" strokeWidth="0.5" />
          <path d="M769,429 L768,427 L770,427 L769,429" strokeWidth="0.4" />

          {/* More houses continuing right */}
          <path d="M795,440 L795.5,392 L799,387 L803,384 L807,387 L810.5,392 L811,440" strokeWidth="1.1" />
          <path d="M817,440 L817.5,388 Q818,382 823,377 Q828,373 833,377 Q838,382 838.5,388 L839,440" strokeWidth="1.1" />
          <path d="M845,440 L845.5,390 L849,386 L853,384 L859,384 L863,386 L866.5,390 L867,440" strokeWidth="1.1" />
          <path d="M873,440 L873.5,394 L877,389 L881,386 L885,389 L888.5,394 L889,440" strokeWidth="1.1" />
          {/* Windows */}
          <path d="M800,418 L800,411 L806,411 L806,418" strokeWidth="0.6" />
          <path d="M824,416 L824,409 L832,409 L832,416" strokeWidth="0.6" />
          <path d="M851,416 L851,409 L861,409 L861,416" strokeWidth="0.6" />

          {/* Street lamp */}
          <path d="M905,440 L905,408" strokeWidth="0.7" />
          <path d="M901,408 L905,401 L909,408" strokeWidth="0.6" />
          <circle cx="905" cy="399" r="2" strokeWidth="0.5" />

          {/* Fading houses right */}
          <path d="M925,440 L925.5,395 L929,390 L933,388 L937,390 L940.5,395 L941,440" strokeWidth="1" />
          <path d="M947,440 L947.5,392 Q948,386 953,382 Q958,378 963,382 Q968,386 968.5,392 L969,440" strokeWidth="0.9" opacity="0.8" />
          <path d="M975,440 L975.5,398 L979,394 L985,394 L988.5,398 L989,440" strokeWidth="0.8" opacity="0.6" />
          <path d="M998,440 L998.5,402 Q1002,396 1008,396 Q1014,396 1017.5,402 L1018,440" strokeWidth="0.7" opacity="0.5" />
          <path d="M1028,440 L1028.5,408 L1034,404 L1039.5,408 L1040,440" strokeWidth="0.6" opacity="0.4" />
          <path d="M1050,440 L1050.5,412 Q1055,407 1060,412 L1060,440" strokeWidth="0.5" opacity="0.3" />
        </g>

        {/* Connecting dashed line left side */}
        <path d="M4,442 C2,465 2,520 2,540" strokeWidth="0.7" strokeDasharray="3,5" opacity="0.4" />

        {/* ============ ROW 3 (L→R): Rijksmuseum → Vondelpark → Concertgebouw → Magere Brug ============ */}
        <g strokeWidth="1.4">
          {/* Ground line */}
          <path d="M0,685 Q60,686 120,684.5 Q180,686 240,685 Q300,683.5 360,685.5 Q420,686.5 480,684.5 Q540,686 600,685 Q660,684 720,685.5 Q780,686.5 840,685 Q900,684 960,685.5 Q1020,686 1080,684.5 Q1140,686 1200,685" strokeWidth="0.7" opacity="0.5" />

          {/* === Rijksmuseum === */}
          {/* Left wing */}
          <path d="M30,685 L30.5,608 L35,602 L40,598 L50,598 L55,602 L55,685" strokeWidth="1.3" />
          {/* Left tower */}
          <path d="M35,598 L35.5,575 Q36,568 40,562 L43,558 L45,562 Q49,568 49.5,575 L50,598" strokeWidth="1.2" />
          <path d="M42,558 L43,548 L44,558" strokeWidth="0.9" />
          
          {/* Central passage / main building */}
          <path d="M55,685 L55.5,595 Q56,588 62,580 Q70,572 85,565 Q100,572 108,580 Q114,588 114.5,595 L115,685" strokeWidth="1.5" />
          {/* The famous passage archway */}
          <path d="M72,685 L72.5,638 Q73,630 80,624 Q85,620 90,624 Q97,630 97.5,638 L98,685" strokeWidth="1.2" />
          {/* Central tower */}
          <path d="M75,572 L75.5,545 Q76,538 80,530 Q83,524 85,520 Q87,524 90,530 Q94,538 94.5,545 L95,572" strokeWidth="1.2" />
          <path d="M83,520 L84,508 L85,500 L86,508 L87,520" strokeWidth="1" />
          <path d="M85,500 L85,492" strokeWidth="0.8" />
          {/* Clock on tower */}
          <circle cx="85" cy="548" r="5" strokeWidth="0.7" />
          <path d="M85,544 L85,548 L87.5,549.5" strokeWidth="0.5" />
          
          {/* Right wing */}
          <path d="M115,685 L115.5,608 L120,602 L125,598 L135,598 L140,602 L140,685" strokeWidth="1.3" />
          {/* Right tower */}
          <path d="M120,598 L120.5,575 Q121,568 125,562 L128,558 L130,562 Q134,568 134.5,575 L135,598" strokeWidth="1.2" />
          <path d="M127,558 L128,548 L129,558" strokeWidth="0.9" />

          {/* Windows */}
          <path d="M62,640 Q68,630 74,640" strokeWidth="0.7" />
          <path d="M96,640 Q102,630 108,640" strokeWidth="0.7" />
          <path d="M65,618 L65,608 L75,608 L75,618" strokeWidth="0.7" />
          <path d="M95,618 L95,608 L105,608 L105,618" strokeWidth="0.7" />
          {/* Decorative band */}
          <path d="M55,620 L115,620" strokeWidth="0.4" opacity="0.4" />

          {/* === Museumplein / I Amsterdam suggestion === */}
          {/* Trees */}
          <path d="M165,685 L165,662" strokeWidth="0.7" />
          <circle cx="165" cy="655" r="8" strokeWidth="0.6" opacity="0.5" />
          <path d="M190,685 L190,658" strokeWidth="0.7" />
          <circle cx="190" cy="650" r="9" strokeWidth="0.6" opacity="0.5" />
          <path d="M215,685 L215,660" strokeWidth="0.7" />
          <circle cx="215" cy="653" r="8" strokeWidth="0.6" opacity="0.5" />

          {/* Tiny person with dog */}
          <circle cx="240" cy="676" r="1.5" strokeWidth="0.5" />
          <path d="M240,678 L240,683 M238,681 L242,681 M239,683 L238,685 M241,683 L242,685" strokeWidth="0.4" />
          <path d="M242,681 L246,681 L248,680 L248,683 L246,683" strokeWidth="0.4" />
          <path d="M248,681 L250,681" strokeWidth="0.3" />

          {/* === Vondelpark Gate === */}
          <path d="M270,685 L270,648 L274,645 L274,638 L280,634 L286,638 L286,645 L290,648 L290,685" strokeWidth="1.2" />
          <path d="M300,685 L300,648 L304,645 L304,638 L310,634 L316,638 L316,645 L320,648 L320,685" strokeWidth="1.2" />
          {/* Gate arch between pillars */}
          <path d="M290,685 L290,660 Q295,652 300,660 L300,685" strokeWidth="1" />
          {/* Ornamental gate bars */}
          <path d="M292,670 L292,685" strokeWidth="0.5" />
          <path d="M295,665 L295,685" strokeWidth="0.5" />
          <path d="M298,670 L298,685" strokeWidth="0.5" />
          {/* Fence extending */}
          <path d="M270,660 L260,660 L260,685" strokeWidth="0.5" />
          <path d="M320,660 L330,660 L330,685" strokeWidth="0.5" />

          {/* === Park trees (Vondelpark) === */}
          <path d="M350,685 L350,655" strokeWidth="0.7" />
          <path d="M343,658 Q346,645 350,642 Q354,645 357,658" strokeWidth="0.8" />
          
          <path d="M378,685 L378,648" strokeWidth="0.7" />
          <path d="M370,652 Q374,638 378,635 Q382,638 386,652" strokeWidth="0.8" />
          
          <path d="M405,685 L405,652" strokeWidth="0.7" />
          <path d="M397,656 Q401,642 405,639 Q409,642 413,656" strokeWidth="0.8" />

          {/* Ducks on Vondelpark pond */}
          <path d="M430,683 Q433,680 436,681 Q438,680 440,683" strokeWidth="0.5" />
          <path d="M434,680 L434,678 L436,677" strokeWidth="0.4" />
          <path d="M425,685 Q435,681 445,685" strokeWidth="0.5" opacity="0.4" />

          {/* === Concertgebouw === */}
          {/* Main body */}
          <path d="M468,685 L468.5,618 L474,612 L480,608 L490,604 Q510,598 530,598 Q550,598 570,604 L580,608 L586,612 L591.5,618 L592,685" strokeWidth="1.5" />
          {/* Triangular pediment */}
          <path d="M485,604 L485,598 Q530,582 575,598 L575,604" strokeWidth="1.2" />
          {/* Columns */}
          <path d="M488,685 L488,606" strokeWidth="0.6" opacity="0.5" />
          <path d="M502,685 L502,602" strokeWidth="0.6" opacity="0.5" />
          <path d="M516,685 L516,600" strokeWidth="0.6" opacity="0.5" />
          <path d="M530,685 L530,599" strokeWidth="0.6" opacity="0.5" />
          <path d="M544,685 L544,600" strokeWidth="0.6" opacity="0.5" />
          <path d="M558,685 L558,602" strokeWidth="0.6" opacity="0.5" />
          <path d="M572,685 L572,606" strokeWidth="0.6" opacity="0.5" />
          {/* Lyre in pediment */}
          <path d="M526,594 Q523,588 526,580 Q530,588 533,594" strokeWidth="0.7" />
          <path d="M524,590 L535,590" strokeWidth="0.4" />
          <path d="M525,587 L534,587" strokeWidth="0.4" />
          {/* Windows */}
          <path d="M495,648 Q502,638 509,648" strokeWidth="0.7" />
          <path d="M551,648 Q558,638 565,648" strokeWidth="0.7" />
          {/* Main door */}
          <path d="M523,685 L523,658 Q530,650 537,658 L537,685" strokeWidth="0.9" />
          {/* Steps */}
          <path d="M478,685 L478,680 L582,680 L582,685" strokeWidth="0.5" />

          {/* === Tram === */}
          <path d="M612,685 L612,672 L658,672 L658,685" strokeWidth="0.9" />
          <path d="M616,672 L616,668 L654,668 L654,672" strokeWidth="0.7" />
          {/* Tram windows */}
          <path d="M620,668 L620,665 L628,665 L628,668" strokeWidth="0.5" />
          <path d="M632,668 L632,665 L640,665 L640,668" strokeWidth="0.5" />
          <path d="M644,668 L644,665 L650,665 L650,668" strokeWidth="0.5" />
          {/* Pantograph */}
          <path d="M635,665 L635,658 L640,654" strokeWidth="0.5" />
          {/* Wheels */}
          <circle cx="620" cy="685" r="2.5" strokeWidth="0.6" />
          <circle cx="650" cy="685" r="2.5" strokeWidth="0.6" />
          {/* Track line */}
          <path d="M605,685 L665,685" strokeWidth="0.4" opacity="0.3" />

          {/* === Canal houses === */}
          <path d="M680,685 L680.5,638 L684,633 L688,630 L692,633 L695.5,638 L696,685" strokeWidth="1.1" />
          <path d="M702,685 L702.5,635 Q703,628 708,624 Q713,620 718,624 Q723,628 723.5,635 L724,685" strokeWidth="1.1" />
          <path d="M730,685 L730.5,632 L734,628 L738,626 L744,626 L748,628 L751.5,632 L752,685" strokeWidth="1.1" />
          {/* Windows */}
          <path d="M685,660 L685,653 L691,653 L691,660" strokeWidth="0.6" />
          <path d="M709,658 L709,651 L717,651 L717,658" strokeWidth="0.6" />
          <path d="M736,658 L736,651 L746,651 L746,658" strokeWidth="0.6" />

          {/* === Magere Brug (Skinny Bridge) === */}
          {/* Bridge deck */}
          <path d="M775,685 L780,678 L800,675 L840,675 L860,678 L865,685" strokeWidth="1.2" />
          {/* Drawbridge towers */}
          <path d="M792,675 L792,650 L796,645 L800,650 L800,675" strokeWidth="1" />
          <path d="M840,675 L840,650 L844,645 L848,650 L848,675" strokeWidth="1" />
          {/* Drawbridge cables */}
          <path d="M796,645 L810,660 L820,660" strokeWidth="0.6" />
          <path d="M844,645 L830,660 L820,660" strokeWidth="0.6" />
          {/* Bridge counter-weights */}
          <path d="M796,645 L790,638" strokeWidth="0.7" />
          <path d="M844,645 L850,638" strokeWidth="0.7" />
          <circle cx="790" cy="636" r="2" strokeWidth="0.6" />
          <circle cx="850" cy="636" r="2" strokeWidth="0.6" />
          {/* Railing */}
          <path d="M785,676 L795,673 L845,673 L855,676" strokeWidth="0.4" />
          {/* Lights on bridge */}
          <path d="M810,675 L810,670" strokeWidth="0.5" />
          <circle cx="810" cy="668" r="1.5" strokeWidth="0.4" />
          <path d="M830,675 L830,670" strokeWidth="0.5" />
          <circle cx="830" cy="668" r="1.5" strokeWidth="0.4" />
          {/* Water reflections */}
          <path d="M780,685 Q790,688 800,685 Q810,682 820,685 Q830,688 840,685 Q850,682 860,685" strokeWidth="0.4" opacity="0.3" />

          {/* === Windmill (De Gooyer) === */}
          <path d="M895,685 L895.5,635 L900,628 L910,622 L920,628 L924.5,635 L925,685" strokeWidth="1.3" />
          {/* Windmill cap */}
          <path d="M900,628 L900,618 Q905,610 910,608 Q915,610 920,618 L920,628" strokeWidth="1.1" />
          {/* Blades */}
          <path d="M910,608 L892,582" strokeWidth="0.9" />
          <path d="M910,608 L928,582" strokeWidth="0.9" />
          <path d="M910,608 L936,615" strokeWidth="0.9" />
          <path d="M910,608 L884,615" strokeWidth="0.9" />
          {/* Blade frames */}
          <path d="M893,584 L894,598 M895,586 L896,600" strokeWidth="0.4" />
          <path d="M927,584 L926,598 M925,586 L924,600" strokeWidth="0.4" />
          {/* Hub */}
          <circle cx="910" cy="608" r="3" strokeWidth="0.8" />
          {/* Gallery/balcony */}
          <path d="M893,635 L927,635" strokeWidth="0.5" />
          {/* Door */}
          <path d="M906,685 L906,665 Q910,660 914,665 L914,685" strokeWidth="0.8" />

          {/* === Final gabled houses fading === */}
          <path d="M945,685 L945.5,640 L949,635 L953,632 L957,635 L960.5,640 L961,685" strokeWidth="1" />
          <path d="M967,685 L967.5,638 Q968,632 973,628 Q978,624 983,628 Q988,632 988.5,638 L989,685" strokeWidth="0.9" opacity="0.8" />
          <path d="M995,685 L995.5,645 L999,640 L1005,640 L1008.5,645 L1009,685" strokeWidth="0.8" opacity="0.7" />
          <path d="M1018,685 L1018.5,648 Q1022,642 1028,642 Q1034,642 1037.5,648 L1038,685" strokeWidth="0.7" opacity="0.5" />
          <path d="M1048,685 L1048.5,655 L1054,650 L1059.5,655 L1060,685" strokeWidth="0.6" opacity="0.4" />
          <path d="M1070,685 L1070.5,660 Q1076,654 1082,660 L1082,685" strokeWidth="0.5" opacity="0.3" />
        </g>

        {/* Subtle area labels */}
        <text x="1185" y="210" fontSize="7" fill="currentColor" opacity="0.25" textAnchor="end" fontFamily="Outfit, sans-serif" letterSpacing="2">Dam Square</text>
        <text x="15" y="455" fontSize="7" fill="currentColor" opacity="0.25" fontFamily="Outfit, sans-serif" letterSpacing="2">Jordaan</text>
        <text x="1185" y="700" fontSize="7" fill="currentColor" opacity="0.25" textAnchor="end" fontFamily="Outfit, sans-serif" letterSpacing="2">Museum Quarter</text>

        {/* Connecting lines between rows */}
        <path d="M1196,197 C1198,220 1198,270 1198,290 C1198,380 1198,420 1060,438" strokeWidth="0.6" strokeDasharray="3,5" opacity="0.3" />
        <path d="M4,442 C2,465 2,520 2,540 C2,620 2,660 30,683" strokeWidth="0.6" strokeDasharray="3,5" opacity="0.3" />
      </svg>
    </div>
  );
};

export default AmsterdamSkyline;
