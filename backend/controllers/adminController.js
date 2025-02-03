


// api for adding doctor
const addDoctor = async (req, res) => {
    try {
        const {name,email,password,speciality,degree,experience,about,fees,address} = req.body;
        const fileImage = req.file
        console.log(req.file);
        console.log( {name,email,password,speciality,degree,experience,about,fees,address},fileImage);
        return res.status(200).json({message: `'Doctor added successfully'${fileImage}`});
    } catch (error) {
        console.error('Error adding doctor:', error);
        res.status(500).json({message: 'Server Error'});
        
    }
}


export{addDoctor}