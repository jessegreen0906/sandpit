var jsandpit = jsandpit || {};

jsandpit.arrangeGridElements = function(elements) {
	var htmlString = '';
	var standardUnit = 160;
	var minHeight = jsandpit.gridMinDimension(elements, 'height');
	var minWidth = jsandpit.gridMinDimension(elements, 'width');
	var aspectRatio = jsandpit.getGridAspectRatio();
	var tempGrid = jsandpit.createTempGrid(minHeight, minWidth, aspectRatio, elements);
	for(var elem in tempGrid) {
		htmlString +='<div class="dg-element" style="height:'+(tempGrid[elem].height*standardUnit)+'px;width:'+(tempGrid[elem].width*standardUnit)+'px;margin:'+(standardUnit/4)+'px;"></div>';
	}
	$('.dg-grid').html(htmlString);
};

jsandpit.createTempGrid = function(minHeight, minWidth, aspectRatio, elements) {
	//Calculate a prototype grid in the form of a two dimensional array and return to calling function.
	var sortedElements = [];
	var tempArray = [];
	for(var elem in elements) {
		if (sortedElements.length == 0) {
			sortedElements.unshift(elements[elem]);
		} else {
			var addFlag = false;
			tempArray = [];
			for (var e2 in sortedElements) {
				if(elements[elem].width > sortedElements[0].width && !addFlag) {
					tempArray.unshift(elements[elem]);
					addFlag = true;
				}
				tempArray.unshift(sortedElements.shift());
			}
			if (!addFlag) {
				tempArray.push(elements[elem]);
			}
			sortedElements = tempArray;
		}
	}

	return sortedElements;
}

jsandpit.gridMinDimension = function(elements, dimension) {
	var minDim = 1;
	for(var elem in elements) {
		if (elements[elem][dimension] > minDim) {
			minDim = elements[elem][dimension];
		}
	}
	return minDim;
}

jsandpit.getGridAspectRatio = function() {
	var height = $('.dg-grid').height();
	var width = $('.dg-grid').width();
	var orientation, aspectRatio;

	if (height > width) {
		orientation = 'portrait';
		aspectRatio = height/width;
	} else if (width > height) {
		orientation = 'landscape';
		aspectRatio = width/height;
	} else {
		orientation = 'square';
		aspectRatio = 1;
	}
	return [orientation, aspectRatio];

}

jsandpit.getGridElements = function() {
	var json = {};
	var elements = [];
	$.getJSON('../../assets/files/dynamic-grid.json')
		.then(function(data) {
			json = data;
			for (var element in json.elements) {
				elements.push(json.elements[element]);
			}
			jsandpit.arrangeGridElements(elements);
		});
	console.log(elements);

};

$(document).ready(jsandpit.getGridElements());
