// No real product photos exist yet (nothing usable was recoverable from the
// Facebook page without a login — see conversation notes). Each category
// gets a clean icon + color-tinted background standing in for a photo, same
// stand-in strategy as the pharmacy demo, until the owner sends real images.
export const CATEGORY_STYLE = {
  ready: { bg: '#fdece0', fg: '#a85a2a' },
  protein: { bg: '#f7e0e6', fg: '#8a2f42' },
  sauces: { bg: '#fdf1da', fg: '#a8791a' },
  desserts: { bg: '#fbe3f0', fg: '#c23f86' },
  bakery: { bg: '#f3e6d3', fg: '#8a5a22' },
};

const iconPaths = {
  ready: (
    <>
      <path d="M4 11h16a1 1 0 0 1 1 1 7 7 0 0 1-7 7H10a7 7 0 0 1-7-7 1 1 0 0 1 1-1z" />
      <path d="M8 11c0-3 1.5-5 4-7 2.5 2 4 4 4 7" />
    </>
  ),
  protein: (
    <path d="M14 4c3 0 5.5 2.5 5.5 5.5 0 2.2-1.3 4-3.1 5-.8.4-1.4 1.1-1.9 2l-1.8 3.4a2.2 2.2 0 0 1-3.9-2l1.6-3a4 4 0 0 0-.6-4.7l-.8-.8a3 3 0 1 1 4.2-4.2z" />
  ),
  sauces: (
    <>
      <path d="M10 2h4v3.5l2 2.5v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-12l2-2.5V2z" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </>
  ),
  desserts: (
    <>
      <path d="M6 10a6 6 0 0 1 12 0z" />
      <path d="M7 10l3.2 11a1 1 0 0 0 1.9 0L15.3 10" />
    </>
  ),
  bakery: (
    <path d="M6 11c0-4 2.5-7 6-7s6 3 6 7c1.1 0 2 .9 2 2v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5c0-1.1.9-2 2-2z" />
  ),
};

// A category's icon + color-tinted background, sized to fill its parent
// container. Used for product cards and the "shop by category" quick grid —
// the universal visual stand-in until real product photos exist.
export function CategoryVisual({ catId, size = '38px' }) {
  const style = CATEGORY_STYLE[catId] || CATEGORY_STYLE.ready;
  const paths = iconPaths[catId] || iconPaths.ready;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: style.bg,
        color: style.fg,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: size, height: size, display: 'block' }}
      >
        {paths}
      </svg>
    </div>
  );
}
