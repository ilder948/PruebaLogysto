require('dotenv').config()

const config = {
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 3000,
  POSTGRES_HOST: process.env.POSTGRES_HOST || "ec2-54-156-151-232.compute-1.amazonaws.com",
  POSTGRES_PORT: process.env.POSTGRES_PORT || 5432,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE || "d9ubo4atrnbsb2",
  POSTGRES_USER: process.env.POSTGRES_USER || "efxopeprczwqcc",
  POSTGRES_PASS:process.env.POSTGRES_PASS || "a0090c98a88c57587c6e28549bc863dead36151a392e7e0d5a9534c06314065b",
  JWT_TOKEN: process.env.JWT_TOKEN || "hYlKTJfvN1BlupmSDA263f4FaYeyMIgmq0rhNphgred2JFEXmEmWmaGPf4m757cxBtPEfVWiSCJRDMWw",
  URL_TOMTOM: process.env.URL_TOMTOM || "https://api.tomtom.com/search/2/geocode/result.json",
  API_KEY_TOMTOM: process.env.API_KEY_TOMTOM || "3KzKSprEnrsZayIG4G4QmsE3vtH16kja",
  API_KEY_HERE: process.env.API_KEY_HERE || "JTooafbmENrHnfbx5HSQDk5I5-79cd2Y7ze042p3cus",
  URL_HERE_MAPS: process.env.URL_HERE_MAPS || "https://geocode.search.hereapi.com/v1/geocode",
};

module.exports = config;
