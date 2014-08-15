function calculate(square_feet) {
	return {
		min: Math.round(square_feet / this.max_coverage),
		max: Math.round(square_feet / this.min_coverage)
	}
}

function Product(name,size,oz,min_coverage,max_coverage) {
	this.name = name;
	this.size = size;
	this.oz = oz;
	this.min_coverage = min_coverage;
	this.max_coverage = max_coverage;
	this.calculate = calculate;
}