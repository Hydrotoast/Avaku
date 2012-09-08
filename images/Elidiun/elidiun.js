var Elidiun = function() {
	this.matrix = {};
	this.matrix['head'] = [
		new Item('images/Elidiun/items/23h6qgw.jpg'),
		new Item('images/Elidiun/items/30b1b4g.jpg'),
		new Item('images/Elidiun/items/ancienp_hair_olive.png'),
		new Item('images/Elidiun/items/ancienp_hair_purple.png'),
		new Item('images/Elidiun/items/ancienp_hair_white.png'),
		new Item('images/Elidiun/items/ancienp_eyes_purple.png'),
		];
	this.matrix['upper'] = [
		new Item('images/Elidiun/items/SpaceROCK_Cape_Blue_U.png'),
		new Item('images/Elidiun/items/WINTERDOLL_DRESS_MALE_blonde.png'),
		new Item('images/Elidiun/items/femalehoodiedeepurple.png'),
		new Item('images/Elidiun/items/femalehoodieforest.png'),
		new Item('images/Elidiun/items/femalehoodiegray.png')
		];
	this.matrix['lower'] = [
		new Item('images/Elidiun/items/SWAGGER_JEANS_white.png'),
		new Item('images/Elidiun/items/StVRoses_f_skirt_white.png')
		];
	this.matrix['shoes'] = [
		new Item('images/Elidiun/items/converseblack.png')];
}

Elidiun.prototype = ItemFactory;

Elidiun.prototype.getItems = function(user, category) {
	return this.matrix[category];
};

Elidiun.prototype.sendItems = function(user, avatar) {
	// Do nothing
};
