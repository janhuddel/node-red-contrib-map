module.exports = function (RED) {
    
    function MapNode(config) {
        RED.nodes.createNode(this, config);
        
        this.mappingTable = RED.nodes.getNode(config.mappingTable);
        this.property = config.property;
        this.propertyType = config.propertyType;
        
        var node = this;
        
        // convert mapping-array to associative array
        var mapping = {};
     		for (var i = 0; i < this.mappingTable.map.length; i += 1) {
     			var row = this.mappingTable.map[i];
     			mapping[row['search']] = row['replace'];
     		}
        
        this.on('input', function (msg) {
        	try {
        		//var stringToMap = RED.util.evaluateNodeProperty(node.property, node.propertyType, node, msg);
        		var stringToMap = RED.util.getMessageProperty(msg, node.property);
        		var mappingValue = mapping[stringToMap];
        		if (mappingValue !== undefined) {
        			RED.util.setMessageProperty(msg, node.property, mappingValue);
        		} else {
        			node.warn('no mapping found for \'' + stringToMap + '\'');
        		}
        		this.send(msg);
        	} catch(err) {
            node.warn(err);
          }
        });
    }

    RED.nodes.registerType('map', MapNode);
}
