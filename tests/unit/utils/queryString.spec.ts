import { QueryString } from '@/utils/QueryString'

describe('urlSerialize function', () => {
  describe('When there is an array value inside of object', () => {
    it('return string with key of object as string key', () => {
      const valueOf = { name: ['eder', 'deivid', 'outro', 'nome'] }
      const test = QueryString.stringify(valueOf)
      expect(test).toBe('name=eder&name=deivid&name=outro&name=nome')
    })
  })

  describe('When param is an object', () => {
    it('return string with key of object as string key', () => {
      const valueOf = { name: 'eder', secondName: 'deivid', anotherOne: 'aaaa' }
      const test = QueryString.stringify(valueOf)
      expect(test).toBe('name=eder&secondName=deivid&anotherOne=aaaa')
    })
  })

  describe('When there are some empty field they must to be removed', () => {
    it('get stringified value without empty fieldd', () => {
      const valueOf = { name: 'eder', secondName: 'deivid', anotherOne: '', emptyField: '' }
      const test = QueryString.stringify(valueOf)
      expect(test).toBe('name=eder&secondName=deivid')
    })
  })
})