import {getSum, getTriangleType, isEvenIndexSumGreater, sum} from "./taskStudents"

test('get sum', () => {
    expect(sum(3, 5, 7, 6, 4, 9)).toBe(34)
    expect(sum(1, 1, 1, 6)).toBe(9)
})

test('get Triangle Type', () => {
    expect(getTriangleType(1, 1, 1)).toBe('10')
    expect(getTriangleType(2, 3, 3)).toBe('01')
    expect(getTriangleType(4, 5, 3)).toBe('11')
    expect(getTriangleType(10, 2, 2)).toBe('00')
})

test('get Sum', () => {
    expect(getSum(123)).toBe(6)
})

test('is Even Sum Greater', () => {
    expect(isEvenIndexSumGreater([1, 100, 2, 200])).toBe(false)
    expect(isEvenIndexSumGreater([100, 1, 200, 2])).toBe(true)
    expect(isEvenIndexSumGreater([100, 1, 200, 2, 300, 4])).toBe(true)
})
