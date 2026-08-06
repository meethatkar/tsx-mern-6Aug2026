const preloadedUrls = new Set<string>();

/**
 * Preloads a single image and caches the URL to avoid duplicate requests.
 */
export const preloadImage = (url: string): Promise<void> => {
  if (preloadedUrls.has(url)) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      preloadedUrls.add(url);
      resolve();
    };
    img.onerror = () => {
      // Resolve anyway so errors don't block the rest of the queue
      resolve();
    };
    img.src = url;
  });
};

/**
 * Preloads an array of image URLs in small chunks with a delay to prevent
 * network congestion and thread blocking.
 */
export const preloadImagesInChunks = async (
  urls: string[],
  chunkSize = 3,
  delayMs = 800
): Promise<void> => {
  for (let i = 0; i < urls.length; i += chunkSize) {
    const chunk = urls.slice(i, i + chunkSize);
    // Fetch chunk concurrently
    await Promise.all(chunk.map((url) => preloadImage(url)));
    
    // Add delay between chunks if we have more to load
    if (i + chunkSize < urls.length) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
};
