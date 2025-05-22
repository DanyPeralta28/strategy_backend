export interface IMySQLConfiguration {
  host: string,
  port: number,
  username: string,
  password: string,
  database: string,
}

export interface IEnvConfiguration {
  port: number,
  host_api: string,
  api_prefix: string,
  default_limit: number,
  default_offset: number,
  env: string,
  file_log: string,
  NAME: string,
  clientsRepository: IMySQLConfiguration
}
