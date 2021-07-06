import { getRepository } from 'typeorm'
import {Request, Response} from 'express'
import { TypeOfPayment } from '../entity/typeOfPayment'

export const getAll = async (req: Request, res: Response) => {
    const typeOfPayments = await getRepository(TypeOfPayment).find();
    return res.status(200).json(typeOfPayments);
}

export const getTypePayment = async (req: Request, res: Response) => {
    const {id} = req.params;
    const typeOfPayment = await getRepository(TypeOfPayment).findOne(id);
    return res.status(200).json(typeOfPayment);
}

export const save = async (req:Request, res: Response) => {
    const typeOfPayment = await getRepository(TypeOfPayment).save(req.body);
    return res.status(200).json(typeOfPayment);
}

export const update = async (req :Request, res: Response) => {
    const { id } = req.params;
    const typePaymentUpdated = {...req.body};
    const typeOfPayment = await getRepository(TypeOfPayment).update(id, typePaymentUpdated);
    if (typeOfPayment.affected === 1) {
        const typePaymentUpdated = await getRepository(TypeOfPayment).findOne(id);
        return res.status(200).json(typePaymentUpdated);
    } 
    return res.status(404).json({message: 'sorry, couldnt find the payment'});
}