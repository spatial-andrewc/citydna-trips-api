# CityDNA Trips 

This project is built on the City of Melbourne's mapping component library [@citydna/maps](https://www.npmjs.com/package/@citydna/maps).

---

## Overview 

This project intended to explore the union of a Python backend api using Flask-RESTful and a React frontend to query a Mapbox driving route and render the result using Deck GL's Trip layer.

The repository now contains two React hooks. One that taps into the Flask-RESTful api and the other that uses javascript's fetch API. Both hooks use the same algorithm to create a consumable object for Deck GL's Trip layer which is a smart and simple implementation of Haversine formula.

---

## Flask-RESTful api implementation

**important:** Add a REACT_APP_MAPBOX_DIRECTIONS_TOKEN into your .env file in the root directory to provide authentication to the Mapbox directions API.

This custom api queries the [mapbox directions api](https://docs.mapbox.com/api/navigation/#directions) and prepares the json response into a consumable object for the Trip layer.

---

### Usage

Using Python's virtualenv or conda, create a virtual environment for the api to use. Install the virtualenv in the api directory of the project and name it 'venv'. Then, install the following dependency:

- ```pip install flask-restful```

From the command line, type ```yarn start-api``` to activate the api. React will then be able to communicate with the api on the same port.
