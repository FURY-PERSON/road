import { classNames } from "./classNames";

describe('classNames', () => {
  test('only first param', () => {
    expect(classNames('class')).toBe('class')
  })

  test('with additional class', () => {
    expect(classNames('class', {} , ['class2'])).toBe('class class2')
  })

  test('with additional class', () => {
    expect(classNames('class', {} , ['class2', 'class3'])).toBe('class class2 class3')
  })

  test('with mod', () => {
    expect(classNames('class', {class2: true})).toBe('class class2')
  })

  test('with many mods', () => {
    expect(classNames('class', {class3: false, class2: true})).toBe('class class2')
  })

  test('with mods and additional class', () => {
    expect(classNames('class', {class2: true}, ['class3'])).toBe('class class3 class2')
  })
});
