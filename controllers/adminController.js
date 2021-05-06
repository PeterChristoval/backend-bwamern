const Category = require('../models/Category')
const Bank = require('../models/Bank')
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
            req.flash('alertMessage', 'Berhasil menambahkan bank')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/bank')
        } catch (error) {
            req.flash('alertMessage', 'Gagal menambahkan bank')
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/bank')
        }
    },

    updateBank: async (req, res) => {
        console.log(req.file);
        try {
            const { nameBank, nomorRekening, name, id } = req.body
            const bank = await Bank.findOne({ _id: id })
            if (req.file == undefined) {
                bank.namebank = nameBank
                bank.nomorRekening = nomorRekening
                bank.name = name
                await bank.save()
                req.flash('alertMessage', 'Berhasil update bank')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/bank')
            } else {
                await fs.unlink(path.join(`public/${bank.imageUrl}`))
                bank.nameBank = nameBank
                bank.nomorRekening = nomorRekening
                bank.name = name
                bank.imageUrl = `images/${req.file.filename}`
                await Bank.save()
                req.flash('alertMessage', 'Berhasil update bank')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/bank')
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/bank')
        }
    },

    viewItem: (req, res) => {
        res.render('admin/item/view_item')
    },

    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking')
    }
}