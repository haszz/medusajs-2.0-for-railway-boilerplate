# Background Image for Flower Bricks Hero Section

## How to Add Your Custom Background Image

1. Place your background image in this directory (public/images/)
2. Recommended image dimensions: at least 1920x1080px for good quality on all screens
3. Update the Hero component to use your image by uncommenting and modifying the Image component in `src/modules/home/components/hero/index.tsx`:

```tsx
<Image 
  src="/images/your-background-image.jpg" // <- Replace with your actual image filename
  alt="Flower Bricks"
  fill
  style={{ objectFit: "cover" }}
  priority
  quality={90}
/>
```

4. Remove the placeholder gradient div once you've added your image:

```tsx
{/* Remove this placeholder gradient after adding your image */}
<div className="absolute inset-0 bg-gradient-to-b from-green-100 to-amber-50"></div>
```

## Background Image Tips

- Choose an image that provides good contrast with the text overlay
- If your background image makes text hard to read, you can increase the opacity of the dark overlay:
  ```tsx
  {/* Increase opacity value (0.10) for darker overlay */}
  <div className="absolute inset-0 bg-black opacity-10 z-5"></div>
  ```
- For best performance, optimize your image before adding it to the project 