'use client';

import React from 'react';
import { getDosageIcon } from '../utils/rduMatcher';

import Link from 'next/link';

export default function DrugCard({ drug }) {
  return (
    <Link 
      href={`/drug/${drug.c}`}
      className="drug-card"
      style={{ textDecoration: 'none' }}
    >
      <div className="drug-card-top-right">
        <span className="drug-tpu-code">TMT: {drug.c}</span>
        <span className="drug-form-icon">{getDosageIcon(drug.d)}</span>
      </div>
      
      <div className="drug-card-content">
        <h3 className="drug-trade-name">{drug.t}</h3>
        
        <div className="drug-secondary-info">
          <p className="drug-generic-name">
            <span className="generic-icon">🌿</span> {drug.a}
          </p>
          <div className="drug-badge-row">
            {drug.d && <span className="badge badge-dosage">{drug.d}</span>}
            {drug.s && <span className="badge badge-strength">{drug.s}</span>}
          </div>
        </div>
      </div>
      
      <div className="drug-card-footer">
        <span className="drug-unit">📦 {drug.u || 'ไม่ระบุ'}</span>
        <span className="view-leaflet-link">คำแนะนำการใช้ยา →</span>
      </div>
    </Link>
  );
}
