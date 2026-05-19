'use client';

import React, { useState, useMemo, useEffect } from 'react';
import drugData from '../data/drugs.json';
import Header from '../components/Header';
import SearchFilters from '../components/SearchFilters';
import DrugCard from '../components/DrugCard';
export default function RduAppPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [visibleCount, setVisibleCount] = useState(50);
  const [loading, setLoading] = useState(false);

  // การกรองและค้นหาข้อมูลยา (Optimized Search & Filtering)
  const filteredDrugs = useMemo(() => {
    let result = drugData;

    // กรองประเภทด่วน (Quick Filters)
    if (selectedFilter !== 'ALL') {
      const filterLower = selectedFilter.toLowerCase();
      result = result.filter(d => d.d && d.d.toLowerCase().includes(filterLower));
    }

    // ค้นหารายละเอียด (Search Query)
    if (searchQuery.trim().length >= 2) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(d => 
        (d.t && d.t.toLowerCase().includes(query)) || // ค้นหาด้วยชื่อการค้า
        (d.a && d.a.toLowerCase().includes(query)) || // ค้นหาด้วยชื่อสามัญ
        (d.c && d.c.includes(query))                  // ค้นหาด้วยรหัส TPUCode
      );
    } else if (searchQuery.trim().length > 0) {
      // คืนค่าว่างถ้าพิมพ์แค่ 1 ตัวอักษร เพื่อประสิทธิภาพสูงสุดในการประมวลผล
      return [];
    }

    return result;
  }, [searchQuery, selectedFilter]);

  // รีเซ็ตจำนวนที่แสดงเมื่อมีการค้นหาหรือเปลี่ยนหมวดหมู่ใหม่
  useEffect(() => {
    setVisibleCount(50);
  }, [searchQuery, selectedFilter]);

  const displayedDrugs = useMemo(() => {
    return filteredDrugs.slice(0, visibleCount);
  }, [filteredDrugs, visibleCount]);

  const loadMore = () => {
    setVisibleCount(prev => prev + 50);
  };

  return (
    <div className="app-container">
      {/* 1. Header ส่วนหัวแอปพลิเคชัน */}
      <Header />

      {/* 2. ส่วนการกรองและค้นหาข้อมูล (Search & Filters) */}
      <SearchFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        filteredCount={filteredDrugs.length}
      />

      {/* 3. ส่วนแสดงผลการสืบค้น (Results Grid) */}
      <main className="results-container">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>กำลังค้นหาข้อมูลยาในฐานข้อมูล TMT...</p>
          </div>
        ) : displayedDrugs.length > 0 ? (
          <>
            <div className="drugs-grid animate-fade">
              {displayedDrugs.map((drug, index) => (
                <DrugCard 
                  key={drug.c || index} 
                  drug={drug}
                />
              ))}
            </div>

            {/* ปุ่มโหลดเพิ่มเพื่อลดภาระ DOM (Lazy Load Button) */}
            {filteredDrugs.length > visibleCount && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <button className="filter-btn active" onClick={loadMore}>
                  ⚡ แสดงยาเพิ่มเติม (อีก 50 รายการ)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-results animate-fade">
            <div className="no-results-icon">🔎</div>
            <h3>ไม่พบข้อมูลยาที่คุณค้นหา</h3>
            <p>
              {searchQuery.trim().length < 2 
                ? "กรุณาพิมพ์ชื่อยาอย่างน้อย 2 ตัวอักษรขึ้นไปในการค้นหาด่วน" 
                : "ลองตรวจสอบการสะกดชื่อยาสามัญภาษาอังกฤษ หรือชื่อแบรนด์การค้าอีกครั้ง"}
            </p>
          </div>
        )}
      </main>


      {/* 5. Footer ส่วนท้ายแอป */}
      <footer className="app-footer">
        <p>© 2026 รู้เรื่องยา RDU - โครงการต้นแบบนวัตกรรมการสืบค้นข้อมูลยาและรหัสยามาตรฐานแห่งชาติ TMT</p>
        <p>
          ปรับปรุงใหม่เป็น Next.js + Vanilla CSS • เชื่อมโยงรหัส 
          <a href="https://tmt.this.or.th/" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '4px' }}>
             มาตรฐานยา TMT (ไทย)
          </a>
        </p>
      </footer>
    </div>
  );
}
