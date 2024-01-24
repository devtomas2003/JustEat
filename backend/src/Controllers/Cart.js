import Cart from "../Models/Cart";
import CartItems from "../Models/CartItems";
import Food from "../Models/Food";

export async function SaveCart(req, res){
    const paymethod = req.body.paymethod;
    const address = req.body.address;
    const observations = req.body.observations;
    const foods = req.body.foods;
    const restaurantId = req.body.restaurantId;
    const userId = req.userId;

    if(!paymethod || !address || !foods || !restaurantId){
        return res.status(400).json({
            "message": "Missing fields! See API documentation",
            "code": 0
        });
    }

    async function calculatePriceToPay() {
        try {
            const prices = await Promise.all(
                foods.map(async (product) => {
                    try {
                        const searchFood = await Food.findById(product.id, {
                            price: true
                        });
                        return searchFood.price;
                    } catch (e) {
                        return res.status(404).json({ "message": "An Food Id is invalid!", "code": 1 });
                    }
                })
            );

            const totalPrice = prices.reduce((acc, price) => acc + price, 0);
            return totalPrice;
        } catch (error) {
            return res.status(500).json({ "message": "Internal Server Error", "code": 1 });
        }
    }

    const cartCreated = await Cart.create({
        date: new Date(),
        deliveryAddress: address,
        clientId: userId,
        paymentMethod: paymethod,
        observations: observations || 'N/A',
        price: await calculatePriceToPay(),
        restaurantId
    });

    foods.forEach(async (food) => {
        await CartItems.create({
            cartId: cartCreated._id,
            observations: 'N/A',
            productId: food.id
        });
    });

    res.status(200).json({
        "message": "Cart created successfully!",
        "code": 2
    });
}

export async function GetFood(req, res){
    const foodId = req.params.foodId;

    if(!foodId){
        res.status(400).json({
            "message": "Missing field! See API documentation"
        });
    }

    Food.findById(foodId).then((foodItem) => {
        res.status(200).json(foodItem);
    });
}