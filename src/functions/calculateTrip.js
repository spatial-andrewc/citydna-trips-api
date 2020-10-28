export const calculateTrip = (geometry) => {
    
    const COORDS = geometry.coordinates
    const M_PER_SECOND = 40
    
    var timestamps = []
    
    var time = 0
    var j
    for (let i = 0; i < COORDS.length; i++) {
        if (i === 0) {
            timestamps.push(time)
        }
        else {
            j = i - 1
            const origin_coords = COORDS[j]
            const destination_coords = COORDS[i]
            const path_length = haversine(origin_coords, destination_coords)
            time += parseInt(path_length / M_PER_SECOND)
            timestamps.push(time)
        }
    }
    const max_timestamp = Math.max(...timestamps)

    const output = {
        trip : [{stops : COORDS, timestamps}],
        max_timestamp
    }
    return output
}


const haversine = (origin_coords, destination_coords) => {
    const RADIUS = 6373.0

    const [lon1, lat1] = origin_coords.map(coord => toRadians(coord))
    const [lon2, lat2] = destination_coords.map(coord => toRadians(coord))

    const dlon = lon2 - lon1
    const dlat = lat2 - lat1

    const a = Math.sin(dlat / 2)**2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon/2)**2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const distance_m = (RADIUS * c) * 1000

    return distance_m
}

const toRadians = (degrees) => (
    degrees * (Math.PI/180)
)