// Measure the difference between two points on a sphere.
// Thanks to:
// https://en.wikipedia.org/wiki/Haversine_formula
// https://stackoverflow.com/questions/639695/how-to-convert-latitude-or-longitude-to-meters
export function distance(lat1, lon1, lat2, lon2): number {
  var R = 6378.137 // Radius of earth in KM
  var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180
  var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  return d * 1000 // meters
}
