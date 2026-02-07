
import React from 'react';
import { UserRole } from '../types';
import { Icons } from '../constants';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, onTabChange }) => {
  const sections = [
    {
      title: 'CORE HR',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <Icons.Dashboard />, roles: Object.values(UserRole) },
        { id: 'employees', label: 'Employees', icon: <Icons.Users />, roles: [UserRole.SUPER_ADMIN, UserRole.HR_ADMIN] },
        { id: 'attendance', label: 'Attendance', icon: <Icons.Attendance />, roles: Object.values(UserRole) },
        { id: 'leaves', label: 'Absences', icon: <LeaveIcon />, roles: Object.values(UserRole) },
        { id: 'payroll', label: 'Payroll', icon: <Icons.Money />, roles: [UserRole.SUPER_ADMIN, UserRole.HR_ADMIN, UserRole.FINANCE_ADMIN] },
      ]
    },
    {
      title: 'GROWTH',
      items: [
        { id: 'faculty', label: 'Faculty Hub', icon: <FacultyIcon />, roles: [UserRole.SUPER_ADMIN, UserRole.TRAINER, UserRole.HR_ADMIN] },
        { id: 'lms', label: 'Learning (LMS)', icon: <Icons.Training />, roles: Object.values(UserRole) },
        { id: 'performance', label: 'Performance', icon: <Icons.Performance />, roles: Object.values(UserRole) },
        { id: 'recruitment', label: 'Recruitment', icon: <Icons.Recruitment />, roles: [UserRole.SUPER_ADMIN, UserRole.HR_ADMIN] },
      ]
    },
    {
      title: 'OPERATIONS',
      items: [
        { id: 'assets', label: 'Inventory', icon: <AssetIcon />, roles: [UserRole.SUPER_ADMIN, UserRole.HR_ADMIN] },
        { id: 'helpdesk', label: 'Support', icon: <TicketIcon />, roles: Object.values(UserRole) },
        { id: 'engagement', label: 'Engagement', icon: <HeartIcon />, roles: [UserRole.SUPER_ADMIN, UserRole.HR_ADMIN] },
      ]
    },
    {
      title: 'STRATEGY',
      items: [
        { id: 'creative-lab', label: 'AI Lab', icon: <SparkleIcon />, roles: [UserRole.SUPER_ADMIN, UserRole.HR_ADMIN] },
        { id: 'analytics', label: 'Analytics', icon: <ChartIcon />, roles: [UserRole.SUPER_ADMIN, UserRole.HR_ADMIN] },
        { id: 'system', label: 'System Spec', icon: <DatabaseIcon />, roles: [UserRole.SUPER_ADMIN] },
      ]
    }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 overflow-y-auto custom-scrollbar">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-blue-500/20">P</div>
          <span className="text-xl font-bold text-white tracking-tight">Prakura ERP</span>
        </div>

        <div className="space-y-8">
          {sections.map((section) => {
            const filteredItems = section.items.filter(i => i.roles.includes(role));
            if (filteredItems.length === 0) return null;
            
            return (
              <div key={section.title}>
                <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[2px] mb-3">{section.title}</p>
                <nav className="space-y-1">
                  {filteredItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onTabChange(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all ${
                        activeTab === item.id 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                          : 'hover:bg-slate-800/50 hover:text-white'
                      }`}
                    >
                      <span className={activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}>{item.icon}</span>
                      <span className="text-sm font-semibold">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

// Icons
const LeaveIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 v12a2 2 0 002 2z" /></svg>;
const FacultyIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const SparkleIcon = () => <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>;
const AssetIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const TicketIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>;
const HeartIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const ChartIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const DatabaseIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>;

export default Sidebar;
