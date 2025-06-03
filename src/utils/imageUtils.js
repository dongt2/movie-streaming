/**
 * Get full image URL from API response
 * @param {string} url - Image URL from API (can be relative or absolute)
 * @returns {string|null} - Full image URL or null if no URL provided
 */
export const getImageUrl = (url) => {
  if (!url) return null
  
  // If URL already has domain, use it as is
  if (url.startsWith('http')) {
    return url
  }
  
  // Add CDN domain for relative URLs from phimapi.com
  return `https://phimimg.com/${url}`
}

/**
 * Get placeholder image URL
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} text - Placeholder text
 * @returns {string} - Placeholder image URL
 */
export const getPlaceholderImage = (width = 300, height = 450, text = '🎬 No Image') => {
  return `https://via.placeholder.com/${width}x${height}/1f2937/9ca3af?text=${encodeURIComponent(text)}`
} 