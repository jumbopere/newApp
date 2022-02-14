import { verifyTokenAndAdmin} from '../controllers/verifyToken'
import { createProduct, update, deleteProduct, getOneProduct, getAllProducts} from '../controllers/product'


module.exports = (express)=> {
    const router = express.Router()
    router.post('/', verifyTokenAndAdmin, async (req, res) => {
        await createProduct(req, res);
      });
      router.put('/:id',verifyTokenAndAdmin, async(req,res)=> {
          await update(req,res)
      })

      router.delete("/:id", verifyTokenAndAdmin, async(req, res)=> {
          await deleteProduct(req, res)
      })
      router.get("/:id", async(req, res)=> {
          await getOneProduct(req, res)
      })
      router.get("/", async(req, res)=> {
          await getAllProducts(req, res)
      })
return router
    }