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

export const saveProgrammeInterest = data => sendEnquiry({ ...data, type: 'programme' });
const topicLabels = { promptEngineering: 'Prompt Engineering', aiMarketing: 'AI Marketing', brandStrategy: 'Brand Strategy', aiTools: 'AI Tools & Workflows', analyticsData: 'Analytics & Data', industryTrends: 'Industry Trends' };
export const saveWebinarInterest = data => sendEnquiry({ ...data, type: 'webinar', topics: Object.entries(topicLabels).filter(([key]) => data.topics?.[key]).map(([, label]) => label).join(', ') });
