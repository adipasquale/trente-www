import UUID from 'uuid'

const uuidKey = 'trenteBrowserUUID'

const getBrowserUUID = () => {
  const existingUUID = window.localStorage.getItem(uuidKey)
  if (existingUUID) return existingUUID
  const newUuid = UUID.v4()
  window.localStorage.setItem(uuidKey, newUuid)
  return newUuid
}

const browserUUID = getBrowserUUID()

export default browserUUID
