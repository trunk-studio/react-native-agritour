import {
  RECEIVED_SET_LOCATION,
  RECEIVED_NEARBY_PLACES,
  RECEIVED_NEARBY_PLACE_PHOTOS,
} from '../actions/GeoActions';

export function geo(state = {}, action) {
  switch (action.type) {
    case RECEIVED_SET_LOCATION:
      return {
        ...state,
        countryName: action.countryName,
        locationName: action.locationName,
        lon: action.lon,
        lat: action.lat,
      };
    case RECEIVED_NEARBY_PLACES:
      console.log('action._nearbyPlaces=>', action._nearbyPlaces);
      return {
        ...state,
        _nearbyPlaces: action._nearbyPlaces,
      };
    default:
      return state;
  }
}
