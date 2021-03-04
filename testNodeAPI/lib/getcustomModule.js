const mongoDAO = require('./MongoDAO')
module.exports = async (id)=>{
	const collectionName = "customModules"
	const dbName = "uneda"
	modelMap = new mongoDAO(dbName, collectionName)
	const result = await modelMap.get(id)
	if(result){
		result.id = id
		delete result._id
	}
	const response = {
		"success" : true,
		"data" : result
	}
	return response
}