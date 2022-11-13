
export default () => document.addEventListener('DOMContentLoaded', () => {
  const phoneInputs = document.querySelectorAll('input[type="tel"]')

  //! Вырезаем из поля ввода буквы, пробелы и возвращаем только цифры
  const getInputNumbersValue = (input) => input.value.replace(/\D/g, '')

  //! Запрещаем вставлять буквы
  const onPhonePaste = (event) => {
    const input = event.target
    const inputNumbersValue = getInputNumbersValue(input)
    const pasted = event.clipboardData || window.clipboardData

    if (pasted) {
      const pastedText = pasted.getData('Text')

      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue
        return
      }
    }
  }

  const onPhoneInput = function (event) {
    const input = event.target
    let formattedInputValue = ''
    let inputNumbersValue = getInputNumbersValue(input)
    let selectionStart = input.selectionStart

    if (!inputNumbersValue) {
      return input.value = ''
    }

    if (input.value.length != selectionStart) {
      if (event.data && /\D/g.test(event.data)) {
        input.value = inputNumbersValue
      }
      return
    }

    if (['8'].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == '8') {
        formattedInputValue = '8'
      }
      if (inputNumbersValue.length > 1) {
        formattedInputValue += inputNumbersValue.substring(1, 2) + ' ('
      }
      if (inputNumbersValue.length >= 3) {
        formattedInputValue += inputNumbersValue.substring(2, 4)
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7)
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9)
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11)
      }
    } else {
      //! Not Belarus phone Number
      formattedInputValue = '+' + inputNumbersValue.substring(0, 12)
    }

    input.value = formattedInputValue
  }

  //! Очищаем поле после удаления последнего символа
  const onPhoneKeyDown = (event) => {
    const inputValue = event.target.value.replace(/\D/g, '')

    if (event.keyCode == 8 && inputValue.length == 1) {
      event.target.value = ''
    }
  }

  phoneInputs.forEach((input) => {
    input.addEventListener('keydown', onPhoneKeyDown)
    input.addEventListener('input', onPhoneInput, false)
    input.addEventListener('paste', onPhonePaste, false)
  })
}) 