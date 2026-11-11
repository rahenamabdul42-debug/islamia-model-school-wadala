import React, { useState } from 'react';
import { ANNOUNCEMENTS } from '../data/schoolData';
import { Announcement } from '../types';
import { Bell, Calendar, Search, AlertCircle, Plus, Edit3, X, Check } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(ANNOUNCEMENTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState<Announcement | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const categories = ['All', 'Admissions', 'Exams', 'Events', 'Holidays', 'Notices'];

  const filteredAnnouncements = announcements.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (isCreating) {
      setAnnouncements([editingItem, ...announcements]);
    } else {
      setAnnouncements(announcements.map((a) => (a.id === editingItem.id ? editingItem : a)));
    }
    setEditingItem(null);
    setIsCreating(false);
  };

  const startCreate = () => {
    setEditingItem({
      id: `ann-${Date.now()}`,
      title: '',
      category: 'Notices',
      date: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
      summary: '',
      urgent: false,
      fullDetails: '',
    });
    setIsCreating(true);
  };

  return (
    <section className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100/70 px-3.5 py-1 rounded-full mb-3">
              <Bell className="w-3.5 h-3.5" />
              <span>Campus Bulletins</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-emerald-950 tracking-tight">
              News, Examination & Academic Notices
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Stay updated with date sheets, admission deadlines, holiday schedules, and institutional events.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search circulars..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>

            <button
              onClick={startCreate}
              className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 shrink-0"
              title="Add new announcement"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Post Notice</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-stone-200 border border-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notices List */}
        <div className="space-y-4">
          {filteredAnnouncements.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {item.urgent && (
                    <span className="bg-rose-100 text-rose-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-rose-300 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Urgent Notice
                    </span>
                  )}
                  <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-200">
                    {item.category}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-serif text-emerald-950 group-hover:text-emerald-800 transition">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.summary}
                </p>

                {item.fullDetails && (
                  <p className="text-xs text-slate-500 italic pt-1">
                    {item.fullDetails}
                  </p>
                )}
              </div>

              {/* Edit Trigger */}
              <div className="shrink-0 flex items-center gap-2 self-start md:self-center">
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setIsCreating(false);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-900 border border-stone-300 rounded-lg hover:bg-stone-50 transition flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Notice</span>
                </button>
              </div>
            </div>
          ))}

          {filteredAnnouncements.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 text-slate-500 text-xs">
              No notices found matching your criteria.
            </div>
          )}
        </div>
      </div>

      {/* Edit / Create Announcement Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="bg-emerald-900 text-white p-4 flex items-center justify-between">
              <h3 className="text-sm font-bold">
                {isCreating ? 'Post New School Notice' : 'Edit School Announcement'}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-emerald-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="Exams">Exams</option>
                    <option value="Events">Events</option>
                    <option value="Holidays">Holidays</option>
                    <option value="Notices">Notices</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Date String
                  </label>
                  <input
                    type="text"
                    value={editingItem.date}
                    onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Summary
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.summary}
                  onChange={(e) => setEditingItem({ ...editingItem, summary: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Additional Details (Optional)
                </label>
                <textarea
                  rows={2}
                  value={editingItem.fullDetails || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, fullDetails: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="urgentNotice"
                  checked={editingItem.urgent || false}
                  onChange={(e) => setEditingItem({ ...editingItem, urgent: e.target.checked })}
                  className="accent-emerald-700"
                />
                <label htmlFor="urgentNotice" className="text-slate-700 font-medium">
                  Mark as Urgent Notice
                </label>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-slate-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-lg shadow-sm"
                >
                  Save Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
