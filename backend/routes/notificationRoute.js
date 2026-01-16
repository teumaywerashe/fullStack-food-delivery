import express from 'express'
import { addNotification, deleteNotification, getAllNotification, getNotitfication, updateNotification } from '../controllers/notification.js'

export const notificationRouter = express.Router()
notificationRouter.post('/', addNotification)
notificationRouter.get('/', getAllNotification)
notificationRouter.get('/:id', getNotitfication)
notificationRouter.delete(':id', deleteNotification)
notificationRouter.patch('/:id', updateNotification)