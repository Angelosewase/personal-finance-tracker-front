# User Module Integration Guide

This guide provides detailed instructions for frontend developers to integrate with the User Module functionality.

## Table of Contents
1. [API Endpoints](#api-endpoints)
2. [User Profile Management](#user-profile-management)
3. [Admin Operations](#admin-operations)
4. [Request/Response Formats](#request-response-formats)
5. [Error Handling](#error-handling)

## API Endpoints

### Base URL
```
/api/users
```

### Available Endpoints

1. **Get Current User**
   - Endpoint: `/api/users/me`
   - Method: `GET`
   - Authentication: Required
   - Description: Get the current user's summary information
   - Response:
     ```json
     {
       "id": "number",
       "username": "string",
       "firstName": "string",
       "lastName": "string"
     }
     ```

2. **Get User Profile**
   - Endpoint: `/api/users/{username}/profile`
   - Method: `GET`
   - Authentication: Required
   - Description: Get detailed profile information for a user
   - Response:
     ```json
     {
       "id": "number",
       "username": "string",
       "firstName": "string",
       "lastName": "string",
       "joinedAt": "string",
       "email": "string",
       "address": {
         "street": "string",
         "suite": "string",
         "city": "string",
         "zipcode": "string",
         "geo": {
           "lat": "string",
           "lng": "string"
         }
       },
       "phone": "string",
       "website": "string",
       "company": {
         "name": "string",
         "catchPhrase": "string",
         "bs": "string"
       }
     }
     ```

3. **Update User Profile**
   - Endpoint: `/api/users/{username}`
   - Method: `PUT`
   - Authentication: Required
   - Description: Update user profile information
   - Access: User can update their own profile or Admin can update any profile
   - Request Body:
     ```json
     {
       "firstName": "string",
       "lastName": "string",
       "password": "string",
       "address": {
         "street": "string",
         "suite": "string",
         "city": "string",
         "zipcode": "string",
         "geo": {
           "lat": "string",
           "lng": "string"
         }
       },
       "phone": "string",
       "website": "string",
       "company": {
         "name": "string",
         "catchPhrase": "string",
         "bs": "string"
       }
     }
     ```

4. **Set or Update User Info**
   - Endpoint: `/api/users/setOrUpdateInfo`
   - Method: `PUT`
   - Authentication: Required
   - Description: Update user's additional information
   - Request Body:
     ```json
     {
       "street": "string",
       "suite": "string",
       "city": "string",
       "zipcode": "string",
       "lat": "string",
       "lng": "string",
       "phone": "string",
       "website": "string",
       "companyName": "string",
       "catchPhrase": "string",
       "bs": "string"
     }
     ```

5. **Delete User**
   - Endpoint: `/api/users/{username}`
   - Method: `DELETE`
   - Authentication: Required
   - Description: Delete a user account
   - Access: User can delete their own account or Admin can delete any account
   - Response:
     ```json
     {
       "success": true,
       "message": "User deleted successfully"
     }
     ```

## Admin Operations

These endpoints are only accessible to users with ADMIN role:

1. **Add New User**
   - Endpoint: `/api/users`
   - Method: `POST`
   - Authentication: Required (ADMIN only)
   - Request Body: Complete user object

2. **Give Admin Rights**
   - Endpoint: `/api/users/{username}/giveAdmin`
   - Method: `PUT`
   - Authentication: Required (ADMIN only)
   - Response:
     ```json
     {
       "success": true,
       "message": "Admin rights granted successfully"
     }
     ```

3. **Remove Admin Rights**
   - Endpoint: `/api/users/{username}/takeAdmin`
   - Method: `PUT`
   - Authentication: Required (ADMIN only)
   - Response:
     ```json
     {
       "success": true,
       "message": "Admin rights removed successfully"
     }
     ```

## Implementation Examples

### Get Current User Profile
```javascript
async function getCurrentUser() {
  try {
    const response = await fetch('/api/users/me', {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    
    return await response.json();
  } catch (error) {
    // Handle error
    console.error('Error fetching user profile:', error);
    throw error;
  }
}
```

### Update User Profile
```javascript
async function updateUserProfile(username, profileData) {
  try {
    const response = await fetch(`/api/users/${username}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
    
    return await response.json();
  } catch (error) {
    // Handle error
    console.error('Error updating profile:', error);
    throw error;
  }
}
```

### Set User Additional Info
```javascript
async function setUserInfo(infoData) {
  try {
    const response = await fetch('/api/users/setOrUpdateInfo', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infoData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update user info');
    }
    
    return await response.json();
  } catch (error) {
    // Handle error
    console.error('Error updating user info:', error);
    throw error;
  }
}
```

## React Component Examples

### User Profile Component
```javascript
import React, { useState, useEffect } from 'react';
import { useAuth } from './authContext';

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data</div>;

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <p>Username: {profile.username}</p>
        <p>Name: {profile.firstName} {profile.lastName}</p>
        <p>Email: {profile.email}</p>
        {profile.phone && <p>Phone: {profile.phone}</p>}
        {profile.website && <p>Website: {profile.website}</p>}
      </div>
    </div>
  );
}
```

### Profile Update Form
```javascript
import React, { useState } from 'react';
import { useAuth } from './authContext';

function ProfileUpdateForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    website: '',
    street: '',
    city: '',
    zipcode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/users/setOrUpdateInfo`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Handle success
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      {/* Add other form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Update Profile'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
```

## Error Handling

The API returns standard HTTP status codes:

- `200 OK`: Request successful
- `400 Bad Request`: Invalid input parameters
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

Example error handling:

```javascript
async function handleUserApiError(response) {
  if (!response.ok) {
    const error = await response.json();
    switch (response.status) {
      case 400:
        // Handle validation errors
        throw new Error(error.message || 'Invalid input');
      case 401:
        // Handle unauthorized access
        // Redirect to login
        throw new Error('Please login to continue');
      case 403:
        // Handle forbidden access
        throw new Error('You do not have permission to perform this action');
      case 404:
        // Handle not found
        throw new Error('User not found');
      default:
        // Handle other errors
        throw new Error('An error occurred while processing your request');
    }
  }
  return response;
}
```

## Best Practices

1. **State Management**
   - Keep user state in a central store (Redux, Context API)
   - Update user state after successful profile updates
   - Implement proper loading and error states

2. **Form Handling**
   - Implement proper form validation
   - Show validation errors clearly
   - Disable submit buttons during API calls
   - Show success/error messages

3. **Security**
   - Always include authentication token in requests
   - Validate user permissions before showing admin features
   - Handle token expiration gracefully

4. **UX Considerations**
   - Show loading states during API calls
   - Implement proper error handling and user feedback
   - Confirm before destructive actions (delete)
   - Implement proper form validation

5. **Performance**
   - Cache user profile data when appropriate
   - Implement debouncing for form submissions
   - Optimize API calls

This guide covers the essential aspects of integrating with the User Module. For specific use cases or additional features, please refer to the API documentation or contact the backend team. 