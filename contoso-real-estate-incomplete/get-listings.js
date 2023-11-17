import listings from "./listings.json" assert { type: "json" };

// Return only the first 5 results.
const RESULT_LIMIT = 5;

export default function getListings(city, bedrooms, bathrooms) {
  return listings.filter(listing => {
    const cityMatch = city
      ? listing.city.toLowerCase() === city.toLowerCase()
      : true;

    const bedroomsMatch = bedrooms
      ? listing.bedrooms === bedrooms
      : true;

    const bathroomsMatch = bathrooms
      ? listing.bathrooms === bathrooms
      : true;

    return cityMatch && bedroomsMatch && bathroomsMatch;
  }).slice(0, RESULT_LIMIT);
}
