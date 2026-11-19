export function prepareEnquiry(payload) {
  if (!payload || !['contact', 'course', 'programme', 'webinar'].includes(payload.type)) throw new Error('Invalid enquiry type.');
  const limits = { name: 150, email: 254, phone: 50, course: 200, enquiryType: 100, message: 5000, profession: 200, goals: 5000, programme: 200, topics: 1000 };
  const data = {};
  for (const [key, limit] of Object.entries(limits)) {
    const value = key === 'name' ? payload.fullName || payload.name : payload[key];
    if (value != null && typeof value !== 'string') throw new Error('Invalid form fields.');
    data[key] = (value || '').trim();
    if (data[key].length > limit) throw new Error('Form field too long.');
  }
  if (!data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || /[\r\n]/.test(data.name + data.email + data.course + data.programme)) throw new Error('Valid name and email are required.');
  if (payload.type === 'contact' && (!data.message || !data.enquiryType)) throw new Error('Message and enquiry type are required.');
  if (payload.type === 'course' && !data.course) throw new Error('Course is required.');
  if (payload.type === 'programme' && !data.programme) throw new Error('Programme is required.');
  return {
    to: 'hello@monkeytribe.in',
    replyTo: data.email,
    subject: { contact: 'Monkey Tribe contact enquiry', course: `Course enquiry: ${data.course}`, programme: `Programme waitlist: ${data.programme}`, webinar: 'Webinar notification request' }[payload.type],
    text: Object.entries(data).filter(([,value]) => value).map(([key,value]) => `${key}: ${value}`).join('\n\n'),
  };
}
