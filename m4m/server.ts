import { ethers } from "ethers";
import axios from "axios";

export const signWithWallet = async (msg: string) => {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("No private key provided");
  }
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string);
  return wallet.signMessage(msg);
};

export type RequestMethod = "GET" | "POST" | "DELETE" | "PUT";

export interface RequestParams {
  url: string;
  method: RequestMethod;
  data?: any;
  headers?: any;
}
export const axiosRequest = async (requestParams: RequestParams) => {
  const { url, method, data, headers } = requestParams;
  const result = await axios(url, {
    method,
    headers,
    ...(method === "GET" ? { params: data } : { data }),
  });
  return result.data;
};
