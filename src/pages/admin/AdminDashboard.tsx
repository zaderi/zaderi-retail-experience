import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import {
  BarChart3, Users, FileText, Settings, LogOut, Menu,
  Trash2, UserPlus, Mail, Phone, Calendar, Download
} from 'lucide-react';

interface FormSubmission {
  id: string;
  type: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string | null;
  interest: string | null;
  status: string;
  submitted_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: string;
  is_primary: boolean;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [forms, setForms] = useState<FormSubmission[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [isPrimary, setIsPrimary] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formFilter, setFormFilter] = useState<'all' | 'contact' | 'demo'>('all');

  // New user form
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);
  const [addingUser, setAddingUser] = useState(false);

  // Password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passMsg, setPassMsg] = useState('');

  const navigate = useNavigate();

  const loadData = useCallback(async () => {
    const { data: formsData } = await supabase
      .from('form_submissions')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (formsData) setForms(formsData as FormSubmission[]);

    const { data: rolesData } = await supabase
      .from('user_roles')
      .select('*');

    if (rolesData) setUserRoles(rolesData as UserRole[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/adminpanel');
        return;
      }
      setCurrentUserId(user.id);
      setCurrentUserEmail(user.email || '');

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role, is_primary')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (!roles) {
        navigate('/adminpanel');
        return;
      }

      setIsPrimary(roles.is_primary || false);
      loadData();
    };

    checkAuth();
  }, [navigate, loadData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/adminpanel');
  };

  const updateFormStatus = async (formId: string, status: string) => {
    const { error } = await supabase
      .from('form_submissions')
      .update({ status })
      .eq('id', formId);

    if (!error) {
      setForms(forms.map(f => f.id === formId ? { ...f, status } : f));
    }
  };

  const deleteForm = async (formId: string) => {
    if (!confirm('Delete this submission?')) return;
    const { error } = await supabase
      .from('form_submissions')
      .delete()
      .eq('id', formId);

    if (!error) setForms(forms.filter(f => f.id !== formId));
  };

  const exportCSV = (type: 'contact' | 'demo' | 'all') => {
    const filtered = type === 'all' ? forms : forms.filter(f => f.type === type);
    if (filtered.length === 0) return;

    const headers = ['Type', 'Name', 'Email', 'Phone', 'Subject', 'Interest', 'Message', 'Status', 'Submitted At'];
    const rows = filtered.map(f => [
      f.type, f.name || '', f.email || '', f.phone || '',
      f.subject || '', f.interest || '', (f.message || '').replace(/"/g, '""'),
      f.status, new Date(f.submitted_at).toLocaleString()
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const addAdminUser = async () => {
    if (!newEmail || !newPassword) return;
    setAddingUser(true);

    try {
      // Use edge function to create user (since signup is disabled)
      const { data: { session } } = await supabase.auth.getSession();
      const res = await supabase.functions.invoke('create-admin-user', {
        body: { email: newEmail, password: newPassword },
        headers: { Authorization: `Bearer ${session?.access_token}` }
      });

      if (res.error) {
        alert(res.error.message || 'Failed to create user');
      } else {
        setNewEmail('');
        setNewPassword('');
        setShowAddUser(false);
        loadData();
      }
    } catch {
      alert('Failed to create user');
    } finally {
      setAddingUser(false);
    }
  };

  const deleteAdminUser = async (userId: string) => {
    if (!confirm('Remove this admin user?')) return;

    const res = await supabase.functions.invoke('delete-admin-user', {
      body: { user_id: userId }
    });

    if (!res.error) {
      loadData();
    } else {
      alert('Failed to delete user');
    }
  };

  const changePassword = async () => {
    setPassMsg('');
    if (newPass !== confirmPass) {
      setPassMsg('Passwords do not match');
      return;
    }
    if (newPass.length < 8) {
      setPassMsg('Password must be at least 8 characters');
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPass });
    if (error) {
      setPassMsg(error.message);
    } else {
      setPassMsg('Password updated successfully!');
      setCurrentPassword('');
      setNewPass('');
      setConfirmPass('');
    }
  };

  const filteredForms = formFilter === 'all' ? forms : forms.filter(f => f.type === formFilter);
  const unreadForms = forms.filter(f => f.status === 'unread').length;
  const contactCount = forms.filter(f => f.type === 'contact').length;
  const demoCount = forms.filter(f => f.type === 'demo').length;

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

  const sidebarItems = [
    { id: 'overview', icon: BarChart3, label: 'Overview' },
    { id: 'forms', icon: FileText, label: 'Submissions', badge: unreadForms },
    { id: 'users', icon: Users, label: 'User Management' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-4 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-muted">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-foreground">Zaderi Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{currentUserEmail}</span>
            <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out pt-16 lg:pt-0`}>
          <div className="p-4">
            <nav className="space-y-2">
              {sidebarItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === item.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                  {item.badge && item.badge > 0 && (
                    <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">{item.badge}</span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-6">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Submissions', value: forms.length, icon: FileText, sub: `${unreadForms} unread` },
                  { label: 'Contact Forms', value: contactCount, icon: Mail, sub: 'Contact inquiries' },
                  { label: 'Demo Requests', value: demoCount, icon: Calendar, sub: 'Demo bookings' },
                  { label: 'Admin Users', value: userRoles.length, icon: Users, sub: 'Active admins' },
                ].map((card, i) => (
                  <div key={i} className="glass-card-solid rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <card.icon className="w-8 h-8 text-electric" />
                      <h3 className="text-sm font-semibold text-muted-foreground">{card.label}</h3>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{card.value}</p>
                    <p className="text-sm text-muted-foreground">{card.sub}</p>
                  </div>
                ))}
              </div>

              <div className="glass-card-solid rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Submissions</h3>
                <div className="space-y-3">
                  {forms.slice(0, 5).map(form => (
                    <div key={form.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${form.status === 'unread' ? 'bg-electric' : 'bg-muted-foreground'}`} />
                        <div>
                          <p className="font-medium text-foreground">{form.type === 'demo' ? 'Demo Request' : 'Contact Form'} {form.name && `- ${form.name}`}</p>
                          <p className="text-sm text-muted-foreground">{new Date(form.submitted_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <button onClick={() => setActiveTab('forms')} className="text-electric hover:text-electric/80 text-sm">View</button>
                    </div>
                  ))}
                  {forms.length === 0 && <p className="text-muted-foreground text-center py-4">No submissions yet</p>}
                </div>
              </div>
            </div>
          )}

          {/* FORMS */}
          {activeTab === 'forms' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-foreground">Form Submissions</h2>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex rounded-lg border border-border overflow-hidden">
                    {(['all', 'contact', 'demo'] as const).map(f => (
                      <button
                        key={f}
                        onClick={() => setFormFilter(f)}
                        className={`px-3 py-1.5 text-sm capitalize ${formFilter === f ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                      >
                        {f} {f === 'all' ? `(${forms.length})` : f === 'contact' ? `(${contactCount})` : `(${demoCount})`}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => exportCSV(formFilter)} className="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted">
                    <Download className="w-4 h-4" /> Export CSV
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredForms.map(form => (
                  <div key={form.id} className="glass-card-solid rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${form.status === 'unread' ? 'bg-electric' : form.status === 'responded' ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {form.type === 'demo' ? 'Demo Request' : 'Contact Form'}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(form.submitted_at).toLocaleString()}
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
                        <button onClick={() => deleteForm(form.id)} className="p-1 text-destructive hover:bg-destructive/10 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {form.name && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Name:</span>
                          <span className="text-sm font-medium text-foreground">{form.name}</span>
                        </div>
                      )}
                      {form.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Email:</span>
                          <span className="text-sm font-medium text-foreground">{form.email}</span>
                        </div>
                      )}
                      {form.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Phone:</span>
                          <span className="text-sm font-medium text-foreground">{form.phone}</span>
                        </div>
                      )}
                      {form.subject && (
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Subject:</span>
                          <span className="text-sm font-medium text-foreground">{form.subject}</span>
                        </div>
                      )}
                      {form.interest && (
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Interest:</span>
                          <span className="text-sm font-medium text-foreground">{form.interest}</span>
                        </div>
                      )}
                    </div>

                    {form.message && (
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground mb-2">Message:</p>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm text-foreground whitespace-pre-wrap">{form.message}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {filteredForms.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No submissions found</h3>
                    <p className="text-muted-foreground">Submissions will appear here when users fill out forms on the website.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* USER MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">User Management</h2>
                <button
                  onClick={() => setShowAddUser(!showAddUser)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <UserPlus className="w-4 h-4" /> Add Admin
                </button>
              </div>

              {showAddUser && (
                <div className="glass-card-solid rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Create New Admin User</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="w-full bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric transition-all"
                        placeholder="user@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-electric transition-all"
                        placeholder="Min 8 characters"
                      />
                    </div>
                  </div>
                  <button
                    onClick={addAdminUser}
                    disabled={addingUser}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {addingUser ? 'Creating...' : 'Create Admin'}
                  </button>
                </div>
              )}

              <div className="glass-card-solid rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">User ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {userRoles.map(ur => (
                      <tr key={ur.id}>
                        <td className="px-6 py-4 text-sm font-medium text-foreground font-mono">{ur.user_id.slice(0, 8)}...</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground capitalize">{ur.role}</td>
                        <td className="px-6 py-4 text-sm">
                          {ur.is_primary ? (
                            <span className="bg-electric/20 text-electric px-2 py-1 rounded text-xs font-medium">Primary</span>
                          ) : (
                            <span className="bg-muted px-2 py-1 rounded text-xs">Secondary</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {!ur.is_primary && ur.user_id !== currentUserId && (
                            <button
                              onClick={() => deleteAdminUser(ur.user_id)}
                              className="text-destructive hover:text-destructive/80"
                            >
                              Remove
                            </button>
                          )}
                          {ur.is_primary && <span className="text-muted-foreground text-xs">Protected</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Settings</h2>
              <div className="glass-card-solid rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Change Password</h3>
                {passMsg && (
                  <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${passMsg.includes('success') ? 'bg-green-500/10 text-green-500' : 'bg-destructive/10 text-destructive'}`}>
                    {passMsg}
                  </div>
                )}
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                    <input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="w-full bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-electric transition-all"
                      placeholder="New password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      className="w-full bg-background/60 border border-foreground/[0.06] rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-electric transition-all"
                      placeholder="Confirm password"
                    />
                  </div>
                  <button
                    onClick={changePassword}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default AdminDashboard;
