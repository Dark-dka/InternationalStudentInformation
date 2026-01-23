const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
  };
}

interface ApiError {
  error?: string;
  detail?: string;
  message?: string;
}

class ApiService {
  private getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  private removeToken(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // Token expired, try to refresh
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            this.setToken(data.access);
            localStorage.setItem('refresh_token', data.refresh);
            
            // Retry original request
            const retryHeaders: Record<string, string> = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.access}`,
              ...(options.headers as Record<string, string> || {}),
            };
            const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
              ...options,
              headers: retryHeaders,
            });
            
            if (!retryResponse.ok) {
              throw new Error('Request failed after token refresh');
            }
            
            return retryResponse.json();
          }
        } catch (error) {
          this.removeToken();
          throw new Error('Authentication failed');
        }
      }
      
      this.removeToken();
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({}));
      throw new Error(error.error || error.detail || error.message || 'Request failed');
    }

    return response.json();
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({}));
      throw new Error(error.error || error.detail || 'Login failed');
    }

    const data: LoginResponse = await response.json();
    this.setToken(data.access);
    localStorage.setItem('refresh_token', data.refresh);
    return data;
  }

  logout(): void {
    this.removeToken();
  }

  async getStudents(search?: string): Promise<any[]> {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    const data = await this.request<any>(`/students${query}`);
    // Ensure we return an array
    return Array.isArray(data) ? data : (data?.results || []);
  }

  async getStudent(id: string): Promise<any> {
    return this.request<any>(`/students/${id}/`);
  }

  async createStudent(student: any): Promise<any> {
    return this.request<any>('/students/', {
      method: 'POST',
      body: JSON.stringify(student),
    });
  }

  async updateStudent(id: string, student: any): Promise<any> {
    return this.request<any>(`/students/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(student),
    });
  }

  async deleteStudent(id: string): Promise<void> {
    return this.request<void>(`/students/${id}/`, {
      method: 'DELETE',
    });
  }

  async getStats(): Promise<{
    totalStudents: number;
    fullyPaid: number;
    expiringRegistration: number;
    dormitoryResidents: number;
  }> {
    return this.request('/students/stats/');
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    return this.request<{ message: string }>('/auth/change-password/', {
      method: 'POST',
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });
  }
}

export const apiService = new ApiService();
