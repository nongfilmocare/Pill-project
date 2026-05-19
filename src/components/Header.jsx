'use client';

import React from 'react';

export default function Header() {
  return (
    <header className="app-header">
      <div className="logo-badge animate-fade">
        <span className="plus-icon">💚</span> คู่มือความปลอดภัยการใช้ยาประเทศไทย
      </div>
      <h1 className="app-title animate-fade">รู้เรื่องยา RDU</h1>
      <p className="app-subtitle animate-fade">
        ระบบสืบค้นข้อมูลยา คำแนะนำการใช้ยา และการเก็บรักษาที่เข้าใจง่ายเพื่อทุกครอบครัว 
        รวบรวมรหัสยามาตรฐาน TMT กว่า 34,000 รายการ
      </p>
    </header>
  );
}
