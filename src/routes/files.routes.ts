import * as express from 'express'
import multer from 'multer'
import {
	deleteFile,
	downloadFile,
	getFile,
	getFiles,
	updateFile,
	uploadFile,
} from '../controllers/file.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const dest: string = process.env.MULTER_DESTINATION_PATH || 'uploads/'

const storage = multer.diskStorage({
	destination: dest,
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`)
	},
})

const upload = multer({ storage: storage })

const FileRouter = express.Router()

FileRouter.post('/file/upload', authMiddleware, upload.any(), uploadFile)
FileRouter.get('/file/list', authMiddleware, getFiles)
FileRouter.get('/file/:id', authMiddleware, getFile)
FileRouter.delete('/file/delete/:id', authMiddleware, deleteFile)
FileRouter.put('/file/update/:id', authMiddleware, upload.single('file'), updateFile)
FileRouter.get('/file/download/:id', authMiddleware, downloadFile)

export default FileRouter
