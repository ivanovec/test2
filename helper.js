
module.exports.prepareJsonToQuery = function(json){
	var ids = "(";
	for(key in json){
		ids+=key+',';
	}
	return ids.substr(0, ids.length-1)+')';
}