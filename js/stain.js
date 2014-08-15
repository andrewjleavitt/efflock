function calculate(square_feet) {
	return {
		min: Math.round(square_feet / this.max_coverage),
		max: Math.round(square_feet / this.min_coverage)
	}
}

function recommend(square_feet,products) {
	for(i=0; i<products.length;i++) {
		// console.log(products[i]);
		results = products[i].calculate(square_feet);
		console.log(results);
		if(results.min > 1 ) {
			return products[i];
		}
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

translucent_xl = new Product('Translucent Color Enhancer','X-Large',32,600,1200);
translucent_l = new Product('Translucent Color Enhancer','Large',16,300,600);
translucent_s = new Product('Translucent Color Enhancer','Small',4,150,200);

trans_products = [translucent_s,translucent_s, translucent_s];

recommend(2000,trans_products)