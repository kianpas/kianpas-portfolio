import Link from "next/link";
import { getAllCategories } from "@/services/posts";

const CategoryNav = ({ activeCategory }: { activeCategory?: string }) => {
  const items = [
    { label: "전체", href: "/blog", active: activeCategory === undefined },
    ...getAllCategories().map((category) => ({
      label: category,
      href: `/blog/category/${encodeURIComponent(category)}`,
      active: activeCategory === category,
    })),
  ];

  return (
    <nav aria-label="글 주제" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={item.active ? "page" : undefined}
          className={`border-b-2 py-3 transition-colors ${
            item.active
              ? "border-orange-600 font-semibold text-orange-600 dark:border-orange-400 dark:text-orange-400"
              : "border-transparent text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default CategoryNav;
