import { Request, Response } from 'express'
import { File } from '../db/entities/files.js'
import { DatabaseConnection } from '../db/database.connection.js'
import { dateToDDMMYYYY } from '../utils/date.utils.js'
import BadRequestError from '../errors/bad.request.error.js'
import NotFoundError from '../errors/not.found.error.js'
import fs from 'fs'

const uploadFile = async (req: Request, res: Response) => {
	if (req.files instanceof Array) {
		const FilesRepository = DatabaseConnection.getRepository(File)
		const filesToUpload: File[] = new Array<File>()
		req.files.forEach((value) => {
			const uploadedFile = new File()
			uploadedFile.name = value.originalname
			uploadedFile.MIMEtype = value.mimetype
			uploadedFile.size = value.size
            uploadedFile.path = value.path
			filesToUpload.push(uploadedFile)
		})
		const result = await FilesRepository.save(filesToUpload)

		res.status(201).json({
			files: result.map((value) => {
				const date = new Date(value.uploadDate)
				return {
					...value,
					uploadDate: dateToDDMMYYYY(date),
				}
			}),
		})
	} else {
		throw new BadRequestError({
			message: 'Incorrect body of request',
			logging: true,
		})
	}
}

const getFile = async (req: Request, res: Response) => {
	const FilesRepository = DatabaseConnection.getRepository(File)
	const id = req.params.id
	if (id) {
		const result = await FilesRepository.findOneBy({
			id: parseInt(id),
		})
		if (result) {
            const date = new Date(result.uploadDate)
			res.status(200).json({
				file: {
					...result,
					uploadDate: dateToDDMMYYYY(date),
				},
			})
		} else {
			throw new NotFoundError()
		}
	} else {
		throw new Error()
	}
}

const deleteFile = async (req: Request, res: Response) => {
	const FilesRepository = DatabaseConnection.getRepository(File)
	const id = req.params.id
	if (id) {
		const file = await FilesRepository.findOneBy({
			id: parseInt(id),
		})

		if (file) {
            fs.unlinkSync(file.path)
			const result = await FilesRepository.delete(parseInt(id))
			if (result.raw) {
				res.sendStatus(204)
			}
		} else {
            throw new NotFoundError()
        }
	} else {
        throw new Error()
    }
}

const getFiles = async (req: Request, res: Response) => {
    const listSize = parseInt(req.query.list_size as string) || 10
    const page = parseInt(req.query.page as string) || 1
    const FilesRepository = DatabaseConnection.getRepository(File)

    const files = await FilesRepository.find({
        skip: (page - 1) * listSize,
        take: listSize
    })

    const count = await FilesRepository.count()
    
    res.status(200).json({
        files,
        totalPages: Math.ceil(count / listSize),
        currentPage: page
    })
}

const updateFile = async(req: Request, res: Response) => {
    const FilesRepository = DatabaseConnection.getRepository(File)
    const id = req.params.id
    if (id && req.file) {
        const file = await FilesRepository.findOneBy({
            id: parseInt(id)
        })
        const updateFile: File = new File()
        if (file) {
            fs.unlinkSync(file.path)
            updateFile.id = file.id
        }
        updateFile.MIMEtype = req.file.mimetype
        updateFile.name = req.file.originalname
        updateFile.path = req.file.path
        updateFile.size = req.file.size     
        const result = await FilesRepository.save(updateFile)
        res.status(200).json({
            file: {
                ...result,
                uploadDate: dateToDDMMYYYY(new Date(result.uploadDate))
            }
        })
    } else {
        throw new Error()
    }
}

const downloadFile = async(req: Request, res: Response) => {
    const FilesRepository = DatabaseConnection.getRepository(File)
    const id = req.params.id
    if (id) {
        const file = await FilesRepository.findOneBy({
            id: parseInt(id)
        })
        if (file) {
            res.download(file.path)
        } else {
            throw new NotFoundError()
        }
    } else {
        throw new Error()
    }
}

export { uploadFile, getFile, deleteFile, getFiles, updateFile, downloadFile }
