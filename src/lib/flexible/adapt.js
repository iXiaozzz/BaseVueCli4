const MAX_FONT_SIZE = 420

// 定义最大的屏幕宽度
document.addEventListener('DOMContentLoaded', () => {
    const docEl = document.documentElement
    const dpr = window.devicePixelRatio || 1
    docEl.setAttribute('data-dpr', dpr)
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    html.style.fontSize = fontSize + 'px'
})
