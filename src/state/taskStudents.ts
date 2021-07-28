export const sum = (...nums: number[]): number => {
    return nums.reduce((acc, el) => acc + el)
}

export const getTriangleType = (a: number, b: number, c: number): string => {
    let isTriangle = a + b > c && a + c > b && b + c > a
    if (a === b && c === b) {
        return '10'
    } else if (isTriangle && (a === b || b === c || c === a)) {
        return '01'
    } else if (isTriangle) {
        return '11'
    } else if (!isTriangle) {
        return '00'
    } else {
        return ''
    }
}

export const getSum = (num: number): number => {
    // return Array.from(num.toString()).map(Number).reduce((acc, el) => acc + el)
    return num
        .toString()
        .split('')
        .map(num => +num)
        .reduce((acc, el) => acc + el)
}

export const isEvenIndexSumGreater = (arr: number[]) => {
    let sumEvenIndex = arr.filter((item, i) => i % 2 === 0).reduce((acc, el) => acc + el)
    let sumOddIndex = arr.filter((item, i) => i % 2).reduce((acc, el) => acc + el)
    return sumEvenIndex > sumOddIndex
}
