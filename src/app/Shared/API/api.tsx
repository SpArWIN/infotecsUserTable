import { User } from "../User/model";

const BASE_URL = "https://dummyjson.com/users";
const selectFields =
  "id,firstName,lastName,maidenName,age,gender,email,height,weight,phone,address";

export const getUsers = async (
  limit: number,
  skip: number
): Promise<User[]> => {
  const response = await fetch(
    `${BASE_URL}?limit=${limit}&skip=${skip}&select=${selectFields}`
  );
  if (!response.ok) {
    throw new Error("Ошибка загрузки пользователей");
  }
  const data = await response.json();
  return data.users;
};
//На самом деле нужно полностью написать Value, чтобы в filter попало хоть какое то точное значение:)
//Бред да и только, поэтому сделал два варианта: Один - фильтрация на клиенте, вторая через filter..
export const FindInfo = async (key: string, value: string): Promise<User[]> => {
  const response = await fetch(
    `${BASE_URL}/filter?key=${encodeURIComponent(
      key
    )}&value=${encodeURIComponent(value)}&select=${encodeURIComponent(
      selectFields
    )}`
  );
  if (!response.ok) {
    throw new Error("Ошибка поиска");
  }
  const data = await response.json();
  return data.users;
};
