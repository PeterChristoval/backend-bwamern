const Category = require('../models/Category')
const Bank = require('../models/Bank')
const Item = require('../models/Item')
const Image = require('../models/Image')
const fs = require('fs-extra')
const path = require('path')

module.exports = {
    
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/view_dashboard')
    },
    
    viewCategory: async (req, res) => {
        const category = await Category.find()
        const message = req.flash('alertMessage')
        const status = req.flash('alertStatus')
        const alert = {message, status}
        res.render('admin/category/view_category', {category, alert})
    },
    
    addCategory: async (req, res) => {
        try {
            const { name } = req.body
            req.flash('alertMessage', 'Berhasil tambahkan data')
            req.flash('alertStatus', 'success')
            await Category.create({ name })
            res.redirect('/admin/category')
        } catch (error) {
            req.flash('alertMessage', 'Gagal tambahkan data')
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/category')
        }
    },

    updateCategory: async (req, res) => {
        try {
            const { id, name } = req.body
            const category = await Category.findOne({ _id: id })
            category.name = name
            await category.save()
            req.flash('alertMessage', 'Berhasil edit data')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/category')
        } catch (error) {
            req.flash('alertMessage', 'Gagal update data')
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/category')
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params
            const category = await Category.findOne({ _id: id })
            await category.remove()
            req.flash('alertMessage', 'Berhasil hapus data')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/category')
        } catch (error) {
            req.flash('alertMessage', 'Gagal hapus data')
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/category')
        }
    },

    viewBank: async (req, res) => {
        try {
            const bank = await Bank.find()
            const message = req.flash('alertMessage')
            const status = req.flash('alertStatus')
            const alert = {message: message, status: status}
            res.render('admin/bank/view_bank', { title: 'Staycation | Item', alert, bank })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/bank')
        }
    },

    addBank: async (req, res) => {
        try {
            const {nameBank, nomorRekening, name} = req.body
            await Bank.create({
                nameBank,
                nomorRekening,
                name,
                imageUrl: `images/${req.file.filename}`
            })
            req.flash('alertMessage', 'Berhasil menambahkan data bank')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/bank')
        } catch (error) {
            req.flash('alertMessage', 'Gagal menambahkan data bank')
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/bank')
        }
    },

    updateBank: async (req, res) => {
        try {
            const { nameBank, nomorRekening, name, id } = req.body
            const bank = await Bank.findOne({ _id: id })
            if (req.file == undefined) {
                bank.namebank = nameBank
                bank.nomorRekening = nomorRekening
                bank.name = name
                await bank.save()
                req.flash('alertMessage', 'Berhasil update data bank')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/bank')
            } else {
                await fs.unlink(path.join(`public/${bank.imageUrl}`))
                bank.nameBank = nameBank
                bank.nomorRekening = nomorRekening
                bank.name = name
                bank.imageUrl = `images/${req.file.filename}`
                await bank.save()
                req.flash('alertMessage', 'Berhasil update data bank')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/bank')
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/bank')
        }
    },

    deleteBank: async (req, res) => {
        try {
            const { id } = req.params
            const bank = await Bank.findOne({ _id: id })
            await bank.remove()
            req.flash('alertMessage', 'Berhasil menghapus data bank')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/bank')
        } catch (error) {
            req.flash('alertMessage', 'Gagal menghapus data bank')
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/bank')
        }
    },

    viewItem: async (req, res) => {
        try {
            const category =  await Category.find()
            const message = req.flash('alertMessage')
            const status = req.flash('alertStatus')
            const alert = { message: message, status: status }
            res.render('admin/item/view_item', {
                title: 'Staycation | Item',
                category,
                alert
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/item')
        }
    },

    addItem: async (req, res) => {
        try {
            const { categoryId, title, price, city, about } = req.body
            if (req.files.length > 0) {
                const category = await Category.findOne({ _id: categoryId })
                const newItem = {
                    categoryId: category._id,
                    title,
                    description: about,
                    price,
                    city
                }
                const item = await Item.create(newItem)
                category.itemId.push({ _id: item._id })
                await category.save()
                for (let i = 0; i < req.files.length; i++) {
                    const imageSave = await Image.create({ imageUrl: `images/${req.files[i].filename}` });
                    item.imageId.push({ _id: imageSave._id })
                    await item.save()
                }
                req.flash('alertMessage', 'Success Add Item')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/item')
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/item')
        }
    },

    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking')
    }
}