// Disable console logs in production
const disableConsoleLogs = () => {
  if (process.env.NODE_ENV === 'production') {
    console.log = () => {}
    console.error = () => {}
    console.warn = () => {}
    console.info = () => {}
    console.debug = () => {}
  }
}

// Prevent developer tools access
const preventDevTools = () => {
  // Prevent F12
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
      e.preventDefault()
    }
  })

  // Prevent Ctrl+U (View Source)
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault()
    }
  })

  // Prevent right-click
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
  })

  // Detect DevTools opening
  let devtools = function() {}
  devtools.toString = function() {
    preventDevTools()
    return ''
  }
  console.log('%c', devtools)
}

// Obfuscate API endpoints
const obfuscateApiUrl = (url) => {
  // Add your API obfuscation logic here
  return url
}

export {
  disableConsoleLogs,
  preventDevTools,
  obfuscateApiUrl
} 