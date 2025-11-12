/**
 * Копирует текст в буфер обмена с fallback для небезопасных контекстов (HTTP)
 * @param text - текст для копирования
 * @returns Promise<boolean> - успешно ли скопировано
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  // Метод 1: Clipboard API (работает только в HTTPS или localhost)
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      console.error('Clipboard API failed:', err)
      // Fallback к методу 2
    }
  }

  // Метод 2: Legacy метод с document.execCommand (работает везде)
  try {
    const textArea = document.createElement('textarea')
    textArea.value = text
    
    // Делаем элемент невидимым
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    textArea.setAttribute('readonly', '')
    
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    // Попытка копирования
    const successful = document.execCommand('copy')
    document.body.removeChild(textArea)
    
    return successful
  } catch (err) {
    console.error('Fallback clipboard failed:', err)
    return false
  }
}

/**
 * Проверяет доступность Clipboard API
 * @returns boolean - доступен ли Clipboard API
 */
export const isClipboardAvailable = (): boolean => {
  return !!(navigator.clipboard && window.isSecureContext)
}

