import {createOrder, update, getAllOrders, deleteOrder, getOrder, income} from '../controllers/order'
import { verifyTokenAndAdmin, verifyToken, verifyTokenAuthorization} from '../controllers/verifyToken'

module.exports = (express)=> {
    const router = express.Router()
    router.post('/', verifyToken, async (req, res) => {
        await createOrder(req, res);
      });
      router.put('/:id',verifyTokenAndAdmin, async(req,res)=> {
          await update(req,res)
      })
      router.delete('/:id',verifyTokenAndAdmin, async(req,res)=> {
          await deleteOrder(req,res)
      })
      router.get('/:userId',verifyTokenAuthorization, async(req,res)=> {
          await getOrder(req,res)
      })

      router.get('/',verifyTokenAndAdmin, async(req,res)=> {
          await getAllOrders(req,res)
      })
      router.get('/income',verifyTokenAndAdmin, async(req,res)=> {
          await income(req,res)
      })
return router
    }