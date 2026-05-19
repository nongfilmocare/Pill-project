'use client';

import React from 'react';

export default function SearchFilters({
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  filteredCount
}) {
  const trendingTags = ['Paracetamol', 'Amoxicillin', 'Ibuprofen', 'Omeprazole', 'Clobetasol'];

  return (
    <section className="search-section animate-slide">
      {/* Friendly Guide Label for Kids & Elderly */}
      <div className="search-tip-label">
        💡 ค้นหายาที่คุณต้องการได้ที่นี่ (ตัวอักษรขนาดใหญ่อ่านง่าย):
      </div>

      {/* Search Input Box */}
      <div className="search-box-wrapper">
        <div className="search-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input 
          type="text"
          className="search-input"
          placeholder="ตัวอย่างการพิมพ์ค้นหา: Sara, พารา, Paracetamol, Clobetasol..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="clear-button" onClick={() => setSearchQuery('')} aria-label="ล้างการค้นหา">✕</button>
        )}
      </div>

      {/* Popular Search tags */}
      <div className="trending-container animate-fade">
        <span className="trending-label">🔥 คำค้นยอดนิยม:</span>
        {trendingTags.map((tag) => (
          <button 
            key={tag} 
            className="trending-tag" 
            onClick={() => setSearchQuery(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Quick Category Filters */}
      <div className="filters-container">
        <button 
          className={`filter-btn ${selectedFilter === 'ALL' ? 'active active-all' : ''}`}
          onClick={() => setSelectedFilter('ALL')}
        >
          <span className="filter-icon">💊</span>
          <span className="filter-text">ทั้งหมด</span>
        </button>
        <button 
          className={`filter-btn ${selectedFilter === 'tablet' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('tablet')}
        >
          <span className="filter-icon">🥤</span>
          <span className="filter-text">ยาเม็ด (Tablet)</span>
        </button>
        <button 
          className={`filter-btn ${selectedFilter === 'cream' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('cream')}
        >
          <span className="filter-icon">🧴</span>
          <span className="filter-text">ยาครีม (Cream)</span>
        </button>
        <button 
          className={`filter-btn ${selectedFilter === 'injection' ? 'active' : ''}`}
          onClick={() => setSelectedFilter('injection')}
        >
          <span className="filter-icon">💉</span>
          <span className="filter-text">ยาฉีด (Injection)</span>
        </button>
      </div>

      {/* Query Stats Count */}
      <div className="stats-badge animate-fade">
        ค้นพบยา <span className="stats-count">{filteredCount.toLocaleString()}</span> รายการ 
        {selectedFilter !== 'ALL' && ` ในหมวดหมู่ ${selectedFilter}`}
      </div>
    </section>
  );
}
