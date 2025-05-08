# Authentication Integration Guide

This guide provides detailed instructions for frontend developers to integrate with the authentication system.

## Table of Contents
1. [API Endpoints](#api-endpoints)
2. [Authentication Flow](#authentication-flow)
3. [Request/Response Formats](#request-response-formats)
4. [Token Management](#token-management)
5. [Protected Routes](#protected-routes)
6. [Error Handling](#error-handling)

## API Endpoints

### Base URL
```
/api/auth
```

### Available Endpoints

1. **Sign Up**
   - Endpoint: `/api/auth/signup`
   - Method: `POST`
   - Description: Register a new user
   - Request Body:
     ```json
     {
       "firstName": "string",
       "lastName": "string",
       "username": "string",
       "email": "string",
       "password": "string"
     }
     ```
   - Response:
     ```json
     {
       "success": true,
       "message": "User registered successfully"
     }
     ```

2. **Sign In**
   - Endpoint: `/api/auth/signin`
   - Method: `POST`
   - Description: Authenticate user and get JWT token
   - Request Body:
     ```json
     {
       "usernameOrEmail": "string",
       "password": "string"
     }
     ```
   - Response:
     ```json
     {
       "accessToken": "string",
       "tokenType": "Bearer"
     }
     ```

3. **Check Username Availability**
   - Endpoint: `/api/users/checkUsernameAvailability`
   - Method: `GET`
   - Query Parameter: `username`
   - Response:
     ```json
     {
       "available": true
     }
     ```

4. **Check Email Availability**
   - Endpoint: `/api/users/checkEmailAvailability`
   - Method: `GET`
   - Query Parameter: `email`
   - Response:
     ```json
     {
       "available": true
     }
     ```

## Authentication Flow

1. **Registration Flow**
   ```javascript
   async function registerUser(userData) {
     try {
       const response = await fetch('/api/auth/signup', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(userData)
       });
       
       if (!response.ok) {
         throw new Error('Registration failed');
       }
       
       return await response.json();
     } catch (error) {
       // Handle error
     }
   }
   ```

2. **Login Flow**
   ```javascript
   async function loginUser(credentials) {
     try {
       const response = await fetch('/api/auth/signin', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(credentials)
       });
       
       if (!response.ok) {
         throw new Error('Login failed');
       }
       
       const data = await response.json();
       // Store the token
       localStorage.setItem('token', data.accessToken);
       return data;
     } catch (error) {
       // Handle error
     }
   }
   ```

## Token Management

1. **Store Token**
   ```javascript
   function storeToken(token) {
     localStorage.setItem('token', token);
   }
   ```

2. **Get Token**
   ```javascript
   function getToken() {
     return localStorage.getItem('token');
   }
   ```

3. **Remove Token**
   ```javascript
   function removeToken() {
     localStorage.removeItem('token');
   }
   ```

4. **Add Token to Requests**
   ```javascript
   function getAuthHeaders() {
     const token = getToken();
     return {
       'Authorization': `Bearer ${token}`,
       'Content-Type': 'application/json'
     };
   }
   ```

## Protected Routes

For protected API calls, always include the JWT token in the Authorization header:

```javascript
async function fetchProtectedResource(url) {
  try {
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        // Handle unauthorized access
        // Redirect to login or refresh token
      }
      throw new Error('Request failed');
    }
    
    return await response.json();
  } catch (error) {
    // Handle error
  }
}
```

## Error Handling

The API returns standard HTTP status codes:

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication failed or token expired
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

Example error handling:

```javascript
async function handleApiError(response) {
  if (!response.ok) {
    const error = await response.json();
    switch (response.status) {
      case 400:
        // Handle validation errors
        break;
      case 401:
        // Handle unauthorized access
        // Redirect to login
        break;
      case 403:
        // Handle forbidden access
        break;
      case 404:
        // Handle not found
        break;
      default:
        // Handle other errors
        break;
    }
    throw new Error(error.message || 'An error occurred');
  }
  return response;
}
```

## Best Practices

1. **Token Storage**
   - Store tokens in localStorage or sessionStorage based on security requirements
   - Consider using secure HTTP-only cookies for better security

2. **Token Expiration**
   - Handle token expiration gracefully
   - Implement token refresh mechanism if needed
   - Redirect to login page when token is invalid

3. **Security**
   - Always use HTTPS in production
   - Implement CSRF protection if needed
   - Sanitize user inputs
   - Implement rate limiting on the client side

4. **Error Handling**
   - Implement proper error handling for all API calls
   - Show user-friendly error messages
   - Log errors for debugging

5. **State Management**
   - Use a state management solution (Redux, Context API, etc.) to manage auth state
   - Keep auth state in sync across components
   - Implement loading states for better UX

## Example Implementation with React

```javascript
// authContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (credentials) => {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setToken(data.accessToken);
        localStorage.setItem('token', data.accessToken);
        // Fetch user details and set user state
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

```javascript
// PrivateRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

export const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return children;
};
```

```javascript
// App.js
import { AuthProvider } from './authContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
```

This guide covers the essential aspects of integrating with the authentication system. For specific use cases or additional features, please refer to the API documentation or contact the backend team. 