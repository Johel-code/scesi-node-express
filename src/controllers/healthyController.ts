import { Request, Response } from 'express';

const getHealthStatusController = (req: Request, res: Response) => {
    res.status(200).json({
        "healt": "live",
        "status": 200,
        "message": "ok"
    })
}

export {
    getHealthStatusController
};