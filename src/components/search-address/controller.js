const service = require("../../services/searchplaces");
const searchCtrl = {};

searchCtrl.search = async (req, res) => {
  let data;
  try {
    const { streetName, streetNumber, number, city, country } = req.query;
    const query = `${streetName} ${streetNumber} # ${number} ${city} ${country}`;
    const searchTomtom = await service.searchAddressTomtom(query);
    const searchHere = await service.searchAddressHere(query);
    const addressValidateTomTom = validateAddressTomtom(
      searchTomtom.results,
      req.query
    );
    const addressValidateHere = validateAddressHere(searchHere, req.query);
    if (addressValidateTomTom) {
      data = {
        address: addressValidateTomTom.address.freeformAddress,
        location: addressValidateTomTom.position,
      };
    } else if (addressValidateHere) {
      data = {
        address: addressValidateHere.address.label,
        location: addressValidateHere.position,
      };
    } else {
      data = "Address not found";
    }
    res.json({
      code: 200,
      status: "Ok",
      data,
    });
  } catch (error) {
    res.json({
      code: 403,
      status: "Error",
    });
  }
};

const validateAddressTomtom = (addressTomTom, addressUser) => {
  try {
    const addressNumber = addressUser.number
      .toUpperCase()
      .split(" ")
      .join("")
      .trim();
    for (let location of addressTomTom) {
      if (location.address.streetNumber === addressUser.number) {
        return location;
      } else {
        return 0;
      }
    }
  } catch (error) {
    return 0;
  }
};

const validateAddressHere = (addressHere, addressUser) => {
  try {
    for (let location of addressHere.items) {
      const dataAddress = location.address.street.split(" ");
      const number = `${dataAddress.pop()}-${location.address.houseNumber}`;
      const numberUser = addressUser.number
        .toUpperCase()
        .split(" ")
        .join("")
        .trim();
      if (number === numberUser) {
        return location;
      } else {
        return 0;
      }
    }
  } catch (error) {
    return 0;
  }
};

module.exports = searchCtrl;
