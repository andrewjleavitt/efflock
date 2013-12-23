$(document).ready(function() {
	$('#slabs a').click(function() {
		console.log('slabs clicked');
		thickness = parseInt($('#thickness').val());
		length = parseInt($('#length').val());
		width = parseInt($('#width').val());
		console.log(thickness + ':' + length + ':' + width);
		cubic_yards = calculateCubicYards(length,width,thickness);
		console.log(cubic_yards);
		efflock_amounts = getEfflock(cubic_yards);
		console.log(efflock_amounts);
		$('#slab-cubic-yards').html(cubic_yards);
		$('#slab-efflock-recommended').html(cubic_yards);
	});

	$('#footings a').click(function() {
		console.log('depth clicked');
		depth = parseInt($('#footings #depth').val());
		length = parseInt($('#footings #length').val());
		width = parseInt($('#footings #width').val());
		console.log(depth + ':' + length + ':' + width);
		result = calculateCubicYards(length*12,width,depth);
		console.log(result);
		$('#footing-cubic-yards').html(result);
	});
});

var calculateCubicYards = function(length, width, thickness) {

	// convert thickness to feet
	thickness = thickness/12;

	return (thickness * length * width / 27).toFixed(2);
}

// takes inches
var calculateColumnarCubicYards = function(diameter, height) {
	return (Math.pow(diameter/2, 2)*Math.PI*height) / 27;
}

var getEfflock = function(cubic_yards) {
	cement_weights = new Array(6.0,6.5,7.0);
	var efflock_amounts = new Array();

    for(i=0; i<cement_weights.length; i++) {
		efflock_amounts[cement_weights[i].toString()] = calculateEfflock(cubic_yards,cement_weights[i]);     
	}
	return efflock_amounts;
}

var calculateEfflock = function(cubic_yards, cement_weight) {
	console.log('calculateEfflock called');
	var efflock = 0;
	if(cement_weight == '6.0') {
		efflock = cubic_yards * 45.12;
	} else if (cement_weight = '6.5') {
		efflock = cubic_yards * 48.88;
	} else if (cement_weight = '7.0') {
		efflock = cubic_yards * 52.64;
	}

	return efflock;

}