import Product from "../models/Product";


export const createProduct = async (req, res) => {
  const newProduct = new Product(req.body)
    try {
const savedProduct = await newProduct.save();

return res.status(200).json(savedProduct)

    } catch (err) {
        console.log(err)
        return res.status(500).send({error: 'something went wrong'});
    }

}


export const update = async (req, res) => {

    try {
       const updatedProduct = await Product.findByIdAndUpdate(
       req.params.id,
       {
           $set: req.body
       } ,
       {
           new: true
       }  
       )
       return res.status(200).json(updatedProduct)
    } catch (err) {

        return res.status(500).send({error: "something went wrong"})
    }
}

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        return res.status(200).json("Product have been deleted...")
    } catch (err) {

        return res.status(500).send({error: "something went wrong"})
    }
}


export const getOneProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
       
        return res.status(200).json(product)
    } catch (err) {

        return res.status(500).send({error: "something went wrong"})
    }
}




export const getAllProducts = async (req, res) => {
    const qNew = req. query.new;
    const qCatergory = req.query.catergory
    try {
let products;

if(qNew){
    products = await Product.find().sort({createdAt: -1}).limit(10)
}
else if(qCatergory){
    products = await Product.find({
        catergories: {
            $in: [qCatergory]
        }
    })
}
else{
    products = await Product.find();
}
res.status(200).json(products)


    } catch (err) {
        console.log(err)
        return res.status(500).send({error: "something went wrong"})
    }
}