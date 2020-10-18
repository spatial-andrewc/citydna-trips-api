from shapely.geometry import LineString, Point
from shapely.ops import transform
import pyproj


class Trip:
    """
    A class that converts a list of stops into a DeckGL trips array
    """
    
    geographic_crs = 'epsg:4326'
    projected_crs = 'epsg:28355'

    def __init__(self, linestring_feature, m_per_second):
        self.linestring_feature = linestring_feature
        self.coords = linestring_feature['coordinates']
        self.m_per_second = m_per_second
        self.start_time = 0


    def generate_trip(self):
        # convert to linestring
        shapely_linestring = LineString(self.coords)
        
        reprojector = pyproj.Transformer.from_proj(pyproj.Proj(Trip.geographic_crs), pyproj.Proj(Trip.projected_crs), always_xy=True)

        shapely_linestring_projected = transform(reprojector.transform, shapely_linestring)

        coordinates_projected = [list(coord_pair) for coord_pair in list(shapely_linestring_projected.coords)]

        timestamps = self._get_stop_times(coordinates_projected)
        
        max_timestamp = max(timestamps)

        output = {
            "trip": [{"stops": self.coords, "timestamps": timestamps}],
            "max_timestamp": max_timestamp
        }
        
        return output
    
    
    def _get_stop_times(self, projected_coords):
        
        time = self.start_time
        time_list = []

        for i, stop in enumerate(projected_coords):

            if i == 0:
                time_list.append(time)
            else:
                j = i - 1
                start_coords = projected_coords[j] 
                end_coords = stop
                path_length = Point(start_coords).distance(Point(end_coords))
                time += int(path_length / self.m_per_second)
                time_list.append(time)
        
        return time_list