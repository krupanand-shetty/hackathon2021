const mongoDAO = require('./MongoDAO')
module.exports = async ()=>{
	const collectionName = "customModules"
	const dbName = "uneda"
	modelMap = new mongoDAO(dbName, collectionName)
	const result = await modelMap.query({})
	const response = {
		"success" : true,
		"data" : []
	}
	if(result && result.length){
		for(item of result){
			response.data.push({
				id : item._id,
				name : item.name,
				icon : item.icon
			})
		}
	}
	return response
}