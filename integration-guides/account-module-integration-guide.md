# Account Module Integration Guide

This guide provides detailed instructions for frontend developers to integrate with the Account Module functionality.

## Table of Contents
1. [API Endpoints](#api-endpoints)
2. [Account Types](#account-types)
3. [Balances](#balances)
4. [Request/Response Formats](#request-response-formats)
5. [Implementation Examples](#implementation-examples)
6. [Error Handling](#error-handling)
7. [Best Practices](#best-practices)

## API Endpoints

### Account Endpoints

#### Base URL
```
/api/accounts
```

#### Available Endpoints

1. **Create Account**
   - Endpoint: `/api/accounts`
   - Method: `POST`
   - Authentication: Required
   - Description: Create a new financial account
   - Request Body:
     ```json
     {
       "name": "string",
       "type": "string",
       "initialBalance": "number"
     }
     ```
   - Response:
     ```json
     {
       "success": true,
       "message": "Account created successfully"
     }
     ```

2. **Get All Accounts**
   - Endpoint: `/api/accounts`
   - Method: `GET`
   - Authentication: Required
   - Description: Get paginated list of user's accounts
   - Query Parameters:
     - `page` (default: 0)
     - `size` (default: 10)
   - Response:
     ```json
     {
       "content": [
         {
           "id": "number",
           "name": "string",
           "type": "string",
           "initialBalance": "number",
           "createdAt": "string",
           "updatedAt": "string"
         }
       ],
       "page": "number",
       "size": "number",
       "totalElements": "number",
       "totalPages": "number",
       "last": "boolean"
     }
     ```

3. **Get Account By ID**
   - Endpoint: `/api/accounts/{accountId}`
   - Method: `GET`
   - Authentication: Required
   - Description: Get details of a specific account
   - Response:
     ```json
     {
       "id": "number",
       "name": "string",
       "type": "string",
       "initialBalance": "number",
       "createdAt": "string",
       "updatedAt": "string"
     }
     ```

4. **Update Account**
   - Endpoint: `/api/accounts/{accountId}`
   - Method: `PUT`
   - Authentication: Required
   - Description: Update an existing account
   - Request Body: Same as Create Account
   - Response: Account object

5. **Delete Account**
   - Endpoint: `/api/accounts/{accountId}`
   - Method: `DELETE`
   - Authentication: Required
   - Description: Delete an account
   - Response:
     ```json
     {
       "success": true,
       "message": "Account deleted successfully"
     }
     ```

6. **Get Account Balance**
   - Endpoint: `/api/accounts/{accountId}/balance`
   - Method: `GET`
   - Authentication: Required
   - Description: Get the current balance of an account
   - Response: Balance amount (number)

### Balance Endpoints

#### Base URL
```
/api/balances
```

#### Available Endpoints

1. **Get Balances By Account**
   - Endpoint: `/api/balances/account/{accountId}`
   - Method: `GET`
   - Authentication: Required
   - Description: Get paginated list of balance records for an account
   - Query Parameters:
     - `page` (default: 0)
     - `size` (default: 10)
   - Response: Paginated list of Balance objects

2. **Get Balance By Transaction**
   - Endpoint: `/api/balances/transaction/{transactionId}`
   - Method: `GET`
   - Authentication: Required
   - Description: Get balance record associated with a transaction
   - Response: Balance object

3. **Get Balance By Goal**
   - Endpoint: `/api/balances/goal/{goalId}`
   - Method: `GET`
   - Authentication: Required
   - Description: Get balance record associated with a goal
   - Response: Balance object

4. **Get Total Balance**
   - Endpoint: `/api/balances/summary`
   - Method: `GET`
   - Authentication: Required
   - Description: Get total balance across all accounts
   - Response: Total balance amount (number)

5. **Get Balances By Account Type**
   - Endpoint: `/api/balances/summary/by-account-type`
   - Method: `GET`
   - Authentication: Required
   - Description: Get total balance for each account type
   - Response:
     ```json
     {
       "CHECKING": "number",
       "SAVINGS": "number",
       "CREDIT_CARD": "number",
       ...
     }
     ```

## Account Types

The API supports any string value for account type, but common types include:

- `CHECKING`
- `SAVINGS`
- `CREDIT_CARD`
- `CASH`
- `INVESTMENT`
- `RETIREMENT`
- `LOAN`
- `MORTGAGE`

Frontend developers can implement drop-down menus or radio buttons with these predefined options, or allow users to enter custom account types.

## Implementation Examples

### Create Account
```javascript
async function createAccount(accountData) {
  try {
    const response = await fetch('/api/accounts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: accountData.name,
        type: accountData.type,
        initialBalance: parseFloat(accountData.initialBalance)
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create account');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
}
```

### Get All Accounts
```javascript
async function getAccounts(page = 0, size = 10) {
  try {
    const response = await fetch(`/api/accounts?page=${page}&size=${size}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch accounts');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
}
```

### Get Account Balance
```javascript
async function getAccountBalance(accountId) {
  try {
    const response = await fetch(`/api/accounts/${accountId}/balance`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch account balance');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching account balance:', error);
    throw error;
  }
}
```

### Get Total Balance
```javascript
async function getTotalBalance() {
  try {
    const response = await fetch('/api/balances/summary', {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch total balance');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching total balance:', error);
    throw error;
  }
}
```

## React Components

### Account List Component
```javascript
import React, { useState, useEffect } from 'react';
import { useAuth } from './authContext';

function AccountList() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchAccounts();
  }, [token]);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/accounts', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch accounts');
      }

      const data = await response.json();
      setAccounts(data.content);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading accounts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="account-list">
      <h2>Your Accounts</h2>
      {accounts.length === 0 ? (
        <p>No accounts found. Create your first account to get started.</p>
      ) : (
        <div className="accounts-grid">
          {accounts.map(account => (
            <div key={account.id} className="account-card">
              <h3>{account.name}</h3>
              <div className="account-type">{account.type}</div>
              <div className="account-balance">
                <AccountBalance accountId={account.id} />
              </div>
              <div className="account-actions">
                <button onClick={() => /* Navigate to account details */}>
                  Details
                </button>
                <button onClick={() => /* Navigate to edit account */}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="add-account-btn" onClick={() => /* Open create account form */}>
        Add New Account
      </button>
    </div>
  );
}

function AccountBalance({ accountId }) {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(`/api/accounts/${accountId}/balance`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch balance');
        }

        const data = await response.json();
        setBalance(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [accountId, token]);

  if (loading) return <span>Loading...</span>;
  
  return (
    <span className="balance-amount">
      ${balance !== null ? balance.toFixed(2) : 'N/A'}
    </span>
  );
}
```

### Account Form Component
```javascript
import React, { useState } from 'react';
import { useAuth } from './authContext';

function AccountForm({ onSuccess, initialData = null }) {
  const isEditing = !!initialData;
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    type: initialData?.type || 'CHECKING',
    initialBalance: initialData?.initialBalance || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const accountTypes = [
    'CHECKING',
    'SAVINGS',
    'CREDIT_CARD',
    'CASH',
    'INVESTMENT',
    'RETIREMENT',
    'LOAN',
    'MORTGAGE'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = isEditing 
        ? `/api/accounts/${initialData.id}` 
        : '/api/accounts';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          initialBalance: parseFloat(formData.initialBalance)
        })
      });

      if (!response.ok) {
        throw new Error(isEditing 
          ? 'Failed to update account' 
          : 'Failed to create account'
        );
      }

      // Reset form if creating new account
      if (!isEditing) {
        setFormData({
          name: '',
          type: 'CHECKING',
          initialBalance: ''
        });
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Account Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          maxLength={100}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="type">Account Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          {accountTypes.map(type => (
            <option key={type} value={type}>
              {type.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="initialBalance">Initial Balance</label>
        <input
          type="number"
          id="initialBalance"
          name="initialBalance"
          value={formData.initialBalance}
          onChange={handleChange}
          step="0.01"
          required
          min="0"
        />
      </div>
      
      <button type="submit" disabled={loading}>
        {loading 
          ? (isEditing ? 'Updating...' : 'Creating...') 
          : (isEditing ? 'Update Account' : 'Create Account')
        }
      </button>
      
      {error && <div className="error">{error}</div>}
    </form>
  );
}
```

### Account Dashboard Component
```javascript
import React, { useState, useEffect } from 'react';
import { useAuth } from './authContext';

function AccountDashboard() {
  const [totalBalance, setTotalBalance] = useState(null);
  const [balancesByType, setBalancesByType] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchBalanceSummaries = async () => {
      try {
        setLoading(true);
        
        // Fetch total balance
        const totalResponse = await fetch('/api/balances/summary', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!totalResponse.ok) {
          throw new Error('Failed to fetch total balance');
        }

        const totalData = await totalResponse.json();
        setTotalBalance(totalData);
        
        // Fetch balances by account type
        const typeResponse = await fetch('/api/balances/summary/by-account-type', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!typeResponse.ok) {
          throw new Error('Failed to fetch balances by type');
        }

        const typeData = await typeResponse.json();
        setBalancesByType(typeData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBalanceSummaries();
  }, [token]);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="account-dashboard">
      <div className="total-balance">
        <h2>Total Balance</h2>
        <div className="balance-amount">${totalBalance?.toFixed(2) || '0.00'}</div>
      </div>
      
      <div className="balance-by-type">
        <h3>Balances by Account Type</h3>
        {Object.keys(balancesByType).length === 0 ? (
          <p>No accounts found</p>
        ) : (
          <ul>
            {Object.entries(balancesByType).map(([type, balance]) => (
              <li key={type}>
                <span className="account-type">{type}</span>
                <span className="type-balance">${balance.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
```

## Error Handling

The API returns standard HTTP status codes:

- `200 OK`: Request successful
- `201 Created`: Account created successfully
- `400 Bad Request`: Invalid input parameters
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Account not found
- `500 Internal Server Error`: Server error

Example error handling:

```javascript
async function handleAccountApiError(response) {
  if (!response.ok) {
    const error = await response.json();
    switch (response.status) {
      case 400:
        throw new Error(error.message || 'Invalid account data');
      case 401:
        throw new Error('Please login to continue');
      case 403:
        throw new Error('You do not have permission to perform this action');
      case 404:
        throw new Error('Account not found');
      default:
        throw new Error('An error occurred while processing your request');
    }
  }
  return response;
}
```

## Best Practices

1. **Account Management**
   - Validate account names and types on the client-side
   - Ensure initial balance is a valid number
   - Format currency values consistently (e.g., always show 2 decimal places)
   - Implement proper loading states for account operations

2. **Balance Display**
   - Format balances with appropriate currency symbols and decimal places
   - Use different colors for positive and negative balances
   - Show loading indicators while fetching balance information
   - Cache balance data when appropriate to reduce API calls

3. **Account Types**
   - Provide a predefined list of common account types
   - Allow custom account types when needed
   - Use appropriate icons for different account types
   - Group accounts by type in the UI for better organization

4. **User Experience**
   - Confirm before deleting accounts
   - Provide clear success and error messages
   - Implement responsive design for account list and details
   - Make account management intuitive with clear navigation

5. **Performance**
   - Implement pagination for large account lists
   - Cache account data when appropriate
   - Optimize API calls to minimize network traffic
   - Implement proper error handling for all account operations

This guide covers the essential aspects of integrating with the Account Module. For specific use cases or additional features, please refer to the API documentation or contact the backend team. 