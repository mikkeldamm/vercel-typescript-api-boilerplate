import { NowRequest, NowResponse } from '@now/node';

const findUserByToken = async userToken => Promise.resolve(null);

// HOW TO USE:
/*

    import { NowRequest, NowResponse } from '@now/node';

    const handler = handleAuth(async (req: NowRequest, res: NowResponse, user) => {
        res.send({ message: 'Vercel typescript API boilerplate secure by auth' });
    });

    export default handler;

*/

interface User {
    id: string;
}

export const handleAuth = (handler: (_req: NowRequest, _res: NowResponse, _user: User) => Promise<void>) => {

    return async (req: NowRequest, res: NowResponse) => {

        try {

            let userToken: string | null = null;
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
                userToken = req.headers.authorization.split('Bearer ')[1];
            }

            if (!userToken) {
                res.status(403);
                res.end('Unauthenticated');
                return;
            }

            const user = await findUserByToken(userToken);
            if (!user) {
                throw new Error('User not found by token');
            }

            await handler(req, res, user);

        } catch(error) {

            // This will also catch any errors from below the stack that its wrapped
            // So handle inner errors, instead of bubbeling up

            res.status(401);
            res.end('Unauthorized');
        }
    };
};

