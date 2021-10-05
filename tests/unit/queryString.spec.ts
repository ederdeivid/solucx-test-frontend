import { QueryString } from '@/utils/QueryString'

describe('urlSerialize function', () => {
  describe('When there is an array value inside of object', () => {
    it('return string with key of object as string key', () => {
      const valueOf = { name: ['eder', 'deivid', 'outro', 'nome'] }
      const test = QueryString.urlSerialize(valueOf)
      expect(test).toBe('name=eder&name=deivid&name=outro&name=nome')
    })
  })
})