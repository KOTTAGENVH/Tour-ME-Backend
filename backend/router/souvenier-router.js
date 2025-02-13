import { createSouvenier, deleteSouvenier, getAllSouveniers, updateQuantity, updateRating, updateSouvenier, getSingleSouvenier, getSouvenierBySellerEmail } from '../controller/souvenier-controller.js';
import express from 'express';

const souvenier_router = express.Router();

souvenier_router.post('/create-souvenier', createSouvenier);
souvenier_router.get('/get-all-souveniers', getAllSouveniers);
souvenier_router.get('/get-single-souvenier/:id', getSingleSouvenier);
souvenier_router.patch('/update-souvenier/:id', updateSouvenier);
souvenier_router.delete('/delete-souvenier/:id', deleteSouvenier);
souvenier_router.patch('/update-rating/:id', updateRating);
souvenier_router.get('/get-souvenier-by-selleremail/:selleremail', getSouvenierBySellerEmail);

export default souvenier_router;