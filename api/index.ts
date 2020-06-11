import { NowRequest, NowResponse } from '@now/node';

const handler = async (req: NowRequest, res: NowResponse) => {
    res.send({ message: 'Vercel typescript API boilerplate' });
};

export default handler;
