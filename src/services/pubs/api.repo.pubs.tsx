import { Pubs } from '../../models/pub.model';

export class ApiRepoPubs {
  apiUrl = 'http://localhost:1969/pubs';

  async createPub(newPub: Partial<Pubs>): Promise<Pubs> {
    const url = this.apiUrl + '/add';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newPub),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }
}
