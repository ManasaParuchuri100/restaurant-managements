const API_BASE_URL = 'http://localhost:5000/api';

export interface Customer {
  CustomerID: number;
  Name: string;
  Phone: string;
  Email: string;
  Address: string;
}

export interface Restaurant {
  RestaurantID: number;
  Name: string;
  Location: string;
  Phone: string;
}

export interface MenuItem {
  ItemID: number;
  Name: string;
  Price: number;
  RestaurantID: number;
  RestaurantName?: string;
}

export interface Order {
  OrderID: number;
  CustomerID: number;
  RestaurantID: number;
  OrderDate: string;
  TotalAmount: number;
  CustomerName?: string;
  RestaurantName?: string;
}

export interface Payment {
  PaymentID: number;
  OrderID: number;
  PaymentDate: string;
  PaymentMethod: string;
  Amount: number;
}

export interface Employee {
  EmployeeID: number;
  Name: string;
  Position: string;
  Salary: number;
  RestaurantID: number;
  RestaurantName?: string;
}

export const api = {
  getCustomers: async (): Promise<Customer[]> => {
    const response = await fetch(`${API_BASE_URL}/customers`);
    return response.json();
  },
  
  getRestaurants: async (): Promise<Restaurant[]> => {
    const response = await fetch(`${API_BASE_URL}/restaurants`);
    return response.json();
  },
  
  getMenuItems: async (): Promise<MenuItem[]> => {
    const response = await fetch(`${API_BASE_URL}/menu-items`);
    return response.json();
  },
  
  getOrders: async (): Promise<Order[]> => {
    const response = await fetch(`${API_BASE_URL}/orders`);
    return response.json();
  },
  
  getPayments: async (): Promise<Payment[]> => {
    const response = await fetch(`${API_BASE_URL}/payments`);
    return response.json();
  },
  
  getEmployees: async (): Promise<Employee[]> => {
    const response = await fetch(`${API_BASE_URL}/employees`);
    return response.json();
  },
  
  getOrdersByRestaurant: async (restaurantId: number) => {
    const response = await fetch(`${API_BASE_URL}/orders/restaurant/${restaurantId}`);
    return response.json();
  },
  
  getCustomerTotalSpent: async (customerId: number) => {
    const response = await fetch(`${API_BASE_URL}/customers/${customerId}/total-spent`);
    return response.json();
  }
};
