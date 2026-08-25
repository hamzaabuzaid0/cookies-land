import logo from '../../assets/logo.png';

// Cropped from the real Cookies Land badge (their Facebook cover photo,
// confirmed by filename match) — the source image also has "CoOkies LaaaND
// #حلو_وحادق" text below the cookie mark, cropped out here since the header
// slot is a small circle.
export function BrandLogo() {
  return (
    <div className="brand-logo">
      <img src={logo} alt="Cookies Land" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}
