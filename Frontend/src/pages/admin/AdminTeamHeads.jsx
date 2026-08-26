import { useState, useEffect, useRef } from 'react';
import { api } from '../../utils/api';
import { Trash2, Plus, X, User, Edit2 } from 'lucide-react';

export default function AdminTeamHeads() {
  const [teamHeads, setTeamHeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', department: '', ispresident: 'no'
  });
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [editingId, setEditingId] = useState(null);

  const fetchTeamHeads = async () => {
    try {
      const res = await api.get('/team-heads/get_team_heads');
      setTeamHeads(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamHeads();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const removeImage = () => {
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEdit = (person) => {
    setEditingId(person._id);
    setFormData({
      name: person.name || '',
      department: person.department || '',
      ispresident: person.ispresident || 'no'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (editingId) {
        await api.put(`/team-heads/update_team_head/${editingId}`, data, true);
      } else {
        await api.post('/team-heads/create_team_head', data, true);
      }
      setIsModalOpen(false);
      setImageFile(null);
      setEditingId(null);
      setFormData({ name: '', department: '', ispresident: 'no' });
      fetchTeamHeads();
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || error.message || (editingId ? 'Failed to update team head' : 'Failed to create team head');
      alert(`${editingId ? 'Failed to update team head' : 'Failed to create team head'}: ${msg}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team head?')) {
      try {
        await api.delete(`/team-heads/delete_team_head/${id}`);
        fetchTeamHeads();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Team Heads Management</h2>
        <button onClick={() => {
          setEditingId(null);
          setImageFile(null);
          setFormData({ name: '', department: '', ispresident: 'no' });
          setIsModalOpen(true);
        }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={20} /> Add Team Head
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead className="bg-gray-700 text-gray-100 uppercase text-sm">
              <tr>
                <th className="p-4">Photo</th>
                <th className="p-4">Name</th>
                <th className="p-4">Role</th>
                <th className="p-4">Department</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="p-4 text-center">Loading...</td></tr>
              ) : teamHeads.map(person => (
                <tr key={person._id} className="border-b border-gray-700 hover:bg-gray-750">
                  <td className="p-4">
                    {person.image ? (
                      <img src={person.image} alt={person.name} className="w-12 h-12 object-cover rounded-full" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center"><User size={20} /></div>
                    )}
                  </td>
                  <td className="p-4 font-medium">{person.name}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${person.ispresident === 'yes' ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-600 text-gray-300'}`}>
                      {person.ispresident === 'yes' ? 'President/Core' : 'Head'}
                    </span>
                  </td>
                  <td className="p-4">{person.department || '-'}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(person)} className="text-blue-400 hover:text-blue-300 transition-colors p-1 bg-blue-400/10 rounded">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(person._id)} className="text-red-400 hover:text-red-300 transition-colors p-1 bg-red-400/10 rounded">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && teamHeads.length === 0 && (
                <tr><td colSpan="5" className="p-4 text-center text-gray-500">No team heads found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-lg">
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h3 className="text-xl font-bold text-gray-100">{editingId ? 'Edit Team Head' : 'Add Team Head'}</h3>
              <button onClick={() => { setIsModalOpen(false); setEditingId(null); setImageFile(null); setFormData({ name: '', department: '', ispresident: 'no' }); }} className="text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Name *</label>
                <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Is President ? *</label>
                <select name="ispresident" value={formData.ispresident} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white">
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              {formData.ispresident === 'no' && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Department *</label>
                  <select required name="department" value={formData.department} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white">
                    <option value="">Select Department</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Emerging Trends">Emerging Trends</option>
                    <option value="Design">Design</option>
                    <option value="Outreach">Outreach</option>
                    <option value="DSA">DSA</option>
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm text-gray-400 mb-1">Photo</label>
                <div className="flex items-center gap-2">
                  <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="flex-1 w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-300" />
                  {imageFile && (
                    <button type="button" onClick={removeImage} className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded transition-colors" title="Remove image">
                      <X size={24} />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 mt-6">
                <button type="button" onClick={() => { setIsModalOpen(false); setEditingId(null); setImageFile(null); setFormData({ name: '', department: '', ispresident: 'no' }); }} className="px-4 py-2 rounded text-gray-300 hover:bg-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white">{editingId ? 'Update' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
