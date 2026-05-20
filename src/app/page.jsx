'use client';

import React, { useState, useMemo, useEffect } from 'react';
import drugData from '../data/drugs.json';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import SearchFilters from '../components/SearchFilters';
import DrugCard from '../components/DrugCard';
import { mapThaiToEnglishGeneric, getBotResponse } from '../utils/safetyEngine';

export default function RduAppPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [visibleCount, setVisibleCount] = useState(50);
  const [loading, setLoading] = useState(false);

  // การกรองและค้นหาข้อมูลยา (Optimized Search & Filtering with Thai Phonetic Support)
  const filteredDrugs = useMemo(() => {
    let result = drugData;

    // กรองประเภทด่วน (Quick Filters)
    if (selectedFilter !== 'ALL') {
      result = result.filter(d => {
        if (!d.d) return false;
        const form = d.d.toLowerCase();
        
        const isTablet = form.includes('tablet') || form.includes('pill');
        const isCapsule = form.includes('capsule') || form.includes('cap');
        const isCream = form.includes('cream') || form.includes('ointment') || form.includes('gel') || form.includes('lotion');
        const isInjection = form.includes('inject') || form.includes('infusion');
        const isLiquid = (form.includes('syrup') || form.includes('suspension') || form.includes('solution') || form.includes('liquid') || form.includes('drop') || form.includes('mixture') || form.includes('elixir')) && !isInjection;
        
        if (selectedFilter === 'tablet') return isTablet;
        if (selectedFilter === 'capsule') return isCapsule;
        if (selectedFilter === 'cream') return isCream;
        if (selectedFilter === 'injection') return isInjection;
        if (selectedFilter === 'liquid') return isLiquid;
        if (selectedFilter === 'others') return !isTablet && !isCapsule && !isCream && !isInjection && !isLiquid;
        return true;
      });
    }

    // ค้นหารายละเอียด (Search Query)
    if (searchQuery.trim().length >= 2) {
      const query = searchQuery.toLowerCase().trim();
      const mappedGenerics = mapThaiToEnglishGeneric(query);

      result = result.filter(d => {
        // Direct matches (English trade name, English generic name, or TPUCode)
        const isDirectMatch = 
          (d.t && d.t.toLowerCase().includes(query)) ||
          (d.a && d.a.toLowerCase().includes(query)) ||
          (d.c && d.c.includes(query));
        
        if (isDirectMatch) return true;

        // Phonetic Thai matches
        if (mappedGenerics.length > 0) {
          return mappedGenerics.some(gen => {
            if (gen === 'bismuth') {
              return d.a && d.a.toLowerCase().includes('bismuth subsalicylate');
            }
            if (gen === 'algycon') {
              return (d.a && d.a.toLowerCase().includes('alginic acid')) || 
                     (d.t && d.t.toLowerCase().includes('algycon'));
            }
            return d.a && d.a.toLowerCase().includes(gen);
          });
        }

        return false;
      });
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

  // เลื่อนกลับขึ้นไปบนสุดโดยอัตโนมัติเมื่อพิมพ์ค้นหาหรือล้างข้อมูล
  useEffect(() => {
    if (typeof window !== 'undefined' && window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [searchQuery]);

  const displayedDrugs = useMemo(() => {
    return filteredDrugs.slice(0, visibleCount);
  }, [filteredDrugs, visibleCount]);

  const loadMore = () => {
    setVisibleCount(prev => prev + 50);
  };

  // 1. ตรวจสอบว่าเป็นการสอบถามเกี่ยวกับความปลอดภัยหรือไม่
  const isSafetyQuery = useMemo(() => {
    if (searchQuery.trim().length < 3) return false;
    
    // หากเอ่ยชื่อยาตั่งแต่ 2 ตัวขึ้นไป ให้ถือเป็นคำถามความปลอดภัย (Drug-Drug Interaction) โดยอัตโนมัติ
    if (mapThaiToEnglishGeneric(searchQuery).length >= 2) return true;

    const query = searchQuery.toLowerCase().trim();
    const safetyKeywords = [
      'ได้ไหม', 'ได้่ไหม', 'กินคู่', 'ร่วมกัน', 'พร้อมกัน', 'ทานคู่', 'ทานร่วม', 'กินร่วม',
      'กาแฟ', 'ชา', 'เครื่องดื่ม', 'น้ำอัดลม', 'coffee',
      'ท้อง', 'ตั้งครรภ์', 'ครรภ์', 'ให้นมบุตร', 'pregnancy',
      'วิธีทาน', 'วิธีกิน', 'วิธีใช้', 'กินยังไง', 'กินตอนไหน', 'ก่อนหรือหลังอาหาร',
      'ผลข้างเคียง', 'ข้างเคียง', 'อันตราย', 'แพ้ยา', 'adverse', 'side effect',
      'ลืมกิน', 'ลืมทาน', 'ลืมกินยา', 'ลืมยา',
      'ยาปฏิชีวนะ', 'ยาฆ่าเชื้อ', 'ยาแก้อักเสบ', 'ต่างกันยังไง', 'ยาปฏิ',
      'หลังอาหารทันที', 'ระคายเคือง', 'กัดกระเพาะ',
      'ท้องเสีย', 'ท้องร่วง', 'ท้องเสียกินอะไร',
      'ทำไมถูกยกเลิก', 'เพิกถอน', 'ยกเลิกทะเบียน', 'ยกเลิก'
    ];
    return safetyKeywords.some(keyword => query.includes(keyword));
  }, [searchQuery]);

  // 2. ประมวลผลคำตอบจาก AI Smart Engine
  const aiResponse = useMemo(() => {
    if (!isSafetyQuery) return null;
    const response = getBotResponse(searchQuery, null);
    
    // หลีกเลี่ยงการแสดง Fallback ที่ไม่เกี่ยวข้อง
    if (response && response.includes('ขออภัยครับ คำถามของคุณกว้างไปนิดนึง')) {
      return null;
    }
    return response;
  }, [isSafetyQuery, searchQuery]);

  // 3. ฟังก์ชันจัดรูปแบบข้อความสำหรับการ์ด AI Response (Custom Markdown-to-JSX Parser)
  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={index} style={{ height: '8px' }} />;

      const isHeading = trimmed.startsWith('👉') || trimmed.startsWith('💡 **ตรวจพบข้อมูลยา:**') || trimmed.startsWith('💊 **ข้อแนะนำ RDU');
      const isWarning = trimmed.startsWith('⚠️') || trimmed.startsWith('❌');
      const isBullet = trimmed.startsWith('-') || trimmed.startsWith('•');

      let cleanLine = trimmed;
      if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
        cleanLine = trimmed.substring(1).trim();
      }

      // Parse **bold** into <strong> elements
      const parts = [];
      let lastIndex = 0;
      const regex = /\*\*(.*?)\*\*/g;
      let match;
      while ((match = regex.exec(cleanLine)) !== null) {
        if (match.index > lastIndex) {
          parts.push(cleanLine.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={match.index} className="ai-highlight">
            {match[1]}
          </strong>
        );
        lastIndex = regex.lastIndex;
      }
      if (lastIndex < cleanLine.length) {
        parts.push(cleanLine.substring(lastIndex));
      }

      const content = parts.length > 0 ? parts : cleanLine;

      if (isHeading) {
        return (
          <div key={index} className="ai-response-heading animate-fade">
            {content}
          </div>
        );
      }
      if (isWarning) {
        return (
          <div key={index} className="ai-response-warning animate-fade">
            {content}
          </div>
        );
      }
      if (isBullet) {
        return (
          <div key={index} className="ai-response-bullet animate-fade">
            <span className="bullet-dot">▪</span>
            <div className="bullet-content">{content}</div>
          </div>
        );
      }

      return (
        <p key={index} className="ai-response-para animate-fade">
          {content}
        </p>
      );
    });
  };

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
          {/* RDU Smart AI Response Card */}
          {aiResponse && (
            <div className="ai-response-card animate-fade">
              <div className="ai-response-header">
                <div className="ai-response-title-wrapper">
                  <span className="ai-response-bot-icon">🤖</span>
                  <div>
                    <h4 className="ai-response-title">RDU Smart AI Assistant Response</h4>
                    <p className="ai-response-subtitle">เภสัชกรอัจฉริยะประเมินความปลอดภัยในการใช้ยาและรหัสยามาตรฐานแห่งชาติ TMT</p>
                  </div>
                </div>
                <button className="ai-response-close" onClick={() => setSearchQuery('')} title="ล้างการค้นหา">
                  ✕
                </button>
              </div>
              <div className="ai-response-body">
                {renderFormattedText(aiResponse)}
              </div>
              <div className="ai-response-footer">
                <span className="ai-response-badge">🛡️ ประเมินผลความปลอดภัยแบบออฟไลน์ด้วยระบบ RDU Rule Engine</span>
              </div>
            </div>
          )}

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
            !aiResponse && (
              <div className="no-results animate-fade">
                <div className="no-results-icon">🔎</div>
                <h3>ไม่พบข้อมูลยาที่คุณค้นหา</h3>
                <p>
                  {searchQuery.trim().length < 2 
                    ? "กรุณาพิมพ์ชื่อยาอย่างน้อย 2 ตัวอักษรขึ้นไปในการค้นหาด่วน" 
                    : "ลองตรวจสอบการสะกดชื่อยาสามัญภาษาอังกฤษ หรือชื่อแบรนด์การค้าอีกครั้ง"}
                </p>
              </div>
            )
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
    </>
  );
}
