/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../features/products/product.slice";
import { PlusCircle, Edit, Trash2, X, Check, Loader } from "lucide-react";
import { ProductType } from "../types/product.type";
import toast from 'react-hot-toast'

const Product = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: any) => state.products);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: 0,
    stock: 0,
    category: "",
    data: {}
  });

  useEffect(() => {
    dispatch(getAllProducts() as any);
  }, [dispatch]);

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      price: 0,
      stock: 0,
      category: "",
      data: {}
    });
    setEditingId(null);
  };

  const handleOpenForm = (product: ProductType | null = null) => {
    if (product) {
      setFormData(product);
      setEditingId(product.id);
    } else {
      resetForm();
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    resetForm();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateProduct(formData) as any).then(() => {
        dispatch(getAllProducts() as any);
      });
    } else {
      dispatch(createProduct(formData) as any);
    }
    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id) as any).then(() => {
        dispatch(getAllProducts() as any);
      });
    }
  };

  if (error) {
    console.log("wahyu --> ", "Error")
    const errorMessage = error.message || "Oops, Something when Wrong";
    toast.error(errorMessage, {
      style: {
        border: '1px solid #ef4444',
        padding: '16px',
        color: '#b91c1c',
      },
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fef2f2',
      },
    })
  }

  if (loading && !products) {
    console.log("wahyu -->", "loading")
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin h-6 w-6 text-indigo-500" />
        <span className="ml-2 text-gray-600">Loading products...</span>
      </div>
    );
  }

  return (
    <div className="font-sans bg-white rounded-xl shadow-sm p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-teal-700">Product Management</h1>
        <button
          className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg flex items-center transition-colors"
          onClick={() => handleOpenForm()}
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Products Table */}
      {products?.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                {["ID", "Name", "Price", "Stock", "Category", "Actions"].map((header) => (
                  <th
                    key={header}
                    className="px-5 py-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {products.map((product: ProductType) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 text-sm text-gray-600">{product.id}</td>
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-5 py-4 text-sm text-gray-900">${product.price}</td>
                  <td className="px-5 py-4 text-sm text-gray-900">{product.stock}</td>
                  <td className="px-5 py-4 text-sm text-gray-900">{product.category}</td>
                  <td className="px-5 py-4 text-right space-x-3">
                    <button
                      onClick={() => handleOpenForm(product)}
                      className="text-teal-600 hover:text-teal-800 transition-colors"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
          No products found
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {editingId ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={handleCloseForm}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {["name", "category"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-gray-900"
                    required
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-gray-900"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 mt-8">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-6 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg flex items-center transition-colors text-teal-700"
                >
                  <Check className="h-5 w-5 mr-2" />
                  {editingId ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )

};

export default Product;