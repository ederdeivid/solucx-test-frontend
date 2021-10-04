export type DroneDetails = {
  id: number
  image: string
  name: string
  address: string
  battery: number
  max_speed: number
  average_speed: number
  status: string
  fly: string
}

export type DroneRequestResponse = {
  config: {}
  data: DroneDetails[]
  headers: ResponseHeader
  request: {}
  status: number
  statusText: string
}

export type ResponseHeader = {
  'cache-control': string
  'content-type': string
  expires: string
  link: string
  pragma: string
  'x-total-count'?: string
}

export type RequestParams = {
  _page?: number
  _limit?: number
  _sort?: number
  _order?: string
}

export type ClassesBatteryPercent = {
  10: string
  25: string
  50: string
}

export type AllVooStatus = {
  flying: string
  charging: string
  success: string
  repair: string
  offline: string
  failed: string
}

export type KeyofClassesBattery = keyof ClassesBatteryPercent