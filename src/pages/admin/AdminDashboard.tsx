import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';

interface Form {
  id: string;
  type: string;
  data: any;
  submittedAt: string;
  status: string;
}

interface User {
  id: string;
  username: string;
  role: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [forms, setForms] = useState<Form[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');

    if (!token || !user) {
      navigate('/adminpanel');
      return;
    }

    try {
      setCurrentUser(JSON.parse(user));
    } catch (error) {
      navigate('/adminpanel');
    }
  };

  const loadData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const [formsRes, usersRes] = await Promise.all([
        fetch('/api/forms', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (formsRes.ok) {
        const formsData = await formsRes.json();
        setForms(formsData);
      }

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/adminpanel');
  };

  const updateFormStatus = async (formId: string, status: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/forms/${formId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        setForms(forms.map(form =>
          form.id === formId ? { ...form, status } : form
        ));
      }
    } catch (error) {
      console.error('Error updating form status:', error);
    }
  };

  const deleteForm = async (formId: string) => {
    if (!confirm('Are you sure you want to delete this form submission?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/forms/${formId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        setForms(forms.filter(form => form.id !== formId));
      }
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  const unreadForms = forms.filter(f => f.status === 'unread').length;
  const totalForms = forms.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-foreground">Zaderi Admin Panel</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {currentUser?.username}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out pt-16 lg:pt-0`}>
          <div className="p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'overview' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                Overview
              </button>

              <button
                onClick={() => setActiveTab('forms')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'forms' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
              >
                <FileText className="w-5 h-5" />
                Form Submissions
                {unreadForms > 0 && (
                  <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                    {unreadForms}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'users' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
              >
                <Users className="w-5 h-5" />
                User Management
              </button>

              <button
                onClick={() => setActiveTab('content')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'content' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
              >
                <Edit className="w-5 h-5" />
                Content Management
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'settings' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
              >
                <Settings className="w-5 h-5" />
                Settings
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card-solid rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-8 h-8 text-electric" />
                    <h3 className="text-lg font-semibold text-foreground">Form Submissions</h3>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{totalForms}</p>
                  <p className="text-sm text-muted-foreground">
                    {unreadForms} unread
                  </p>
                </div>

                <div className="glass-card-solid rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-8 h-8 text-electric" />
                    <h3 className="text-lg font-semibold text-foreground">Admin Users</h3>
                  </div>
                  <p className="text-3xl font-bold text-foreground">{users.length}</p>
                  <p className="text-sm text-muted-foreground">
                    Active administrators
                  </p>
                </div>

                <div className="glass-card-solid rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-8 h-8 text-electric" />
                    <h3 className="text-lg font-semibold text-foreground">System Status</h3>
                  </div>
                  <p className="text-3xl font-bold text-green-500">Online</p>
                  <p className="text-sm text-muted-foreground">
                    All systems operational
                  </p>
                </div>
              </div>

              <div className="glass-card-solid rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Form Submissions</h3>
                <div className="space-y-3">
                  {forms.slice(0, 5).map((form) => (
                    <div key={form.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${form.status === 'unread' ? 'bg-electric' : 'bg-muted-foreground'}`}></div>
                        <div>
                          <p className="font-medium text-foreground">
                            {form.type === 'demo' ? 'Demo Request' : 'Contact Form'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(form.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab('forms')}
                        className="text-electric hover:text-electric/80 text-sm"
                      >
                        View
                      </button>
                    </div>
                  ))}
                  {forms.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">No form submissions yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'forms' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Form Submissions</h2>
                <span className="text-sm text-muted-foreground">
                  {totalForms} total • {unreadForms} unread
                </span>
              </div>

              <div className="space-y-4">
                {forms.map((form) => (
                  <div key={form.id} className="glass-card-solid rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${form.status === 'unread' ? 'bg-electric' : 'bg-muted-foreground'}`}></div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {form.type === 'demo' ? 'Demo Request' : 'Contact Form'}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(form.submittedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={form.status}
                          onChange={(e) => updateFormStatus(form.id, e.target.value)}
                          className="text-xs bg-background border border-border rounded px-2 py-1"
                        >
                          <option value="unread">Unread</option>
                          <option value="read">Read</option>
                          <option value="responded">Responded</option>
                        </select>
                        <button
                          onClick={() => deleteForm(form.id)}
                          className="p-1 text-destructive hover:bg-destructive/10 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {form.data.name && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Name:</span>
                          <span className="text-sm font-medium text-foreground">{form.data.name}</span>
                        </div>
                      )}

                      {form.data.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Email:</span>
                          <span className="text-sm font-medium text-foreground">{form.data.email}</span>
                        </div>
                      )}

                      {form.data.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Phone:</span>
                          <span className="text-sm font-medium text-foreground">{form.data.phone}</span>
                        </div>
                      )}

                      {form.data.subject && (
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Subject:</span>
                          <span className="text-sm font-medium text-foreground">{form.data.subject}</span>
                        </div>
                      )}
                    </div>

                    {form.data.message && (
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground mb-2">Message:</p>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm text-foreground whitespace-pre-wrap">{form.data.message}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {forms.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No form submissions yet</h3>
                    <p className="text-muted-foreground">Form submissions will appear here when users submit the contact or demo forms.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">User Management</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  <UserPlus className="w-4 h-4" />
                  Add User
                </button>
              </div>

              <div className="glass-card-solid rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Username</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{user.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground capitalize">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          <button className="text-electric hover:text-electric/80 mr-3">Edit</button>
                          {user.username !== 'admin' && (
                            <button className="text-destructive hover:text-destructive/80">Delete</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Content Management</h2>

              <div className="glass-card-solid rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Hero Section</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                    <input
                      type="text"
                      className="w-full bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-electric transition-all"
                      placeholder="Enter hero title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subtitle</label>
                    <textarea
                      rows={3}
                      className="w-full bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-electric transition-all resize-y"
                      placeholder="Enter hero subtitle"
                    />
                  </div>
                </div>
              </div>

              <div className="glass-card-solid rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">About Section</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                    <input
                      type="text"
                      className="w-full bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-electric transition-all"
                      placeholder="Enter about title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                    <textarea
                      rows={4}
                      className="w-full bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-electric transition-all resize-y"
                      placeholder="Enter about description"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Settings</h2>

              <div className="glass-card-solid rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-electric transition-all"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-electric transition-all"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-electric transition-all"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;