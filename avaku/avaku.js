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

var Avaku = {};
(function(avaku) {
	/*
	* Data source for items
	*/
	avaku.itemFactory = null;

	/*
	* Inventory handler
	*/
	avaku.inventory = null;

	avaku.canvas = null;
	avaku.ctx = null;
	avaku.fragment = null;
	avaku.avatar = null;
	avaku.bc_avatar = null;

	/**
	 * Initializes Avaku global variables necessary for operation.
	 */
	avaku.initVariables = function(itemFactory) {
		avaku.itemFactory = itemFactory;
		avaku.inventory = new Inventory(avaku.itemFactory);
		avaku.inventory.getItems(avaku.user, 'head');
		avaku.inventory.getItems(avaku.user, 'upper');
		avaku.inventory.getItems(avaku.user, 'lower');
		avaku.inventory.printHtml(document.getElementById(config.INVENTORY_ID), ['head', 'upper', 'lower']);

		avaku.canvas = document.getElementById(config.AVATAR_ID);
		avaku.bc_avatar = document.getElementById(config.BC_AVATAR_ID);
		
		if (avaku.canvas.getContext && !config.BACKWARDS_COMPATIBLE) {
			avaku.ctx = avaku.canvas.getContext('2d');
			avaku.avatar = new CanvasAvatar();
		} else {
			avaku.fragment = document.createDocumentFragment();
			avaku.avatar = new DomAvatar();
			avaku.bc_avatar.style.position = 'relative';
		}
	};

	/**
	 * Initializes the initial handlers for items static handlers for buttons.
	 */
	avaku.initHandlers = function() {
		var items = algo.getByClass(config.ITEM_CLASS);
		
		var save = document.getElementById(config.SAVE_ID);
		var clear = document.getElementById(config.CLEAR_ID);
		
		avaku.bindButtonHandlers(items, save, clear);
		avaku.bindItemHandlers(items);
	};

	/**
	 * Binds static handlers to buttons.
	 * 
	 * @param {Element[]} items List of item elements that can be cleared
	 * @param {Element} save	Save button element
	 * @param {Element] clear	Clear button element
	 */
	avaku.bindButtonHandlers = function(items, save, clear) {
		save.addEventListener('click', function() {
			avaku.avatar.compile();
			return false;
		});
		
		clear.addEventListener('click', function() {
			for (var i in items) {
				var image = algo.getByClass(config.LAYER_CLASS, items[i])[0].firstChild;
				if (image != null && image.className.indexOf(config.EQUIPPED_CLASS) != -1) {
					image.className = '';
					avaku.avatar.removeLayer(image.getAttribute('data-src'));
					
					algo.getByClass(config.REMOVE_CLASS, items[i])[0].style.display = 'none';
				}
				avaku.draw();
			}
			return false;
		});
	};

	/**
	 * Binds event handlers for a set of items.
	 * 
	 * @param {Element[]} items	List of item elements to bind event handlers to
	 */
	avaku.bindItemHandlers = function(items) {
		for (var i in items)
			avaku.bindItemHandler(items[i]);
	};
	
	/**
	 * Binds event handlers to an item.
	 *
	 * @param {Element} item	The item to bind event handlers to
	 */
	avaku.bindItemHandler = function(item) {
		var layer = algo.getByClass(config.LAYER_CLASS, item)[0];
		var image = layer.firstChild;
		
		var remove = algo.getByClass(config.REMOVE_CLASS, item)[0]
		var raise = algo.getByClass(config.RAISE_CLASS, item)[0]
		var lower = algo.getByClass(config.LOWER_CLASS, item)[0]
		
		// EquipItem event handler
		layer.addEventListener('click', function(item) {
			return function() {
				var layer = algo.getByClass(config.LAYER_CLASS, item)[0]
				var image = layer.firstChild;
				if (image.className.indexOf(config.EQUIPPED_CLASS) == -1) {
					image.className = config.EQUIPPED_CLASS;
					avaku.avatar.addLayer(image.getAttribute('data-src'));
				
					algo.getByClass(config.REMOVE_CLASS, item)[0].style.display = 'block';
				}
				
				avaku.draw();
				return false;
			}
		}(item));
		
		// UnequipItem event handler
		remove.addEventListener('click', function(image) {
			return function() {
				if (image.className.indexOf(config.EQUIPPED_CLASS) != -1) {
					image.className = '';
				
					this.style.display = 'none';
					avaku.avatar.removeLayer(image.getAttribute('data-src'));
					avaku.draw();
					return false;
				}
			}
		}(image));
		
		if (raise != null && lower != null) {
			// RaiseLayer event handler
			raise.addEventListener('click', function(image) {
				return function() {
					algo.raiseLayer(avaku.avatar, image.getAttribute('data-src'));
					avaku.draw();
					return false;
				}
			}(image));
			
			// LowerLayer event handler
			lower.addEventListener('click', function(image) {
				return function() {
					algo.lowerLayer(avaku.avatar, image.getAttribute('data-src'));
					avaku.draw();
					return false;
				}
			}(image));
		}
	};

	/**
	 * Draws the current avatar in the browser window.
	 */
	avaku.draw = function() {
		avaku.avatar.render();
		avaku.inventory.printEquipped(document.getElementById(config.EQUIPPED_ID));
	};
	
	avaku.apply = function() {
		itemFactory.sendItems(avaku.user, avatar);
	};

	/**
	 * Initializes the Avaku engine.
	 **/
	avaku.init = function() {
		avaku.initVariables(new Elidiun());
		avaku.initHandlers();
		
		avaku.draw();
	};
})(Avaku);
