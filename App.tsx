
import React, { useState, useEffect } from 'react';
import { User, UserRole, Asset, Ticket, LeaveRecord } from './types';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Page Imports - Using explicit relative paths for browser module resolution
import Dashboard from './pages/Dashboard';
import EmployeeManagement from './pages/EmployeeManagement';
import AttendanceTracker from './pages/AttendanceTracker';
import PayrollModule from './pages/PayrollModule';
import RecruitmentATS from './pages/RecruitmentATS';
import TrainingManagement from './pages/TrainingManagement';
import PerformanceSystem from './pages/PerformanceSystem';
import AuthScreen from './pages/AuthScreen';
import SystemDesignDocs from './pages/SystemDesignDocs';
import DatabaseManager from './pages/DatabaseManager';
import LeaveModule from './pages/LeaveModule';
import CreativeLab from './pages/CreativeLab';
import AssetManagement from './pages/AssetManagement';
import Helpdesk from './pages/Helpdesk';
import LMSModule from './pages/LMSModule';
import FacultyModule from './pages/FacultyModule';
import EngagementModule from './pages/EngagementModule';
import AnalyticsModule from './pages/AnalyticsModule';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  // Persistence Logic (Simulated Database)
  const getInitialData = (key: string, defaultValue: any) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [usersDb, setUsersDb] = useState<any[]>(() => getInitialData('prakura_users', [
    { id: '1', name: 'Prakura Admin', email: 'admin@prakura.com', password: 'password123', role: UserRole.SUPER_ADMIN, designation: 'System Administrator', department: 'IT', joinDate: '2023-01-01' }
  ]));

  const [assets, setAssets] = useState<Asset[]>(() => getInitialData('prakura_assets', []));
  const [tickets, setTickets] = useState<Ticket[]>(() => getInitialData('prakura_tickets', []));
  const [leaves, setLeaves] = useState<LeaveRecord[]>(() => getInitialData('prakura_leaves', []));
  const [attendanceLogs, setAttendanceLogs] = useState<any[]>(() => getInitialData('prakura_attendance', []));
  const [announcements, setAnnouncements] = useState<any[]>(() => getInitialData('prakura_announcements', [
    { id: '1', title: 'ERP Evolution 3.0', content: 'Our new modular page-based architecture is now live.', type: 'NEWS', time: 'Just now' }
  ]));
  const [faculties, setFaculties] = useState<any[]>(() => getInitialData('prakura_faculties', []));
  const [jobs, setJobs] = useState<any[]>(() => getInitialData('prakura_jobs', []));
  const [batches, setBatches] = useState<any[]>(() => getInitialData('prakura_batches', []));

  useEffect(() => {
    localStorage.setItem('prakura_users', JSON.stringify(usersDb));
    localStorage.setItem('prakura_assets', JSON.stringify(assets));
    localStorage.setItem('prakura_tickets', JSON.stringify(tickets));
    localStorage.setItem('prakura_leaves', JSON.stringify(leaves));
    localStorage.setItem('prakura_attendance', JSON.stringify(attendanceLogs));
    localStorage.setItem('prakura_announcements', JSON.stringify(announcements));
    localStorage.setItem('prakura_faculties', JSON.stringify(faculties));
    localStorage.setItem('prakura_jobs', JSON.stringify(jobs));
    localStorage.setItem('prakura_batches', JSON.stringify(batches));
  }, [usersDb, assets, tickets, leaves, attendanceLogs, announcements, faculties, jobs, batches]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSignup = (newUser: any) => {
    const userObj = {
      ...newUser,
      id: Math.random().toString(36).substr(2, 9),
      joinDate: new Date().toISOString().split('T')[0]
    };
    setUsersDb(prev => [...prev, userObj]);
    setCurrentUser(userObj);
  };

  const handleLogin = (email: string, pass: string) => {
    const user = usersDb.find(u => u.email === email && u.password === pass);
    if (user) {
      setCurrentUser(user);
    } else {
      throw new Error("Access Denied: Incorrect credentials.");
    }
  };

  const handleApproveLeave = (id: string) => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: 'APPROVED' } : l));
  };

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 gap-6">
      <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center font-black text-white text-4xl shadow-2xl animate-pulse">P</div>
      <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[4px]">Syncing Prakura Engine...</p>
    </div>
  );

  if (!currentUser) return <AuthScreen onLogin={handleLogin} onSignup={handleSignup} />;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': 
        return <Dashboard 
          user={currentUser} 
          stats={{ 
            employees: usersDb.length, 
            batches: batches.length, 
            jobs: jobs.length, 
            leaves: leaves.filter(l => l.status === 'PENDING').length 
          }} 
          recentLeaves={leaves.filter(l => l.status === 'PENDING').slice(0, 3)}
          onAction={(tab) => setActiveTab(tab)}
          onApproveLeave={handleApproveLeave}
        />;
      case 'employees': 
        return <EmployeeManagement employees={usersDb} onAdd={handleSignup} />;
      case 'attendance': 
        return <AttendanceTracker logs={attendanceLogs} onAddLog={(log) => setAttendanceLogs([log, ...attendanceLogs])} />;
      case 'leaves': 
        return <LeaveModule user={currentUser} leaves={leaves} onAddLeave={(l) => setLeaves([l, ...leaves])} />;
      case 'payroll': 
        return <PayrollModule employees={usersDb} />;
      case 'recruitment': 
        return <RecruitmentATS jobs={jobs} onAddJob={(job) => setJobs([...jobs, job])} />;
      case 'training':
        return <TrainingManagement batches={batches} onAddBatch={(batch) => setBatches([...batches, batch])} />;
      case 'faculty': 
        return <FacultyModule faculties={faculties} onAdd={(f) => setFaculties([...faculties, f])} />;
      case 'creative-lab': 
        return <CreativeLab />;
      case 'assets': 
        return <AssetManagement assets={assets} employees={usersDb} onUpdate={setAssets} />;
      case 'helpdesk': 
        return <Helpdesk tickets={tickets} onAdd={(t) => setTickets([t, ...tickets])} />;
      case 'engagement': 
        return <EngagementModule announcements={announcements} onAddAnnouncement={(a) => setAnnouncements([a, ...announcements])} />;
      case 'performance': 
        return <PerformanceSystem user={currentUser} />;
      case 'analytics': 
        return <AnalyticsModule employees={usersDb} />;
      case 'database': 
        return <DatabaseManager user={currentUser} />;
      case 'system': 
        return <SystemDesignDocs />;
      case 'lms': 
        return <LMSModule user={currentUser} />;
      default: 
        return <Dashboard user={currentUser} stats={{ employees: usersDb.length, batches: 0, jobs: 0, leaves: 0 }} recentLeaves={[]} onAction={setActiveTab} onApproveLeave={() => {}} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar role={currentUser.role} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar user={currentUser} onLogout={() => setCurrentUser(null)} onOpenSystemDocs={() => setActiveTab('system')} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
