import { STAMPS, CHARACTER_TAGLINE, PALETTE } from "@/lib/constants";

export default function Header() {
  return (
    <header className="w-full max-w-3xl px-6 pt-12 pb-8 relative z-10">
      {/* Top row: gold stamp microtype. Right is the hero — visibly larger
          than the left supporting stamp. Sizes bumped 50% from the original
          11/16 spec for stronger graphic presence. */}
      <div className="flex items-end justify-between mb-6 gap-4">
        <span className="stamp" style={{ fontSize: 16.5 }}>
          {STAMPS.left}
        </span>
        <span
          className="stamp"
          style={{
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          {STAMPS.right}
        </span>
      </div>

      {/* Wordmark — Anton, white, gold-then-black drop shadow + gold glow.
          Straight and upright like a stadium scoreboard — no rotation,
          no drift animation. */}
      <div className="flex justify-center">
        <h1
          className="display wordmark-stamp"
          style={{
            fontSize: "clamp(3.5rem, 12vw, 7.5rem)",
          }}
        >
          CannyGPT
        </h1>
      </div>

      {/* Tagline — italic serif, gold, between solid 60%-gold rules.
          Slightly larger than other sites in the network. */}
      <div className="mt-6">
        <div className="rule-tagline" />
        <div className="py-3 flex justify-center">
          <span
            className="serif italic"
            style={{
              color: PALETTE.gold,
              fontSize: "clamp(1.0625rem, 2.4vw, 1.25rem)",
              lineHeight: 1.3,
            }}
          >
            {CHARACTER_TAGLINE}
          </span>
        </div>
        <div className="rule-tagline" />
      </div>

      {/* Press label */}
      <div className="mt-3 flex justify-start">
        <span className="stamp" style={{ opacity: 0.85 }}>
          {STAMPS.label}
        </span>
      </div>
    </header>
  );
}
