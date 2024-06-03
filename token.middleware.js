const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

exports.checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksUri: 'https://login.microsoftonline.com/b41b72d0-4e9f-4c26-8a69-f949f367c91d/discovery/v2.0/keys',
    }),
    audience: 'api://01231d24-4e6f-405a-a8ff-07710d7a236d',
    issuer: 'https://login.microsoftonline.com/b41b72d0-4e9f-4c26-8a69-f949f367c91d/v2.0',
    algorithms: ['RS256'],
});