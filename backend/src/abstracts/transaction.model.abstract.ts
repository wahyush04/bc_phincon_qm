import { Request, Response } from "express";

export default abstract class TransactionModelAbstract {
    abstract getAllCategory(req: Request, res: Response): Promise<any>; // get all categories
    abstract getAllProduct(req: Request, res: Response): Promise<any>; // get all products
    abstract getUserCart(req: Request, res: Response): Promise<any>; // get user cart by userid
    abstract addCart(req: Request, res: Response): Promise<any>; // add product to cart by userid
    abstract deleteCart(req: Request, res: Response): Promise<any>; // delete product from cart by userid
}
