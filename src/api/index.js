import Router from 'koa-router';

import letters from './letters';

const router = new Router();

router.use('/letters', letters.routes());

export default router;
