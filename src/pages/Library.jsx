import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Package } from 'lucide-react';
import { addItem, getItems, getCategories, updateItem, deleteItem } from '../lib/database';
import AddItemModal from '../components/ui/AddItemModal';

const Library = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [filterCategory, setFilterCategory] = useState('');
    const [editingItem, setEditingItem] = useState(null);

    // Load items and categories on component mount
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        console.log("loadData loading ...");
        setLoading(true);
        try {
            console.log("trying to get items ...");
            const [itemsResult, categoriesResult] = await Promise.all([
                getItems(),
                getCategories()
            ]);

            if (itemsResult.success) {
                setItems(itemsResult.data);
            }
            if (categoriesResult.success) {
                setCategories(categoriesResult.data);
            }
            console.log("loadData loaded ...");
            console.log("Items: ", items);
            console.log("Categories: ", categories);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle adding new item
    const handleAddItem = async (itemData) => {
        console.log("handleAddItem itemData: ", itemData);
        try {
            console.log("handleAddItem adding item ...");
            const result = await addItem(itemData);
            if (result.success) {
                await loadData(); // Refresh the list
                setShowAddModal(false);
                alert('Item added successfully!');
            } else {
                alert('Error adding item: ' + result.error);
            }
        } catch (error) {
            alert('Error adding item: ' + error.message);
        }
    };

    // Handle editing item
    const handleEditItem = async (itemData) => {
        try {
            const result = await updateItem(editingItem.id, itemData);
            if (result.success) {
                await loadData(); // Refresh the list
                setEditingItem(null);
                alert('Item updated successfully!');
            } else {
                alert('Error updating item: ' + result.error);
            }
        } catch (error) {
            alert('Error updating item: ' + error.message);
        }
    };

    // Handle deleting item
    const handleDeleteItem = async (itemId) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                const result = await deleteItem(itemId);
                if (result.success) {
                    await loadData(); // Refresh the list
                    alert('Item deleted successfully!');
                } else {
                    alert('Error deleting item: ' + result.error);
                }
            } catch (error) {
                alert('Error deleting item: ' + error.message);
            }
        }
    };

    // Filter and sort items
    const filteredAndSortedItems = items
        .filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !filterCategory || item.categoryId === filterCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price':
                    return a.price - b.price;
                case 'stock':
                    return a.stock - b.stock;
                default:
                    return 0;
            }
        });

    // Get category name by ID
    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Unknown';
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="p-8">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Library</h1>
                <p className="text-gray-600">Manage your inventory items</p>
            </div>

            {/* Controls */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Sort By */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="name">Sort by Name</option>
                        <option value="price">Sort by Price</option>
                        <option value="stock">Sort by Stock</option>
                    </select>

                    {/* Filter by Category */}
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Add New Item Button */}
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Item</span>
                </button>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <Package className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm text-gray-500">{getCategoryName(item.categoryId)}</span>
                                </div>
                                <div className="flex space-x-1">
                                    <button
                                        onClick={() => setEditingItem(item)}
                                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteItem(item.id)}
                                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Price:</span>
                                    <span className="font-semibold text-green-600">{formatCurrency(item.price)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Stock:</span>
                                    <span className={`font-semibold ${item.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                                        {item.stock} units
                                    </span>
                                </div>
                            </div>

                            {item.stock < 10 && (
                                <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                                    Low stock warning!
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredAndSortedItems.length === 0 && (
                <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
                    <p className="text-gray-600 mb-4">
                        {searchTerm || filterCategory ? 'Try adjusting your search or filters.' : 'Start by adding your first item.'}
                    </p>
                    {!searchTerm && !filterCategory && (
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add Your First Item</span>
                        </button>
                    )}
                </div>
            )}

            {/* Add Item Modal */}
            {showAddModal && (
                <AddItemModal
                    categories={categories}
                    onClose={() => setShowAddModal(false)}
                    onSubmit={handleAddItem}
                />
            )}

            {/* Edit Item Modal */}
            {editingItem && (
                <AddItemModal
                    categories={categories}
                    onClose={() => setEditingItem(null)}
                    onSubmit={handleEditItem}
                    editingItem={editingItem}
                />
            )}
        </div>
    );
};

export default Library;