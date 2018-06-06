	var  express 	= require("express"),
		 app 		= express(),
		 bodyParser = require("body-parser"),
		 mongoose 	= require("mongoose");

		app.use(bodyParser.urlencoded({extended: true}));
		app.set("view engine", "ejs");

	
		// mongoose.connect("mongodb://localhost/yelp_camp");
	// mongodb://<dbuser>:<dbpassword>@ds247330.mlab.com:47330/restblogapp
	 mongoose.connect("mongodb+srv://dsabanski:guzolina33@restblogapp-hj5u2.mongodb.net/test?retryWrites=true");

	// Schema Setup
	var campgroundSchema = new mongoose.Schema({
		name: String,
		image: String,
		description: String
	});
	var Campground = mongoose.model("Campground" , campgroundSchema);

	Campground.create(
		{
		 name: "Черни Връх" ,
		 image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		 description: "Coding Exrecise"
		 	} , function(err , campground){
			if (err) {
				console.log(err);
			}else {
				console.log("Newly created campground");
				console.log(campground);
			}
		}); 

		app.get("/" , function(req,res){
			res.render("landing");
		});


		// INDEX - show all campgrounds
		app.get("/campgrounds", function(req,res){
			//Get all campgrounds from DB and then render
			Campground.find({} , function(err , allcampgrounds){
				if (err) {
					console.log(err);
				}else {
					res.render("index" , {campgrounds:allcampgrounds});
				}
			});
			//res.render("index" , {campgrounds:campgrounds});
		});

		// CREATE   - add new campground to DB
		app.post("/campgrounds", function(req,res){
			//get data from form and add campground
			// redirect back to campgrounds page
			var name = req.body.name;
			var image = req.body.image;
			var description = req.body.description;
			var newCampground = {name:name , image: image , description: description}
			// CREATE A NEW CAMPGROUND TO DB
			Campground.create(newCampground , function(err , newlyCreated){
				if(err){
					console.log(err);
				} else {
					res.redirect("/campgrounds");
				}
			});
			// PUSHING TO ARRAY campgrounds.push(newCampground);	
		});

		// NEW - show form to create new campground
		app.get("/campgrounds/new" , function(req,res){
			res.render("new");
		});


		//SHOW - shows more info about a campground
		app.get("/campgrounds/:id" , function(req,res){
			//find the campground with provided ID
			Campground.findById(req.params.id , function(err , foundCampground){
				if (err) {
					console.log(err);
				}else {
					// render the show template with that campground
					res.render("show" , {campground: foundCampground});
				}
			});
			req.params.id
			
		});

		/* app.listen(3000 , function(){
			console.log("Yelp Camp Server has started!")
		}); */
		app.listen(process.env.PORT , process.env.IP , function(){
		console.log("Server is running on port 3000");
		});



		// RESTFUL ROUTES
		// name      url     	 verb          descr.
		// ===================================================
		// INDEX    /dogs   	 GET     DISPLAY a list of all dogs
		// NEW      /dogs/new    GET     DISPLAY form to make a new dog
		// CREAT    /dogs        POST    Add new dog to DB
		// SHOW     /dogs/:id    GET     Shows info about one DOG