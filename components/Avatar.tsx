// Bev's avatar — a gold five-pointed star on a black circle, ringed in gold
// then white. The Toon badge reduced to its essence. Inline SVG so it's sharp
// at any size and doesn't depend on app/icon.png being routable.
export default function Avatar() {
  return (
    <div className="tl-avatar" aria-label="Bev">
      <svg
        width={28}
        height={28}
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <polygon
          points="16,3 19.5,12.5 29.5,12.5 21.5,18.5 24.5,28.5 16,22.5 7.5,28.5 10.5,18.5 2.5,12.5 12.5,12.5"
          fill="#f5c518"
        />
      </svg>
    </div>
  );
}
