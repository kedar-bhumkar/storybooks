# Dynamic Image Gallery

This project implements a dynamic image gallery using jQuery and the Slick carousel library. It's designed to display images and associated information based on a specified chapter parameter.

## Features

- Dynamic loading of image data from JSON files
- Responsive image gallery with thumbnails and main image display
- Accessible carousel navigation
- Chapter-specific content loading

## Setup

In each chapter subdirectory, include:
   - A `mapping.json` file with image data
   - An `images` folder containing thumbnail and main images
   - Run using a local server like `http-server` and open landing.html or story.html in browser

## Usage
1. Load the page with a `ch` parameter in the URL to specify the chapter (e.g., `?ch=mdsg`).
2. If no `ch` parameter is provided, it defaults to "test".

## File Structure
roject_root/
│
├── templates/
│ └── template1/
│ └── landing.js
│
└── metadata/
└── [chapter_name]/
├── mapping.json
└── images/
├── thumbnail1.jpg
├── main1.jpg
└── ...

## `mapping.json` Structure

The `mapping.json` file should have the following structure:

```
{
  "title": "Gallery Title",
  "data": [
    {
      "thumb_img": "thumbnail1.jpg",
      "main_img": "main1.jpg",
      "info": "Information about image 1"
    },
    // ... more image objects
  ]
}

```

## Accessibility

- The gallery is designed with accessibility in mind, using ARIA attributes and providing instructions for screen readers.
- Keyboard navigation is supported for both thumbnail and main image carousels.

## Dependencies

- jQuery
- Slick Carousel

## Notes

- Ensure all image paths in `mapping.json` are relative to the `images/` folder within each chapter's metadata directory.
- The script includes console logging for debugging purposes. These can be removed in production.

## Future Improvements

- Error handling for missing images or invalid JSON data
- Lazy loading for improved performance with large galleries
- Responsive design improvements for various screen sizes
