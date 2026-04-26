import {
  PALETTE,
  SISTER_SITES,
  CURRENT_SITE,
  DISCLAIMER_LINE,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      className="w-full mt-16 relative z-10"
      style={{ background: PALETTE.bgDark }}
    >
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div
          className="mb-12"
          style={{ height: 1, background: "rgba(245,197,24,0.2)" }}
        />

        {/* The Family */}
        <h3
          className="stamp text-center mb-6"
          style={{
            color: PALETTE.gold,
            opacity: 0.85,
            fontSize: 11,
            letterSpacing: "0.32em",
          }}
        >
          ◆ THE FAMILY ◆
        </h3>

        <ul className="grid grid-cols-3 gap-y-4 gap-x-2 md:flex md:flex-wrap md:justify-center md:gap-x-8 mb-8">
          {SISTER_SITES.map((s) => {
            const isCurrent = s.name === CURRENT_SITE;
            const baseStyle = {
              color: PALETTE.primary,
              fontSize: 11,
            } as const;
            return (
              <li key={s.name} className="text-center">
                {isCurrent ? (
                  <span
                    className="stamp"
                    style={{ ...baseStyle, opacity: 0.4, cursor: "default" }}
                    aria-current="page"
                  >
                    {s.name}
                  </span>
                ) : (
                  <a
                    href={s.url}
                    className="stamp transition-colors"
                    style={{ ...baseStyle, opacity: 0.85 }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = PALETTE.gold;
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = PALETTE.primary;
                    }}
                  >
                    {s.name}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {/* Holding company line */}
        <p
          className="stamp text-center mb-4"
          style={{
            color: PALETTE.primary,
            opacity: 0.55,
            fontSize: 10,
          }}
        >
          PART OF THE CHARACTERS4AI FAMILY ·{" "}
          <a
            href="https://characters4ai.com"
            style={{ color: PALETTE.gold, opacity: 0.95 }}
          >
            characters4ai.com
          </a>
        </p>

        {/* Legal links */}
        <div className="flex justify-center gap-6 mb-6">
          <a
            href="https://characters4ai.com/terms"
            className="stamp"
            style={{ color: PALETTE.primary, opacity: 0.6, fontSize: 10 }}
          >
            Terms of Use
          </a>
          <a
            href="https://characters4ai.com/privacy"
            className="stamp"
            style={{ color: PALETTE.primary, opacity: 0.6, fontSize: 10 }}
          >
            Privacy Policy
          </a>
          <a
            href="https://characters4ai.com/disclaimer"
            className="stamp"
            style={{ color: PALETTE.primary, opacity: 0.6, fontSize: 10 }}
          >
            Disclaimer
          </a>
        </div>

        {/* Disclaimer */}
        <p
          className="serif italic text-center"
          style={{
            color: "rgba(245,240,232,0.5)",
            fontSize: "0.85rem",
            lineHeight: 1.5,
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          {DISCLAIMER_LINE}
        </p>
      </div>

      <div className="bottom-stripe" />
    </footer>
  );
}
