import {createCart, update, deleteCart, getCart, getAllCarts} from '../controllers/cart'
import { verifyTokenAuthorization, verifyToken, verifyTokenAndAdmin} from "../controllers/verifyToken"
module.exports = (express)=> {
    const router = express.Router()
    router.post('/', verifyToken, async (req, res) => {
        await createCart(req, res);
      });
      router.put('/:id',verifyTokenAuthorization, async(req,res)=> {
          await update(req,res)
      })
      router.delete('/:id',verifyTokenAuthorization, async(req,res)=> {
          await deleteCart(req,res)
      })
      router.get('/:userid',verifyTokenAuthorization, async(req,res)=> {
          await getCart(req,res)
      })
      router.get('/',verifyTokenAndAdmin, async(req,res)=> {
          await getAllCarts(req,res)
      })
    
return router
    }