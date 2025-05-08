# Expense Module Integration Guide

This guide provides detailed instructions for frontend developers to integrate with the Expense Module functionality.

## Table of Contents
1. [API Endpoints](#api-endpoints)
2. [Expense Management](#expense-management)
3. [Filtering and Sorting](#filtering-and-sorting)
4. [Request/Response Formats](#request-response-formats)
5. [Implementation Examples](#implementation-examples)
6. [Error Handling](#error-handling)

## API Endpoints

### Base URL
```
/api/expenses
```

### Available Endpoints

1. **Create Expense**
   - Endpoint: `/api/expenses`
   - Method: `POST`
   - Authentication: Required
   - Description: Create a new expense
   - Request Body:
     ```json
     {
       "amount": "number",
       "category": "string",
       "description": "string",
       "date": "string (ISO 8601)"
     }
     ```
   - Response:
     ```json
     {
       "id": "number",
       "userId": "number",
       "amount": "number",
       "category": "string",
       "description": "string",
       "date": "string (ISO 8601)",
       "createdAt": "string",
       "updatedAt": "string"
     }
     ```

2. **Get Expense**
   - Endpoint: `/api/expenses/{expenseId}`
   - Method: `GET`
   - Authentication: Required
   - Description: Get details of a specific expense
   - Response: ExpenseResponse object

3. **Get All Expenses**
   - Endpoint: `/api/expenses`
   - Method: `GET`
   - Authentication: Required
   - Description: Get paginated list of expenses
   - Query Parameters:
     - `page` (default: 0)
     - `size` (default: 10)
     - `sortBy` (default: "date")
     - `direction` (default: "DESC")
   - Response:
     ```json
     {
       "content": [
         {
           "id": "number",
           "userId": "number",
           "amount": "number",
           "category": "string",
           "description": "string",
           "date": "string",
           "createdAt": "string",
           "updatedAt": "string"
         }
       ],
       "pageNumber": "number",
       "pageSize": "number",
       "totalElements": "number",
       "totalPages": "number",
       "last": "boolean"
     }
     ```

4. **Get Expenses by Category**
   - Endpoint: `/api/expenses/category/{category}`
   - Method: `GET`
   - Authentication: Required
   - Description: Get paginated list of expenses by category
   - Query Parameters: Same as Get All Expenses

5. **Get Expenses by Date Range**
   - Endpoint: `/api/expenses/date-range`
   - Method: `GET`
   - Authentication: Required
   - Description: Get paginated list of expenses within a date range
   - Query Parameters:
     - `startDate` (ISO 8601)
     - `endDate` (ISO 8601)
     - Standard pagination parameters

6. **Get User Categories**
   - Endpoint: `/api/expenses/categories`
   - Method: `GET`
   - Authentication: Required
   - Description: Get list of unique expense categories for the user
   - Response:
     ```json
     ["category1", "category2", ...]
     ```

7. **Update Expense**
   - Endpoint: `/api/expenses/{expenseId}`
   - Method: `PUT`
   - Authentication: Required
   - Description: Update an existing expense
   - Request Body: Same as Create Expense

8. **Delete Expense**
   - Endpoint: `/api/expenses/{expenseId}`
   - Method: `DELETE`
   - Authentication: Required
   - Description: Delete an expense
   - Response:
     ```json
     {
       "success": true,
       "message": "Expense deleted successfully"
     }
     ```

## Implementation Examples

### Create Expense
```javascript
async function createExpense(expenseData) {
  try {
    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: expenseData.amount,
        category: expenseData.category,
        description: expenseData.description,
        date: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create expense');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating expense:', error);
    throw error;
  }
}
```

### Get Expenses with Filtering
```javascript
async function getExpenses({ page = 0, size = 10, category, startDate, endDate }) {
  try {
    let url = `/api/expenses?page=${page}&size=${size}`;
    
    if (category) {
      url = `/api/expenses/category/${category}?page=${page}&size=${size}`;
    } else if (startDate && endDate) {
      url = `/api/expenses/date-range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&page=${page}&size=${size}`;
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch expenses');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
}
```

## React Components

### Expense List Component
```javascript
import React, { useState, useEffect } from 'react';
import { useAuth } from './authContext';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { token } = useAuth();

  useEffect(() => {
    fetchExpenses();
  }, [page, token]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`/api/expenses?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }

      const data = await response.json();
      setExpenses(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Expenses</h2>
      <div className="expense-list">
        {expenses.map(expense => (
          <div key={expense.id} className="expense-item">
            <div className="expense-amount">${expense.amount}</div>
            <div className="expense-category">{expense.category}</div>
            <div className="expense-date">
              {new Date(expense.date).toLocaleDateString()}
            </div>
            <div className="expense-description">{expense.description}</div>
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

### Expense Form Component
```javascript
import React, { useState } from 'react';
import { useAuth } from './authContext';

function ExpenseForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create expense');
      }

      setFormData({
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          step="0.01"
          name="amount"
          value={formData.amount}
          onChange={e => setFormData({...formData, amount: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={e => setFormData({...formData, category: e.target.value})}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={e => setFormData({...formData, date: e.target.value})}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Expense'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
```

## Error Handling

The API returns standard HTTP status codes:

- `200 OK`: Request successful
- `201 Created`: Expense created successfully
- `400 Bad Request`: Invalid input parameters
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Expense not found
- `500 Internal Server Error`: Server error

Example error handling:

```javascript
async function handleExpenseApiError(response) {
  if (!response.ok) {
    const error = await response.json();
    switch (response.status) {
      case 400:
        throw new Error(error.message || 'Invalid expense data');
      case 401:
        // Handle unauthorized access
        throw new Error('Please login to continue');
      case 403:
        throw new Error('You do not have permission to perform this action');
      case 404:
        throw new Error('Expense not found');
      default:
        throw new Error('An error occurred while processing your request');
    }
  }
  return response;
}
```

## Best Practices

1. **Data Validation**
   - Validate amount is positive
   - Ensure category is not empty
   - Validate date format
   - Trim strings before submission

2. **State Management**
   - Keep expense list in a central store
   - Update list after successful operations
   - Implement proper loading states

3. **Performance**
   - Implement pagination
   - Cache expense categories
   - Debounce form submissions
   - Optimize API calls

4. **UX Considerations**
   - Show loading states
   - Provide clear error messages
   - Confirm before delete
   - Show success messages
   - Enable sorting and filtering

5. **Security**
   - Always include authentication token
   - Validate user permissions
   - Sanitize user inputs

This guide covers the essential aspects of integrating with the Expense Module. For specific use cases or additional features, please refer to the API documentation or contact the backend team. 