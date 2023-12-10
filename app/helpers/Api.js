export const postIndividualScreen = (name, dob, country) => {
    const query = `?name=${name}&dob=${dob}&country=${country}`
    const params = {
      method: 'GET'
    };
    return fetch(`/api/serverless${query}`, params);

};