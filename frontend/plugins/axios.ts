// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ app, $axios }, inject) => {
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  })
  inject('api', api)

  const external = $axios.create({
    headers: {
      common: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        cookie: ''
      }
    }
  })
  inject('externalAxios', external)
}
