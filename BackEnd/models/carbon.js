const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**Create carbon Schema and model */
const CarbonSchema = new Schema({
    regionid: Number,
    dnoregional:String,
    shortName: String,
    intensityForecast: Number,
    intensityIndex:String,
    startDate: Date,
    endDate:Date
})

/**Craete a CArbon model that represents the carbon collection in the DB, then we pass the structure or the 
 * wanted schema for that collection
 */
const Carbon = mongoose.model('carbon', CarbonSchema);
/**Export this model to access it in other files */
module.exports = Carbon;