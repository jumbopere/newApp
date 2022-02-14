import {register, login, update, deleteUser, getOneUser, getAllUser, userStats} from '../controllers/user.js'
import { verifyTokenAuthorization, verifyTokenAndAdmin} from '../controllers/verifyToken'

 module.exports = (express)=> {
    const router = express.Router()
    router.post('/register', async (req, res) => {
        await register(req, res);
      });
      router.post('/login', async(req,res)=> {
          await login(req,res)
      })
      router.put("/:id", verifyTokenAuthorization, async(req,res)=> {
await update(req, res)
      });
router.delete("/:id", verifyTokenAuthorization, async(req,res)=> {
    await deleteUser(req,res)
})
router.get("/find/:id", verifyTokenAndAdmin, async(req, res)=> {
    await getOneUser(req, res)
})
router.get("/find", verifyTokenAndAdmin, async(req, res)=> {
    await getAllUser(req, res)
})
router.get("/stats", verifyTokenAndAdmin, async(req, res)=> {
    await userStats(req, res)
})
return router
    }
