import { FindInfo, getUsers } from "../API/api";

export interface User {
  id: number;
  firstName: string; //Имя
  lastName: string; //Фамилия
  maidenName: string; //Отчество
  age: number;
  gender: string;
  email: string; // Email-адрес
  height: number; // Рост
  weight: number; // Вес
  phone: string;
  address: {
    city: string;
    address: string;
  };
}

class TableStore {
  User: User[] = [];
  //Получение списка пользователей
  async getuserTable(): Promise<User[]> {
    try {
      this.User = await getUsers(1000,0);
      return this.User;
    } catch (error: any) {
      console.log("Ошибка получения списка пользователей ", error);
      return [];
    }
  }
  async filterUser( key:string, value: string): Promise<User[]> {
    try {
      this.User = await FindInfo(key,value);
      return this.User;
    } catch (error: any) {
      return [];
    }
  }
}
export const userTable = new TableStore();
