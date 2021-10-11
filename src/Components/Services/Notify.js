import Swal from "sweetalert2"

const errorHandler = (errorMsg) => {
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: errorMsg,
    })
}

const successHandler = (successMsg) => {
    console.log(successMsg);
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: successMsg,
    })
}

export default { errorHandler, successHandler };