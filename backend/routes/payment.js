import createPayment from "../controllers/stripe"
import { verifyToken} from "../controllers/verifyToken"

module.exports = (express)=> {
    const router = express.Router()
    router.post('/', verifyToken, async (req, res) => {
        await createPayment(req, res);
      });
  
    
return router
    }