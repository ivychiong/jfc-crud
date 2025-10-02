export const navLinks = [
  { href: "/tasks", label: "Task List" },
  {
    label: "Contacts",
    dropdown: [
      { href: "/people", label: "People" },
      { href: "/businesses", label: "Businesses" },
    ],
  },
  { href: "/tags", label: "Tags" },
  { href: "/categories", label: "Categories" },
  {
    label: "User",
    dropdown: [
      { href: "/profile", label: "Profile" },
      { href: "/logout", label: "Logout" },
    ],
  },
];
