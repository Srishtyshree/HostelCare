import React, { useState } from 'react';

// Mock ComplaintCard Component
const ComplaintCard = ({ complaint, onPress }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved': return '#4CAF50';
      case 'in-progress': return '#FF9800';
      case 'pending':
      default: return '#F44336';
    }
  };

  const statusColor = getStatusColor(complaint.status);
  const dateString = new Date(complaint.createdAt).toLocaleDateString();

  return (
    <div
      onClick={() => onPress(complaint)}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer mb-4 flex"
    >
      <div
        className="w-1.5 rounded-l-xl"
        style={{ backgroundColor: statusColor }}
      />
      <div className="flex-1 p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 flex-1 mr-3 truncate">
            {complaint.title}
          </h3>
          <span
            className="px-3 py-1 rounded-full text-white text-xs font-bold whitespace-nowrap"
            style={{ backgroundColor: statusColor }}
          >
            {complaint.status.toUpperCase()}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Location:</strong> {complaint.hostelBlock} / <strong>Room:</strong> {complaint.roomNumber}
        </p>
        <p className="text-xs text-gray-500">
          <strong>Category:</strong> {complaint.category} | <strong>Reported:</strong> {dateString}
        </p>
      </div>
    </div>
  );
};

// Mock CustomButton Component
const CustomButton = ({ title, mode = 'contained', onPress, style = {} }) => {
  const isContained = mode === 'contained';
  return (
    <button
      onClick={onPress}
      className={`px-4 py-2 rounded-lg font-bold text-sm uppercase transition-all ${
        isContained
          ? 'bg-purple-600 text-white hover:bg-purple-700'
          : 'bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50'
      }`}
      style={style}
    >
      {title}
    </button>
  );
};

// Main HomeScreen Component
const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const mockComplaints = [
    {
      id: '1',
      title: 'Broken AC',
      category: 'Maintenance',
      status: 'pending',
      roomNumber: '101',
      hostelBlock: 'A',
      createdAt: new Date(),
      description: 'Air conditioner not working',
    },
    {
      id: '2',
      title: 'Water Leakage',
      category: 'Plumbing',
      status: 'in-progress',
      roomNumber: '205',
      hostelBlock: 'B',
      createdAt: new Date(Date.now() - 86400000),
      description: 'Bathroom pipe leaking',
    },
    {
      id: '3',
      title: 'WiFi Issue',
      category: 'Internet',
      status: 'resolved',
      roomNumber: '302',
      hostelBlock: 'C',
      createdAt: new Date(Date.now() - 172800000),
      description: 'No internet connection',
    },
    {
      id: '4',
      title: 'Door Lock Broken',
      category: 'Security',
      status: 'pending',
      roomNumber: '150',
      hostelBlock: 'A',
      createdAt: new Date(Date.now() - 43200000),
      description: 'Cannot lock the door properly',
    },
    {
      id: '5',
      title: 'Electricity Fluctuation',
      category: 'Electrical',
      status: 'in-progress',
      roomNumber: '410',
      hostelBlock: 'D',
      createdAt: new Date(Date.now() - 259200000),
      description: 'Power keeps going on and off',
    },
  ];

  const filteredComplaints = mockComplaints.filter(complaint => {
    const matchesSearch = 
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.roomNumber.includes(searchQuery) ||
      complaint.hostelBlock.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || complaint.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleComplaintPress = (complaint) => {
    alert(`Viewing complaint: ${complaint.title}`);
  };

  const handleNewComplaint = () => {
    alert('Navigate to New Complaint Screen');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <h1 className="text-3xl font-bold text-purple-600 my-4">
          My Complaints
        </h1>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm"
            />
            <svg
              className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          <CustomButton
            title="All"
            mode={filterStatus === 'all' ? 'contained' : 'outlined'}
            onPress={() => setFilterStatus('all')}
            style={{ flex: '1 1 80px' }}
          />
          <CustomButton
            title="Pending"
            mode={filterStatus === 'pending' ? 'contained' : 'outlined'}
            onPress={() => setFilterStatus('pending')}
            style={{ flex: '1 1 80px' }}
          />
          <CustomButton
            title="In Progress"
            mode={filterStatus === 'in-progress' ? 'contained' : 'outlined'}
            onPress={() => setFilterStatus('in-progress')}
            style={{ flex: '1 1 100px' }}
          />
          <CustomButton
            title="Resolved"
            mode={filterStatus === 'resolved' ? 'contained' : 'outlined'}
            onPress={() => setFilterStatus('resolved')}
            style={{ flex: '1 1 80px' }}
          />
        </div>

        {/* Complaints List */}
        <div className="pb-20">
          {filteredComplaints.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No Complaints Found
              </h3>
              <p className="text-gray-600">
                {searchQuery
                  ? 'Try adjusting your search or filter'
                  : 'No complaints to display. Create your first complaint!'}
              </p>
            </div>
          ) : (
            filteredComplaints.map((complaint) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
                onPress={handleComplaintPress}
              />
            ))
          )}
        </div>

        {/* Floating Action Button */}
        <button
          onClick={handleNewComplaint}
          className="fixed bottom-6 right-6 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all flex items-center justify-center"
          title="Create New Complaint"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;