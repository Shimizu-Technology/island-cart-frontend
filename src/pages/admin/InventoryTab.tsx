import React, { useState } from 'react';
import { Upload, Edit2, Check, X } from 'lucide-react';
import { mockItems } from '../../data/mockData';
import { Item } from '../../types';
import { PrimaryButton } from '../../components/shared/PrimaryButton';

export const InventoryTab: React.FC = () => {
  const [items, setItems] = useState<Item[]>(mockItems);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.name.endsWith('.csv'));
    
    if (csvFile) {
      handleCSVUpload(csvFile);
    }
  };

  const handleCSVUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;
      const lines = csv.split('\n');
      const headers = lines[0].split(',');
      
      const newItems: Item[] = lines.slice(1).map((line, index) => {
        const values = line.split(',');
        return {
          id: `csv-${index}`,
          name: values[0] || '',
          price: parseFloat(values[1]) || 0,
          category: values[2] || 'Other',
          image: values[3] || 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: values[4] || '',
          inStock: true
        };
      }).filter(item => item.name); // Filter out empty rows
      
      setItems(prev => [...prev, ...newItems]);
      console.log('CSV uploaded successfully');
    };
    reader.readAsText(file);
  };

  const handleEditPrice = (itemId: string, currentPrice: number) => {
    setEditingItem(itemId);
    setEditPrice(currentPrice.toString());
  };

  const handleSavePrice = (itemId: string) => {
    const newPrice = parseFloat(editPrice);
    if (!isNaN(newPrice) && newPrice > 0) {
      setItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, price: newPrice } : item
        )
      );
    }
    setEditingItem(null);
    setEditPrice('');
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditPrice('');
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Bulk Upload</h2>
        
        <div
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
            dragActive 
              ? 'border-ocean-teal-500 bg-ocean-teal-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            Drop CSV file here or click to upload
          </p>
          <p className="text-sm text-gray-500 mb-4">
            CSV format: name, price, category, image_url, description
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleCSVUpload(file);
            }}
            className="hidden"
            id="csv-upload"
          />
          <label htmlFor="csv-upload">
            <PrimaryButton variant="secondary">
              Choose File
            </PrimaryButton>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Inventory ({items.length} items)</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Product</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Price</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Stock</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{item.category}</td>
                  <td className="py-3 px-4">
                    {editingItem === item.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                          step="0.01"
                          min="0"
                        />
                        <button
                          onClick={() => handleSavePrice(item.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">${item.price.toFixed(2)}</span>
                        <button
                          onClick={() => handleEditPrice(item.id, item.price)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => {
                        setItems(prev => 
                          prev.map(i => 
                            i.id === item.id ? { ...i, inStock: !i.inStock } : i
                          )
                        );
                      }}
                      className="text-ocean-teal-600 hover:text-ocean-teal-700 text-sm font-medium"
                    >
                      Toggle Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};