import { GenericQS } from '@/types/QueryString'
export class QueryString {
  static checkIfContainsArray (queryString: GenericQS): string {
    const containsArray = Object.keys(queryString)
      .some(qs => Array.isArray(queryString[qs]))

    if (containsArray) return QueryString.urlSerialize(queryString)
    // @ts-expect-error: dont forget to go back here and fix it
    return new URLSearchParams(queryString).toString()
  }

  static stringify (queryString: GenericQS): string {
    const removeEmpty = Object.entries(queryString).filter(([_, value]) => value)
    return QueryString.checkIfContainsArray(Object.fromEntries(removeEmpty))
  }

  static urlSerialize (queryString: GenericQS): string {
    const objectKeys = Object.keys(queryString)
    let serialized: any[] = []

    objectKeys.map(key => {
      if (Array.isArray(queryString[key])) {
        // @ts-expect-error: dont forget to go back here and fix it
        serialized = [...serialized, ...queryString[key].map(qsValue => [key, qsValue])]
        return
      }
      serialized = [...serialized, [key, queryString[key]]]
    })

    return new URLSearchParams(serialized).toString()
  }
}
