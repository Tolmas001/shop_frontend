import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Compass, Map as MapIcon, Database, Activity, Share2, Layers } from 'lucide-react';

const GeospatialDashboard = () => {
  return (
    <div className="geospatial-page" style={{ 
      minHeight: '100vh', 
      background: '#f8fafc', 
      backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', 
      backgroundSize: '32px 32px',
      padding: '80px 40px',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div className="container">
        {/* Top Panel - Main Map Display */}
        <motion.div 
          className="glass-panel"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            height: '600px',
            borderRadius: '32px',
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '60px'
          }}
        >
          {/* Header Info */}
          <div style={{ position: 'absolute', top: '32px', right: '40px', textAlign: 'right' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b' }}>state river</span>
          </div>

          {/* SVG Map Layer */}
          <svg viewBox="0 0 1000 500" style={{ width: '100%', height: '100%', opacity: 0.1 }}>
            <path d="M150,150 Q200,100 250,150 T350,150" fill="none" stroke="#64748b" strokeWidth="1" />
            <path d="M600,100 L700,100 L750,200 L650,300 Z" fill="rgba(100,116,139,0.2)" />
            {/* Simple world map path representation */}
            <path d="M200,100 C250,80 300,120 280,180 C260,240 200,220 180,160 Z" fill="rgba(0,0,0,0.1)" />
            <path d="M500,150 C550,130 600,170 580,230 C560,290 500,270 480,210 Z" fill="rgba(0,0,0,0.1)" />
          </svg>

          {/* Overlays */}
          {/* North America */}
          <div style={{ position: 'absolute', top: '25%', left: '15%' }}>
            <div className="technical-card tier-2">
              <span className="card-tag">Tier-2</span>
              <div className="card-content">Tier 2 Analysis</div>
            </div>
          </div>

          {/* Europe / Africa Central */}
          <div style={{ position: 'absolute', top: '35%', left: '45%' }}>
            <div className="technical-card tier-3">
              <span className="card-tag">Tier 3</span>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <Settings size={14} className="spinning" />
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
            <div className="technical-card tier-3" style={{ marginTop: '10px' }}>
              <span className="card-tag">Tier 3</span>
            </div>
          </div>

          {/* East Asia / Australia */}
          <div style={{ position: 'absolute', top: '30%', right: '15%' }}>
            <div className="technical-card tier-2-large">
               <div className="card-header">Tier 2</div>
               <div className="card-body">Spatial Grid Active</div>
               <div className="card-footer">rlates</div>
            </div>
          </div>

          {/* Winding Blue River Graphic */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
             <motion.path 
               d="M100,300 C200,250 300,350 400,300 S600,250 800,350 S900,300 1000,320" 
               fill="none" 
               stroke="rgba(59, 130, 246, 0.5)" 
               strokeWidth="4"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
             />
             <Compass size={24} x="850" y="380" color="rgba(59, 130, 246, 0.4)" />
          </svg>

          {/* Bottom Left Summary */}
          <div style={{ position: 'absolute', bottom: '32px', left: '40px' }}>
            <div className="data-summary-card">
              <h4>System Analytics</h4>
              <div className="mini-bars">
                <div className="bar" style={{ width: '80%' }}></div>
                <div className="bar" style={{ width: '60%' }}></div>
                <div className="bar" style={{ width: '90%' }}></div>
              </div>
              <p>Operational Efficiency: 94%</p>
            </div>
          </div>

          {/* Connection Lines */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
             <line x1="20%" y1="30%" x2="45%" y2="40%" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
             <line x1="75%" y1="35%" x2="55%" y2="45%" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* Legend Section */}
        <section className="legend-section">
          <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '24px', color: '#1e293b' }}>Stress legend</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
            <div className="legend-card dark-ring">
              <div className="ring"></div>
              <span>Level 5</span>
            </div>
            <div className="legend-card grey-soft">
              <div className="ring"></div>
              <span>Level 4</span>
            </div>
            <div className="legend-card semi-trans">
              <span>Level 3</span>
            </div>
            <div className="legend-card blue-target">
              <div className="target-ring"></div>
              <span style={{ textDecoration: 'underline' }}>1.24 m/s</span>
            </div>
            <div className="legend-card minimalist-white">
               <div style={{ fontSize: '10px', opacity: 0.5, marginBottom: '4px' }}>Metadata</div>
               <div style={{ fontWeight: 800 }}>Story</div>
               <div style={{ fontSize: '12px', opacity: 0.7 }}>Overview</div>
            </div>
          </div>
        </section>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .technical-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          padding: 12px 16px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .card-tag { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #94a3b8; }
        .card-content { font-size: 13px; font-weight: 600; margin-top: 4px; }
        .tier-3 { background: rgba(15, 23, 42, 0.05); }
        .dot { width: 4px; height: 4px; background: #000; border-radius: 50%; }
        .spinning { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .tier-2-large {
          background: rgba(255,255,255,0.9);
          width: 180px;
          padding: 20px;
          border-radius: 20px;
          border: 1px solid #fff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .tier-2-large .card-header { font-size: 10px; font-weight: 800; color: #3b82f6; }
        .tier-2-large .card-body { font-size: 14px; font-weight: 700; margin: 10px 0; }
        .tier-2-large .card-footer { font-size: 10px; text-align: right; opacity: 0.4; }

        .data-summary-card {
          background: #fff;
          padding: 20px;
          border-radius: 16px;
          width: 220px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        .data-summary-card h4 { margin: 0 0 12px 0; font-size: 14px; }
        .mini-bars { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
        .bar { height: 4px; background: #e2e8f0; border-radius: 2px; position: relative; }
        .bar::after { content: ''; position: absolute; left: 0; top: 0; height: 100%; width: 100%; background: #3b82f6; border-radius: 2px; }
        .data-summary-card p { font-size: 11px; margin: 0; opacity: 0.6; }

        .legend-card {
          height: 100px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-size: 13px;
          font-weight: 700;
        }
        .dark-ring { background: #0f172a; color: white; }
        .dark-ring .ring { width: 40px; height: 40px; border: 2px solid rgba(255,255,255,0.2); border-radius: 50%; margin-bottom: 8px; }
        .grey-soft { background: #64748b; color: white; }
        .grey-soft .ring { width: 40px; height: 40px; border: 2px solid rgba(255,255,255,0.1); border-radius: 50%; margin-bottom: 8px; }
        .semi-trans { background: rgba(148, 163, 184, 0.2); border: 1px solid rgba(0,0,0,0.05); }
        .blue-target { background: #dbeafe; color: #1e40af; }
        .target-ring { width: 30px; height: 30px; border: 4px double #1e40af; border-radius: 50%; margin-bottom: 8px; }
        .minimalist-white { background: #fff; border: 1px solid #e2e8f0; align-items: flex-start; padding: 15px; }
      ` }} />
    </div>
  );
};

export default GeospatialDashboard;
