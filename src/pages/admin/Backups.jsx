import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Download, Trash2, Calendar, HardDrive, Clock, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Backups = () => {
  const { backendUrl } = useApp();
  const [loading, setLoading] = useState(true);
  const [backups, setBackups] = useState([]);
  const [creatingBackup, setCreatingBackup] = useState(false);

  useEffect(() => {
    const fetchBackups = async () => {
      try {
        // Mock data - would come from API
        const mockBackups = [
          { id: 1, name: 'daily_backup_2024-01-15', size: '245 MB', date: '2024-01-15T03:00:00', type: 'daily', status: 'completed' },
          { id: 2, name: 'daily_backup_2024-01-14', size: '242 MB', date: '2024-01-14T03:00:00', type: 'daily', status: 'completed' },
          { id: 3, name: 'weekly_backup_2024-01-13', size: '890 MB', date: '2024-01-13T03:00:00', type: 'weekly', status: 'completed' },
          { id: 4, name: 'daily_backup_2024-01-13', size: '238 MB', date: '2024-01-13T03:00:00', type: 'daily', status: 'completed' },
          { id: 5, name: 'manual_backup_2024-01-12', size: '235 MB', date: '2024-01-12T15:30:00', type: 'manual', status: 'completed' },
          { id: 6, name: 'daily_backup_2024-01-12', size: '236 MB', date: '2024-01-12T03:00:00', type: 'daily', status: 'completed' },
          { id: 7, name: 'weekly_backup_2024-01-06', size: '875 MB', date: '2024-01-06T03:00:00', type: 'weekly', status: 'completed' }
        ];
        setBackups(mockBackups);
      } catch (err) {
        console.error('Failed to fetch backups:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBackups();
  }, []);

  const createBackup = async () => {
    setCreatingBackup(true);
    try {
      // Would call API to create backup
      await new Promise(resolve => setTimeout(resolve, 2000));
      const newBackup = {
        id: backups.length + 1,
        name: `manual_backup_${new Date().toISOString().split('T')[0]}`,
        size: 'Calculating...',
        date: new Date().toISOString(),
        type: 'manual',
        status: 'completed'
      };
      setBackups([newBackup, ...backups]);
    } catch (err) {
      console.error('Failed to create backup:', err);
    } finally {
      setCreatingBackup(false);
    }
  };

  const deleteBackup = async (backupId) => {
    try {
      // Would call API to delete backup
      setBackups(backups.filter(b => b.id !== backupId));
    } catch (err) {
      console.error('Failed to delete backup:', err);
    }
  };

  const downloadBackup = (backupName) => {
    // Would trigger download
    console.log('Downloading:', backupName);
  };

  const getTypeColor = (type) => {
    const colors = {
      daily: '#3B82F6',
      weekly: '#10B981',
      monthly: '#8B5CF6',
      manual: '#F59E0B'
    };
    return colors[type] || '#94A3B8';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('uz-UZ');
  };

  if (loading) {
    return (
      <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader"></div>
      </div>
    );
  }

  const totalSize = backups.reduce((sum, b) => {
    const sizeMB = parseFloat(b.size);
    return sum + sizeMB;
  }, 0);

  return (
    <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>Backup Manager</h1>
            <p style={{ color: 'var(--text-muted)' }}>Ma'lumotlar bazasi backuplarini boshqarish</p>
          </div>
          <button
            onClick={createBackup}
            disabled={creatingBackup}
            style={{ 
              padding: '12px 24px', 
              borderRadius: '10px', 
              border: 'none', 
              background: creatingBackup ? '#94A3B8' : 'var(--primary)', 
              color: 'white', 
              fontWeight: 600, 
              cursor: creatingBackup ? 'not-allowed' : 'pointer',
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px' 
            }}
          >
            <Database size={20} />
            {creatingBackup ? 'Yaratilmoqda...' : 'Yangi backup'}
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Database size={24} color="#3B82F6" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Jami backuplar</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{backups.length}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <HardDrive size={24} color="#10B981" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Jami hajm</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{totalSize.toFixed(0)} MB</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Calendar size={24} color="#F59E0B" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Oxirgi backup</span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>{backups.length > 0 ? formatDate(backups[0].date) : 'Yo\'q'}</h3>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Clock size={24} color="#8B5CF6" />
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>O'rtacha hajm</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>{backups.length > 0 ? (totalSize / backups.length).toFixed(0) : 0} MB</h3>
          </div>
        </div>

        {/* Backup Schedule Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ background: '#EFF6FF', padding: '20px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <AlertCircle size={24} color="#3B82F6" />
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px 0' }}>Avtomatik backup jadvali</h4>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>Kunlik: har kuni soat 03:00 | Haftalik: har shanba soat 03:00</p>
          </div>
        </motion.div>

        {/* Backups List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #f1f1f1', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Backup tarixi</h3>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Nomi</th>
                  <th>Turi</th>
                  <th>Hajm</th>
                  <th>Sana</th>
                  <th>Amallar</th>
                </tr>
              </thead>
              <tbody>
                {backups.map((backup) => (
                  <tr key={backup.id}>
                    <td style={{ fontWeight: 700 }}>{backup.name}</td>
                    <td>
                      <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '20px', 
                        background: `${getTypeColor(backup.type)}20`, 
                        color: getTypeColor(backup.type), 
                        fontSize: '12px', 
                        fontWeight: 700 
                      }}>
                        {backup.type === 'daily' ? 'Kunlik' : backup.type === 'weekly' ? 'Haftalik' : backup.type === 'monthly' ? 'Oylik' : 'Qo\'lda'}
                      </span>
                    </td>
                    <td>{backup.size}</td>
                    <td style={{ fontSize: '14px' }}>{formatDate(backup.date)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => downloadBackup(backup.name)}
                          style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#3B82F6', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}
                        >
                          <Download size={16} />
                          Yuklab olish
                        </button>
                        <button
                          onClick={() => deleteBackup(backup.id)}
                          style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#EF4444', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}
                        >
                          <Trash2 size={16} />
                          O'chirish
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Backups;
