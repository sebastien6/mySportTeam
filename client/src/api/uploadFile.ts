import Axios from 'axios'
import { apiEndpoint } from '../config'

export async function getUploadUrl(idToken: string, Id: string): Promise<string> {
    console.log(`Generating S3 pre-signed URL to upload file for ${Id}`)
    const response = await Axios.post(`${apiEndpoint}/attachment/${Id}`, '', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
        }
    })
    return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
    console.log(`Uploading file to S3 presigned URL`)
    await Axios.put(uploadUrl, file)
}