import type { ReactNode } from "react";
import { hueColor } from "@/lib/format";
import { CONTEXT_HUES } from "./scenario-icons";
import type { ContextId } from "./taxonomy";

type Palette = { line: string; fill: string; soft: string };

type IllustrationProps = {
  p: Palette;
  size: number;
};

function palette(hue: number): Palette {
  return {
    line: hueColor(hue, 0.42, 0.13),
    fill: hueColor(hue, 0.8, 0.14),
    soft: hueColor(hue, 0.94, 0.055),
  };
}

function Frame({ size, children }: { size: number; children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function Workplace({ p, size }: IllustrationProps) {
  return (
    <Frame size={size}>
      <g stroke={p.line} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 46h48M14 46v8M50 46v8" />
        <rect x="19" y="28" width="26" height="15" rx="2.5" fill={p.soft} />
        <path d="M16 43h32M25 33h14" />
        <path
          d="M45 9h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-3l-4.5 4.5V21h-2.5a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Z"
          fill={p.fill}
        />
        <path d="M48 14h5M48 18h3" />
      </g>
    </Frame>
  );
}

function Family({ p, size }: IllustrationProps) {
  return (
    <Frame size={size}>
      <g stroke={p.line} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m10 32 22-19 22 19" />
        <rect x="15" y="32" width="34" height="20" rx="2.5" fill={p.soft} />
        <rect x="28" y="41" width="8" height="11" rx="1.5" fill={p.fill} />
        <circle cx="21" cy="39" r="3" fill={p.fill} />
        <path
          d="M47 10c-2.5-3-6.4-1.5-6.4 1.5 0 3 6.4 6.5 6.4 6.5s6.4-3.5 6.4-6.5c0-3-3.9-4.5-6.4-1.5Z"
          fill={p.fill}
        />
      </g>
    </Frame>
  );
}

function Friendship({ p, size }: IllustrationProps) {
  return (
    <Frame size={size}>
      <g stroke={p.line} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 46h48M14 46v8M50 46v8" />
        <rect x="14" y="29" width="12" height="13" rx="2.5" fill={p.soft} />
        <path d="M26 33h4a3 3 0 0 1 0 6h-4M18 24c0-2 1.6-3.5 3.5-3.5S25 22 25 24" />
        <rect x="38" y="29" width="12" height="13" rx="2.5" fill={p.soft} />
        <path d="M38 33h-4a3 3 0 0 0 0 6h4M42 24c0-2 1.6-3.5 3.5-3.5S49 22 49 24" />
        <path
          d="M22 9h22a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-8l-5.5 5V23H22a4 4 0 0 1-4-4v-6a4 4 0 0 1 4-4Z"
          fill={p.fill}
        />
        <path d="M26 16h8M26 20h5" />
      </g>
    </Frame>
  );
}

function Romantic({ p, size }: IllustrationProps) {
  return (
    <Frame size={size}>
      <g stroke={p.line} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M32 52s-16-9.8-16-21.5a9 9 0 0 1 16-5.7 9 9 0 0 1 16 5.7C48 42.2 32 52 32 52Z"
          fill={p.fill}
        />
        <path d="M49 9v8M45 13h8" />
        <path d="M13 11v6M10 14h6" />
        <circle cx="52" cy="27" r="2" fill={p.fill} />
      </g>
    </Frame>
  );
}

function Education({ p, size }: IllustrationProps) {
  return (
    <Frame size={size}>
      <g stroke={p.line} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m32 8 20 9-20 9-20-9 20-9Z" fill={p.fill} />
        <path d="M51 17v10" />
        <circle cx="51" cy="29" r="2" fill={p.fill} />
        <path
          d="M10 32q22-8 44 0v18q-22-8-44 0V32Z"
          fill={p.soft}
        />
        <path d="M32 29v21" />
        <path d="M16 36q8-2 13 0M35 36q8-2 13 0" />
      </g>
    </Frame>
  );
}

function PublicSpace({ p, size }: IllustrationProps) {
  return (
    <Frame size={size}>
      <g stroke={p.line} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 53h50" />
        <path d="M16 9v44" />
        <rect x="7" y="6" width="24" height="14" rx="3" fill={p.fill} />
        <path d="M12 12h14M12 16h9" />
        <rect x="29" y="28" width="28" height="18" rx="4" fill={p.soft} />
        <path d="M34 33h12v6H34z" fill={p.fill} />
        <path d="M50 33h3M34 44h18" />
        <circle cx="36" cy="48" r="3" fill={p.line} />
        <circle cx="50" cy="48" r="3" fill={p.line} />
      </g>
    </Frame>
  );
}

function Party({ p, size }: IllustrationProps) {
  return (
    <Frame size={size}>
      <g stroke={p.line} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 13h13v8a6.5 6.5 0 0 1-13 0v-8Z" fill={p.soft} />
        <path d="M19.5 27v14M14 45h11" />
        <path d="M38 13h13v8a6.5 6.5 0 0 1-13 0v-8Z" fill={p.soft} />
        <path d="M44.5 27v14M39 45h11" />
        <path d="M25 8v4M21 10h8M40 6v3M37 8h6" />
        <circle cx="32" cy="23" r="1.8" fill={p.fill} />
        <path d="m54 8-2 2M10 29l-2 2M55 34l-2 2" />
      </g>
    </Frame>
  );
}

/** A poster board with a figure pointing at it. */
function Conference({ p, size }: IllustrationProps) {
  return (
    <Frame size={size}>
      <g stroke={p.line} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="32" height="26" rx="2.5" fill={p.soft} />
        <path d="M15 16h13M15 22h20M15 28h9" />
        <path d="M17 35v17M33 35v17" />
        <circle cx="50" cy="26" r="4.5" fill={p.fill} />
        <path d="M43 52v-9a7 7 0 0 1 14 0v9" />
        <path d="m44 38-6-6" />
      </g>
    </Frame>
  );
}

/** A round table seen from above: four seats, one of them yours. */
function Mixer({ p, size }: IllustrationProps) {
  return (
    <Frame size={size}>
      <g stroke={p.line} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="14" fill={p.soft} />
        <circle cx="32" cy="32" r="4" />
        <circle cx="32" cy="9" r="4.2" fill={p.fill} />
        <circle cx="55" cy="32" r="4.2" />
        <circle cx="32" cy="55" r="4.2" />
        <circle cx="9" cy="32" r="4.2" />
        <path d="M25 26l2 2M39 26l-2 2M26 39l2-2M38 39l-2-2" />
      </g>
    </Frame>
  );
}

/** A call window with a second, smaller participant. */
function Outreach({ p, size }: IllustrationProps) {
  return (
    <Frame size={size}>
      <g stroke={p.line} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="12" width="50" height="34" rx="4" fill={p.soft} />
        <circle cx="26" cy="26" r="5" fill={p.fill} />
        <path d="M16 40a10 10 0 0 1 20 0" />
        <rect x="41" y="30" width="12" height="12" rx="2" />
        <circle cx="47" cy="35" r="1.8" fill={p.fill} />
        <path d="M24 54h16M32 46v8" />
      </g>
    </Frame>
  );
}

/** A lectern and microphone facing a row of seats. */
function Organizing({ p, size }: IllustrationProps) {
  return (
    <Frame size={size}>
      <g stroke={p.line} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 26h20l-3 22H25l-3-22Z" fill={p.soft} />
        <path d="M18 26h28M26 54h12" />
        <path d="M32 26V15" />
        <rect x="28.5" y="7" width="7" height="10" rx="3.5" fill={p.fill} />
        <circle cx="10" cy="46" r="3" />
        <circle cx="54" cy="46" r="3" />
        <path d="M5 56a5 5 0 0 1 10 0M49 56a5 5 0 0 1 10 0" />
      </g>
    </Frame>
  );
}

const ILLUSTRATIONS: Record<ContextId, (props: IllustrationProps) => ReactNode> = {
  conference: Conference,
  mixer: Mixer,
  outreach: Outreach,
  organizing: Organizing,
  workplace: Workplace,
  family: Family,
  friendship: Friendship,
  romantic: Romantic,
  education: Education,
  public: PublicSpace,
  party: Party,
};

export function ContextIllustration({ context, size = 32 }: { context: ContextId; size?: number }) {
  const Illustration = ILLUSTRATIONS[context];
  return <>{Illustration({ p: palette(CONTEXT_HUES[context]), size })}</>;
}
