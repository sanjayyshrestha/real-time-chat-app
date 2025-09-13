export function formatChatDate(isoString) {
  const date = new Date(isoString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const isYesterday = date.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();

  const optionsTime = { hour: '2-digit', minute: '2-digit' };
  const optionsDate = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };

  if (isToday) return date.toLocaleTimeString([], optionsTime); // "07:45 AM"
  if (isYesterday) return 'Yesterday ' + date.toLocaleTimeString([], optionsTime); // "Yesterday 04:00 AM"
  
  return date.toLocaleString([], optionsDate); // "Aug 22, 07:45 AM"
}

