import stripe from 'stripe'

stripe(process.env.STRIPE_KEY)

export const createPayment = async(req, res)=> {
    try{
        stripe.ChargesResource.create({
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd"
        },( stripeErr, stripeRes)=> {
            if(stripeErr){
                res.status(500).json(stripeErr)
            }else{
                res.status(200).json(stripeRes)
            }
        })

    }
    catch (err) {

        return res.status(500).send({error: "something went wrong"})
    }
}