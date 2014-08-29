
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//  create product recommendation engine that returns number of units of the largest size
function recommend(square_feet,products) {
	if(isNumber(square_feet) == false || square_feet < 0) {
		return 'Square feet must be a positive number.'
	}
	smallest_product = null;
	candidate_product = null;
	for(i=0; i<products.length;i++) {
		products[i].calculate(square_feet);
    console.log(products[i]);
		// handle small areas
		if(smallest_product == null) {
			smallest_product = products[i];
		} else if(products[i].min_coverage < smallest_product.min_coverage) {
			smallest_product = products[i];
		}

		if(candidate_product == null && products[i].min >= 1 ) {
			candidate_product = products[i];
		} else if(products[i].min >= 1 && products[i].min < candidate_product.min) {
			candidate_product = products[i];
		}
	}


  console.log(candidate_product);
  smallest_product.max = 1;
  smallest_product.min = 1;

	return !candidate_product ? smallest_product.resultString() : candidate_product.resultString();
}



//  create product class
function Product(name,size,oz,min_coverage,max_coverage) {
	this.name = name;
	this.size = size;
	this.oz = oz;
	this.min_coverage = min_coverage;
	this.max_coverage = max_coverage;
  this.min = 0;
  this.max = 0;
}


//  calculate min/max units by square_feet
Product.prototype.calculate = function calculate(square_feet) {
  this.min = Math.round(square_feet / this.max_coverage);
  this.max = Math.round(square_feet / this.min_coverage);
  return this;
}

Product.prototype.resultString = function resultString() {
  if(this.min == this.max) {
    var string = this.max + " " + this.size + " " + this.name + " " + (this.max == 1 ? "kit" : " kits") + " should be used.";
  } else {
    var string = this.min + " - " + this.max + " " + this.size + " " + this.name + " kits should be used.";
  }
  return string;
}

function run_tests() {
	//  Translucent Color Enhancer
	translucent_xl = new Product('Translucent Color Enhancer','X-Large',32,600,1200);
	translucent_l  = new Product('Translucent Color Enhancer','Large',16,300,600);
	translucent_s  = new Product('Translucent Color Enhancer','Small',4,150,200);
	trans_products = [translucent_xl,translucent_l, translucent_s];

	console.log(recommend(-200,trans_products));
	console.log(recommend('some crazy string',trans_products));

	console.log(recommend(100,trans_products));
	console.log(recommend(1000,trans_products));
	console.log(recommend(500,trans_products));

	// ORIGINAL Solid Color Stain
	original_l = new Product('ORIGINAL Solid Color Stain','Large',32,350,400);
	original_m = new Product('ORIGINAL Solid Color Stain','Medium',16,175,200);
	original_s = new Product('ORIGINAL Solid Color Stain','Small',4,45,50);
	original_products = [original_s,original_m,original_l];

	console.log(recommend(90,original_products));
	console.log(recommend(100,original_products));
	console.log(recommend(500,original_products));

	// SmartColor
	smartcolor_xl = new Product('SmartColor','5-Gallon',640,5000,8000);
	smartcolor_l  = new Product('SmartColor','1-Gallon',128,1000,1600);
	smartcolor_m  = new Product('SmartColor','33 oz.',33,250,400);
	smartcolor_s  = new Product('SmartColor','4 oz.',4,35,50);
	smartcolor_products = [smartcolor_s,smartcolor_m,smartcolor_l, smartcolor_xl];

	console.log(recommend(5010,smartcolor_products));
	console.log(recommend(1010,smartcolor_products));
	console.log(recommend(310,smartcolor_products));
	console.log(recommend(40,smartcolor_products));

	// TiqueWash
	tique = new Product('TiqueWash','Standard',48,2000,3000);
	tique_products = [tique];

  console.log(recommend(2001,tique_products));
	console.log(recommend(3001,tique_products));
	console.log(recommend(12001,tique_products));
  console.log(recommend(1,tique_products));

}
// run_tests();
