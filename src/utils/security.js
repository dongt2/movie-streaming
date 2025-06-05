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

  // Prevent Ctrl+Shift+I  (View Source)
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault()
    }
    // Prevent Ctrl+Shift+S (Save Page As)
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'S') {
      e.preventDefault()
    }
    // Prevent Ctrl+Shift+J (Console)
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault()
      }
    })
    // Prevent Ctrl+Shift+C (Copy)
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault()
      }
    })
    // Prevent Ctrl+Shift+V (Paste)
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'V') {
        e.preventDefault()
      }
    })
    // Prevent Ctrl+Shift+A (Select All)
    document.addEventListener('keydown', (e) => {   
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault()
      }
    })
    // Prevent Ctrl+Shift+P (Print)
    document.addEventListener('keydown', (e) => {   
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault()
      }
    })
  })

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