const { query } = require('express');
const { sql } = require('./connect')

exports.getAllLocations = async () => {
  const query = await sql`select * from locations`;
  if (!query) return false;
  return query;
}

exports.insertLocation = async (locations) => {
  const locationsMapped = locations.map((l) => ({
    ...l,
    workingHours: l.workingHours || '',
    additionalAddressDetails: l.addressDetails,
  }))

  
    const query = await sql`insert into locations ${sql(
      locationsMapped,
      'name',
      'phone',
      'address',
      'additionalAddressDetails',
      'workingHours',
      'latitude',
      'longitude',
      'cityId',
      'districtId',
      'typeId',
      'code',
      'subTypeId',
    )}`
    if (!query) return false;
    return query;
   
  
}

exports.updateLocation = async (locationId, location) => {
  const keys = Object.keys(location)
  if (!keys.length) {
    return false
  }

  const query = await sql`update locations set ${sql(location, ...keys)}
    where id = ${locationId}`
  if (!query) return false;
  return query;
}

exports.deleteLocation = async (locationId) => {
  
    const query = await sql`delete from locations where id = ${locationId}`
    if(!query) return false;
    return query;
  }

exports.getAllTypes = async () => {
  
  const query = sql`select * from types`;
  if (!query) return false;
  return query;
  
};

exports.insertType = async (type) => {
  
    const query = sql`insert into types ${sql(
      type,
      'name'
      )}`;
    if (!query) return false;
    return query;
 
};

exports.updateType = async (typeId, type) => {

    const typeKeys = Object.keys(type);

    const query = sql`update types set ${sql(type, ...typeKeys)} where id = ${typeId}`;
    if (!query) return false;
    return query;
  
  
};

exports.deleteType = async (typeId) => {

    const query = sql`delete from types where id = ${typeId}`;
    if (!query) return false;
    return query;
 
};