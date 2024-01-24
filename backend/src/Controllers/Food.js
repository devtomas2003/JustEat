import Food from "../Models/Food";

export async function CreateFood(req, res){
    const name = req.body.name;
    const price = req.body.price;
    const alergy = req.body.alergy;
    const description = req.body.description;
    const restaurant = req.body.restaurant;

    if(!name || !price || !alergy || !description || !restaurant){
        return res.status(400).json({
            "message": "Missing fields! See API documentation"
        });
    }

    const priceValue = parseInt(price);

    if(isNaN(priceValue)){
        return res.status(400).json({
            "message": "Price must be a float"
        });
    }

    await Food.create({
        alergy,
        description,
        name,
        photo: 'default-menu.jpg',
        price,
        restaurant
    });

    res.status(200).json({
        "message": "Food created successfully!"
    });
}

export async function GetFood(req, res){
    const foodId = req.params.foodId;

    if(!foodId){
        return res.status(400).json({
            "message": "Missing field! See API documentation"
        });
    }

    Food.findById(foodId).then((foodItem) => {
        res.status(200).json(foodItem);
    });
}