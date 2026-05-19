'use client';

import React, { useState, useMemo } from 'react';
import { getRduDetails } from '../utils/rduMatcher';

export default function LeafletModal({ drug, onClose }) {
  const [copied, setCopied] = useState(false);

  const selectedRdu = useMemo(() => {
    return getRduDetails(drug);
  }, [drug]);

  if (!drug || !selectedRdu) return null;

  const handleCopyDirections = () => {
    const textToCopy = `[ข้อมูลยา RDU]\nชื่อยา: ${drug.t}\nสามัญ: ${drug.a}\nข้อบ่งใช้: ${selectedRdu.indications}\nวิธีใช้: ${selectedRdu.instructions}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="rdu-leaflet-modal animate-scale" 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-modal-btn" onClick={onClose} aria-label="ปิดหน้าต่าง">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        {/* ส่วนหัวฉลาก RDU */}
        <div className="rdu-header">
          <span className="rdu-header-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            ข้อมูลยาผู้ป่วย (Patient Information)
          </span>
          <h2 className="rdu-header-title">{drug.t}</h2>
          <p className="rdu-header-sub">{drug.a} {drug.s ? `(${drug.s})` : ''}</p>
        </div>

        {/* แถบเตือนบางๆ (Banner) */}
        {selectedRdu.isFallback && (
          <div className="rdu-alert-banner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <span><strong>ข้อควรระวัง:</strong> ข้อมูลเบื้องต้น โปรดปรึกษาแพทย์หรือเภสัชกรก่อนใช้งาน</span>
          </div>
        )}

        {/* ข้อมูลยา (Clean List) */}
        <div className="rdu-body">
          
          <div className="rdu-data-grid">
            <div className="rdu-data-row">
              <span className="rdu-data-label">ชื่อภาษาไทย</span>
              <span className="rdu-data-value">{selectedRdu.thaiGeneric}</span>
            </div>
            <div className="rdu-data-row">
              <span className="rdu-data-label">รูปแบบยา</span>
              <span className="rdu-data-value">{selectedRdu.category}</span>
            </div>
            {drug.s && (
              <div className="rdu-data-row">
                <span className="rdu-data-label">ความแรง</span>
                <span className="rdu-data-value">{drug.s}</span>
              </div>
            )}
            <div className="rdu-data-row">
              <span className="rdu-data-label">หน่วยบรรจุ</span>
              <span className="rdu-data-value">{drug.u || '-'}</span>
            </div>
          </div>

          <hr className="rdu-divider" />

          <div className="rdu-section">
            <h4 className="rdu-section-title">ข้อบ่งใช้ (Indications)</h4>
            <p className="rdu-section-content">{selectedRdu.indications}</p>
          </div>

          <div className="rdu-section">
            <h4 className="rdu-section-title">คำแนะนำในการใช้ยา</h4>
            <p className="rdu-section-content" style={{ whiteSpace: 'pre-line' }}>{selectedRdu.instructions}</p>
          </div>

          <div className="rdu-section">
            <h4 className="rdu-section-title">อาการไม่พึงประสงค์</h4>
            <p className="rdu-section-content">{selectedRdu.adverseEffects}</p>
          </div>

          <div className="rdu-section">
            <h4 className="rdu-section-title text-red">ข้อห้ามใช้</h4>
            <p className="rdu-section-content">{selectedRdu.contraindications}</p>
          </div>

          <div className="rdu-section">
            <h4 className="rdu-section-title">การเก็บรักษา</h4>
            <p className="rdu-section-content">{selectedRdu.storage}</p>
          </div>

        </div>

        {/* ส่วนท้ายฉลาก (Footer) */}
        <div className="rdu-footer">
          <span className="modal-ref-code">TMT: {drug.c}</span>
          
          <div className="modal-footer-actions">
            <button className="footer-action-btn" onClick={handleCopyDirections}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              {copied ? 'คัดลอกสำเร็จ' : 'คัดลอก'}
            </button>
            <button className="footer-action-btn" onClick={() => window.print()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              พิมพ์
            </button>
            <button className="footer-close-btn" onClick={onClose}>ปิด</button>
          </div>
        </div>
      </div>
    </div>
  );
}
