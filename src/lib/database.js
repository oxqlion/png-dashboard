// src/lib/database.js
import { 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc, 
    query, 
    where, 
    orderBy, 
    onSnapshot,
    serverTimestamp,
    increment
  } from 'firebase/firestore';
  import { db } from './firebaseConfig';
  
  // ========== ITEMS COLLECTION ==========
  
  // Add new item
  export const addItem = async (itemData) => {
    try {
      const docRef = await addDoc(collection(db, 'items'), {
        ...itemData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isActive: true
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error adding item:', error);
      return { success: false, error: error.message };
    }
  };
  
  // Get all items
  export const getItems = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'items'), where('isActive', '==', true))
      );
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: items };
    } catch (error) {
      console.error('Error getting items:', error);
      return { success: false, error: error.message };
    }
  };
  
  // Get items with real-time updates
  export const subscribeToItems = (callback) => {
    const q = query(
      collection(db, 'items'), 
      where('isActive', '==', true),
      orderBy('name')
    );
    
    return onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      callback(items);
    });
  };
  
  // Update item
  export const updateItem = async (itemId, updateData) => {
    try {
      const itemRef = doc(db, 'items', itemId);
      await updateDoc(itemRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating item:', error);
      return { success: false, error: error.message };
    }
  };
  
  // Delete item (soft delete)
  export const deleteItem = async (itemId) => {
    try {
      const itemRef = doc(db, 'items', itemId);
      await updateDoc(itemRef, {
        isActive: false,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error deleting item:', error);
      return { success: false, error: error.message };
    }
  };
  
  // ========== CATEGORIES COLLECTION ==========
  
  // Add new category
  export const addCategory = async (categoryData) => {
    try {
      const docRef = await addDoc(collection(db, 'categories'), {
        ...categoryData,
        createdAt: serverTimestamp(),
        isActive: true
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error adding category:', error);
      return { success: false, error: error.message };
    }
  };
  
  // Get all categories
  export const getCategories = async () => {
    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, 'categories'), 
          where('isActive', '==', true),
          orderBy('sortOrder')
        )
      );
      const categories = [];
      querySnapshot.forEach((doc) => {
        categories.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: categories };
    } catch (error) {
      console.error('Error getting categories:', error);
      return { success: false, error: error.message };
    }
  };
  
  // ========== TRANSACTIONS COLLECTION ==========
  
  // Add new transaction
  export const addTransaction = async (transactionData) => {
    try {
      // Generate transaction number
      const transactionNumber = `TXN-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
      
      const docRef = await addDoc(collection(db, 'transactions'), {
        ...transactionData,
        transactionNumber,
        createdAt: serverTimestamp(),
        status: 'completed'
      });
  
      // Update item stock
      for (const item of transactionData.items) {
        const itemRef = doc(db, 'items', item.itemId);
        await updateDoc(itemRef, {
          stock: increment(-item.quantity)
        });
      }
  
      return { success: true, id: docRef.id, transactionNumber };
    } catch (error) {
      console.error('Error adding transaction:', error);
      return { success: false, error: error.message };
    }
  };
  
  // Get transactions for dashboard analytics
  export const getTransactionsForPeriod = async (startDate, endDate) => {
    try {
      const q = query(
        collection(db, 'transactions'),
        where('createdAt', '>=', startDate),
        where('createdAt', '<=', endDate),
        where('status', '==', 'completed'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const transactions = [];
      querySnapshot.forEach((doc) => {
        transactions.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: transactions };
    } catch (error) {
      console.error('Error getting transactions:', error);
      return { success: false, error: error.message };
    }
  };
  
  // ========== DASHBOARD ANALYTICS ==========
  
  // Calculate dashboard metrics from transactions
  export const calculateDashboardMetrics = (transactions) => {
    if (!transactions || transactions.length === 0) {
      return {
        grossSales: 0,
        netSales: 0,
        grossProfit: 0,
        transactionCount: 0,
        averageTransaction: 0,
        grossMargin: 0
      };
    }
  
    const grossSales = transactions.reduce((sum, txn) => sum + (txn.totalAmount || 0), 0);
    const totalCost = transactions.reduce((sum, txn) => sum + (txn.totalCost || 0), 0);
    const grossProfit = grossSales - totalCost;
    const transactionCount = transactions.length;
    const averageTransaction = grossSales / transactionCount;
    const grossMargin = grossSales > 0 ? (grossProfit / grossSales) * 100 : 0;
  
    return {
      grossSales: Math.round(grossSales),
      netSales: Math.round(grossSales), // Assuming no returns for now
      grossProfit: Math.round(grossProfit),
      transactionCount,
      averageTransaction: Math.round(averageTransaction),
      grossMargin: Math.round(grossMargin * 100) / 100
    };
  };
  
  // Get hourly sales data for charts
  export const getHourlySalesData = (transactions) => {
    const hourlyData = Array.from({ length: 24 }, (_, i) => ({ hour: i, sales: 0 }));
    
    transactions.forEach(txn => {
      if (txn.createdAt && txn.createdAt.toDate) {
        const hour = txn.createdAt.toDate().getHours();
        hourlyData[hour].sales += txn.totalAmount || 0;
      }
    });
  
    // Normalize data to -1 to 1 range for chart
    const maxSales = Math.max(...hourlyData.map(d => d.sales));
    return hourlyData.map(d => ({
      ...d,
      sales: maxSales > 0 ? (d.sales / maxSales) : 0
    }));
  };
  
  // Get daily sales data for charts
  export const getDailySalesData = (transactions) => {
    const dailyData = {
      Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0
    };
    
    transactions.forEach(txn => {
      if (txn.createdAt && txn.createdAt.toDate) {
        const day = txn.createdAt.toDate().toLocaleDateString('en-US', { weekday: 'short' });
        if (dailyData.hasOwnProperty(day)) {
          dailyData[day] += txn.totalAmount || 0;
        }
      }
    });
  
    // Convert to array and normalize
    const dataArray = Object.entries(dailyData).map(([day, sales]) => ({ day, sales }));
    const maxSales = Math.max(...dataArray.map(d => d.sales));
    
    return dataArray.map(d => ({
      ...d,
      sales: maxSales > 0 ? (d.sales / maxSales) : 0
    }));
  };
  
  // ========== UTILITY FUNCTIONS ==========
  
  // Format currency for display
  export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Format number with thousand separators
  export const formatNumber = (number) => {
    return new Intl.NumberFormat('id-ID').format(number);
  };