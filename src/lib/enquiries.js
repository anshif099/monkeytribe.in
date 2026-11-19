export async function sendEnquiry(data) {
  const response = await fetch('/api/send-enquiry.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(25000),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.success !== true) {
    throw new Error('We could not send your enquiry. Please try again or email hello@monkeytribe.in.');
  }
  return true;
}
export const saveContact = data => sendEnquiry({ ...data, type: 'contact' });
export const saveEnrollment = data => sendEnquiry({ ...data, type: 'course' });
