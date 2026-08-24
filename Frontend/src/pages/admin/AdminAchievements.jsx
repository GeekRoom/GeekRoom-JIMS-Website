import { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { Trash2, Plus, X } from 'lucide-react';

export default function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', month: '', tagname: '', winnerName: ''
  });

  const fetchAchievements = async () => {
    try {
      const res = await api.get('/achievements/getAll_achievements');
      setAchievements(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/achievements/create_achievement', formData);
      setIsModalOpen(false);
      setFormData({ title: '', description: '', month: '', tagname: '', winnerName: '' });
      fetchAchievements();
    } catch (error) {
      console.error(error);
      alert('Failed to create achievement');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        await api.delete(`/achievements/delete_achievement/${id}`);
        fetchAchievements();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Achievements Management</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={20} /> Add Achievement
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead className="bg-gray-700 text-gray-100 uppercase text-sm">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Winner</th>
                <th className="p-4">Tag</th>
                <th className="p-4">Month/Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="p-4 text-center">Loading...</td></tr>
              ) : achievements.map(ach => (
                <tr key={ach._id} className="border-b border-gray-700 hover:bg-gray-750">
                  <td className="p-4 font-medium">{ach.title}</td>
                  <td className="p-4">{ach.winnerName || '-'}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-400">
                      {ach.tagname || '-'}
                    </span>
                  </td>
                  <td className="p-4">{ach.month ? new Date(ach.month).toLocaleDateString() : '-'}</td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(ach._id)} className="text-red-400 hover:text-red-300 transition-colors p-1 bg-red-400/10 rounded">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && achievements.length === 0 && (
                <tr><td colSpan="5" className="p-4 text-center text-gray-500">No achievements found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-lg">
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h3 className="text-xl font-bold text-gray-100">Add Achievement</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title *</label>
                <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Winner Name</label>
                <input name="winnerName" value={formData.winnerName} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Tag Name</label>
                <input name="tagname" value={formData.tagname} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white" placeholder="e.g. Hackathon, Coding" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Month/Date</label>
                <input type="date" name="month" value={formData.month} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white" />
              </div>

              <div className="flex justify-end gap-3 pt-4 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded text-gray-300 hover:bg-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
