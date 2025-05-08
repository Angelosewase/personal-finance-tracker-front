# Goal Module Integration Guide

This guide provides detailed instructions for frontend developers to integrate with the Goal Module functionality.

## Table of Contents
1. [API Endpoints](#api-endpoints)
2. [Goal Statuses](#goal-statuses)
3. [Request/Response Formats](#request-response-formats)
4. [Implementation Examples](#implementation-examples)
5. [Error Handling](#error-handling)
6. [Best Practices](#best-practices)

## API Endpoints

### Base URL
```
/api/goals
```

### Available Endpoints

1. **Create Goal**
   - Endpoint: `/api/goals`
   - Method: `POST`
   - Authentication: Required
   - Description: Create a new financial goal
   - Request Body:
     ```json
     {
       "targetAmount": "number",
       "currentAmount": "number",
       "deadline": "string (ISO 8601)",
       "description": "string",
       "category": "string",
       "status": "IN_PROGRESS | COMPLETED | CANCELLED | ON_HOLD"
     }
     ```
   - Response:
     ```json
     {
       "success": true,
       "message": "Goal created successfully"
     }
     ```

2. **Get All Goals**
   - Endpoint: `/api/goals`
   - Method: `GET`
   - Authentication: Required
   - Description: Get paginated list of user's goals
   - Query Parameters:
     - `page` (default: 0)
     - `size` (default: 10)
   - Response:
     ```json
     {
       "content": [
         {
           "id": "number",
           "userId": "number",
           "targetAmount": "number",
           "currentAmount": "number",
           "deadline": "string (ISO 8601)",
           "description": "string",
           "category": "string",
           "status": "IN_PROGRESS | COMPLETED | CANCELLED | ON_HOLD",
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

3. **Get Goal By ID**
   - Endpoint: `/api/goals/{goalId}`
   - Method: `GET`
   - Authentication: Required
   - Description: Get details of a specific goal
   - Response:
     ```json
     {
       "id": "number",
       "userId": "number",
       "targetAmount": "number",
       "currentAmount": "number",
       "deadline": "string (ISO 8601)",
       "description": "string",
       "category": "string",
       "status": "IN_PROGRESS | COMPLETED | CANCELLED | ON_HOLD",
       "createdAt": "string",
       "updatedAt": "string"
     }
     ```

4. **Update Goal**
   - Endpoint: `/api/goals/{goalId}`
   - Method: `PUT`
   - Authentication: Required
   - Description: Update an existing goal
   - Request Body: Same as Create Goal
   - Response: Goal object

5. **Delete Goal**
   - Endpoint: `/api/goals/{goalId}`
   - Method: `DELETE`
   - Authentication: Required
   - Description: Delete a goal
   - Response:
     ```json
     {
       "success": true,
       "message": "Goal deleted successfully"
     }
     ```

6. **Get Balance By Goal**
   - Endpoint: `/api/balances/goal/{goalId}`
   - Method: `GET`
   - Authentication: Required
   - Description: Get balance record associated with a goal
   - Response: Balance object

## Goal Statuses

The API supports the following goal statuses:

- `IN_PROGRESS`: Goal is currently active and being worked towards
- `COMPLETED`: Goal has been achieved
- `CANCELLED`: Goal has been abandoned or cancelled
- `ON_HOLD`: Goal is temporarily paused

## Implementation Examples

### Create Goal
```javascript
async function createGoal(goalData) {
  try {
    const response = await fetch('/api/goals', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        targetAmount: parseFloat(goalData.targetAmount),
        currentAmount: parseFloat(goalData.currentAmount || 0),
        deadline: new Date(goalData.deadline).toISOString(),
        description: goalData.description || '',
        category: goalData.category || '',
        status: goalData.status || 'IN_PROGRESS'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create goal');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating goal:', error);
    throw error;
  }
}
```

### Get All Goals
```javascript
async function getGoals(page = 0, size = 10) {
  try {
    const response = await fetch(`/api/goals?page=${page}&size=${size}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch goals');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw error;
  }
}
```

### Update Goal
```javascript
async function updateGoal(goalId, goalData) {
  try {
    const response = await fetch(`/api/goals/${goalId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        targetAmount: parseFloat(goalData.targetAmount),
        currentAmount: parseFloat(goalData.currentAmount),
        deadline: new Date(goalData.deadline).toISOString(),
        description: goalData.description || '',
        category: goalData.category || '',
        status: goalData.status
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update goal');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating goal:', error);
    throw error;
  }
}
```

## React Components

### Goal List Component
```javascript
import React, { useState, useEffect } from 'react';
import { useAuth } from './authContext';

function GoalList() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchGoals();
  }, [token]);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/goals', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch goals');
      }

      const data = await response.json();
      setGoals(data.content);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProgressPercentage = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusStyles = (status) => {
    const statusStyles = {
      'IN_PROGRESS': 'bg-blue-100 text-blue-800',
      'COMPLETED': 'bg-green-100 text-green-800',
      'CANCELLED': 'bg-red-100 text-red-800',
      'ON_HOLD': 'bg-yellow-100 text-yellow-800'
    };
    return statusStyles[status] || '';
  };

  if (loading) return <div>Loading goals...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="goal-list">
      <h2>Your Financial Goals</h2>
      {goals.length === 0 ? (
        <p>No goals found. Create your first goal to get started.</p>
      ) : (
        <div className="goals-grid">
          {goals.map(goal => (
            <div key={goal.id} className="goal-card">
              <div className="goal-header">
                <h3>{goal.description || `Goal #${goal.id}`}</h3>
                <span className={`goal-status ${getStatusStyles(goal.status)}`}>
                  {goal.status.replace('_', ' ')}
                </span>
              </div>
              
              <div className="goal-category">{goal.category}</div>
              
              <div className="goal-amounts">
                <div>Target: {formatCurrency(goal.targetAmount)}</div>
                <div>Current: {formatCurrency(goal.currentAmount)}</div>
              </div>
              
              <div className="goal-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${getProgressPercentage(goal.currentAmount, goal.targetAmount)}%` }}
                  ></div>
                </div>
                <div className="progress-text">
                  {getProgressPercentage(goal.currentAmount, goal.targetAmount)}%
                </div>
              </div>
              
              <div className="goal-deadline">
                Deadline: {formatDate(goal.deadline)}
              </div>
              
              <div className="goal-actions">
                <button onClick={() => /* Navigate to goal details */}>
                  Details
                </button>
                <button onClick={() => /* Navigate to edit goal */}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="add-goal-btn" onClick={() => /* Open create goal form */}>
        Add New Goal
      </button>
    </div>
  );
}
```

### Goal Form Component
```javascript
import React, { useState } from 'react';
import { useAuth } from './authContext';

function GoalForm({ onSuccess, initialData = null }) {
  const isEditing = !!initialData;
  const [formData, setFormData] = useState({
    targetAmount: initialData?.targetAmount || '',
    currentAmount: initialData?.currentAmount || '0',
    deadline: initialData?.deadline 
      ? new Date(initialData.deadline).toISOString().split('T')[0]
      : '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    status: initialData?.status || 'IN_PROGRESS'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const goalStatuses = [
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED',
    'ON_HOLD'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = isEditing 
        ? `/api/goals/${initialData.id}` 
        : '/api/goals';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const deadline = new Date(formData.deadline);
      deadline.setHours(23, 59, 59);
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          targetAmount: parseFloat(formData.targetAmount),
          currentAmount: parseFloat(formData.currentAmount),
          deadline: deadline.toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(isEditing 
          ? 'Failed to update goal' 
          : 'Failed to create goal'
        );
      }

      // Reset form if creating new goal
      if (!isEditing) {
        setFormData({
          targetAmount: '',
          currentAmount: '0',
          deadline: '',
          description: '',
          category: '',
          status: 'IN_PROGRESS'
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
        <label htmlFor="description">Goal Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          maxLength={255}
          placeholder="E.g., Buy a new car, Save for vacation"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          maxLength={50}
          placeholder="E.g., Travel, Education, Home"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="targetAmount">Target Amount*</label>
        <input
          type="number"
          id="targetAmount"
          name="targetAmount"
          value={formData.targetAmount}
          onChange={handleChange}
          step="0.01"
          required
          min="0.01"
          placeholder="0.00"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="currentAmount">Current Amount*</label>
        <input
          type="number"
          id="currentAmount"
          name="currentAmount"
          value={formData.currentAmount}
          onChange={handleChange}
          step="0.01"
          required
          min="0"
          placeholder="0.00"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="deadline">Deadline*</label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="status">Status*</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          {goalStatuses.map(status => (
            <option key={status} value={status}>
              {status.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>
      
      <button type="submit" disabled={loading}>
        {loading 
          ? (isEditing ? 'Updating...' : 'Creating...') 
          : (isEditing ? 'Update Goal' : 'Create Goal')
        }
      </button>
      
      {error && <div className="error">{error}</div>}
    </form>
  );
}
```

### Goal Progress Component
```javascript
import React, { useState, useEffect } from 'react';
import { useAuth } from './authContext';

function GoalProgress({ goalId }) {
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await fetch(`/api/goals/${goalId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch goal');
        }

        const data = await response.json();
        setGoal(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [goalId, token]);

  const getProgressPercentage = () => {
    if (!goal) return 0;
    return Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100);
  };

  const getDaysRemaining = () => {
    if (!goal) return 0;
    const deadline = new Date(goal.deadline);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getAmountRemaining = () => {
    if (!goal) return 0;
    return Math.max(goal.targetAmount - goal.currentAmount, 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) return <div>Loading goal progress...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!goal) return <div>Goal not found</div>;

  return (
    <div className="goal-progress-container">
      <h3>{goal.description || `Goal #${goal.id}`}</h3>
      
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
        <div className="progress-text">
          {getProgressPercentage()}% Complete
        </div>
      </div>
      
      <div className="goal-stats">
        <div className="stat-item">
          <span className="stat-label">Current Amount</span>
          <span className="stat-value">{formatCurrency(goal.currentAmount)}</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Target Amount</span>
          <span className="stat-value">{formatCurrency(goal.targetAmount)}</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Amount Remaining</span>
          <span className="stat-value">{formatCurrency(getAmountRemaining())}</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Days Remaining</span>
          <span className="stat-value">{getDaysRemaining()}</span>
        </div>
      </div>
      
      <div className="goal-actions">
        <button onClick={() => /* Handle goal update */}>
          Update Progress
        </button>
        {goal.status !== 'COMPLETED' && getProgressPercentage() >= 100 && (
          <button onClick={() => /* Mark goal as completed */}>
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
}
```

## Error Handling

The API returns standard HTTP status codes:

- `200 OK`: Request successful
- `201 Created`: Goal created successfully
- `400 Bad Request`: Invalid input parameters
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Goal not found
- `500 Internal Server Error`: Server error

Example error handling:

```javascript
async function handleGoalApiError(response) {
  if (!response.ok) {
    const error = await response.json();
    switch (response.status) {
      case 400:
        throw new Error(error.message || 'Invalid goal data');
      case 401:
        throw new Error('Please login to continue');
      case 403:
        throw new Error('You do not have permission to perform this action');
      case 404:
        throw new Error('Goal not found');
      default:
        throw new Error('An error occurred while processing your request');
    }
  }
  return response;
}
```

## Best Practices

1. **Goal Creation**
   - Validate target amount is positive
   - Ensure deadline is in the future
   - Provide sensible defaults for optional fields
   - Implement date pickers for deadline selection

2. **Goal Progress Tracking**
   - Show visual progress indicators (progress bars)
   - Calculate and display percentage completion
   - Show amount remaining to reach the goal
   - Display time remaining until deadline

3. **Goal Management**
   - Allow users to filter goals by status
   - Enable sorting goals by deadline, amount, or progress
   - Implement goal categories for better organization
   - Display goals in a visually appealing way (cards/lists)

4. **User Experience**
   - Implement intuitive goal creation flow
   - Show clear success and error messages
   - Enable easy updating of goal progress
   - Celebrate when goals are completed
   - Provide alerts for upcoming goal deadlines

5. **Data Visualization**
   - Use charts to show progress over time
   - Implement dashboards for goal overview
   - Show comparisons between different goals
   - Visualize goal distribution by category

This guide covers the essential aspects of integrating with the Goal Module. For specific use cases or additional features, please refer to the API documentation or contact the backend team. 