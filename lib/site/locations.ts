export type MapLocation = {
  id: string
  name: string
  lat: number
  lng: number
}

export const FOODJUTTERS_LOCATION: MapLocation = {
  id: 'foodjutters',
  name: 'FoodJutters',
  lat: 51.339419208004,
  lng: 3.8298185221843197,
}

export const PARKING_LOCATIONS: MapLocation[] = [
  {
    id: 'scheldekade',
    name: 'Parkeerplaats Scheldekade',
    lat: 51.33855714572537,
    lng: 3.8295377809528617,
  },
  {
    id: 'oostkolk',
    name: 'Parkeergarage Oostkolk',
    lat: 51.33740907248687,
    lng: 3.829956626486897,
  },
  {
    id: 'theaterplein',
    name: 'Parkeergarage Theaterplein',
    lat: 51.33954151932252,
    lng: 3.8234409413623194,
  },
]

export function googleMapsEmbedUrl(location: MapLocation, zoom = 17): string {
  const { lat, lng } = location
  return `https://maps.google.com/maps?q=${lat},${lng}&hl=nl&z=${zoom}&output=embed`
}

export function googleMapsLink(location: MapLocation): string {
  const { lat, lng } = location
  return `https://www.google.com/maps?q=${lat},${lng}`
}
