import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package,
  Layers,
  Star,
  Sparkles,
  AlertCircle,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreVertical,
  Eye,
  X,
  Upload,
  Image as ImageIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { api } from '../../lib/api';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { useToast } from '../../components/ui/Toast';
import type { Product, Category, Brand, ProductFormData, DashboardStats } from '../../types';
import { fadeInUp, staggerContainer } from '../../lib/animations';

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products'>('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);
  const { addToast } = useToast();

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    brand_id: '',
    category_id: '',
    image_url: '',
    price: 0,
    quantity: 0,
    availability: 'In Stock',
    short_description: '',
    full_description: '',
    specifications: {},
    features: [],
    warranty: '',
    sku: '',
    is_featured: false,
    is_best_seller: false,
    is_new_arrival: false,
    compatible_brands: [],
    tags: [],
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [statsData, productsData, categoriesData, brandsData] = await Promise.all([
        api.getDashboardStats(),
        api.getProducts(),
        api.getCategories(),
        api.getBrands(),
      ]);
      setStats(statsData);
      setProducts(productsData);
      setCategories(categoriesData);
      setBrands(brandsData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      addToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, image_url: result.secure_url }));
      addToast('Image uploaded successfully', 'success');
    } catch (error) {
      console.error('Error uploading image:', error);
      addToast('Failed to upload image', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct.id, formData);
        addToast('Product updated successfully', 'success');
      } else {
        await api.createProduct(formData);
        addToast('Product created successfully', 'success');
      }
      setShowModal(false);
      resetForm();
      fetchAllData();
    } catch (error) {
      console.error('Error saving product:', error);
      addToast('Failed to save product', 'error');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      brand_id: product.brand_id || '',
      category_id: product.category_id || '',
      image_url: product.image_url || '',
      price: product.price,
      quantity: product.quantity,
      availability: product.availability,
      short_description: product.short_description || '',
      full_description: product.full_description || '',
      specifications: product.specifications || {},
      features: product.features || [],
      warranty: product.warranty || '',
      sku: product.sku || '',
      is_featured: product.is_featured,
      is_best_seller: product.is_best_seller,
      is_new_arrival: product.is_new_arrival,
      compatible_brands: product.compatible_brands || [],
      tags: product.tags || [],
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.deleteProduct(id);
      addToast('Product deleted successfully', 'success');
      fetchAllData();
    } catch (error) {
      console.error('Error deleting product:', error);
      addToast('Failed to delete product', 'error');
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      brand_id: '',
      category_id: '',
      image_url: '',
      price: 0,
      quantity: 0,
      availability: 'In Stock',
      short_description: '',
      full_description: '',
      specifications: {},
      features: [],
      warranty: '',
      sku: '',
      is_featured: false,
      is_best_seller: false,
      is_new_arrival: false,
      compatible_brands: [],
      tags: [],
    });
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_authenticated');
    addToast('Logged out successfully', 'success');
    navigate('/');
  };

  const statCards = [
    { label: 'Total Products', value: stats?.totalProducts || 0, icon: Package, color: 'from-primary-500 to-primary-600' },
    { label: 'Categories', value: stats?.totalCategories || 0, icon: Layers, color: 'from-green-500 to-green-600' },
    { label: 'Featured', value: stats?.featuredProducts || 0, icon: Star, color: 'from-yellow-500 to-yellow-600' },
    { label: 'New Arrivals', value: stats?.newArrivals || 0, icon: Sparkles, color: 'from-blue-500 to-blue-600' },
    { label: 'Best Sellers', value: stats?.bestSellers || 0, icon: TrendingUp, color: 'from-accent-500 to-accent-600' },
    { label: 'Out of Stock', value: stats?.outOfStock || 0, icon: AlertCircle, color: 'from-red-500 to-red-600' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white min-h-screen border-r border-gray-200 sticky top-20">
          <div className="p-6">
            <h1 className="font-display font-bold text-xl text-gray-900 mb-6">Admin Panel</h1>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Package className="w-5 h-5" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === 'products'
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Layers className="w-5 h-5" />
                Products
              </button>
            </nav>

            {/* Logout */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display font-bold text-2xl text-gray-900">Dashboard</h2>
                <Link to="/" className="btn-secondary text-sm">
                  View Website
                </Link>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {statCards.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeInUp}
                    className="bg-white rounded-2xl p-6 shadow-card"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                        <p className="font-display font-bold text-3xl text-gray-900 mt-1">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Products */}
              <div className="bg-white rounded-2xl shadow-card p-6">
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                  Recent Products
                </h3>
                <div className="space-y-4">
                  {products.slice(0, 5).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="w-full h-full p-3 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.brand?.name}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display font-bold text-2xl text-gray-900">Products</h2>
                <button
                  onClick={() => {
                    resetForm();
                    setShowModal(true);
                  }}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Product
                </button>
              </div>

              {/* Search & Filters */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-4 font-medium text-gray-600">Product</th>
                      <th className="text-left px-6 py-4 font-medium text-gray-600">Category</th>
                      <th className="text-left px-6 py-4 font-medium text-gray-600">Brand</th>
                      <th className="text-left px-6 py-4 font-medium text-gray-600">Price</th>
                      <th className="text-left px-6 py-4 font-medium text-gray-600">Status</th>
                      <th className="text-right px-6 py-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden">
                              {product.image_url ? (
                                <img
                                  src={product.image_url}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <ImageIcon className="w-full h-full p-3 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-500">SKU: {product.sku || 'N/A'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{product.category?.name}</td>
                        <td className="px-6 py-4 text-gray-600">{product.brand?.name}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              product.availability === 'In Stock'
                                ? 'bg-green-100 text-green-700'
                                : product.availability === 'Low Stock'
                                ? 'bg-yellow-100 text-yellow-700'
                                : product.availability === 'Out of Stock'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {product.availability}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/products/${product.slug}`}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <Eye className="w-5 h-5 text-gray-500" />
                            </Link>
                            <button
                              onClick={() => handleEdit(product)}
                              className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit className="w-5 h-5 text-blue-500" />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-5 h-5 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="font-display font-semibold text-xl">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image
                </label>
                <div className="flex items-center gap-4">
                  {formData.image_url ? (
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
                      <img
                        src={formData.image_url}
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, image_url: '' }))}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 transition-colors">
                      {uploading ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent" />
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-gray-400" />
                          <span className="text-sm text-gray-500 mt-1">Upload</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={uploading}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData((prev) => ({ ...prev, sku: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Category & Brand */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category_id: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <select
                    value={formData.brand_id}
                    onChange={(e) => setFormData((prev) => ({ ...prev, brand_id: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price, Quantity, Availability */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: parseFloat(e.target.value) }))}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData((prev) => ({ ...prev, quantity: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <select
                    value={formData.availability}
                    onChange={(e) => setFormData((prev) => ({ ...prev, availability: e.target.value as any }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Pre-Order">Pre-Order</option>
                  </select>
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                <input
                  type="text"
                  value={formData.short_description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, short_description: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
                <textarea
                  value={formData.full_description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, full_description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Warranty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Warranty</label>
                <input
                  type="text"
                  value={formData.warranty}
                  onChange={(e) => setFormData((prev) => ({ ...prev, warranty: e.target.value }))}
                  placeholder="e.g., 2 Years"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData((prev) => ({ ...prev, is_featured: e.target.checked }))}
                    className="w-5 h-5 rounded-lg border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured Product</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_best_seller}
                    onChange={(e) => setFormData((prev) => ({ ...prev, is_best_seller: e.target.checked }))}
                    className="w-5 h-5 rounded-lg border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Best Seller</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_new_arrival}
                    onChange={(e) => setFormData((prev) => ({ ...prev, is_new_arrival: e.target.checked }))}
                    className="w-5 h-5 rounded-lg border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">New Arrival</span>
                </label>
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
