import React from 'react';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <div style={{ fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
            ElectroTech Engineering Systems
          </div>
          <div>
            Built with MERN Stack (React 18, Express.js, Node.js, and MongoDB)
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>
          <span>REST API Standard v2.1</span>
          <span>Role-Based Access Control</span>
          <span>Full-Stack Security Hardened</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
