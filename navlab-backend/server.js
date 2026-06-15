const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) console.error('Помилка БД:', err.message);
    else console.log('База даних SQLite успішно підключена!');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        title TEXT,
        description TEXT
    )`);

    db.get("SELECT COUNT(*) AS count FROM news", [], (err, row) => {
        if (row.count === 0) {
            const stmt = db.prepare("INSERT INTO news (date, title, description) VALUES (?, ?, ?)");
            
            stmt.run("13 Червня, 2026", "Старт реєстрації на хакатон з веб-дизайну", "Запрошуємо студентів усіх курсів спробувати свої сили у створенні інтерфейсів для екологічних проєктів.");
            stmt.run("10 Червня, 2026", "Оновлено методичні матеріали", "Додано нові лабораторні роботи з курсу \"Веб-програмування\" для другого курсу.");
            stmt.run("08 Червня, 2026", "Відкрита лекція від IT-компанії", "Провідний Front-End розробник поділитись секретами оптимізації рендерингу додатків.");
            stmt.run("05 Червня, 2026", "Модернізація обладнання", "До лабораторії надійшла нова партія моніторів з підвищеною точністю передачі кольору.");
            stmt.run("02 Червня, 2026", "Графік консультацій на сесію", "Оприлюднено розклад предзахистів курсових робіт та консультацій викладачів кафедри.");
            stmt.run("28 Травня, 2026", "Успішний захист дипломів", "Вітаємо наших магістрів із блискучими результатами захисту випускних кваліфікаційних робіт.");
            
            stmt.finalize();
            console.log("Новини успішно завантажені в базу даних!");
        }
    });
});

app.get('/api/news', (req, res) => {
    db.all("SELECT * FROM news ORDER BY id ASC", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Сервер працює на порту ${PORT}. Очікування запитів...`);
});
