import Addresses from "../Models/Addresses";
import Cart from "../Models/Cart";
import CartItems from "../Models/CartItems";
import Food from "../Models/Food";
import Restaurants from "../Models/Restaurants";
import Users from "../Models/Users";

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

export async function GetAllCartFromUser(req, res) {
    try {
        const cartData = await Cart.find({
            clientId: req.userId
        });

        const cartListData = await Promise.all(cartData.map(async (cartInfo) => {
            const restaurantData = await Restaurants.findById(cartInfo.restaurantId, {
                name: true
            });

            const cartItemsList = await CartItems.find({
                cartId: cartInfo._id
            }, {
                productId: true,
                observations: true
            });

            const allItems = await Promise.all(cartItemsList.map(async (itemsList) => {
                const productInfo = await Food.findById(itemsList.productId, {
                    name: true
                });

                const updatedItemsList = {
                    ...itemsList.toObject(),
                    productInfo
                };

                return updatedItemsList;
            }));

            const addressData = await Addresses.findById(cartInfo.deliveryAddress, {
                addressLineOne: true,
                addressLineTwo: true
            });
            
            const usersData = await Users.findById(cartInfo.clientId, {
                nome: true
            });

            const updatedCartInfo = {
                ...cartInfo.toObject(),
                name: restaurantData.name,
                id: restaurantData._id,
                addressData,
                usersData,
                allItems
            };

            return updatedCartInfo;
        }));

        res.status(200).json(cartListData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function UpdateCartStatus(req, res){
    const cartId = req.params.cartId;
    const status = req.body.status;

    if(!cartId){
        return res.status(400).json({
            "message": "Missing fields! See API documentation",
            "code": 0
        });
    }

    await Cart.updateOne({
        _id: cartId,
        status
    });

    res.status(200).json({
        "message": "Cart status updated",
        "code": 2
    });
}

export async function GetCartItemsById(req, res){
    const cartId = req.params.cartId;

    if(!cartId){
        return res.status(400).json({
            "message": "Missing fields! See API documentation",
            "code": 0
        });
    }

    Cart.findById(cartId).then(async (cartData) => {
        const cartItems = await CartItems.find({
            cartId
        });
        res.status(200).json({
            cartData,
            cartItems
        });
    }).catch((err) => {
        res.status(404).json({
            "message": "Cart not found",
            "code": 0
        });
    })
}