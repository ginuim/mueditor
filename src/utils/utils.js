// 获取光标起始位置
function getInputSelection (el) {
  var start = 0
  var end = 0
  var normalizedValue
  var range
  var textInputRange
  var len
  var endRange

  if (typeof el.selectionStart === 'number' && typeof el.selectionEnd === 'number') {
    start = el.selectionStart
    end = el.selectionEnd
  } else {
    range = document.selection.createRange()

    if (range && range.parentElement() === el) {
      len = el.value.length
      normalizedValue = el.value.replace(/\r\n/g, '\n')

      // Create a working TextRange that lives only in the input
      textInputRange = el.createTextRange()
      textInputRange.moveToBookmark(range.getBookmark())

      // Check if the start and end of the selection are at the very end
      // of the input, since moveStart/moveEnd doesn't return what we want
      // in those cases
      endRange = el.createTextRange()
      endRange.collapse(false)

      if (textInputRange.compareEndPoints('StartToEnd', endRange) > -1) {
        start = end = len
      } else {
        start = -textInputRange.moveStart('character', -len)
        start += normalizedValue.slice(0, start).split('\n').length - 1

        if (textInputRange.compareEndPoints('EndToEnd', endRange) > -1) {
          end = len
        } else {
          end = -textInputRange.moveEnd('character', -len)
          end += normalizedValue.slice(0, end).split('\n').length - 1
        }
      }
    }
  }

  return {
    start: start,
    end: end
  }
}

// 获取输入框选中块前、光标选中块、选中块后的文字
function getSurroundingSelection (el) {
  var pos = getInputSelection(el)
  return [
    el.value.substring(0, pos.start),
    el.value.substring(pos.start, pos.end),
    el.value.substring(pos.end, el.value.length)
  ]
}

// 在光标处插入指定文本
function insertAtCaret (el, str) {
  if (document.selection) {
    el.focus()
    var sel = document.selection.createRange()
    sel.text = str
    sel.select()
  } else if (typeof el.selectionStart === 'number' && typeof el.selectionEnd === 'number') {
    var startPos = el.selectionStart
    var endPos = el.selectionEnd
    var cursorPos = startPos
    var tmpStr = el.value
    el.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length)
    cursorPos += str.length
    el.selectionStart = el.selectionEnd = cursorPos
  } else {
    el.value += str
  }
  return el.value
}

// 指定光标位置
function setCaretPosition (el, caretPos) {
  el.value = el.value
  // ^ this is used to not only get "focus", but
  // to make sure we don't have it everything -selected-
  // (it causes an issue in chrome, and having it doesn't hurt any other browser)
  if (el !== null) {
    if (el.createTextRange) {
      var range = el.createTextRange()
      range.move('character', caretPos)
      range.select()
      return true
    } else {
      // (el.selectionStart === 0 added for Firefox bug)
      if (el.selectionStart || el.selectionStart === 0) {
        el.focus()
        el.setSelectionRange(caretPos, caretPos)
        return true
      } else { // fail city, fortunately this never happens (as far as I've tested) :)
        el.focus()
        return false
      }
    }
  }
}

export default {
  getInputSelection,
  getSurroundingSelection,
  insertAtCaret,
  setCaretPosition
}
