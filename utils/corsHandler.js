import Cors from 'cors';

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
	if (result instanceof Error) {
	  return reject(result)
	}
	return resolve(result)
    })
  })
}

const cors = initMiddleware(
	Cors({
		methods: ['GET'],
	})
);

export default cors;

