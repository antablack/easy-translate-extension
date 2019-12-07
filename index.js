function buildTranslateUrl(text, lan1 = 'en', lang2 = 'es') {
    text = encodeURIComponent(text)
    return `https://www.deepl.com/en/translator#${lan1}/${lang2}/${text}`
}

let popupButton;
let translateFrame;
let selectText;
let selectRect;

function onSelect(event) {
    const text = getSelectedText()
    if (text.replace(" ", "") == "") {
        removePopupButton(event.target);
        return
    }
    selectText = text
    createPopupButton()
}

function createPopupButton() {
    selectRect = window.getSelection().getRangeAt(0).getBoundingClientRect()
    const { x, y } = getSelectPosition()
    if (popupButton == null) {
        popupButton = document.createElement("div")
        popupButton.innerHTML = "Translate"
        popupButton.style.position = "absolute"
        popupButton.style.background = "#0f2b46"
        popupButton.style.color = "white"
        popupButton.style.padding = "10px"
        popupButton.style.fontFamily = "Arial"
        popupButton.style.borderRadius = "8px"
        popupButton.style.boxShadow = "0px 8px 15px rgba(0, 0, 0, 0.1)"
        popupButton.style.zIndex = 1001
        popupButton.onclick = createFrame
        popupButton.style.cursor = "pointer"
    }
    popupButton.style.left = x + "px"
    popupButton.style.top = (y - 50) + "px"
    document.body.appendChild(popupButton)
}

function removePopupButton(target) {
    if (popupButton != null && popupButton != target) {
        popupButton.parentNode.removeChild(popupButton)
        popupButton = null
    }
    if (translateFrame != null && translateFrame != target ){
        translateFrame.parentNode.removeChild(translateFrame)
        selectText = null
        selectRect = null
    }
}

function getSelectPosition() {
    let position = selectRect
    return { x: position.left, y:  window.pageYOffset + Math.floor(position.y)}
}

function getSelectedText(){
    const selection = window.getSelection();
    return selection.focusNode.textContent.substring(selection.focusOffset, selection.anchorOffset);
}

function createFrame(){
    const { x, y } = getSelectPosition()
    translateFrame = document.createElement("iframe")
    translateFrame.src = buildTranslateUrl(selectText) 
    translateFrame.frameBorder = 0
    translateFrame.style.position = "absolute"
    translateFrame.style.padding = "10px"
    translateFrame.style.left = x + "px"
    translateFrame.style.top = y + "px"
    translateFrame.style.height = "500px"
    translateFrame.style.width = "651px"
    translateFrame.style.zIndex = 1001
    document.body.appendChild(translateFrame)
    removePopupButton(translateFrame)
}

window.addEventListener('mouseup', onSelect);