import math

class Trip:
    """
    A class that converts a list of stops into a DeckGL trips array
    by calculating the time each vertex in a linestring is visited.
    The speed of the trip is determined by an api parameter determined
    on the front end.
    """

    def __init__(self, linestring_feature, m_per_second):
        self.coords = linestring_feature['coordinates']
        self.m_per_second = m_per_second
        self.start_time = 0


    def generate_trip(self):
        # convert to linestring

        time = self.start_time
        timestamps = []

        # loop through the coordinates list
        for i, stop in enumerate(self.coords):
            
            # if this is the first vertex in the linestring
            if i == 0:
                timestamps.append(time)
            else:
                # calculate distance between vertex points and convert to seconds
                # add that to the original time.
                j = i - 1
                origin_coords = self.coords[j]
                destination_coords = stop
                path_length = self._haversine(origin_coords, destination_coords)
                time += int(path_length / self.m_per_second)
                timestamps.append(time)
        
        max_timestamp = max(timestamps)
        
        # return dict that will be returned to the client as a json object
        output = {
            "trip": [{"stops": self.coords, "timestamps": timestamps}],
            "max_timestamp": max_timestamp
        }
        
        return output

    
    def _haversine(self, point_a, point_b):
        """
        Helper method to calculate the ground distance (m)
        between two geographical coordinate pairs 
        
        param: point_a (iterable): coordinate pair of starting point   
        param: point_b (iterable): coordinate pair of destination point
        """

        # earth radius
        radius = 6373.0
        
        lon1, lat1 = [math.radians(coord) for coord in point_a]
        lon2, lat2 = [math.radians(coord) for coord in point_b]

        dlon = lon2 - lon1
        dlat = lat2 - lat1

        a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

        distance_m = (radius * c) * 1000

        return distance_m