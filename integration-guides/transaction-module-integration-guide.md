# Transaction Module Integration Guide

This guide provides detailed instructions for frontend developers to integrate with the Transaction Module functionality.

## Table of Contents
1. [API Endpoints](#api-endpoints)
2. [Transaction Types and Statuses](#transaction-types-and-statuses)
3. [Filtering and Sorting](#filtering-and-sorting)
4. [Request/Response Formats](#request-response-formats)
5. [Implementation Examples](#implementation-examples)
6. [Error Handling](#error-handling)
7. [Best Practices](#best-practices)

## API Endpoints

### Base URL
```
/api/transactions
```

### Available Endpoints

1. **Create Transaction**
   - Endpoint: `/api/transactions`
   - Method: `POST`
   - Authentication: Required
   - Description: Create a new transaction
   - Request Body:
     ```json
     {
       "amount": "number",
       "type": "CREDIT | DEBIT | TRANSFER",
       "description": "string",
       "category": "string",
       "date": "string (ISO 8601)",
       "status": "PENDING | COMPLETED | FAILED"
     }
     ```
   - Response:
     ```json
     {
       "success": true,
       "message": "Transaction created successfully"
     }
     ```

2. **Get Transaction**
   - Endpoint: `/api/transactions/{transactionId}`
   - Method: `GET`
   - Authentication: Required
   - Description: Get details of a specific transaction
   - Response:
     ```json
     {
       "id": "number",
       "userId": "number",
       "amount": "number",
       "type": "CREDIT | DEBIT | TRANSFER",
       "description": "string",
       "category": "string",
       "date": "string (ISO 8601)",
       "status": "PENDING | COMPLETED | FAILED",
       "createdAt": "string",
       "updatedAt": "string"
     }
     ```

3. **Get All Transactions**
   - Endpoint: `/api/transactions`
   - Method: `GET`
   - Authentication: Required
   - Description: Get paginated list of transactions
   - Query Parameters:
     - `page` (default: 0)
     - `size` (default: 10)
     - `type` (optional): Filter by transaction type
     - `category` (optional): Filter by category
     - `status` (optional): Filter by status
     - `startDate` (optional): Filter by start date (ISO 8601)
     - `endDate` (optional): Filter by end date (ISO 8601)
   - Response:
     ```json
     {
       "content": [
         {
           "id": "number",
           "userId": "number",
           "amount": "number",
           "type": "CREDIT | DEBIT | TRANSFER",
           "description": "string",
           "category": "string",
           "date": "string (ISO 8601)",
           "status": "PENDING | COMPLETED | FAILED",
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

4. **Update Transaction**
   - Endpoint: `/api/transactions/{transactionId}`
   - Method: `PUT`
   - Authentication: Required
   - Description: Update an existing transaction
   - Request Body: Same as Create Transaction
   - Response: Transaction object

5. **Delete Transaction**
   - Endpoint: `/api/transactions/{transactionId}`
   - Method: `DELETE`
   - Authentication: Required
   - Description: Delete a transaction
   - Response:
     ```json
     {
       "success": true,
       "message": "Transaction deleted successfully"
     }
     ```

## Transaction Types and Statuses

### Transaction Types
The API supports the following transaction types:

- `CREDIT`: Money coming into the account
- `DEBIT`: Money going out of the account
- `TRANSFER`: Money moving between accounts

### Transaction Statuses
The API supports the following transaction statuses:

- `PENDING`: Transaction is in progress
- `COMPLETED`: Transaction has been completed successfully
- `FAILED`: Transaction has failed

## Filtering and Sorting

The Transaction API supports various filtering options:

1. **Filter by Transaction Type**
   - Parameter: `type`
   - Example: `/api/transactions?type=CREDIT`

2. **Filter by Category**
   - Parameter: `category`
   - Example: `/api/transactions?category=Groceries`

3. **Filter by Status**
   - Parameter: `status`
   - Example: `/api/transactions?status=COMPLETED`

4. **Filter by Date Range**
   - Parameters: `startDate` and `endDate`
   - Example: `/api/transactions?startDate=2023-01-01T00:00:00Z&endDate=2023-01-31T23:59:59Z`

5. **Pagination**
   - Parameters: `page` and `size`
   - Example: `/api/transactions?page=0&size=20`

## Implementation Examples

### Create Transaction
```javascript
async function createTransaction(transactionData) {
  try {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: transactionData.amount,
        type: transactionData.type,
        description: transactionData.description,
        category: transactionData.category,
        date: new Date().toISOString(),
        status: transactionData.status || 'PENDING'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create transaction');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
}
```

### Get Transactions with Filtering
```javascript
async function getTransactions(filters = {}) {
  try {
    let url = '/api/transactions?';
    
    // Add filters to URL if they exist
    if (filters.page !== undefined) url += `page=${filters.page}&`;
    if (filters.size !== undefined) url += `size=${filters.size}&`;
    if (filters.type) url += `type=${filters.type}&`;
    if (filters.category) url += `category=${filters.category}&`;
    if (filters.status) url += `status=${filters.status}&`;
    if (filters.startDate) url += `startDate=${filters.startDate.toISOString()}&`;
    if (filters.endDate) url += `endDate=${filters.endDate.toISOString()}&`;
    
    // Remove trailing '&' if present
    url = url.endsWith('&') ? url.slice(0, -1) : url;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}
```

### Update Transaction
```javascript
async function updateTransaction(id, transactionData) {
  try {
    const response = await fetch(`/api/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transactionData)
    });

    if (!response.ok) {
      throw new Error('Failed to update transaction');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
}
```

## React Components

### Transaction List Component
```javascript
import React, { useState, useEffect } from 'react';
import { useAuth } from './authContext';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    status: '',
  });
  const { token } = useAuth();

  useEffect(() => {
    fetchTransactions();
  }, [page, filters, token]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: page,
        size: 10
      });
      
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.status) queryParams.append('status', filters.status);
      
      const response = await fetch(`/api/transactions?${queryParams.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();
      setTransactions(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPage(0); // Reset to first page when filter changes
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Transactions</h2>
      
      <div className="filters">
        <select 
          name="type" 
          value={filters.type} 
          onChange={handleFilterChange}
        >
          <option value="">All Types</option>
          <option value="CREDIT">Credit</option>
          <option value="DEBIT">Debit</option>
          <option value="TRANSFER">Transfer</option>
        </select>
        
        <select 
          name="status" 
          value={filters.status} 
          onChange={handleFilterChange}
        >
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
          <option value="FAILED">Failed</option>
        </select>
        
        {/* Additional filters could be added here */}
      </div>
      
      <div className="transaction-list">
        {transactions.map(transaction => (
          <div key={transaction.id} className="transaction-item">
            <div className={`transaction-amount ${transaction.type.toLowerCase()}`}>
              {transaction.type === 'CREDIT' ? '+' : '-'} ${transaction.amount}
            </div>
            <div className="transaction-type">{transaction.type}</div>
            <div className="transaction-category">{transaction.category}</div>
            <div className="transaction-date">
              {new Date(transaction.date).toLocaleDateString()}
            </div>
            <div className={`transaction-status ${transaction.status.toLowerCase()}`}>
              {transaction.status}
            </div>
            <div className="transaction-description">{transaction.description}</div>
          </div>
        ))}
      </div>
      
      <div className="pagination">
        <button
          onClick={() => setPage(p => p - 1)}
          disabled={page === 0}
        >
          Previous
        </button>
        <span>Page {page + 1} of {totalPages}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={page === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

### Transaction Form Component
```javascript
import React, { useState } from 'react';
import { useAuth } from './authContext';

function TransactionForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    amount: '',
    type: 'DEBIT',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    status: 'COMPLETED'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
          date: new Date(formData.date).toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }

      // Reset form
      setFormData({
        amount: '',
        type: 'DEBIT',
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        status: 'COMPLETED'
      });

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
      <div>
        <label>Amount:</label>
        <input
          type="number"
          step="0.01"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label>Type:</label>
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="CREDIT">Credit</option>
          <option value="DEBIT">Debit</option>
          <option value="TRANSFER">Transfer</option>
        </select>
      </div>
      
      <div>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
          <option value="FAILED">Failed</option>
        </select>
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Transaction'}
      </button>
      
      {error && <div className="error">{error}</div>}
    </form>
  );
}
```

## Error Handling

The API returns standard HTTP status codes:

- `200 OK`: Request successful
- `201 Created`: Transaction created successfully
- `400 Bad Request`: Invalid input parameters
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Transaction not found
- `500 Internal Server Error`: Server error

Example error handling:

```javascript
async function handleTransactionApiError(response) {
  if (!response.ok) {
    const error = await response.json();
    switch (response.status) {
      case 400:
        // Handle validation errors
        throw new Error(error.message || 'Invalid transaction data');
      case 401:
        // Handle unauthorized access
        throw new Error('Please login to continue');
      case 403:
        // Handle forbidden access
        throw new Error('You do not have permission to perform this action');
      case 404:
        // Handle not found
        throw new Error('Transaction not found');
      default:
        // Handle other errors
        throw new Error('An error occurred while processing your request');
    }
  }
  return response;
}
```

## Best Practices

1. **Transaction Types**
   - Use appropriate transaction types (CREDIT, DEBIT, TRANSFER)
   - Implement visual indicators for different transaction types (colors, icons)

2. **Transaction Statuses**
   - Handle all possible transaction statuses
   - Update transaction status when appropriate
   - Show clear status indicators to users

3. **Data Validation**
   - Validate amount is positive
   - Ensure required fields are present
   - Validate date format
   - Use proper data types for fields

4. **UX Considerations**
   - Show loading states during API calls
   - Implement clear success/error messages
   - Confirm before deleting transactions
   - Implement filters for better data navigation
   - Use date pickers for date ranges

5. **Performance**
   - Implement pagination for transaction lists
   - Cache commonly used data when appropriate
   - Optimize API calls by using filters

6. **Security**
   - Always include authentication token
   - Validate user permissions
   - Do not expose sensitive transaction details

This guide covers the essential aspects of integrating with the Transaction Module. For specific use cases or additional features, please refer to the API documentation or contact the backend team. 