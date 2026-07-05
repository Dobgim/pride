import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, ShoppingBag, Users, Package, Settings,
  LogOut, TrendingUp, TrendingDown, Bell, Search, ChevronRight,
  Zap, Eye, Edit2, Trash2, Plus, DollarSign, ShoppingCart,
  Star, AlertTriangle, CheckCircle, Clock, BarChart3, X,
  Menu, ArrowUpRight, Filter, Download, Save, Trash
} from 'lucide-react';
import {
  loadProductsFromSupabase,
  addProductToSupabase,
  updateProductInSupabase,
  deleteProductFromSupabase,
  type Product
} from '../../data/products';
import './AdminDashboard.css';

/* ── Auth guard ── */
function useAdminGuard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem('cd_admin_auth') !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);
}

/* ── Mock statistics & data ── */
const statsData = [
  { label: 'Total Revenue', value: '£184,320', change: '+12.4%', up: true, icon: DollarSign, color: '#10b981' },
  { label: 'Orders This Month', value: '347', change: '+8.1%', up: true, icon: ShoppingCart, color: '#3b82f6' },
  { label: 'Active Customers', value: '2,841', change: '+5.3%', up: true, icon: Users, color: '#8b5cf6' },
  { label: 'Avg. Order Value', value: '£531', change: '-2.1%', up: false, icon: TrendingUp, color: '#f59e0b' },
];

const recentOrders = [
  { id: '#ORD-8821', customer: 'Margaret Thompson', product: 'RoadMaster 8', amount: '£2,499', status: 'Delivered', date: '04 Jul 2025' },
  { id: '#ORD-8820', customer: 'Robert Davies', product: 'FoldPro Ultra', amount: '£1,499', status: 'Shipped', date: '04 Jul 2025' },
  { id: '#ORD-8819', customer: 'Helen Okafor', product: 'SlimLine 3 Plus', amount: '£899', status: 'Processing', date: '03 Jul 2025' },
  { id: '#ORD-8818', customer: 'James Whitfield', product: 'CrossCountry 6+', amount: '£1,999', status: 'Delivered', date: '03 Jul 2025' },
  { id: '#ORD-8817', customer: 'Patricia Lawson', product: 'TravelLite 4', amount: '£1,149', status: 'Pending', date: '02 Jul 2025' },
  { id: '#ORD-8816', customer: 'Thomas Briggs', product: 'Terrain Pro 4WD', amount: '£2,999', status: 'Delivered', date: '02 Jul 2025' },
  { id: '#ORD-8815', customer: 'Susan Clarke', product: 'EasyGo S3', amount: '£749', status: 'Shipped', date: '01 Jul 2025' },
];

const weeklyRevenue = [62, 85, 74, 91, 88, 110, 97];
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const statusColors: Record<string, string> = {
  Delivered: 'status-green',
  Shipped: 'status-blue',
  Processing: 'status-amber',
  Pending: 'status-gray',
  Cancelled: 'status-red',
};

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const initialCustomers = [
  { name: 'Margaret Thompson', email: 'margaret.t@email.com', orders: 3, spent: '£6,241', joined: 'Jan 2024', status: 'Active' },
  { name: 'Robert Davies', email: 'r.davies@email.com', orders: 1, spent: '£1,499', joined: 'Mar 2025', status: 'Active' },
  { name: 'Helen Okafor', email: 'helen.ok@email.com', orders: 2, spent: '£2,348', joined: 'Jun 2024', status: 'Active' },
  { name: 'James Whitfield', email: 'jwhitfield@email.com', orders: 4, spent: '£8,112', joined: 'Nov 2023', status: 'VIP' },
  { name: 'Patricia Lawson', email: 'p.lawson@email.com', orders: 1, spent: '£1,149', joined: 'Jun 2025', status: 'New' },
  { name: 'Thomas Briggs', email: 'tom.briggs@email.com', orders: 2, spent: '£4,998', joined: 'Feb 2024', status: 'Active' },
];

