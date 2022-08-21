export function abridgeMessage(message?: string, charCount: number = 100) {
  if (!message) return message;
  return `${message.substring(0, charCount)}...`;
}
