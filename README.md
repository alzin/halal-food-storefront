# Halal Food Storefront

A polished demo storefront for halal groceries in Japan, built with Next.js, React, TypeScript, and Tailwind CSS.

Live site: https://alzin.github.io/halal-food-storefront/

## Features

- Category, product, checkout, account, orders, addresses, wishlist, and notification pages
- Mock product, order, address, and delivery-slot data
- Responsive storefront UI with cart interactions
- Static export configured for GitHub Pages

## Getting Started

Install dependencies:

```bash
npm ci
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Deployment

This project deploys to GitHub Pages with the workflow in `.github/workflows/deploy-pages.yml`.

For local production checks:

```bash
npm run build
```

The static site is exported to `out/`.

## Contributing

Contributions are welcome. Please open an issue or pull request with a clear description of the change.

## License

This project is open source under the [MIT License](LICENSE).
