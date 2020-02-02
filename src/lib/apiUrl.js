const apiUrl =
process.env.NODE_ENV === 'production'
  ? 'https://api.trente.dipasquale.fr/v1' : 'http://localhost:3001/v1'

export default apiUrl
