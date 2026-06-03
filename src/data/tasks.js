export const starterTopics = [
  "Browser basics",
  "DOM vs Virtual DOM",
  "SPA vs MPA",
  "Node.js ecosystem",
  "npm/yarn/pnpm",
  "Vite setup",
  "Folder structure",
  "Js basics (Variables,Data types, Scope, String and array operations)",
  "ES6+",
  "Arrow functions",
  "Destructuring",
  "Spread/rest operators",
  "Modules",
  "Array methods",
  "CSS",
  "JSX syntax",
  "Functional components",
  "Props",
  "Component composition",
  "Async/await",
  "Reusable UI",
  "useState",
  "Event handling",
  "Controlled inputs",
  "Conditional rendering",
];

export const statusOptions = ["todo", "in progress", "done"];

export function makeInitialTasks() {
  return starterTopics.map((topic, index) => ({
    id: index + 1,
    key: index + 1,
    name: topic,
    status: index < 8 ? "todo" : index < 17 ? "in progress" : "done",
  }));
}
