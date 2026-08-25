import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useDrawer } from '../../context/DrawerContext';

// Login / sign-up, plus an explicit "continue as guest" escape hatch —
// guest checkout works fully without an account either way, this is only
// for customers who want one, and for the admin account to log in.
export function AuthModal() {
  const { t } = useLanguage();
  const { authOpen, closeAuth } = useDrawer();
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!authOpen) return null;

  const submit = async () => {
    if (!email.trim() || !password.trim() || (mode === 'signup' && !name.trim())) {
      setError(t('fillRequiredFields'));
      return;
    }
    setError('');
    setBusy(true);
    try {
      if (mode === 'signup') await signUp(email.trim(), password, name.trim());
      else await signIn(email.trim(), password);
      closeAuth();
    } catch (e) {
      setError(e.message || t('submitFailed'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="overlay show" onClick={closeAuth}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="account-tabs">
          <button
            type="button"
            className={'account-tab' + (mode === 'login' ? ' active' : '')}
            onClick={() => { setMode('login'); setError(''); }}
          >
            {t('loginTab')}
          </button>
          <button
            type="button"
            className={'account-tab' + (mode === 'signup' ? ' active' : '')}
            onClick={() => { setMode('signup'); setError(''); }}
          >
            {t('signupTab')}
          </button>
        </div>

        {mode === 'signup' && (
          <>
            <label className="form-label">{t('nameLabel')}</label>
            <input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </>
        )}
        <label className="form-label">{t('emailLabel')}</label>
        <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className="form-label">{t('passwordLabel')}</label>
        <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <div className="form-error">{error}</div>}

        <button type="button" className="wa-order-btn" style={{ background: 'var(--maroon)' }} disabled={busy} onClick={submit}>
          {mode === 'signup' ? t('signupTab') : t('loginTab')}
        </button>
        <button type="button" className="fulfillment-btn" style={{ width: '100%', marginTop: 8 }} onClick={closeAuth}>
          {t('continueAsGuest')}
        </button>
      </div>
    </div>
  );
}
