from flask import Flask
from flask_restful import Resource, Api
from dotenv import load_dotenv
import os 
import requests
import json

from DeckGLTrips import Trip

app = Flask(__name__)
api = Api(app)

class TripsGenerator(Resource):
    """
    A restful API destinationpoint that facilitates the conversion of 
    mapbox directions api request to DeckGL Trips object
    """

    def get(self, origin, destination, m_per_second):
        """
        :param origin: a comma seperated lon,lat pair describing trip origin
        :param destination: a comma seperated lon,lat pair describing trip destination
        :return: json with a DeckGL trip object
        """
        response = self._use_router(origin=origin, destination=destination)
        
        linestring = response["routes"][0]["geometry"]
        trip = Trip(linestring, m_per_second).generate_trip()

        return trip


    def _use_router(self, origin, destination):
        """
        :param origin: a comma seperated lon,lat pair describing trip origin
        :param destination: a comma seperated lon,lat pair describing trip destination
        :return: Mapbox directions API response
        """
        load_dotenv()
        access_token = os.getenv("ACCESS_KEY")
        url = f"https://api.mapbox.com/directions/v5/mapbox/driving/{origin};{destination}?geometries=geojson&overview=simplified&access_token={access_token}"
        # will build out a better requests / error handling method later
        try:
            response = requests.get(url)
        except (requests.exceptions.ConnectionError, json.decoder.JSONDecodeError):
            response = 'Request Error'
        else:          
            return response.json()


api.add_resource(TripsGenerator, '/trips/origin/<string:origin>/destination/<string:destination>/m_per_second/<int:m_per_second>')


if __name__ == "__main__":
    app.run(debug=True)
