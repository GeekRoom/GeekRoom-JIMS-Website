const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        let errorMessage = `API Error: ${response.statusText}`;
        try {
            const errData = await response.json();
            if (errData.message) errorMessage = errData.message;
        } catch {
            // Ignore if not JSON
        }
        const error = new Error(errorMessage);
        error.status = response.status;
        throw error;
    }
    return response.json();
};

export const api = {
    get: async (endpoint) => {
        const token = localStorage.getItem('adminToken');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });
        return handleResponse(response);
    },

    post: async (endpoint, data, isFormData = false) => {
        const token = localStorage.getItem('adminToken');
        const headers = isFormData ? {} : { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        
        const body = isFormData ? data : JSON.stringify(data);

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body
        });

        return handleResponse(response);
    },

    put: async (endpoint, data, isFormData = false) => {
        const token = localStorage.getItem('adminToken');
        const headers = isFormData ? {} : { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        
        const body = isFormData ? data : JSON.stringify(data);

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers,
            body
        });

        return handleResponse(response);
    },

    delete: async (endpoint) => {
        const token = localStorage.getItem('adminToken');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers
        });

        return handleResponse(response);
    }
};
