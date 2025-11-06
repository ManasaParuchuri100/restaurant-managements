import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomersTable from '@/components/CustomersTable';
import RestaurantsTable from '@/components/RestaurantsTable';
import MenuItemsTable from '@/components/MenuItemsTable';
import OrdersTable from '@/components/OrdersTable';
import PaymentsTable from '@/components/PaymentsTable';
import EmployeesTable from '@/components/EmployeesTable';
import { UtensilsCrossed } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <UtensilsCrossed className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Restaurant Management System</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="customers" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
            <TabsTrigger value="menu">Menu Items</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
          </TabsList>

          <TabsContent value="customers">
            <CustomersTable />
          </TabsContent>

          <TabsContent value="restaurants">
            <RestaurantsTable />
          </TabsContent>

          <TabsContent value="menu">
            <MenuItemsTable />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTable />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentsTable />
          </TabsContent>

          <TabsContent value="employees">
            <EmployeesTable />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;
