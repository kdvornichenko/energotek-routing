const getQueryString = (query: object) : string => {
    let queryStr: string = ''
    for (let key in query) {
        if (query[key]) {
            queryStr += key + '=' + query[key] + '&'
        }
    }
    queryStr = queryStr.slice(0, -1)
    return queryStr
}

const getFormattingDate = (date: string, options: { time: boolean }) : string => {
    let result = new Date(date).toLocaleDateString()
    if (options && options.time) {
        result += ' ' + new Date(date).toLocaleTimeString()
    }
    return result
}

const debounce = (func, wait, immediate) => {
    let timeout;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

const getFormattingPrice = (price: number) : string => {
    return price.toLocaleString()
}

const isEqualObjects = (first: object, second: object) : boolean => {
    return Object.keys({ ...first, ...second }).every(key => {
        const firstKey: [] | string | number = first[key]
        const secondKey: [] | string | number = second[key]

        if (Array.isArray(firstKey) && Array.isArray(secondKey)) {
            return firstKey.length === secondKey.length && firstKey.every((value, index) => value === secondKey[index])
        } else {
            return firstKey === secondKey
        }
    })
}

export { getQueryString, getFormattingDate, debounce, getFormattingPrice, isEqualObjects }
