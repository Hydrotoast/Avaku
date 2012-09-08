// Mock object with Elidiun avatars
var Elidiun = function() {
	this.matrix = {};
	this.matrix['head'] = ['images/Elidiun/items/23h6qgw.jpg', 'images/Elidiun/items/Cow-Hoodie.png'];
	this.matrix['upper'] = ['images/Elidiun/items/ChrisSuit_red.png'];
	this.matrix['lower'] = ['images/Elidiun/items/ancienp_bottoms_brown.PNG'];
	this.matrix['shoes'] = ['images/Elidiun/items/converseblack.png'];
}

Elidiun.prototype = {
	getItems: function(category, user) {
		return this.matrix[category];
	},
	sendItems: function(items) {
		// Do nothing
	}
};
