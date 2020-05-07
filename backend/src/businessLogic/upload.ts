import * as uuid from 'uuid';

import { TeamAccess } from '../dataLayer/teamsAccess';
import { PlayerAccess } from '../dataLayer/playerAccess';
import { GameAccess } from '../dataLayer/gameAccess';
import { getUploadUrl } from '../dataLayer/s3Bucket';
// import { isValid } from '../dataLayer/validKeyExist'

const teamAccess = new TeamAccess();
const playerAccess = new PlayerAccess();
const gameAccess = new GameAccess();

export async function uploadUrl(userId: string, Id: string): Promise<string> {
    // const teamExist = await isValid(userId, request.teamId)
    
    // if (!teamExist) {
    //     throw new Error('team associated to player in request does not exist')
    // }

    const bucketName = process.env.IMAGES_S3_BUCKET;

    const imageId = uuid.v4();
    const uploadUrl = getUploadUrl(imageId);

    if (Id.startsWith('team')){
        if (process.env.IS_OFFLINE) {
            teamAccess.updateTeamAttachment(userId, Id, `http://localhost:8001/${bucketName}/${imageId}`);
        } else {
            teamAccess.updateTeamAttachment(userId, Id, `https://${bucketName}.s3.amazonaws.com/${imageId}`);
        }
    } else if (Id.startsWith('player')) {
        if (process.env.IS_OFFLINE) {
            playerAccess.updatePlayerAttachment(userId, Id, `http://localhost:8001/${bucketName}/${imageId}`);
        } else {
            playerAccess.updatePlayerAttachment(userId, Id, `http://${bucketName}.s3.amazonaws.com/${imageId}`);
        } 
    } else if (Id.startsWith('game')) {
        if (process.env.IS_OFFLINE) {
            gameAccess.updateGameAttachment(userId, Id, `http://localhost:8001/${bucketName}/${imageId}`);
        } else {
            gameAccess.updateGameAttachment(userId, Id, `https://${bucketName}.s3.amazonaws.com/${imageId}`);
        }
    }

    return uploadUrl;
}