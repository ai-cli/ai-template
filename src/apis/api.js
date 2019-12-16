import { get, post } from './httpRequest'

export const getPasses = async () => {
    const url = '/url/test';
    return await get(url, {});
}