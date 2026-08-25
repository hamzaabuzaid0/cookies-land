import { useState, useCallback } from 'react';

// Shared piece of state behind both checkout flows (cart order + custom
// order): how to get the order (pickup/delivery) plus contact details.
// Delivery requires an address; pickup doesn't.
export function useFulfillmentForm() {
  const [mode, setMode] = useState('pickup');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const isValid = useCallback(() => {
    if (!name.trim() || !phone.trim()) return false;
    if (mode === 'delivery' && !address.trim()) return false;
    return true;
  }, [mode, name, phone, address]);

  return {
    mode, setMode,
    name, setName,
    phone, setPhone,
    address, setAddress,
    notes, setNotes,
    isValid,
  };
}
