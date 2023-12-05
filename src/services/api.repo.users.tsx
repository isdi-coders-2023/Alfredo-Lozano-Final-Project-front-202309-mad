import { UserLogin } from '../models/user.model';
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
}
