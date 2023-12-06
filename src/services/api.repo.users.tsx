import { User, UserLogin } from '../models/user.model';
import { LoginResponse } from '../types/login.user';

export class ApiRepoUsers {
  apiUrl = 'http://localhost:1969/user';

  async login(loginUser: UserLogin): Promise<LoginResponse> {
    const url = this.apiUrl + '/login';
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

  async registerUser(newUser: Partial<User>): Promise<User> {
    const url = this.apiUrl + '/register';
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
}
