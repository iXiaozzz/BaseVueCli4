/*
    * 参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数
    * decPoint：小数点符号
    * thousands_sep：千分位符号
    * */
export const money = function (number, decimals = 2, decPoint = '.', thousandsSep = ',') {
    number = (number / 100 + '').replace(/[^0-9+-Ee.]/g, '')
    let n = !isFinite(+number) ? 0 : +number
    let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    let sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
    let dec = (typeof decPoint === 'undefined') ? '.' : decPoint
    let s = ''
    let toFixedFix = function (n, prec) {
        let k = Math.pow(10, prec)
        return '' + Math.ceil(n * k) / k
    }

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    let re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, '$1' + sep + '$2')
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
}

/*
    * 参数说明：
    * dateStr 日期字符串
    * isDateTimeFormat 是否是datetime格式的
    * */
export const dateFomat = function (dateStr, isDateTimeFormat = true) {
    let dt = new Date(dateStr)
    let y = dt.getFullYear().toString().padStart(2, '0')
    let m = (dt.getMonth() + 1).toString().padStart(2, '0')
    let d = dt.getDate().toString().padStart(2, '0')
    if (isDateTimeFormat) {
        let hh = dt.getHours().toString().padStart(2, '0')
        let mm = dt.getMinutes().toString().padStart(2, '0')
        let ss = dt.getSeconds().toString().padStart(2, '0')
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    } else {
        return `${y}-${m}-${d}`
    }
}

/**
 * 隐藏手机号码中间四位
 * */
export const hidePhone = (phone, len = 4) => {
    if (!phone) return phone;
    return phone.replace(new RegExp('^(\\d{3}).+(\\d{' + (8 - len) + '})$'), `$1${'*'.repeat(len)}$2`);
}

/**
 * 隐藏姓名第一位以外的,保留三位
 * */
export const hideName = (name) => {
    if (!name) return name;
    return name.replace(/^(.).+/, '$1**');
}

/**
 * 隐藏昵称
 * */
export const hideNickname = (name) => {
    if (!name) return name;
    if (name.length === 1) {
        return name.replace(/^(.)/, "$1**");
    } else if (name.length === 2) {
        return name.replace(/^(.).+/, "$1**");
    } else {
        return name.replace(/^(.).+(.)$/, "$1**$2");
    }
}

/**
 * 隐藏身份证
 * */
export const hideIdCard = (idCard) => {
    if (!idCard) return idCard;
    return idCard.replace(idCard.substr(6, 8), '****');
}

/**
 * 隐藏身份证号
 * */
export const hideIdCard1 = (idCard) => {
    if (!idCard) return idCard;
    return idCard.replace(/^(\w{6})(\w+)(\w{4})$/, '$1********$3')
}