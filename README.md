## Usage

```javascript
var access = require('mongoose-access-plugin');

Model.plugin(access,function(operation,user){
  if(user.role === "superadmin") return {}
  if(user.role === "admin") return {company:user.company} 
  if(user.role === "user" && operation === "read") return {company:user.company}
  return {creator:user._id}
});

Model.accessibleBy(req.user).find({priority:{$gte:3}}).exec(function(err,models){
  //DO SOMETHING WITH YOUR MODELS HERE
});

Model.accessibleBy(req.user).findOneToUpdate(req.param.modelId).exec(function(err,model){
  //UPDATE YOUR MODEL
});

Model.accessibleBy(req.user).findOneToDestroy(req.param.modelId).exec(function(err,model){
  //DESTROY YOUR MODEL
});
```
