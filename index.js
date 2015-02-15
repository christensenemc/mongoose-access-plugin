var defaultAcessible = function(operation,user){
	return {}
}

module.exports = function(schema,acessible){

	var accessible = accessible || defaultAcessible;

	schema.statics.accessibleBy = function(user){
		var Model = this;
		return {
			find:function(query,fields,options,callback){
				return Model.find({$and:[query,accessible('read',user)]});
			},
			findToUpdate:function(id){
				return Model.find({$and:[{_id:id},accessible('update',user)]});
			},
			findToDestroy:function(id){
				return Model.find({$and:[{_id:id},accessible('destroy',user)]});
			}
		}
	}
}