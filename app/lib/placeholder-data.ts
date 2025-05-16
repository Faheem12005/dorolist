const users = [
  {
    id: '495d6f60-0c08-47fb-83d2-304acf14db66',
  },
];

const projects = [
  {
    id: 'f2b37f88-b713-4ae3-aabc-eacfe0f1c5aa',
    name: 'Build Dashboard',
    created_at: '2024-01-10T09:00:00Z',
    description: 'Internal dashboard for managing user tasks.',
    deadline: '2024-12-01T23:59:59Z',
    user_id: users[0].id,
  },
  {
    id: 'a927bc85-d2c9-466e-9f2f-645b6c94b55b',
    name: 'Marketing Website',
    created_at: '2024-02-15T12:00:00Z',
    description: 'Company homepage and product marketing site.',
    deadline: '2024-10-15T23:59:59Z',
    user_id: users[0].id,
  },
];

const tasks = [
  {
    id: 'c98b1a60-d5a6-4c12-8020-e2a22c7614ff',
    created_at: '2024-03-01T08:30:00Z',
    task: 'Set up Supabase schema',
    duration: 90,
    project_id: projects[0].id,
    completed: true,
  },
  {
    id: '70c28967-2f10-4c96-9152-d021771e2d8f',
    created_at: '2024-03-03T10:00:00Z',
    task: 'Implement auth flow',
    duration: 120,
    project_id: projects[0].id,
    completed: false,
  },
  {
    id: '9f45c0b4-4cb6-4e3b-b8a1-b41e8f6840f6',
    created_at: '2024-03-05T13:15:00Z',
    task: 'Create landing page layout',
    duration: 60,
    project_id: projects[1].id,
    completed: false,
  },
  {
    id: 'e68a1be4-d6be-4f76-bc15-f2d01c69dbe5',
    created_at: '2024-03-06T14:30:00Z',
    task: 'Write SEO metadata',
    duration: 45,
    project_id: projects[1].id,
    completed: true,
  },
];

export { users, projects, tasks };
