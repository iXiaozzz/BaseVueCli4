/* eslint-disable */
/**
 * 是否是苹果系统
 * */
export const isIOS = function () {
    return /ip(hone|od|ad)/i.test(navigator.userAgent);
}
/**
 * 是否是安卓系统
 * */
export const isAndroid = function () {
    let agent = (navigator.userAgent || navigator.vendor || window.opera);
    let agnetName = agent.toLowerCase();
    return /android/i.test(agnetName);
}
/**
 * 判断是否为微信浏览器
 * */
export const isWeixin = function () {
    return navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
}
/**
 *判断是否为QQ浏览器
 */
export const isQQ = function () {
    return navigator.userAgent.toLowerCase().match(/QQ/i) == "qq"
}
/**
 *判断是否是钉钉
 */
export const isDingDing = function () {
    // 判断是不是钉钉
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("dingtalk") >= 0;
}
/**
 * 手机码验证
 * */
export const isphone = function (phone) {
    const reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    return reg.test(phone);
}

/**
 * 电话号码验证
 * */
export const isTel = function (tel) {
    const reg = /^([0\+]\d{2,3}-)?(\d{3,4}-)?\d{7,8}(-(\d{1,}))?$/;
    return reg.test(tel);
}

// 邮箱验证
export const isEmail = function (email) {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return reg.test(email);
}

// 身份证号码验证
export const isIDCard = function (isIDCard) {
    const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
    return reg.test(isIDCard);
};

// 香港身份证号码验证
export const isIDCardHk = function (isIDCard) {
    const reg = /[A-Z]{1,2}[0-9]{6}([0-9A])/;
    return reg.test(isIDCard);
};

// 澳门身份证号码验证
export const isIDCardMc = function (isIDCard) {
    const reg = /^[1|5|7][0-9]{6}\([0-9Aa]\)/;
    return reg.test(isIDCard);
};

// 台湾身份证号码验证
export const isIDCardTw = function (isIDCard) {
    const reg = /[A-Z][0-9]{9}/;
    return reg.test(isIDCard);
};


// 过滤emoji表情
export const filterEmoji = function (val) {
    const reg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
    return val.replace(reg, '');
}

// 获取屏幕宽度
export const getWindowWidth = function () {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}
export const getWindowHeight = function () {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}
// 延时函数
export const sleep = (wait) => new Promise((resolve) => setTimeout(resolve, wait))


export const debounce = function (func, wait = 50, immediate = false) {
    let timer, context, args
    const later = () => setTimeout(() => {
        timer = null
        if (!immediate) {
            func.apply(context, args)
            context = args = null
        }
    }, wait)
    return function (...params) {
        // 如果没有创建延迟执行函数（later），就创建一个
        if (!timer) {
            timer = later()
            // 如果是立即执行，调用函数
            // 否则缓存参数和调用上下文
            if (immediate) {
                func.apply(this, params)
            } else {
                context = this
                args = params
            }
            // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
            // 这样做延迟函数会重新计时
        } else {
            clearTimeout(timer)
            timer = later()
        }
    }
}
// 节流函数
export const throttle = function (func, wait = 50) {
    // 上一次执行 fn 的时间
    let previous = 0
    // 将 throttle 处理结果当作函数返回
    return function (...args) {
        // 获取当前时间，转换成时间戳，单位毫秒
        let now = +new Date()
        // 将当前时间和上一次执行函数的时间进行对比
        // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
        if (now - previous > wait) {
            previous = now
            func.apply(this, args)
        }
    }
}

export const errorCaptured = async function (asyncFunc) {
    try {
        let res = await asyncFunc()
        return [null, res]
    } catch (e) {
        return [e, null]
    }
}
// 用于事件代理 获取需要代理的元素
export const getParentElement = function (element, className) {
    let returnParentElement = null

    function isElement(el) {
        return el != null ? el.nodeType === 1 : false
    }

    function getParentNode(element, className) {
        if (isElement(element)) {
            if (
                element &&
                element.classList.contains(className) &&
                element.tagName.toLowerCase() != 'body'
            ) {
                returnParentElement = element
            } else {
                getParentNode(element.parentElement, className)
            }
        }
    }
    getParentNode(element, className)
    return returnParentElement
}

// 生成不重复的key
export const createUniqueKey = function (n = 12) {
    const str = "abcdefghijklmnopqrstuvwxyz0123456789"; // 可以作为常量放到random外面
    let result = "";
    for (const i = 0; i < n; i++) {
        result += str[parseInt(Math.random() * str.length)];
    }
    return result;
}
// 给需要添加key的对象数组添加唯一key
export const addUniqueKey = function (data) {
    if (!Array.isArray(data)) throw new Error('请传入数组')
    if (!data.length) return []
    return data.map(item => {
        item.uniqueKey = createUniqueKey(12)
        return item
    })
}
