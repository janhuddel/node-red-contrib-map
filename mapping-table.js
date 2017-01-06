module.exports = function(RED) {
	
    function MappingTableNode(config) {
        RED.nodes.createNode(this, config);
        
        this.name = config.name;
        this.map = config.map;
    }
    
    RED.nodes.registerType('mapping-table', MappingTableNode);
}
