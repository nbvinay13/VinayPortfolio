import type { Project } from '../../data/portfolio.data';

/** Case-insensitive match across title, role, problem, and stack. */
export function filterProjects(items: Project[], query: string): Project[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return items;
  }
  return items.filter((project) => {
    const haystack = [
      project.title,
      project.role,
      project.problem,
      ...project.stack,
      ...project.achievements,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function matchesQuery(text: string, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) {
    return true;
  }
  return text.toLowerCase().includes(q);
}
