// This file is part of Avaku
// Copyright (C) 2010 Gio Carlo Cielo Borje
//
// Avaku is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Avaku is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

/**
 * An item for avatars.
 * 
 * @class Represents an equipable item for avatars
 * @param {String} source The source string for the image of the item
 */
function Item(source) {
	this.source = source;
}

/**
 * Generates or loads items for the inventory.
 *
 * @class Represents an item factory
 */
function ItemFactory() {

}

ItemFactory.prototype = {
	/**
	 * Retrieves categorized items for a given user.
	 *
	 * @param {String} user		The user to retrieve items for
	 * @param {String} category	The category of items to retrieve
	 */
	getItems: function(user, category) {
		throw new Error('getItems() must be implemented');
	},

	/**
	 * Saves an avatar for a given user.
	 *
	 * @param {String} user		The user to save an avatar for
	 * @param {Avatar} avatar	The avatar to save.
	 */
	sendItems: function(user, avatar) {
		throw new Error('sendItems() must be implemented');
	}
};

/**
 * An implementation of the ItemFactory.
 */
function AJAXFactory() {
	this.xhr = (window.XMLHttpRequest) ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
}

AJAXFactory.prototype = ItemFactory;

AJAXFactory.prototype.getItems = function(user, category) {
	this.xhr.open('GET', config.AVATAR_SCRIPT_PATH, false);
	this.xhr.addEventListener('load', function() {
		if (this.xhr.status === 200)
			return this.xhr.responseText;
		else
			return null;
	});
	this.xhr.setRequestHeader('Content-Type', 'text/json');
	this.xhr.setRequestHeader('Cache-Control', 'no-cache');
	this.xhr.send();
}

AJAXFactory.prototype.sendItems = function(user, avatar) {
	var json = avatar.jsonify();
	this.xhr.open('PUT', config.AVATAR_SCRIPT_PATH, false);
	this.xhr.addEventListener('load', function() {
		return this.xhr.status === 200;
	});
	this.xhr.setRequestHeader('Content-Type', 'application/x-www-url-form-urlencoded');
	this.xhr.setRequestHeader('Content-Length', json.length);
	this.xhr.setRequestHeader('Connection', 'close');
	this.xhr.send(json);
}
