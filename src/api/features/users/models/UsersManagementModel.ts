export interface UsersListRequestModel {
  page?: number
  limit?: number
  status?: boolean
  email?: string
}

export interface CreateAdminRequestModel {
  name?: string
  email?: string
  password?: string
  phone?: string
}
