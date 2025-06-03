import axios from 'axios'

const API_BASE_URL = 'https://phimapi.com'

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making API request to: ${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export const movieApi = {
  // Home - Get latest movies
  getHomeMovies: async (page = 1) => {
    try {
      const response = await apiClient.get(`/danh-sach/phim-moi-cap-nhat-v3?page=${page}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch home movies: ${error.message}`)
    }
  },

  // Get hot/trending movies
  getHotMovies: async () => {
    try {
      const currentYear = new Date().getFullYear()
      const queryParams = new URLSearchParams({
        keyword: 'phim',
        page: 1,
        sort_field: 'modified.time',
        sort_type: 'desc',
        year: currentYear,
        limit: 12
      })

      const response = await apiClient.get(`/v1/api/tim-kiem?${queryParams}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch hot movies: ${error.message}`)
    }
  },

  // Get single movies (phim lẻ)
  getSingleMovies: async () => {
    try {
      const queryParams = new URLSearchParams({
        keyword: 'phim',
        page: 1,
        sort_field: 'modified.time',
        sort_type: 'desc',
        limit: 50 // Get more to filter better
      })

      const response = await apiClient.get(`/v1/api/tim-kiem?${queryParams}`)
      
      // Filter only single movies with more precise patterns
      if (response.data?.items) {
        const allMovies = response.data.items
        
        // Primary filter - strict single movie criteria
        let singleMovies = allMovies.filter(movie => {
          const episodeCurrent = movie.episode_current || ''
          
          return (
            // Type-based filtering
            movie.type === 'single' || 
            movie.type === 'movie' ||
            // Episode patterns for single movies
            episodeCurrent === 'Full' ||
            episodeCurrent === 'HD' ||
            episodeCurrent === 'Trailer' ||
            /^(Full|HD|Trailer)$/i.test(episodeCurrent)
          )
        })
        
        // Fallback filter if not enough single movies found
        if (singleMovies.length < 6) {
          const fallbackMovies = allMovies.filter(movie => {
            const episodeCurrent = movie.episode_current || ''
            
            return (
              // Avoid obvious series patterns but include ambiguous ones
              !episodeCurrent.includes('Tập') && 
              !episodeCurrent.includes('Hoàn Tất') && 
              !episodeCurrent.includes('Phần') &&
              !episodeCurrent.includes('Season') &&
              !/\d+\/\d+/.test(episodeCurrent) &&
              movie.type !== 'series' &&
              // Include movies that might be single
              !/phút\/tập/i.test(movie.time || '')
            )
          })
          
          // Combine and deduplicate
          const combined = [...singleMovies, ...fallbackMovies]
          const unique = combined.filter((movie, index, arr) => 
            arr.findIndex(m => m._id === movie._id) === index
          )
          singleMovies = unique
        }
        
        return {
          ...response.data,
          items: singleMovies.slice(0, 12) // Get first 12 single movies
        }
      }
      
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch single movies: ${error.message}`)
    }
  },

  // Get series movies (phim bộ)  
  getSeriesMovies: async () => {
    try {
      const queryParams = new URLSearchParams({
        keyword: 'phim',
        page: 1,
        sort_field: 'modified.time',
        sort_type: 'desc',
        limit: 30 // Get enough for filtering
      })

      const response = await apiClient.get(`/v1/api/tim-kiem?${queryParams}`)
      
      // Filter only series with clearer patterns
      if (response.data?.items) {
        const seriesMovies = response.data.items.filter(movie => {
          const episodeCurrent = movie.episode_current || ''
          
          return (
            // Type-based filtering
            movie.type === 'series' ||
            movie.type === 'tv' ||
            // Episode patterns for series
            episodeCurrent.includes('Tập') ||
            episodeCurrent.includes('Hoàn Tất') ||
            episodeCurrent.includes('Phần') ||
            episodeCurrent.includes('Season') ||
            episodeCurrent.includes('Episode') ||
            /\d+\/\d+/.test(episodeCurrent) ||
            /tập|hoàn tất|phần|season|episode/i.test(episodeCurrent) ||
            // Time patterns indicating series (per episode)
            /phút\/tập|min\/ep/i.test(movie.time || '')
          )
        })
        
        return {
          ...response.data,
          items: seriesMovies.slice(0, 12) // Get first 12 series
        }
      }
      
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch series movies: ${error.message}`)
    }
  },

  // Movie detail & episodes
  getMovieDetail: async (slug) => {
    try {
      const response = await apiClient.get(`/phim/${slug}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch movie detail: ${error.message}`)
    }
  },

  // Search movies
  searchMovies: async (params = {}) => {
    try {
      const {
        keyword = '',
        page = 1,
        sort_field = 'modified.time',
        sort_type = 'desc',
        sort_lang = '',
        category = '',
        country = '',
        year = '',
        limit = 24
      } = params

      const queryParams = new URLSearchParams({
        keyword,
        page,
        sort_field,
        sort_type,
        ...(sort_lang && { sort_lang }),
        ...(category && { category }),
        ...(country && { country }),
        ...(year && { year }),
        limit
      })

      const response = await apiClient.get(`/v1/api/tim-kiem?${queryParams}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to search movies: ${error.message}`)
    }
  },

  // Get search suggestions
  getSuggestions: async (keyword) => {
    try {
      const queryParams = new URLSearchParams({
        keyword,
        page: 1,
        sort_field: 'modified.time',
        sort_type: 'desc',
        limit: 8 // Small limit for suggestions
      })

      const response = await apiClient.get(`/v1/api/tim-kiem?${queryParams}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch suggestions: ${error.message}`)
    }
  },

  // Get categories
  getCategories: async () => {
    try {
      const response = await apiClient.get('/the-loai')
      // API returns array directly, not wrapped in data object
      return {
        status: true,
        data: {
          items: response.data // response.data is already the array
        }
      }
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`)
    }
  },

  // Get countries
  getCountries: async () => {
    try {
      const response = await apiClient.get('/quoc-gia')
      // API returns array in "value" property directly
      return {
        status: true,
        data: {
          items: response.data.value || response.data // Handle both possible formats
        }
      }
    } catch (error) {
      throw new Error(`Failed to fetch countries: ${error.message}`)
    }
  },

  // Get category detail
  getCategoryDetail: async (type_list, params = {}) => {
    try {
      const {
        page = 1,
        sort_field = 'modified.time',
        sort_type = 'desc',
        sort_lang = '',
        country = '',
        year = '',
        limit = 24
      } = params

      const queryParams = new URLSearchParams({
        page,
        sort_field,
        sort_type,
        ...(sort_lang && { sort_lang }),
        ...(country && { country }),
        ...(year && { year }),
        limit
      })

      const response = await apiClient.get(`/v1/api/the-loai/${type_list}?${queryParams}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch category detail: ${error.message}`)
    }
  }
}

export default movieApi 