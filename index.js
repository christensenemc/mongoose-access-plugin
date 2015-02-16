var defaultAcessible = function(operation,user){
	return {}
}

module.exports = function(schema,acessible){

	var accessible = accessible || defaultAcessible;

	schema.statics.accessibleBy = function(user){
		var Model = this;
		return {
			find:function(query){
				return Model.find({$and:[query,accessible('read',user)]});
			},
			findToUpdate:function(query){
				return Model.find({$and:[query,accessible('update',user)]});
			},
			findOneToDestroy:function(query){
				return Model.find({$and:[query,accessible('update',user)]});
			},
			findOneToUpdate:function(id){
				return Model.findOne({$and:[{_id:id},accessible('update',user)]});
			},
			findOneToDestroy:function(id){
				return Model.findOne({$and:[{_id:id},accessible('destroy',user)]});
			}
		}
	}
}