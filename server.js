const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')

const app = express()
const port = 3000

// Настройка Multer для загрузки файлов
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Обработка POST-запроса для конвертации изображения
app.post('/convert', upload.single('image'), (req, res) => {
	if (!req.file) {
		return res.status(400).send('Нет изображения для конвертации')
	}

	// Используем sharp для конвертации изображения
	sharp(req.file.buffer)
		.resize(800) // Пример: изменение размера
		.toFormat('png') // Преобразование в PNG
		.toBuffer()
		.then(data => {
			res.set('Content-Type', 'image/png')
			res.send(data)
		})
		.catch(error => {
			res.status(500).send('Ошибка конвертации изображения')
		})
})

// Статическая папка для загрузки HTML-файлов
app.use(express.static('public'))

// Запуск сервера
app.listen(port, () => {
	console.log(`Сервер запущен на http://localhost:${port}`)
})
