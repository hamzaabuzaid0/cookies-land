// Alerts the owner while /owner is open: a Web Notification (if permitted)
// plus an audible beep, generated with the Web Audio API so no audio file
// needs to be bundled. This only fires while the tab is open — true
// off-tab/phone push would need the WhatsApp Business API or a backend
// (see conversation notes), neither of which this static site has.
export function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

export function notifyNewOrder(ticketId) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('كوكيز لاند — طلب جديد', {
      body: `تذكرة رقم ${ticketId}`,
    });
  }
  playBeep();
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.18].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.15, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.15);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.15);
    });
  } catch {
    // Audio can fail silently (autoplay policies, unsupported browser) —
    // the Notification above (or the live list update itself) still works.
  }
}
