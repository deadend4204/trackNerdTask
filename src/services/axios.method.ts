import axios from "./axios.service";

export async function _GET(url: string): Promise<any> {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    return error;
  }
}

export async function _POST(
  url: string,
  requestData?: any,
  headers?: any
): Promise<any> {
  try {
    const response = await axios.post(url, requestData, headers);
    // console.log("res axios", response);
    return response;
  } catch (error) {
    console.log("res error", error, url, requestData, headers);

    return error;
  }
}

export async function _PATCH(url: string, requestData: any) {
  try {
    const response = await axios.patch(url, requestData);
    return response;
  } catch (error) {
    return error;
  }
}

export async function _PUT(url: string, requestData: any) {
  try {
    const response = await axios.put(url, requestData);
    return response;
  } catch (error) {
    return error;
  }
}
