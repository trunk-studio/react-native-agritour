export const RECEIVED_SET_LOCATION = 'RECEIVED_SET_LOCATION';
export const RECEIVED_NEARBY_PLACES = 'RECEIVED_NEARBY_PLACES';

function receivedSetLocation(loc) {
  return {
    type: RECEIVED_SET_LOCATION,
    countryName: loc.countryName,
    locationName: loc.name,
    lon: loc.lon,
    lat: loc.lat,
  };
}

export async function requestSetLocation(position) {
  const searchApi = `http://maps.google.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&language=zh-TW&sensor=true`;
  const location = await fetch(searchApi).then(response => response.json());

  let locationName = '';
  let locationNameAlt = '';
  let country = '';
  for (const i in location.results[0].address_components) {
    if (location.results[0].address_components[i].types[0] === 'administrative_area_level_2') {
      locationName = location.results[0].address_components[i].long_name;
    }
    if (location.results[0].address_components[i].types[0] === 'administrative_area_level_1') {
      locationNameAlt = location.results[0].address_components[i].long_name;
    }
    if (location.results[0].address_components[i].types[0] === 'country') {
      country = location.results[0].address_components[i].short_name;
      break;
    }
  }
  if (locationName === '') locationName = locationNameAlt;

  return (dispatch) => {
    dispatch(receivedSetLocation({
      name: locationName,
      countryName: country,
      lon: position.coords.longitude,
      lat: position.coords.latitude,
    }));
  };
}

function receivedNearByPlaces(_nearbyPlaces) {
  return {
    type: RECEIVED_NEARBY_PLACES,
    _nearbyPlaces,
  };
} // end receivedNearByPlaces

export async function requestNearbyPlaces(position, radius) {
  // google api key for place and placePhoto api.
  const apiKey = '&key=AIzaSyAvh8w7ZCi8wH9ACo784gmSJTc-v0aA3ms';

  // prepare parameters for google `place` api.
  const placeApi = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  const target = `?location=${position.lat},${position.lon}`;
  const range = `&radius=${radius}`;
  const language = '&language=zh-TW';
  const defaultTypes = [
    'amusement_park',
    'lodging',
    'cafe',
    'campground',
    'museum',
    'park',
    'restaurant',
    'food',
  ];
  let types = '&types=';

  // making api's parameter `types` by merge defaultTypes into a single string.
  for (const type of defaultTypes) {
    types += `${type}%7C`;
  }
  types = types.substr(0, types.length - 3);

  // fetch data here
  const apiWithParams = placeApi + target + range + language + types + apiKey;
  const _nearbyPlaces = await fetch(apiWithParams)
                              .then(response => response.json())
                              .catch((e) => console.log('error=>', e));

  // prepare parameters for google `placePhoto` api.
  const placePhotosApi = 'https://maps.googleapis.com/maps/api/place/photo';
  const size = '?maxwidth=100';
  const _nearbyPlacesWithPhotos = _nearbyPlaces.results;

  // merge photo into the result object _nearbyPlacesWithPhotos.
  for (let i = 0; i < _nearbyPlacesWithPhotos.length - 1; i++) {
    try {
      const type = typeof _nearbyPlacesWithPhotos[i].photos === 'object';
      if (type && _nearbyPlacesWithPhotos[i].photos.length > 0) {
        const photoreference =
        `&photoreference=${_nearbyPlacesWithPhotos[i].photos[0].photo_reference}`;
        // fetch data here.
        const placePhotosApiWithParams = placePhotosApi + size + photoreference + apiKey;
        const results = await fetch(placePhotosApiWithParams).then(response => response.url);
        _nearbyPlacesWithPhotos[i].photo = results;
      } else {
        _nearbyPlacesWithPhotos[i].photo = 'https://unsplash.it/80/80/?random';
      }
    } catch (e) {
      console.log('error=>', e);
    }
  }

  return (dispatch) => {
    dispatch(receivedNearByPlaces(_nearbyPlacesWithPhotos));
  };
} // end requestNearByPlaces
