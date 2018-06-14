const jquery = require('../../assets/ext-lib/jquery/jquery-3.1.0');
var $;
$ = $ || jquery;
export var jsandpit;
jsandpit = jsandpit || {};

jsandpit.arrangeGridElements = function(elements) {

	var htmlString = '';
	var standardUnit = 160;
	var minHeight = jsandpit.gridMinDimension(elements, 'height') ;
	var minWidth = jsandpit.gridMinDimension(elements, 'width');
	var aspectRatio = jsandpit.getGridAspectRatio();
	var tempGrid =
		jsandpit.createTempGrid(minHeight, minWidth, aspectRatio, elements);
	var ratio = 4;
	var elem;
	for(elem in tempGrid) {

		htmlString +='<div class="dg-element" style="height:'
			+(tempGrid[elem].height*standardUnit)
			+'px;width:'+(tempGrid[elem].width*standardUnit)+'px;margin:'
			+(standardUnit/ratio)+'px;"></div>';

	}
	$('.dg-grid').html(htmlString);

};

jsandpit.createTempGrid = function(minHeight, minWidth, aspectRatio, elements) {
	
	/**
	 * Calculate a prototype grid in the form of a two dimensional array and
	 * return to calling function.
	 */
	var sortedElements = [];
	var tempArray = [];
	var elem;
	var EMPTY = 0;
	var FIRST_INDEX = 0;
	var addFlag;

	var funcName = function() {
		
		if(elements[elem].width > sortedElements[FIRST_INDEX].width
			&& !addFlag) {
			
			tempArray.unshift(elements[elem]);
			addFlag = true;
			
		}
		tempArray.unshift(sortedElements.shift());

	};
	
	for(elem in elements) {

		if (sortedElements.length == EMPTY) {

			sortedElements.unshift(elements[elem]);

		} else {

			addFlag = false;
			tempArray = [];
			sortedElements.forEach(funcName());
			if (!addFlag) {

				tempArray.push(elements[elem]);

			}
			sortedElements = tempArray;

		}

	}

	return sortedElements;

};

jsandpit.gridMinDimension = function(elements, dimension) {
	
	var elem;
	var minDim = 1;
	for(elem in elements) {

		if (elements[elem][dimension] > minDim) {

			minDim = elements[elem][dimension];

		}

	}
	return minDim;

};

jsandpit.getGridAspectRatio = function() {

	var height = $('.dg-grid').height();
	var width = $('.dg-grid').width();
	var defaultAspectRatio = 1;
	var aspectRatio, orientation;

	if (height > width) {

		orientation = 'portrait';
		aspectRatio = height/width;

	} else if (width > height) {

		orientation = 'landscape';
		aspectRatio = width/height;

	} else {

		orientation = 'square';
		aspectRatio = defaultAspectRatio;

	}
	return [
		orientation,
		aspectRatio
	];

};

jsandpit.getGridElements = function() {

	var json = {};
	var elements = [];
	var element;
	$.getJSON('../../assets/files/dynamic-grid.json')
		.then(function(data) {

			json = data;
			for (element in json.elements) {

				elements.push(json.elements[element]);

			}
			jsandpit.arrangeGridElements(elements);

		});

};

$(document).ready(jsandpit.getGridElements());
