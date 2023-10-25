const employees = require('../models/emsModel')
//    all logics

//    Register logics - register request are resolved 
const employeeRegister = async (req, res) => {

    const file = req.file.filename

    const { fname, lname, email, mobile, gender, status, location } = req.body

    if (!fname || !lname || !email || !file || !mobile || !gender || !status || !location) {
        res.status(404).json('all inputs  are required')



    }

    // try-catch used to know if any error occured in mongoose network
    try {

        const preEmployee = await employees.findOne({ email })
        if (preEmployee) {
            res.status(403).json("Employee already Pressent")
        }
        else {
            //create object for new employee

            const newEmployee = new employees({
                fname, lname, email, mobile, gender, status, profile: file, location
            })
            await newEmployee.save()
            res.status(200).json(newEmployee)
        }

    }
    catch {
        res.status(400).json('logic error')
    }


}
//get all employees

getAllEmployees = async (req, res) => {
    // access search data from request query
    // const search = req.query.search
    const { search } = req.query
    //regular expresson query
    const query = {
        fname: { $regex: search, $options: 'i' }
    }
    try {
        const allEmployees = await employees.find(query)
        res.status(200).json(allEmployees)

    } catch (error) {
        res.status(400).json(error)

    }
}
// get single employee
getSingleEmployee = async (req, res) => {
    const { id } = req.params
    try {
        const singleEmployee = await employees.findOne({ _id: id })
        res.status(200).json(singleEmployee)

    } catch (error) {
        res.status(200).json(error)

    }
}

// delete employee
removeEmployee = async (req, res) => {

    const { id } = req.params
    try {
        // return object if deleted

        const removeEmp = await employees.findByIdAndDelete({ _id: id })
        res.status(200).json(removeEmp)

    } catch (error) {

        res.status(200).json(error)
    }




}

//edit employee
editEmployee = async (req, res) => {
    const { id } = req.params
    const { fname, lname, email, mobile, gender, status, location, user_profile } = req.body
    const file = req.file ? req.file.filename : user_profile

    if (!fname || !lname || !email || !mobile || !gender || !status || !location) {
        res.status(404).json("all inputs are required")
    }
    try {
        const user = await employees.findOne({ _id: id })
        if (user) {
            // update all values with new data
            user.fname = fname
            user.lname = lname
            user.email = email
            user.mobile = mobile
            user.gender = gender
            user.status = status
            user.location = location
            user.profile = file

            // save
            user.save()
            res.status(200).json(user)

        }
    }
    catch (err) {
        res.status(400).json('backen error', err)

    }
}






module.exports = { employeeRegister, getAllEmployees, getSingleEmployee, removeEmployee, editEmployee }
