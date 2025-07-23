# Tailwind CSS v4 Configuration Reference

This file contains the working configuration for Tailwind CSS v4 with Vite and React.

## Required Files and Configuration

### 1. package.json (devDependencies)
```json
{
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.11",
    "autoprefixer": "^10.4.21",
    "tailwindcss": "^4.1.11"
  }
}
```

### 2. postcss.config.js
```javascript
export default {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
  }
}
```

### 3. tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
```

### 4. src/index.css (at the top)
```css
@import "tailwindcss";
```

## Common Issues and Solutions

### Issue: "module is not defined in ES module scope"
**Solution**: Use `export default` instead of `module.exports` in PostCSS config

### Issue: Tailwind classes not working/appearing
**Solution**: 
1. Use `'tailwindcss'` not `'@tailwindcss/postcss'` in PostCSS config
2. Use `@import "tailwindcss";` not `@tailwind base/components/utilities;` in CSS
3. Restart dev server after config changes

### Issue: Colors showing in dev tools but not visually applied
**Solution**: Check that PostCSS is processing the CSS correctly and restart the dev server

## Quick Setup Commands
```bash
npm install -D tailwindcss@latest @tailwindcss/postcss@latest autoprefixer@latest
npx tailwindcss init -p
```

Then update the files according to the configurations above.
