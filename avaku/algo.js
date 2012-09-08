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

var algo = {};
(function(_) {
	/* Non-Modifying Sequence Operations */
	/** 
	* Execute a function for each layer
	* @param{avatar}	Doubly linked list that contains layers
	* @param{fn}		Function to execute on each layer
	*/
	_.for_each = function(avatar, fn) {
		for (var iter = avatar.head; 
			iter != null; 
			iter = iter.next)
				result = fn(iter);
	};

	/* Modifying Sequence Operations */
	/** 
	* Swaps the ordinal of layers i and j
	* @param{avatar}	Doubly linked list that contains layers
	* @param{i}			Source of first layer
	* @param{j}			Source of second layer
	*/
	_.swapLayer = function(avatar, i, j) {
		var i = avatar.findLayer(i),
			j = avatar.findLayer(j);
		if (i === undefined || j === undefined)
			throw new Error('Layer arguments cannot be null');
		i._img.src = j.source();
		j._img.src = tmp;
	};
	
	/**
	* Raises the ordinal of layer i
	* @param{avatar}	Doubly linked list that contains layers
	* @param{i} 		Source of layer to raise
	*/
	_.raiseLayer = function(avatar, i) {
		var i = avatar.findLayer(i);
		if (i === undefined || i.next === undefined)
			throw new Error('Layer arguments cannot be null');
		var tmp = i.source();
		i._img.src = i.next.source();
		i.next._img.src = tmp;
	};
	
	/**
	* Lowers the ordinal of layer i
	* @param{avatar}	Doubly linked list that contains layers
	* @param{i} 		Source of layer to lower
	*/
	_.lowerLayer = function(avatar, i) {
		var i = avatar.findLayer(i);
		if (i === undefined || i.prev === undefined)
			throw new Error('Layer arguments cannot be null');
		var tmp = i.source();
		i._img.src = i.prev.source();
		i.prev._img.src = tmp;
	};
	
	/* General Utilities */
	/**
	* Retrieves all DOM elements with the given class
	* @param{selector}	Class to search for
	* @param{parent}	Parent of the selector to search from
	* @return			Array of matching elements
	*/
	_.getByClass = function(selector, parent) {
		var parent = parent || document
		var elem = parent.getElementsByTagName('*');
		var matched = [];
		for (var i = 0, elemLength = elem.length; i < elemLength; i++)
			if (elem[i].className.match(new RegExp(selector)))
				matched.push(elem[i]);
		return matched;
	};

	/**
	* Checks whether a specified object is an array
	* @param{obj}	Object to check for an array
	* @return		True if object is an array
	*/
	_.isArray = function(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	}
})(algo);
