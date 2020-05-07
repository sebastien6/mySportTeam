import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'
import { verify, decode } from 'jsonwebtoken'
import axios from 'axios'

import { createLogger } from '../../utils/logger'
import { Jwt, Jwk } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'
import { certToPEM } from '../../auth/utils';

const logger = createLogger('auth')

// TODO: Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature.
// To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set
// const jwksUrl = 'https://dev-bquc1kgl.auth0.com/.well-known/jwks.json'

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.authorizationToken)
  
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader)
  logger.info('getToken', {token: token})
  
  const jwt: Jwt = decode(token, { complete: true }) as Jwt
  logger.info('decoded jwt', {jwt: jwt})
  
  const certificate = await getCertificate(jwt.header.kid)
  logger.info('fetch auth0 certificate', {certificate: certificate})

  const payload = verify(token, certificate, { algorithms: ['RS256'] }) as JwtPayload
  logger.info('verification result', {token: token, payload: payload})

  return payload 
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}

async function getCertificate(kid: string): Promise<string> {
  const response = await axios.get('https://' + process.env.DOMAIN + '/.well-known/jwks.json');
  logger.info('axios response', {data: response.data})

  const jwks: Jwk[] = response.data.keys
  logger.info('jwks', {jwks: jwks[0], kid: kid})
  
  if (!jwks || jwks.length === 0) {
    throw new Error('The JWKS endpoint did not contain any keys');
  }

  if (jwks[0].kid === kid) {
    return certToPEM(jwks[0].x5c[0])
  }

  throw new Error('no match between jwk and jwt for key identifier')
}