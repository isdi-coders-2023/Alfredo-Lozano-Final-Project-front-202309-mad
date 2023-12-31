import { Beer } from '../../models/beer.model';
import { User, UserLogin } from '../../models/user.model';
import { LoginResponse } from '../../types/login.user';

export class ApiRepoUsers {
  apiUrl = 'http://localhost:1969/user/';
  userToken: string | null;

  constructor() {
    this.userToken = localStorage.getItem('user') || null;
  }

  async login(loginUser: UserLogin): Promise<LoginResponse> {
    const url = this.apiUrl + 'login';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(loginUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async loginWithToken(token: string): Promise<LoginResponse> {
    console.log(token);
    const url = this.apiUrl + 'login';
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async registerUser(newUser: Partial<User>): Promise<User> {
    const url = this.apiUrl + 'register';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async getUserbyID(_id: User['id']): Promise<User> {
    const userID = JSON.parse(this.userToken!);
    const url = this.apiUrl + userID.id;
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async addBeertoTaste(beer: Beer['id']): Promise<User> {
    const url = this.apiUrl + 'addBeer/' + beer;
    const usertoken = JSON.parse(this.userToken!);
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + usertoken.token,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async delBeertoTaste(beer: Beer['id']): Promise<User> {
    const url = this.apiUrl + 'delBeer/' + beer;
    const usertoken = JSON.parse(this.userToken!);
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + usertoken.token,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }
}
