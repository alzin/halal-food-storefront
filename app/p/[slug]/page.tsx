import { products } from "../../_data/mock";
import { ProductDetailClient } from "./ProductDetailClient";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
