$(document).ready(function() {
	$('#slabs a').click(function() {
		efflock_amounts = new Array();
		console.log('slabs clicked');
		thickness = parseInt($('#thickness').val());
		length = parseInt($('#length').val());
		width = parseInt($('#width').val());
		console.log(thickness + ':' + length + ':' + width);
		cubic_yards = calculateCubicYards(length,width,thickness);
		console.log(cubic_yards);
		efflock_amounts = getEfflock(cubic_yards);
		console.log(efflock_amounts);
		$('#slabs-cubic-yards').html(cubic_yards);
		$('#slabs-efflock-recommended_6_0').html(efflock_amounts[0]);
		$('#slabs-efflock-recommended_6_5').html(efflock_amounts[1]);
		$('#slabs-efflock-recommended_7_0').html(efflock_amounts[2]);
	});

	$('#footings a').click(function() {
		efflock_amounts = new Array();
		console.log('depth clicked');
		depth = parseInt($('#footings #depth').val());
		length = parseInt($('#footings #length').val());
		width = parseInt($('#footings #width').val());
		console.log(depth + ':' + length + ':' + width);
		cubic_yards = calculateCubicYards(length,width,depth);
		console.log(cubic_yards);
		efflock_amounts = getEfflock(cubic_yards);
		console.log(efflock_amounts);
		$('#footings-cubic-yards').html(cubic_yards);
		$('#footings-efflock-recommended_6_0').html(efflock_amounts[0]);
		$('#footings-efflock-recommended_6_5').html(efflock_amounts[1]);
		$('#footings-efflock-recommended_7_0').html(efflock_amounts[2]);
	});

	$('#columns a').click(function() {
		efflock_amounts = new Array();
		console.log('column clicked');
		diameter = parseInt($('#columns #diameter').val());
		height = parseInt($('#columns #height').val());
		console.log(depth + ':' + length + ':' + width);
		cubic_yards = calculateColumnarCubicYards(diameter,height);
		console.log(cubic_yards);
		efflock_amounts = getEfflock(cubic_yards);
		console.log(efflock_amounts);
		$('#columns-cubic-yards').html(cubic_yards);
		$('#columns-efflock-recommended_6_0').html(efflock_amounts[0]);
		$('#columns-efflock-recommended_6_5').html(efflock_amounts[1]);
		$('#columns-efflock-recommended_7_0').html(efflock_amounts[2]);
	});
});

var calculateCubicYards = function(length, width, thickness) {

	// convert thickness to feet
	thickness = thickness/12;

	return (thickness * length * width / 27).toFixed(2);
}

// takes inches
var calculateColumnarCubicYards = function(diameter, height) {
	return ((Math.pow(diameter/2, 2)*Math.PI*height) / 27).toFixed(2);
}

var getEfflock = function(cubic_yards) {
	cement_weights = new Array(6.0,6.5,7.0);
	var efflock_amounts = new Array();

    for(i=0; i<cement_weights.length; i++) {
		efflock_amounts.push(calculateEfflock(cubic_yards,cement_weights[i]));
	}
	return efflock_amounts;
}

var calculateEfflock = function(cubic_yards, cement_weight) {
	console.log('calculateEfflock called');
	var efflock = 0;
	if(cement_weight == '6.0') {
		efflock = cubic_yards * 45.12;
	} else if (cement_weight == '6.5') {
		efflock = cubic_yards * 48.88;
	} else if (cement_weight == '7.0') {
		efflock = cubic_yards * 52.64;
	}

	return efflock.toFixed(2);

}