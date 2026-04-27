import Image from "next/image";
import iconSrc from "../app/icon.png";

// Bev's avatar — the NUFC-style shield from app/icon.png. The shield is a
// complete brand mark (black/white stripes + gold outline) so we render it
// as-is, no surrounding ring or circle decoration. Static import via next/image
// so the favicon and the chat avatar share one source of truth.
export default function Avatar() {
  return (
    <div className="tl-avatar" aria-label="Bev">
      <Image
        src={iconSrc}
        alt="Bev"
        width={48}
        height={48}
        priority
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
}
