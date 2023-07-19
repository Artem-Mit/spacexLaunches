export type Rocket = {
  date_utc: string,
  details?: string,
  id: string,
  links: {
    patch: {
      small: string,
      large: string
    },
    flickr: {
      original: string[]
    }
  },
  name: string,
  success: boolean
};
