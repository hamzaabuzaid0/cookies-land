import { useState } from 'react';
import { createOrderTicket } from './ordersRepo';
import { generateTicketId } from './generateTicketId';

// Shared two-step checkout state machine behind both the cart drawer and the
// custom order form: fill in order + fulfillment details ('form') -> pay the
// deposit and upload proof ('deposit') -> ticket created ('success').
// The owner never sees a WhatsApp order — this is what actually reaches her
// (see src/components/Owner/OwnerPage.jsx); WhatsApp is only used afterwards
// to notify the customer of status changes.
export function useTicketCheckout() {
  const [phase, setPhase] = useState('form');
  const [screenshot, setScreenshot] = useState(null);
  const [ticketId, setTicketId] = useState(null);
  const [error, setError] = useState('');

  const goToDeposit = () => setPhase('deposit');
  const backToForm = () => setPhase('form');

  const submit = async (payload) => {
    if (!screenshot) {
      setError('screenshotRequired');
      return;
    }
    setError('');
    setPhase('submitting');
    const id = generateTicketId();
    try {
      // Firebase's upload SDK retries with backoff on network failures
      // instead of rejecting quickly — without this timeout, a bad network
      // (or an unconfigured firebaseConfig.js) leaves the customer staring
      // at "Submitting..." indefinitely instead of seeing an error.
      await Promise.race([
        createOrderTicket({ ticketId: id, paymentScreenshotFile: screenshot, ...payload }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 15000)),
      ]);
      setTicketId(id);
      setPhase('success');
    } catch (e) {
      console.error('Failed to submit order ticket', e);
      setError('submitFailed');
      setPhase('deposit');
    }
  };

  const reset = () => {
    setPhase('form');
    setScreenshot(null);
    setTicketId(null);
    setError('');
  };

  return {
    phase, screenshot, setScreenshot, ticketId, error,
    goToDeposit, backToForm, submit, reset,
  };
}
