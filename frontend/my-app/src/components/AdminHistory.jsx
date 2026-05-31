import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminHistory = ({ requesterEmail, isAdmin }) => {
  const [messages, setMessages] = useState([]);
  const [filterEmail, setFilterEmail] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadMessages = async (emailFilter = '') => {
    if (!requesterEmail) {
      setError('Requester email is missing. Please sign in again.');
      return;
    }
    setLoading(true);
    setError('');

    const trimmedFilter = emailFilter.trim();
    console.log('AdminHistory.loadMessages', { requesterEmail, trimmedFilter });

    try {
      const response = await axios.get('https://chatbot-83b2.onrender.com/api/messages', {
        params: {
          requester_email: requesterEmail,
          ...(trimmedFilter ? { user_email: trimmedFilter } : {}),
          _t: Date.now(),
        },
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      });
      setMessages(response.data.messages || []);
      setActiveFilter(trimmedFilter);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Unable to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [requesterEmail]);

  if (!requesterEmail) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1>Chat History</h1>
          <p>You must be signed in as an admin to view chat history.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Admin Chat History</h1>
        <p>Review saved user conversations and AI responses.</p>
      </div>

      <div className="admin-history-header">
        <div>
          <strong>Total messages:</strong> {messages.length}
          {activeFilter && (
            <span className="active-filter-text">
              Filtering by: {activeFilter}
            </span>
          )}
        </div>
        {isAdmin ? (
          <div className="admin-history-controls">
            <input
              type="text"
              className="admin-history-input"
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value)}
              placeholder="Filter by user email"
              autoComplete="off"
            />
            <button
              type="button"
              className="primary-btn"
              onClick={() => {
                console.log('AdminHistory.filterClicked', filterEmail);
                loadMessages(filterEmail);
              }}
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Filter'}
            </button>
            <button
              type="button"
              className="primary-btn"
              onClick={() => {
                console.log('AdminHistory.clearClicked');
                setFilterEmail('');
                setActiveFilter('');
                loadMessages();
              }}
              disabled={loading}
            >
              Clear
            </button>
          </div>
        ) : (
          <button type="button" className="primary-btn" onClick={() => loadMessages()} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        )}
      </div>

      {error && (
        <div style={{ color: '#f87171', marginBottom: '20px' }}>{error}</div>
      )}

      {loading ? (
        <div>Loading messages...</div>
      ) : messages.length === 0 ? (
        <div>No messages found.</div>
      ) : (
        <div className="admin-history-list">
          {messages.map((msg) => (
            <div key={msg.id} className="content-card admin-history-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
              <div className="admin-history-card-meta">
                <div>
                  <strong>User:</strong> {msg.user_name || 'Unknown'}
                  <br />
                  <strong>Email:</strong> {msg.user_email || 'Unknown'}
                </div>
                <div className="admin-history-card-date">
                  <strong>{new Date(msg.timestamp).toLocaleString()}</strong>
                  <div>{msg.intent || 'general_chat'}</div>
                </div>
              </div>
              <div className="admin-history-card-body">
                <div className="admin-history-card-section">
                  <strong>User message</strong>
                  <p>{msg.message}</p>
                </div>
                <div className="admin-history-card-section">
                  <strong>AI reply</strong>
                  <p>{msg.reply}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminHistory;
