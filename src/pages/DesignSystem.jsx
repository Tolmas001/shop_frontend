import React from 'react';
import { motion } from 'framer-motion';
import { Bell, ShieldCheck, ShoppingBag, Star, Info, AlertCircle, CheckCircle, Save, Loader2, Sparkles, Droplets, Zap } from 'lucide-react';

const DesignSystem = () => {
  return (
    <div className="design-system-page" style={{ 
      minHeight: '100vh', 
      padding: '100px 20px',
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Bubbles */}
      <div className="liquid-bubble" style={{ width: '400px', height: '400px', top: '-10%', left: '-5%', opacity: 0.1 }}></div>
      <div className="liquid-bubble" style={{ width: '300px', height: '300px', bottom: '10%', right: '5%', opacity: 0.1, animationDelay: '2s' }}></div>

      <div className="container">
        <header style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '48px', fontWeight: 900, marginBottom: '16px', letterSpacing: '-1px' }}
          >
            Design System <span style={{ color: 'var(--primary)' }}>Showcase</span>
          </motion.h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>The future of ShopSRY Ultra Liquid Glassmorphism</p>
        </header>

        {/* Top Assets Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginBottom: '80px' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card glass-1">
            <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Droplets size={20} /> Glass-1
            </h3>
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div className="glass-sphere-minimalist"></div>
               <div className="water-ripples"></div>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '20px' }}>Minimalist spheres and simple water ripples.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card glass-2" style={{ background: 'rgba(203, 213, 225, 0.4)' }}>
            <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={20} /> Glass-2
            </h3>
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div className="organic-fluid-blob"></div>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '20px' }}>Complex, organic fluid glass forms.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card glass-3" style={{ background: 'rgba(15, 23, 42, 0.4)', color: 'white' }}>
            <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={20} /> Glass-3
            </h3>
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div className="iridescent-glass-form"></div>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginTop: '20px' }}>Dynamic, iridescent, opalescent reflections.</p>
          </motion.div>
        </div>

        {/* Center Main Panel */}
        <div style={{ position: 'relative', marginBottom: '100px' }}>
          <motion.div 
            className="glass-t1" 
            style={{ 
              padding: '60px', 
              textAlign: 'center', 
              position: 'relative',
              zIndex: 2,
              border: '2px solid rgba(255,255,255,0.8)'
            }}
          >
            <div className="bolt top-left"></div>
            <div className="bolt top-right"></div>
            <div className="bolt bottom-left"></div>
            <div className="bolt bottom-right"></div>
            
            <h2 style={{ fontSize: '32px', marginBottom: '40px' }}>Polished Component Preview</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
              <div className="preview-card glass-t3">
                <div className="mini-sphere"></div>
                <p>Calm</p>
              </div>
              <div className="preview-card glass-t3">
                <div className="water-surface-texture"></div>
                <p>Texture</p>
              </div>
              <div className="preview-card glass-t3" style={{ border: '2px solid var(--primary)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Bell size={16} color="var(--primary)" />
                    <span style={{ fontSize: '10px', fontWeight: 800 }}>FIX%</span>
                  </div>
                  <div className="mini-progress-bar"></div>
                  <button className="btn-small-dark">Save</button>
                </div>
                <p>Hotspot</p>
              </div>
              <div className="preview-card glass-t3">
                <div className="bokeh-spheres"></div>
                <p>Shape</p>
              </div>
              <div className="preview-card glass-t3" style={{ background: '#0f172a', color: 'white' }}>
                <div className="cosmic-orb"></div>
                <p>Dark</p>
              </div>
            </div>
          </motion.div>
          {/* Connector Lines (SVG) */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
             <line x1="20%" y1="50%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
             <line x1="80%" y1="50%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </svg>
        </div>

        {/* Bottom Status & Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
             <div className="glass-card status-box" style={{ flex: 1, textAlign: 'center' }}>
                <div className="fail-ring"></div>
                <h4>Fail</h4>
             </div>
             <div className="glass-card status-box" style={{ flex: 1, textAlign: 'center' }}>
                <div className="cosmic-sphere-fix"></div>
                <h4>Fix</h4>
             </div>
          </div>

          <div className="glass-card">
            <h4 style={{ marginBottom: '24px' }}>Controls & States</h4>
            <div className="color-ramp" style={{ marginBottom: '32px' }}>
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="color-step">
                   {i === 4 && <div className="active-dot"></div>}
                 </div>
               ))}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
               <button className="btn btn-focus">Focus</button>
               <button className="btn btn-pressed">Pressed</button>
               <button className="btn btn-disabled">Disabled</button>
               <button className="btn btn-error">Error</button>
            </div>
            
            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
               <Loader2 className="spinner-loading" size={32} />
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .design-system-page h3 { font-weight: 800; }
        .bolt { width: 8px; height: 8px; background: #94a3b8; border-radius: 50%; position: absolute; box-shadow: inset 0 1px 1px rgba(0,0,0,0.2); }
        .top-left { top: 20px; left: 20px; }
        .top-right { top: 20px; right: 20px; }
        .bottom-left { bottom: 20px; left: 20px; }
        .bottom-right { bottom: 20px; right: 20px; }
        
        .preview-card { border-radius: 20px; padding: 10px; text-align: center; transition: 0.3s; }
        .preview-card p { font-size: 11px; font-weight: 800; text-transform: uppercase; margin-top: 10px; opacity: 0.6; }
        
        .mini-sphere { width: 40px; height: 40px; background: rgba(255,255,255,0.4); border-radius: 50%; margin: 0 auto; box-shadow: inset -5px -5px 15px rgba(0,0,0,0.1); }
        .mini-progress-bar { height: 4px; background: rgba(0,0,0,0.05); border-radius: 2px; position: relative; overflow: hidden; }
        .mini-progress-bar::after { content: ''; position: absolute; left: 0; top: 0; height: 100%; width: 65%; background: var(--primary); }
        .btn-small-dark { background: #0f172a; color: white; border: none; padding: 6px; border-radius: 8px; font-size: 10px; font-weight: 700; cursor: pointer; }
        
        .color-ramp { display: flex; gap: 8px; }
        .color-step { flex: 1; height: 8px; background: rgba(0,0,0,0.05); border-radius: 4px; position: relative; }
        .active-dot { width: 12px; height: 12px; background: var(--primary); border-radius: 50%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border: 2px solid white; }
        
        .btn-focus { border: 2px solid var(--primary) !important; }
        .btn-pressed { background: #94a3b8 !important; color: white !important; }
        .btn-disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-error { border: 2px dashed #ef4444 !important; }
        
        .spinner-loading { animation: spin 2s linear infinite; color: var(--primary); }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .glass-sphere-minimalist { width: 80px; height: 80px; background: rgba(255,255,255,0.3); border-radius: 50%; box-shadow: inset 0 0 20px rgba(255,255,255,0.5); }
        .water-ripples { position: absolute; width: 120px; height: 120px; border: 1px solid rgba(255,255,255,0.2); border-radius: 50%; animation: ripple 4s infinite; }
        @keyframes ripple { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
        
        .organic-fluid-blob { width: 100px; height: 100px; background: rgba(255,255,255,0.4); border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; animation: morph 8s infinite alternate; }
        @keyframes morph { 0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } 100% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; } }
        
        .iridescent-glass-form { width: 100px; height: 100px; background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)); border-radius: 50%; position: relative; overflow: hidden; }
        .iridescent-glass-form::after { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: conic-gradient(from 180deg at 50% 50%, #ff0080, #ff8c00, #40e0d0, #ff0080); opacity: 0.2; animation: rotate 10s linear infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .fail-ring { width: 60px; height: 60px; border: 4px solid rgba(239, 68, 68, 0.2); border-radius: 50%; border-top-color: #ef4444; }
        .cosmic-sphere-fix { width: 60px; height: 60px; background: radial-gradient(circle at 30% 30%, #4f46e5, #000); border-radius: 50%; box-shadow: 0 0 20px rgba(79, 70, 229, 0.4); }
      ` }} />
    </div>
  );
};

export default DesignSystem;
