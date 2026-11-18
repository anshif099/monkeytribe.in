import published from '../../public/course-catalog.json';
export const getPublishedCourses = () => published;
export function getCustomCourses() {
  let drafts = [];
  try { drafts = JSON.parse(localStorage.getItem('mt_custom_courses') || '[]'); } catch { /* Use published courses. */ }
  return [...new Map([...published.filter(c => c.id.startsWith('custom-course-')), ...drafts].map(c => [c.id, { ...c, label: c.label || c.badge }])).values()];
}
export function exportCourseCatalog() {
  const courses = [...published.filter(c => !c.id.startsWith('custom-course-')), ...getCustomCourses().map(c => ({
    ...c, badge: c.label, title: c.title || c.label, duration: c.duration || '6 Weeks', modules: c.modules || '10 Modules',
    features: c.features || ['Expert instruction', 'Practical projects', 'Community support'],
    price: Number(c.price || 11999), originalPrice: Number(c.originalPrice || c.price || 11999), color: c.color || '#7c3aed'
  }))];
  if (courses.some(c => !c.title?.trim() || !Number.isFinite(c.price) || c.price <= 0 || !Number.isSafeInteger(Math.round(c.price * 100)))) throw new Error('Every course needs a title and a valid positive price.');
  const url = URL.createObjectURL(new Blob([JSON.stringify(courses, null, 2) + '\n'], { type: 'application/json' }));
  const link = document.createElement('a'); link.href = url; link.download = 'course-catalog.json'; link.click(); URL.revokeObjectURL(url);
}
