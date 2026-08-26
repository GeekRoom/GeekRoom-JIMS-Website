import { useState, useEffect, useRef } from 'react';
import { api } from '../../utils/api';
import { Trash2, Plus, X, Image as ImageIcon, Edit2 } from 'lucide-react';

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    title: '', description: '', date: '', venue: '', category: '', 
    status: 'past', format: 'offline', registration_link: '', registration_deadline: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [imageGalleryFiles, setImageGalleryFiles] = useState([]);
  const galleryInputRef = useRef(null);
  const [editingId, setEditingId] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events/get_events');
      setEvents(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      if (name === 'date' && value) {
        const selectedDate = new Date(value);
        selectedDate.setHours(0, 0, 0, 0);
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        newData.status = selectedDate >= today ? 'upcoming' : 'past';
      }
      
      return newData;
    });
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

  const handleEdit = (event) => {
    setEditingId(event._id);
    setFormData({
      title: event.title || '',
      description: event.description || '',
      date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
      venue: event.venue || '',
      category: event.category || '',
      status: event.status || 'past',
      format: event.format || 'offline',
      registration_link: event.registration_link || event.link || '',
      registration_deadline: event.registration_deadline ? new Date(event.registration_deadline).toISOString().slice(0, 16) : ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) data.append(key, formData[key]);
    });
    if (imageFile) {
      data.append('image', imageFile);
    }
    if (imageGalleryFiles.length > 0) {
      imageGalleryFiles.forEach((file) => {
        data.append('image_gallery', file);
      });
    }

    try {
      if (editingId) {
        await api.put(`/events/update_event/${editingId}`, data, true);
      } else {
        await api.post('/events/create_event', data, true);
      }
      setIsModalOpen(false);
      setImageFile(null);
      setImageGalleryFiles([]);
      setEditingId(null);
      setFormData({ title: '', description: '', date: '', venue: '', category: '', status: 'past', format: 'offline', registration_link: '', registration_deadline: '' });
      fetchEvents();
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || error.message || (editingId ? 'Failed to update event' : 'Failed to create event');
      alert(`${editingId ? 'Failed to update event' : 'Failed to create event'}: ${msg}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await api.delete(`/events/delete_event/${id}`);
        fetchEvents();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const filteredAndSortedEvents = events
    .filter(event => filterStatus === 'all' ? true : event.status === filterStatus)
    .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Events Management</h2>
        <div className="flex gap-4">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg outline-none focus:border-blue-500 transition-colors"
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
          <button onClick={() => {
            setEditingId(null);
            setImageFile(null);
            setImageGalleryFiles([]);
            setFormData({ title: '', description: '', date: '', venue: '', category: '', status: 'past', format: 'offline', registration_link: '', registration_deadline: '' });
            setIsModalOpen(true);
          }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={20} /> Create Event
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-300">
            <thead className="bg-gray-700 text-gray-100 uppercase text-sm">
              <tr>
                <th className="p-4">Cover</th>
                <th className="p-4">Title</th>
                <th className="p-4">Date</th>
                <th className="p-4">Venue</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="p-4 text-center">Loading...</td></tr>
              ) : filteredAndSortedEvents.map(event => (
                <tr key={event._id} className="border-b border-gray-700 hover:bg-gray-750">
                  <td className="p-4">
                    {event.image ? (
                      <img src={event.image} alt={event.title} className="w-16 h-10 object-cover rounded" />
                    ) : (
                      <div className="w-16 h-10 bg-gray-600 rounded flex items-center justify-center"><ImageIcon size={16} /></div>
                    )}
                  </td>
                  <td className="p-4 font-medium">{event.title}</td>
                  <td className="p-4">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="p-4">{event.venue}</td>
                  <td className="p-4 capitalize">
                    <span className={`px-2 py-1 rounded text-xs ${event.status === 'upcoming' ? 'bg-green-500/20 text-green-400' : 'bg-gray-600 text-gray-300'}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(event)} className="text-blue-400 hover:text-blue-300 transition-colors p-1 bg-blue-400/10 rounded">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(event._id)} className="text-red-400 hover:text-red-300 transition-colors p-1 bg-red-400/10 rounded">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && filteredAndSortedEvents.length === 0 && (
                <tr><td colSpan="6" className="p-4 text-center text-gray-500">No events found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-700 sticky top-0 bg-gray-800 z-10">
              <h3 className="text-xl font-bold text-gray-100">{editingId ? 'Edit Event' : 'Create New Event'}</h3>
              <button onClick={() => { setIsModalOpen(false); setEditingId(null); setImageFile(null); setImageGalleryFiles([]); setFormData({ title: '', description: '', date: '', venue: '', category: '', status: 'past', format: 'offline', registration_link: '', registration_deadline: '' }); }} className="text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Title *</label>
                  <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Date *</label>
                  <input required type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Venue *</label>
                  <input required name="venue" value={formData.venue} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white">
                    <option value="">Select Category</option>
                    <option value="Hackathons">Hackathons</option>
                    <option value="Workshops">Workshops</option>
                    <option value="Seminars">Seminars</option>
                    <option value="Competitions">Competitions</option>
                    <option value="Ideathon">Ideathon</option>
                    <option value="Orientation">Orientation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white">
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Format</label>
                  <select name="format" value={formData.format} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white">
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description *</label>
                <textarea required name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Registration Link {formData.status === 'upcoming' && '*'}</label>
                  <input required={formData.status === 'upcoming'} name="registration_link" value={formData.registration_link} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Reg Deadline {formData.status === 'upcoming' && '*'}</label>
                  <input required={formData.status === 'upcoming'} type="datetime-local" name="registration_deadline" value={formData.registration_deadline} onChange={handleInputChange} className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Cover Image</label>
                <div className="flex items-center gap-2">
                  <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="flex-1 w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-300" />
                  {imageFile && (
                    <button type="button" onClick={removeImage} className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded transition-colors" title="Remove image">
                      <X size={24} />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Image Gallery (Multiple Photos)</label>
                <div className="flex items-center gap-2">
                  <input type="file" multiple ref={galleryInputRef} accept="image/*" onChange={(e) => setImageGalleryFiles(Array.from(e.target.files))} className="flex-1 w-full bg-gray-700 border border-gray-600 rounded p-2 text-gray-300" />
                  {imageGalleryFiles.length > 0 && (
                    <button type="button" onClick={() => { setImageGalleryFiles([]); if (galleryInputRef.current) galleryInputRef.current.value = ''; }} className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded transition-colors" title="Remove all gallery images">
                      <X size={24} />
                    </button>
                  )}
                </div>
                {imageGalleryFiles.length > 0 && <p className="text-sm text-gray-400 mt-1">{imageGalleryFiles.length} images selected</p>}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-700 mt-6">
                <button type="button" onClick={() => { setIsModalOpen(false); setEditingId(null); setImageFile(null); setImageGalleryFiles([]); setFormData({ title: '', description: '', date: '', venue: '', category: '', status: 'past', format: 'offline', registration_link: '', registration_deadline: '' }); }} className="px-4 py-2 rounded text-gray-300 hover:bg-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white">{editingId ? 'Update Event' : 'Save Event'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
