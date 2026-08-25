import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { business } from '../../data/business';

const SESSION_KEY = 'cookiesland_owner_unlocked';

export function PinGate({ children }) {
  const { t } = useLanguage();
  const [unlocked, setUnlocked] = useState(sessionStorage.getItem(SESSION_KEY) === '1');
  const [pin, setPin] = useState('');
  const [wrong, setWrong] = useState(false);

  if (unlocked) return children;

  const submit = () => {
    if (pin === business.ownerPin) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setUnlocked(true);
    } else {
      setWrong(true);
    }
  };

  return (
    <div className="pin-gate">
      <div className="pin-gate-card">
        <div className="brand-name" style={{ marginBottom: 16 }}>{t('brandName')} — {t('ownerPageTitle')}</div>
        <label className="form-label">{t('ownerPinPrompt')}</label>
        <input
          className="form-input"
          type="password"
          inputMode="numeric"
          value={pin}
          onChange={(e) => { setPin(e.target.value); setWrong(false); }}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
        />
        {wrong && <div className="form-error">{t('ownerPinWrong')}</div>}
        <button type="button" className="wa-order-btn" style={{ background: 'var(--maroon)' }} onClick={submit}>
          {t('ownerPinSubmit')}
        </button>
      </div>
    </div>
  );
}
