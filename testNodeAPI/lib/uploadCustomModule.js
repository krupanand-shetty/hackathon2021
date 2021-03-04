const mongoDAO = require('./MongoDAO')
module.exports = async (id,body)=>{
	const collectionName = "customModules"
	const dbName = "uneda"
	modelMap = new mongoDAO(dbName, collectionName)
	body._id = id
	const result = await modelMap.save(body)
	if(result)
		return true
	else
		return false
}