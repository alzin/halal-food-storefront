import { Suspense } from "react";
import { categories } from "../../_data/mock";
import { CategoryClient } from "./CategoryClient";

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage() {
  return (
    <Suspense fallback={null}>
      <CategoryClient />
    </Suspense>
  );
}
