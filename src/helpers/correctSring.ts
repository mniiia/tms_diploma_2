export function correctString (incorrectString:string):string {
  let correctedString = ''
  for (let i = 0; i < incorrectString.length; i++) {
    if (incorrectString[i] === ' ' || incorrectString[i] === '/' || incorrectString[i] === '#' || incorrectString[i] === '\\') {
      continue
    }
    correctedString += incorrectString[i]
  }
  return correctedString
}
