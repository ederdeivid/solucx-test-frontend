import axios from 'axios'
import { DroneRequestResponse } from '@/types/DeliveryProgress'
import { GenericQS } from '@/types/QueryString'
import { QueryString } from '@/utils/QueryString'
import { API_URL } from '@/config'

const { stringify } = QueryString

export default class DroneService {
  static async getFilteredDrone (params: GenericQS): Promise<DroneRequestResponse> {
    try {
      const request: DroneRequestResponse = await axios.get(`${API_URL}?${stringify(params)}`)
      return request
    } catch (err) {
      console.error(err)
      throw new Error('Deu ruim')
    }
  }

  static async getDroneById (id: number): Promise<DroneRequestResponse> {
    try {
      const request: DroneRequestResponse = await axios.get(`${API_URL}${id}`)
      return request
    } catch (error) {
      throw new Error('Error - searching drone by id')
    }
  }

  static async getDrones (): Promise<DroneRequestResponse> {
    try {
      const request: DroneRequestResponse = await axios.get(`${API_URL}`)
      return request
    } catch (error) {
      throw new Error('Error - Getting all drones')
    }
  }
}
