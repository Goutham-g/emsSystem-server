// set paths for each requests

const express = require('express')

const upload = require('../multerconfig/storageConfig')
const { employeeRegister, getAllEmployees, getSingleEmployee, removeEmployee, editEmployee } = require('../controllers/logic')



// create an object for Router class in express
const router = new express.Router()

//set url for requests

//register employee - post
router.post('/employees/register', upload.single('user_profile'), employeeRegister)

//  get all employees
router.get('/employees/getEmployees', getAllEmployees)

//get single employee
router.get('/employees/getEmployee/:id', getSingleEmployee)
// delete employee
router.delete('/employees/removeEmployee/:id', removeEmployee)

//edit employee
router.put('/employees/updateEmployee/:id', upload.single('user_profile'), editEmployee)







module.exports = router