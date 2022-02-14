import Order from "../models/Order";


export const createOrder = async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await neworder.save();

        return res.status(200).json(savedOrder)

    } catch (err) {
        console.log(err)
        return res.status(500).send({error: 'something went wrong'});
    }

}


export const update = async (req, res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        return res.status(200).json(updatedOrder)
    } catch (err) {

        return res.status(500).send({error: "something went wrong"})
    }
}

export const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        return res.status(200).json("order have been deleted...")
    } catch (err) {

        return res.status(500).send({error: "something went wrong"})
    }
}


export const getOrder = async (req, res) => {
    try {
        const orders = await Order.find({userId: req.params.userId})

        return res.status(200).json(orders)
    } catch (err) {

        return res.status(500).send({error: "something went wrong"})
    }
}


export const getAllOrders = async (req, res) => {

    try {
        const orders = await Order.find()
        return res.status(200).json(orders)

    } catch (err) {
        console.log(err)
        return res.status(500).send({error: "something went wrong"})
    }
}
export const income = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: previousMonth
                    }
                }
            }, {
                $project: {
                    month: {
                        $month: "$createdAt"
                    },
                    sales: "$amount"
                }
            }, {
                $group: {
                    _id: "$month",
                    total: {
                        $sum: "$sales"
                    }
                }
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: "something went wrong"})
    }

}
