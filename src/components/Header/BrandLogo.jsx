// Placeholder mark standing in for the real badge logo until the actual
// image file is dropped in (see src/assets/README — swap the <svg> below for
// an <img src={logo} /> once the file exists). Colors match the real badge:
// pink background, warm tan cookie, dark maroon-brown chips, near-black ink.
export function BrandLogo() {
  return (
    <div className="brand-logo">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="44" fill="#FDDCF1" stroke="#1B171D" strokeWidth="3" />
        <circle cx="50" cy="52" r="30" fill="#E3A85C" stroke="#1B171D" strokeWidth="2.5" />
        <circle cx="38" cy="42" r="4" fill="#6E2A3B" />
        <circle cx="60" cy="40" r="3.5" fill="#6E2A3B" />
        <circle cx="52" cy="56" r="4.2" fill="#6E2A3B" />
        <circle cx="36" cy="60" r="3.2" fill="#6E2A3B" />
        <circle cx="64" cy="60" r="4" fill="#6E2A3B" />
        <circle cx="46" cy="68" r="3" fill="#6E2A3B" />
      </svg>
    </div>
  );
}
