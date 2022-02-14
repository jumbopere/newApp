import Cart from "../models/Cart";


export const createCart = async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save();

        return res.status(200).json(savedCart)

    } catch (err) {
        console.log(err)
        return res.status(500).send({error: 'something went wrong'});
    }

}


export const update = async (req, res) => {

    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        return res.status(200).json(updatedCart)
    } catch (err) {

        return res.status(500).send({error: "something went wrong"})
    }
}

export const deleteCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        return res.status(200).json("Cart have been deleted...")
    } catch (err) {

        return res.status(500).send({error: "something went wrong"})
    }
}


export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId})

        return res.status(200).json(cart)
    } catch (err) {

        return res.status(500).send({error: "something went wrong"})
    }
}


export const getAllCarts = async (req, res) => {

    try {
        const carts = await Cart.find()
        return res.status(200).json(carts)

    } catch (err) {
        console.log(err)
        return res.status(500).send({error: "something went wrong"})
    }
}