export default function AdminDashboard() {
  useAdminGuard();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [productList, setProductList] = useState<Product[]>([]);
  const [notifications] = useState(3);
  const [loading, setLoading] = useState(false);

  // Form state for Add/Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentProductId, setCurrentProductId] = useState('');
  
  // Field states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Product['category']>('lightweight');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [badge, setBadge] = useState('');
  const [inStock, setInStock] = useState(true);
  const [image, setImage] = useState('/images/folding_lightweight.png');

  // Load from Supabase
  const refreshProducts = async () => {
    setLoading(true);
    try {
      const data = await loadProductsFromSupabase();
      setProductList(data);
    } catch (e) {
      console.error('Failed to load products:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('cd_admin_auth');
    navigate('/admin/login');
  };

  const openAddModal = () => {
    setModalMode('add');
    setName('');
    setCategory('lightweight');
    setPrice(0);
    setDescription('');
    setBadge('');
    setInStock(true);
    setImage('/images/folding_lightweight.png');
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setModalMode('edit');
    setCurrentProductId(product.id);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setDescription(product.shortDesc);
    setBadge(product.badge || '');
    setInStock(product.inStock);
    setImage(product.image);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product from Supabase?')) {
      try {
        await deleteProductFromSupabase(id);
        setProductList(prev => prev.filter(p => p.id !== id));
      } catch (e) {
        alert('Failed to delete product. Please try again.');
        console.error(e);
      }
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (modalMode === 'add') {
        const newId = `${category === 'lightweight' ? 'ls' : category === 'folding' ? 'fs' : category === 'road' ? 'rs' : 'acc'}-${Date.now()}`;
        const newProduct: Product = {
          id: newId,
          name,
          category,
          price: Number(price),
          image: image || (category === 'road' ? '/images/enclosed_cabin.png' : category === 'accessory' ? 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80' : '/images/folding_lightweight.png'),
          rating: 5.0,
          reviews: 1,
          badge: badge || undefined,
          shortDesc: description,
          features: ['Premium Quality', 'Care Drive Approved'],
          specs: {
            Category: category,
            Price: `£${price}`,
          },
          inStock,
          isNew: true,
        };

        await addProductToSupabase(newProduct);
        setProductList(prev => [...prev, newProduct]);
      } else {
        // Edit mode
        const originalProduct = productList.find(p => p.id === currentProductId);
        if (!originalProduct) return;

        const updatedProduct: Product = {
          ...originalProduct,
          name,
          category,
          price: Number(price),
          shortDesc: description,
          badge: badge || undefined,
          inStock,
          image,
        };

        await updateProductInSupabase(updatedProduct);
        setProductList(prev => prev.map(p => p.id === currentProductId ? updatedProduct : p));
      }
      setIsModalOpen(false);
    } catch (e) {
      alert('Failed to save product. Check console for details.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const maxRevenue = Math.max(...weeklyRevenue);

  // Filtered lists based on search
  const filteredProducts = productList.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`adm ${sidebarOpen ? 'adm-sidebar-open' : ''}`}>
      {/* ── Sidebar ── */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-logo">
          <div className="adm-logo-icon"><Zap size={18} /></div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: 'hidden' }}
              >
                <div className="adm-logo-text">
                  <span className="adm-logo-brand">Care Drive</span>
                  <span className="adm-logo-sub">Admin</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="adm-nav">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`adm-nav-item ${activeNav === item.id ? 'active' : ''}`}
                onClick={() => setActiveNav(item.id)}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon size={18} />
                {sidebarOpen && <span>{item.label}</span>}
                {activeNav === item.id && sidebarOpen && <ChevronRight size={14} className="adm-nav-arrow" />}
              </button>
            );
          })}
        </nav>

        <button className="adm-logout-btn" onClick={handleLogout} title="Logout">
          <LogOut size={17} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </aside>

      {/* ── Main content ── */}
      <div className="adm-main">
        {/* Topbar */}
        <header className="adm-topbar">
          <div className="adm-topbar-left">
            <button className="adm-menu-btn" onClick={() => setSidebarOpen(s => !s)}>
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="adm-search-wrap">
              <Search size={15} />
              <input
                type="text"
                placeholder="Search orders, products, customers…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="adm-topbar-right">
            <button className="adm-notif-btn" onClick={refreshProducts} title="Sync with Supabase">
              <Bell size={18} />
              {notifications > 0 && <span className="adm-notif-badge">{notifications}</span>}
            </button>
            <div className="adm-user-chip">
              <div className="adm-user-avatar">A</div>
              <div className="adm-user-info">
                <span className="adm-user-name">Administrator</span>
                <span className="adm-user-role">Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="adm-content">
          {loading && !isModalOpen && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
              <div className="alp-spinner" style={{ width: 40, height: 40, border: '4px solid rgba(255,255,255,0.1)', borderTopColor: '#10b981' }} />
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeNav}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >

              {/* ── OVERVIEW ── */}
              {activeNav === 'overview' && (
                <div>
                  <div className="adm-page-header">
                    <div>
                      <h2>Dashboard Overview</h2>
                      <p>Connected to Supabase · Products tab is ready — add your real products to get started.</p>
                    </div>
                    <div className="adm-page-actions">
                      <button className="adm-btn-outline" onClick={refreshProducts}><Download size={15} /> Refresh</button>
                      <button className="adm-btn-primary" onClick={openAddModal}><Plus size={15} /> New Product</button>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="adm-stats-grid">
                    {statsData.map((stat, i) => {
                      const Icon = stat.icon;
                      return (
                        <motion.div
                          key={stat.label}
                          className="adm-stat-card"
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.07 }}
                        >
                          <div className="adm-stat-top">
                            <div className="adm-stat-label">{stat.label}</div>
                            <div className="adm-stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                              <Icon size={18} />
                            </div>
                          </div>
                          <div className="adm-stat-value">{stat.value}</div>
                          <div className={`adm-stat-change ${stat.up ? 'up' : 'down'}`}>
                            {stat.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                            {stat.change} vs last month
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Charts + quick info */}
                  <div className="adm-charts-row">
                    {/* Revenue bar chart */}
                    <div className="adm-card adm-chart-card">
                      <div className="adm-card-header">
                        <div>
                          <h3>Weekly Revenue</h3>
                          <p>Last 7 days performance</p>
                        </div>
                        <div className="adm-card-badge green">+12.4%</div>
                      </div>
                      <div className="adm-bar-chart">
                        {weeklyRevenue.map((val, i) => (
                          <div key={i} className="adm-bar-col">
                            <div className="adm-bar-wrap">
                              <motion.div
                                className="adm-bar"
                                initial={{ height: 0 }}
                                animate={{ height: `${(val / maxRevenue) * 100}%` }}
                                transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
                              />
                            </div>
                            <span className="adm-bar-label">{weekDays[i]}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick stats */}
                    <div className="adm-quick-col">
                      <div className="adm-card adm-quick-card">
                        <h3>Product Alerts</h3>
                        <div className="adm-alert-list">
                          <div className="adm-alert-item amber">
                            <AlertTriangle size={14} /> EasyGo S3 — Low stock (2 left)
                          </div>
                          <div className="adm-alert-item amber">
                            <AlertTriangle size={14} /> Compact Fold 3 — Low stock (1 left)
                          </div>
                          <div className="adm-alert-item green">
                            <CheckCircle size={14} /> All road scooters — In stock
                          </div>
                        </div>
                      </div>
                      <div className="adm-card adm-quick-card">
                        <h3>Pending Actions</h3>
                        <div className="adm-alert-list">
                          <div className="adm-alert-item blue">
                            <Clock size={14} /> 5 orders awaiting dispatch
                          </div>
                          <div className="adm-alert-item blue">
                            <Clock size={14} /> 3 customer enquiries
                          </div>
                          <div className="adm-alert-item blue">
                            <Clock size={14} /> 2 service requests
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent orders */}
                  <div className="adm-card adm-table-card">
                    <div className="adm-card-header">
                      <div>
                        <h3>Recent Orders</h3>
                        <p>Latest 7 transactions</p>
                      </div>
                      <button className="adm-btn-text" onClick={() => setActiveNav('orders')}>
                        View all <ArrowUpRight size={14} />
                      </button>
                    </div>
                    <div className="adm-table-wrap">
                      <table className="adm-table">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.map(order => (
                            <tr key={order.id}>
                              <td className="adm-td-mono">{order.id}</td>
                              <td>{order.customer}</td>
                              <td>{order.product}</td>
                              <td className="adm-td-bold">{order.amount}</td>
                              <td><span className={`adm-status-badge ${statusColors[order.status]}`}>{order.status}</span></td>
                              <td className="adm-td-muted">{order.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ── ORDERS ── */}
              {activeNav === 'orders' && (
                <div>
                  <div className="adm-page-header">
                    <div><h2>Orders</h2><p>Manage all customer orders</p></div>
                    <div className="adm-page-actions">
                      <button className="adm-btn-outline"><Filter size={15} /> Filter</button>
                      <button className="adm-btn-outline"><Download size={15} /> Export CSV</button>
                    </div>
                  </div>
                  <div className="adm-card adm-table-card">
                    <div className="adm-table-wrap">
                      <table className="adm-table">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.map(order => (
                            <tr key={order.id}>
                              <td className="adm-td-mono">{order.id}</td>
                              <td>{order.customer}</td>
                              <td>{order.product}</td>
                              <td className="adm-td-bold">{order.amount}</td>
                              <td><span className={`adm-status-badge ${statusColors[order.status]}`}>{order.status}</span></td>
                              <td className="adm-td-muted">{order.date}</td>
                              <td>
                                <div className="adm-row-actions">
                                  <button className="adm-icon-btn view"><Eye size={14} /></button>
                                  <button className="adm-icon-btn edit"><Edit2 size={14} /></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ── PRODUCTS ── */}
              {activeNav === 'products' && (
                <div>
                  <div className="adm-page-header">
                    <div><h2>Products</h2><p>{filteredProducts.length} products in catalogue</p></div>
                    <div className="adm-page-actions">
                      <button className="adm-btn-primary" onClick={openAddModal}><Plus size={15} /> Add Product</button>
                    </div>
                  </div>
                  <div className="adm-card adm-table-card">
                    {filteredProducts.length === 0 ? (
                      <div style={{ padding: '60px 32px', textAlign: 'center' }}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
                        <h3 style={{ marginBottom: 8, fontSize: 18 }}>No products yet</h3>
                        <p style={{ color: '#9ca3af', marginBottom: 24, maxWidth: 340, margin: '0 auto 24px' }}>
                          Your catalogue is empty and ready. Click <strong>Add Product</strong> to upload your first scooter or accessory.
                        </p>
                        <button className="adm-btn-primary" onClick={openAddModal}><Plus size={15} /> Add Your First Product</button>
                      </div>
                    ) : (
                    <div className="adm-table-wrap">
                      <table className="adm-table">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th>Stock</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProducts.map(p => (
                            <tr key={p.id}>
                              <td>
                                <img src={p.image} alt={p.name} className="adm-product-thumb" />
                              </td>
                              <td>
                                <div className="adm-product-name">{p.name}</div>
                                {p.badge && <span className="adm-product-badge">{p.badge}</span>}
                              </td>
                              <td className="adm-td-cap">{p.category}</td>
                              <td className="adm-td-bold">£{p.price.toLocaleString()}</td>
                              <td>
                                <div className="adm-rating">
                                  <Star size={13} fill="#f59e0b" color="#f59e0b" />
                                  <span>{p.rating}</span>
                                  <span className="adm-td-muted">({p.reviews})</span>
                                </div>
                              </td>
                              <td>
                                <span className={`adm-status-badge ${p.inStock ? 'status-green' : 'status-red'}`}>
                                  {p.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                              </td>
                              <td>
                                <div className="adm-row-actions">
                                  <button className="adm-icon-btn edit" onClick={() => openEditModal(p)}><Edit2 size={14} /></button>
                                  <button className="adm-icon-btn delete" onClick={() => handleDeleteProduct(p.id)}>
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── CUSTOMERS ── */}
              {activeNav === 'customers' && (
                <div>
                  <div className="adm-page-header">
                    <div><h2>Customers</h2><p>{initialCustomers.length} registered customers</p></div>
                    <div className="adm-page-actions">
                      <button className="adm-btn-outline"><Download size={15} /> Export</button>
                    </div>
                  </div>
                  <div className="adm-card adm-table-card">
                    <div className="adm-table-wrap">
                      <table className="adm-table">
                        <thead>
                          <tr>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Orders</th>
                            <th>Total Spent</th>
                            <th>Joined</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {initialCustomers.map((c, i) => (
                            <tr key={i}>
                              <td>
                                <div className="adm-customer-cell">
                                  <div className="adm-customer-avatar">{c.name[0]}</div>
                                  {c.name}
                                </div>
                              </td>
                              <td className="adm-td-muted">{c.email}</td>
                              <td>{c.orders}</td>
                              <td className="adm-td-bold">{c.spent}</td>
                              <td className="adm-td-muted">{c.joined}</td>
                              <td>
                                <span className={`adm-status-badge ${c.status === 'VIP' ? 'status-amber' : c.status === 'New' ? 'status-blue' : 'status-green'}`}>
                                  {c.status}
                                </span>
                              </td>
                              <td>
                                <div className="adm-row-actions">
                                  <button className="adm-icon-btn view"><Eye size={14} /></button>
                                  <button className="adm-icon-btn edit"><Edit2 size={14} /></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ── ANALYTICS ── */}
              {activeNav === 'analytics' && (
                <div>
                  <div className="adm-page-header">
                    <div><h2>Analytics</h2><p>Performance insights for your store</p></div>
                  </div>
                  <div className="adm-stats-grid">
                    {statsData.map((stat, i) => {
                      const Icon = stat.icon;
                      return (
                        <div key={stat.label} className="adm-stat-card">
                          <div className="adm-stat-top">
                            <div className="adm-stat-label">{stat.label}</div>
                            <div className="adm-stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                              <Icon size={18} />
                            </div>
                          </div>
                          <div className="adm-stat-value">{stat.value}</div>
                          <div className={`adm-stat-change ${stat.up ? 'up' : 'down'}`}>
                            {stat.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                            {stat.change} vs last month
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="adm-card adm-chart-card" style={{ maxWidth: '100%' }}>
                    <div className="adm-card-header">
                      <div><h3>Revenue by Day</h3><p>This week's breakdown</p></div>
                    </div>
                    <div className="adm-bar-chart adm-bar-chart-lg">
                      {weeklyRevenue.map((val, i) => (
                        <div key={i} className="adm-bar-col">
                          <div className="adm-bar-val">£{val}k</div>
                          <div className="adm-bar-wrap">
                            <motion.div
                              className="adm-bar"
                              initial={{ height: 0 }}
                              animate={{ height: `${(val / maxRevenue) * 100}%` }}
                              transition={{ delay: i * 0.06, duration: 0.5 }}
                            />
                          </div>
                          <span className="adm-bar-label">{weekDays[i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── SETTINGS ── */}
              {activeNav === 'settings' && (
                <div>
                  <div className="adm-page-header">
                    <div><h2>Settings</h2><p>Manage your account and store preferences</p></div>
                  </div>
                  <div className="adm-settings-grid">
                    <div className="adm-card adm-settings-card">
                      <h3>Admin Credentials</h3>
                      <div className="adm-settings-field">
                        <label>Username</label>
                        <input type="text" defaultValue="admin" className="adm-settings-input" />
                      </div>
                      <div className="adm-settings-field">
                        <label>Display Name</label>
                        <input type="text" defaultValue="Administrator" className="adm-settings-input" />
                      </div>
                      <div className="adm-settings-field">
                        <label>Email</label>
                        <input type="email" defaultValue="admin@caredrivemobility.co.uk" className="adm-settings-input" />
                      </div>
                      <button className="adm-btn-primary" style={{ marginTop: 8 }}>Save Changes</button>
                    </div>
                    <div className="adm-card adm-settings-card">
                      <h3>Store Settings</h3>
                      <div className="adm-settings-field">
                        <label>Store Name</label>
                        <input type="text" defaultValue="Care Drive Enclosed Mobility" className="adm-settings-input" />
                      </div>
                      <div className="adm-settings-field">
                        <label>Currency</label>
                        <input type="text" defaultValue="GBP (£)" className="adm-settings-input" />
                      </div>
                      <div className="adm-settings-field">
                        <label>Free Delivery Threshold</label>
                        <input type="text" defaultValue="£500" className="adm-settings-input" />
                      </div>
                      <button className="adm-btn-primary" style={{ marginTop: 8 }}>Save Changes</button>
                    </div>
                    <div className="adm-card adm-settings-card">
                      <h3>Notifications</h3>
                      <div className="adm-toggle-list">
                        {['New order alerts', 'Low stock warnings', 'Customer enquiries', 'Service requests'].map(label => (
                          <div key={label} className="adm-toggle-row">
                            <span>{label}</span>
                            <label className="adm-toggle">
                              <input type="checkbox" defaultChecked />
                              <span className="adm-toggle-slider" />
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── ADD/EDIT PRODUCT MODAL ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="adm-modal-overlay">
            <motion.div
              className="adm-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              <div className="adm-modal-header">
                <h3>{modalMode === 'add' ? 'Add New Product' : 'Edit Product'}</h3>
                <button className="adm-modal-close" onClick={() => setIsModalOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="adm-modal-form">
                <div className="adm-modal-grid">
                  <div className="adm-field">
                    <label>Product Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Care Drive Titan 4"
                      required
                    />
                  </div>

                  <div className="adm-field">
                    <label>Category</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value as Product['category'])}
                    >
                      <option value="lightweight">Lightweight Scooter</option>
                      <option value="folding">Folding Scooter</option>
                      <option value="road">Road Scooter</option>
                      <option value="accessory">Accessory</option>
                    </select>
                  </div>

                  <div className="adm-field">
                    <label>Price (£)</label>
                    <input
                      type="number"
                      value={price}
                      onChange={e => setPrice(Number(e.target.value))}
                      placeholder="e.g. 1499"
                      required
                      min="0"
                    />
                  </div>

                  <div className="adm-field">
                    <label>Badge / Label (Optional)</label>
                    <input
                      type="text"
                      value={badge}
                      onChange={e => setBadge(e.target.value)}
                      placeholder="e.g. New, Sale, Hot"
                    />
                  </div>

                  <div className="adm-field">
                    <label>Image URL</label>
                    <input
                      type="text"
                      value={image}
                      onChange={e => setImage(e.target.value)}
                      placeholder="e.g. /images/enclosed_cabin.png"
                      required
                    />
                  </div>

                  <div className="adm-field adm-field-checkbox">
                    <label className="adm-checkbox-label">
                      <input
                        type="checkbox"
                        checked={inStock}
                        onChange={e => setInStock(e.target.checked)}
                      />
                      <span>Item is in stock and available</span>
                    </label>
                  </div>
                </div>

                <div className="adm-field" style={{ gridColumn: 'span 2' }}>
                  <label>Short Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Enter short marketing description..."
                    required
                  />
                </div>

                <div className="adm-modal-actions">
                  <button type="button" className="adm-btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="adm-btn-primary" disabled={loading}>
                    {loading ? <span className="alp-spinner" style={{ width: 16, height: 16 }} /> : <Save size={15} />} Save Product
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
