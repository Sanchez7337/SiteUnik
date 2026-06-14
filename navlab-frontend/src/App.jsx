import React, { useState, useEffect } from 'react';

function App() {
  // Стан для динамічних новин із бази даних SQLite
  const [news, setNews] = useState([]);
  // Стан для перемикача темної/світлої тему (за замовчуванням true — темна)
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  // Стан для інтерактивного перемикання вкладок меню (SPA)
  const [activeTab, setActiveTab] = useState('home');

  // Стан для форми зворотного зв'язку
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Автоматичний fetch-запит до нашого Node.js сервера
  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then((response) => response.json())
      .then((data) => setNews(data))
      .catch((error) => console.error('Помилка завантаження даних з БД:', error));
  }, []);

  // Перемикач теми (зберігає поточний стан при кліку)
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Обробник змін у полях форми
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Обробник відправки форми (закритий повністю і без помилок)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 4000);
    }
  };

  return (
    <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
      
      {/* 📦 ШАПКА САЙТУ ТА НАВІГАЦІЯ (Хедер) */}
      <header className="site-header">
        <div className="container header-container">
          <div className="logo">
            <a href="#home" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>
              НАВ<span>ЛАБ</span>
            </a>
          </div>
          <nav className="main-nav">
            <button className="theme-btn" onClick={toggleTheme}>
              {isDarkTheme ? '☀️' : '🌙'}
            </button>
            <ul className="nav-links">
              <li>
                <button 
                  className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('home')}
                >Головна</button>
              </li>
              <li>
                <button 
                  className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('about')}
                >Про сайт</button>
              </li>
              <li>
                <button 
                  className={`nav-btn ${activeTab === 'gallery' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('gallery')}
                >Галерея</button>
              </li>
              <li>
                <button 
                  className={`nav-btn ${activeTab === 'news' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('news')}
                >Новини</button>
              </li>
              <li>
                <button 
                  className={`nav-btn ${activeTab === 'contacts' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('contacts')}
                >Контакти</button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* 🏠 СЕКЦІЯ 1: ГОЛОВНА СТОРІНКА (Банер + Плитки) */}
      {activeTab === 'home' && (
        <>
          <section className="hero-slider">
            <div className="container">
              <div className="slide-content">
                <h1>День відкритих дверей ЗВО</h1>
                <p>Повна програма заходів та локації презентаційних стендів нашої випускної кафедри.</p>
                <button className="btn-gold" onClick={() => setActiveTab('news')}>Читати далі</button>
              </div>
            </div>
          </section>

          <section className="quick-tiles">
            <div className="container">
              <div className="tiles-grid">
                <a href="#news" className="tile-item" onClick={(e) => { e.preventDefault(); setActiveTab('news'); }}>
                  <div className="tile-icon">📰</div>
                  <h3>Стрічка новин</h3>
                  <p>Останні події, розклади та анонси нашої лабораторії.</p>
                </a>
                <a href="#gallery" className="tile-item" onClick={(e) => { e.preventDefault(); setActiveTab('gallery'); }}>
                  <div className="tile-icon">🖼️</div>
                  <h3>Галерея</h3>
                  <p>Фотозвіти з комп'ютерних класів та наукових засідань.</p>
                </a>
                <a href="#contacts" className="tile-item" onClick={(e) => { e.preventDefault(); setActiveTab('contacts'); }}>
                  <div className="tile-icon">📞</div>
                  <h3>Контакти</h3>
                  <p>Знайдіть нас у м. Полтава або напишіть нам листа.</p>
                </a>
              </div>
            </div>
          </section>
        </>
      )}

      {/* 📰 СЕКЦІЯ 2: НОВИНИ (Динамічно завантажуються з бази даних SQLite) */}
      {activeTab === 'news' && (
        <main className="container my-5">
          <section>
            <h2 className="section-title">Останні новини порталу</h2>
            <div className="news-grid">
              {news.map((item) => (
                <div key={item.id} className="news-card">
                  <div className="card-body">
                    <span className="news-date">📅 {item.date}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <a href={`#news/${item.id}`} className="btn-more">Детальніше</a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* 🖼️ СЕКЦІЯ 3: ГАЛЕРЕЯ (CSS Grid адаптивна сітка) */}
      {activeTab === 'gallery' && (
        <main className="container my-5">
          <h2 className="section-title">Галерея лабораторії</h2>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRikBqKJlv87Kd_3sZZaFyXfA674Ldthn-k1ySr7OvvK-keuisBULxa7gKq&s=10" alt="Обладнання" />
              <div className="gallery-desc">Комп'ютерний клас</div>
            </div>
            <div className="gallery-item">
              <img src="/img/2.png" alt="SQL-сервер" />
              <div className="gallery-desc">Локальний сервер мережі</div>
            </div>
            <div className="gallery-item">
              <img src="https://nupp.edu.ua/uploads/files/0/news/2024/10/preparatory%20courses/DSC_4543.jpg" alt="Процес навчання" />
              <div className="gallery-desc">Практичні заняття студентів</div>
            </div>
          </div>
        </main>
      )}

      {/* 📄 СЕКЦІЯ 4: ПРО САЙТ */}
      {activeTab === 'about' && (
        <main className="container my-5">
          <h2 className="section-title">Про наш веб-портал</h2>
          <div className="about-content">
            <p>Цей ресурс розробено як навчальну лабораторію для відпрацювання навичок побудови сучасних Full-Stack застосунків на базі Node.js, Express та бази даних SQLite.</p>
            <h3>Основні завдання порталу:</h3>
            <ul>
              <li>Динамічне підвантаження новинної стрічки з СУБД.</li>
              <li>Створення SPA-структури (Single Page Application) без перезавантаження сторінок.</li>
              <li>Реалізація системи адаптивного дизайну (CSS Grid та Flexbox).</li>
            </ul>
          </div>
        </main>
      )}

      {/* 📞 СЕКЦІЯ 5: КОНТАКТИ ТА ФОРМА ЗВОРОТНОГО ЗВ'ЯЗКУ */}
      {activeTab === 'contacts' && (
        <main className="container my-5">
          <h2 className="section-title">Зворотний зв'язок</h2>
          <div className="contacts-page-layout">
            
            <div className="contacts-info-card">
              <h3>Наші контакти</h3>
              <p className="sub-text">Ви можете завітати до нас особисто або надіслати офіційне звернення.</p>
              <div className="info-meta-list">
                <div className="meta-item">
                  <span className="meta-icon">🏛️</span>
                  <div>
                    <strong>Адреса:</strong>
                    <p>36011, м. Полтава, проспект Віталія Грицаєнка, 24.</p>
                  </div>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">📞</span>
                  <div>
                    <strong>Telephone:</strong>
                    <p>+38 (0532) 56-16-04</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contacts-form-container">
              <h3>Напишіть нам</h3>
              {formSubmitted ? (
                <div style={{ padding: '15px', backgroundColor: '#e6f4ea', color: '#137333', borderRadius: '6px', fontWeight: 'bold' }}>
                  🎉 Дякуємо! Ваше звернення успішно надіслано в систему.
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Ваше ім'я</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="student" required />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="student@example.com" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Повідомлення</label>
                    <textarea name="message" rows="4" value={formData.message} onChange={handleInputChange} placeholder="Ваш текст..." required></textarea>
                  </div>
                  <button type="submit" className="btn-submit">Надіслати звернення</button>
                </form>
              )}
            </div>

          </div>
        </main>
      )}

      {/* 🏛️ УНІВЕРСИТЕТСЬКИЙ ФУТЕР */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-row">
            
            {/* 🔹 Coloнка 1: Інтернет джерела */}
            <div className="footer-col">
              <h4>Інтернет джерела</h4>
              <ul>
                <li><a href="https://rada.gov.ua" target="_blank" rel="noopener noreferrer">Верховна Рада України</a></li>
                <li><a href="https://mon.gov.ua" target="_blank" rel="noopener noreferrer">Міністерство освіти і науки України</a></li>
                <li><a href="https://president.gov.ua" target="_blank" rel="noopener noreferrer">Сайт Президента України</a></li>
              </ul>
            </div>

            {/* 🔹 Колонка 2: Партнери */}
            <div className="footer-col">
              <h4>Partners</h4>
              <ul>
                <li><a href="https://www.magna-charta.org">Magna Charta Universitatum</a></li>
                <li><a href="https://erasmus-plus.ec.europa.eu">ERASMUS+</a></li>
                <li><a href="https://erasmusplus.org.ua">ERASMUS+.UKRAINE</a></li>
                <li><a href="https://eeas.europa.eu/archives/delegations/ukraine/projects/youth/erasmus_mundus_uk.htm">ERASMUS MUNDUS</a></li>
              </ul>
            </div>

            {/* 🔹 Колонка 3: Соціальні медіа та Скринька довіри */}
            <div className="footer-col">
              <h4>Соціальні медіа</h4>
              <div className="footer-social-icons">
                <a href="https://www.facebook.com/poltava.polytechnic.edu" target="_blank" rel="noopener noreferrer" title="Facebook">
                  <img src="https://img.freepik.com/premium-vector/facebook-logo-vector-icon-logotype-vector-eps_901408-408.jpg?w=100" alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/poltava_polytechnic/" target="_blank" rel="noopener noreferrer" title="Instagram">
                  <img src="https://i.pinimg.com/736x/9c/29/9b/9c299beed82dde897920210755c4db13.jpg" alt="Instagram" />
                </a>
                <a href="https://www.youtube.com/channel/UCoNxvmDb-4fb1gjBZ1AEknA" target="_blank" rel="noopener noreferrer" title="YouTube">
                  <img src="https://i.pinimg.com/736x/81/47/69/81476968015b2ac40320e94246a8caf8.jpg" alt="YouTube" />
                </a>
              </div>
              
              <h4 style={{ marginTop: '20px' }}>Скринька довіри</h4>
              <p style={{ marginTop: '5px' }}>
                📧 <a href="mailto:conflict@nupp.edu.ua" style={{ color: 'inherit', textDecoration: 'none' }}>conflict@nupp.edu.ua</a>
              </p>
            </div>

          </div>

          {/* Інформаційний блок із картою та контактами */}
          <div className="contact-info-block" style={{ marginTop: '30px', borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
            <div className="footer-contacts-text">
              <h4>Навчальна лабораторія кафедри ЗВО</h4>
              <p>Телефон: +38 (0532) 56-16-04</p>
              <p>E-mail: kanc@univer.edu.ua</p>
            </div>
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2586.326300137549!2d34.56473131654358!3d49.5752593793641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d825f9b4183df7%3A0x89ea213c87dd46d2!2z0J3QsNGG0ZbQvtC90LDQu9GM0L3QuNC5INGD0L3RltCy0LXRgNGB0LjRgtC10YIgwqvQn9C_0LvRgtCw0LLRgdGM0LrQsCDQv9C_0LvRltGC0LXRhdC90ZbQutCwINC_0LzQtdC90ZbCoNGO0YDRltGPINCa0L7QvdC00YDQ0YLRjtC60LDCuw!5e0!3m2!1suk!2sua!4v1680000000000!5m2!1suk!2sua" 
                style={{ border: 0, width: '100%', height: '150px', borderRadius: '4px' }} 
                allowFullScreen="" 
                loading="lazy">
              </iframe>
            </div>
          </div>

          {/* Нижня плашка (копірайт) */}
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Навчальна лабораторія кафедри ЗВО. Всі права захищені.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;